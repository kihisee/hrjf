<template>
<div id="frame">
  <div class="link_head">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>
  <div class="xjh bottom_no">
    <div class="box">
      <img  :src="datadetail.Icon_min_url" alt="">
    </div>
    <div class="box s_color">
      <h1><div><span class="h1title">{{datadetail.Name}}</span></div></h1>
      <ul class="storedetailsublist">
        <li><span class="titleleft">所需积分：</span><span class="iconright">{{datadetail.Need_point}}积分<span v-show="loginin"> (我的可用积分：{{nowcount}})</span></span></li>
        <li><span class="titleleft">使用门槛：</span>累计投资固定理财{{datadetail.CouponCondition}}元以上</li>
        <li><span class="titleleft">使用门槛：</span>不限制</li>
        <li><span class="titleleft">剩余数量：</span>{{datadetail.Coupon_Count}}</li>
      </ul>
    </div>
    <div class="box boxdetail">
      <h1><div><span class="h1title">商品详情</span></div></h1>
      <div class="sotre_conten" v-html="datadetail.Remark">
      </div>
    </div>
    <div class="sotre_conten_btn"><p class="sotre_conten_btnp"  @click="submitstore()">确认兑换</p></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '商品详情',
      state:this.$store.state,
      point:0,
      CouponList:[],



      datadetail:[],
      nowcount:0,

      loginin:false,

      Coupon_Type:0,
    }
  },
  methods:{
    submitstore(){
      let _this=this

      let query = this.$route.query


       if(typeof _this.state.user=="undefined"){
               _this.$msg.alert("请先登录",function(){
                _this.$router.push("login?back=storedetail?id="+query.id+'&PrizeType='+query.PrizeType)
              })
               return
        }


       if(_this.datadetail.Need_point >_this.nowcount){
            _this.$msg.alert("您的积分不够兑换！")
            return
          }


        if(_this.datadetail.Coupon_Count <=0){
          _this.$msg.alert("数量不足")
          return
        }

        if(_this.Coupon_Type ==24){
            _this.$http(_this.$api.myAddress({}))
            .then((data) => {
                console.log(data)
                if(data.data.ResultCode==100000){
                  if(data.data.ResultData.isTrue){
                            _this.$msg.confirm("是否确认兑换",function(){
                              console.log(111)
                                let id=query.id
                                _this.$http(_this.$api.ExchangePointCoupon({ID:id,PrizeCount:1}))
                                .then((data) => {
                                  console.log(data)
                                  _this.nowcount=_this.nowcount-_this.datadetail.Need_point
                                  _this.datadetail.Coupon_Count=_this.datadetail.Coupon_Count -1
                                    if(data.data.ResultCode==100000){
                                              _this.$msg.alert("订单提交成功，【积分商城】-【兑换记录】可查询订单进度。",function(){},"知道了")
                                    }
                                });
                            },function(){
                                return;
                            },"取消","确认")
                  }else{
                    _this.$msg.alert("请先填写您的地址",function(){
                    _this.$router.push("myaddress")
                    })
                  }
                }
            })
        }else{
        _this.$msg.confirm("是否确认兑换",function(){
        console.log(111)
          let id=query.id
          _this.$http(_this.$api.ExchangePointCoupon({ID:id,PrizeCount:1}))
          .then((data) => {
            console.log(data)
            _this.nowcount=_this.nowcount-_this.datadetail.Need_point
            _this.datadetail.Coupon_Count=_this.datadetail.Coupon_Count -1

              if(data.data.ResultCode==100000){
                      if(_this.Coupon_Type !=24  && _this.Coupon_Type !=2){
                        _this.$msg.confirm(data.data.ResultMessage,function(){
                            _this.$router.push("/tender")
                        },function(){},"取消","前往使用")
                      }else if(_this.Coupon_Type ==2){
                        _this.$msg.confirm(data.data.ResultMessage,function(){
                            _this.$router.push("/mycouponlist")
                        },function(){},"取消","前往领取")
                      }
              }
          });
      },function(){
          return;
      },"取消","确认")

    }

    },
    checkaddress(){
    let _this=this;

    }
  },
  components:{

  },
  created:function(){
     let _this =this

    let query = this.$route.query

    let PrizeType=query.PrizeType
    let id=query.id

     this.$http(this.$api.IndexCouponList({page:0,PageSize:1000,PrizeType:0}))
      .then((data) => {
        _this.CouponList=data.data.ResultData.List
        console.log(_this.CouponList)
        for(let e=0;e<_this.CouponList.length;e++){
          if(_this.CouponList[e].ID==id){
            console.log(_this.CouponList[e].ID)
            console.log("in")
            _this.datadetail=_this.CouponList[e]
            _this.Coupon_Type=_this.datadetail.Coupon_Type
          }else{
            console.log("out")
          }
        }
      });


       if(typeof _this.state.user !="undefined"){
        _this.loginin=true;
        this.$http(this.$api.DiscoverLoginInfo({}))
        .then((data) => {
           _this.nowcount=data.data.ResultData.Gold
        });
      }


  },
}
</script>

<style>
.storedetailsublist{overflow:hidden;padding:0.25rem;box-sizing:border-box;}
.storedetailsublist li{margin-bottom:0.25rem; text-align:left; height:0.5rem;overflow:hidden;}

.storedetailsublist li .titleleft{float:left;width:18%;}
.storedetailsublist li .iconright{float:left;width:70%;padding-left:0.5rem;background:url(../../../static/img/pointstore/icon_goodsintrodution.png) no-repeat left center;background-size:6%;color:#de3132;}
.storedetailsublist li .iconright span{color:#333;}
.xjh{
  box-sizing:border-box;
  padding:0.25rem 0.25rem 0px 0.25rem;
  overflow:hidden;
  position: relative;left: 0px;z-index: 0;margin-bottom: 1.25rem;text-align:center;
}
.xjh .box{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555;}
.xjh .boxdetail{margin-bottom:2rem;}
.xjh .box h1,.xjh .box h2,.xjh .box h3{ font-size: 0.45rem; font-weight: normal; height:1.125rem; line-height: 1.125rem;  padding:0px 0.375rem;box-sizing:border-box; vertical-align:middle; overflow:hidden;}
.xjh .box h3{overflow:visible;}
.xjh .box h1 span.h1title,.xjh .box h2 span.h1title{margin-right: 0.25rem;display:block; float:left; width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align:left;}
.box h1 span.subtitle{font-size:0.3rem;-webkit-text-size-adjust:none; color:#ffbb2a; border:1px double #ffbb2a;display:block; float:left; width:auto;line-height: normal; margin-top:0.25rem; padding:0.075rem; border-radius: 0.075rem;}
.xjh .box h1 div{border-bottom: 1px dashed #ccc; height: 1.11rem;}
.xjh .box a h3 {border-bottom: 1px dashed #ccc;height: 1.1rem;font-size: 0.45rem;line-height: 1.1rem;display: flex;color: #333; position:relative;}
.xjh .box a h3 .title { width: 53%; text-align: left; font-weight:normal; overflow:hidden;}
.xjh .box a h3 .icon { width: 30%; text-align: right; }
.xjh .box a h3 .icon i { font-size: 0.3rem; -webkit-text-size-adjust: none; color: #ffbb2a; border: 1px double #ffbb2a; display: block; float: left; width: auto; line-height: normal; padding: 0.025rem 0.075rem; font-style: normal; margin-top: 0.3rem;  margin-right:0.125rem;}
.xjh .box a h3 .new_title{background-size:100%; color:#fff; position:absolute; top:-0.2rem; line-height: 0.9rem; width:3.4rem; box-sizing:border-box; text-align:center;}
.xjh .box a h3 .new_icon{position:absolute; right:0.5rem; width:auto;}
.sotre_conten{width:95%;text-align:left;margin:0 auto;}
.sotre_conten img{width:100%;text-align:left;}

.sotre_conten_btn{ display: block;line-height: 1.0rem;text-align: center;font-size:0.4rem;background:#fff;position:fixed;bottom:0rem;width:95%;padding:0.3rem 0;z-index:999;white-space: pre}
.sotre_conten_btnp{width: 5rem;height: 1.0rem;margin:0 auto;color: #fff;border-radius: 0.125rem;background:#de3132;}

</style>
