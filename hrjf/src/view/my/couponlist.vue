<template>
<div class="container">

        <heads :title="title"></heads>
<!--         <div class="tradelistnav">
            <ul>
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>未使用</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>已使用</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>已过期</span></li>
            </ul>
        </div> -->
        <div class="navpsw"><a href="javascript:" :class="{active:classIndex==0}" @click="tabClick(0)">可使用</a><a href="javascript:" :class="{active:classIndex==5}" @click="tabClick(5)">已失效</a></div>
        <div class="couponbox" id="iscroll">
            <ul>
                <li v-for="(item,index) in datalist" :class="[item.classname,{'state':classIndex==0}]" @click="addClassFun(item.GoodsStatus,index)">
                    <div class="coupon_main_box yellow" v-if="item.GoodsStatus==3">
                      <div class="bignumble"><span>加息券 +{{(item.Money*100).toFixed(2)}}</span>%<p :class="{active:item.expstyle==1}">{{item.expday}}</p></div>
                      <div class="subtext">说明：{{item.CouponProfile}}</div>
                      <div class="money_show"><span>{{(item.Money*100).toFixed(2).split(".")[0]}}</span>.{{(item.Money*100).toFixed(2).split(".")[1]}}%</div>
                      <div class="tag" v-if="item.CouponStatusNumber==1">立即投资</div>
                      <div class="tag" v-if="item.CouponStatusNumber==2" style="top:0.7rem">已使用</div>
                      <div class="tag" v-if="item.CouponStatusNumber==3" style="top:0.7rem">已过期</div>
                    </div>
                    <div class="coupon_main_box red" v-if="item.GoodsStatus==2||item.GoodsStatus==5">
                      <div class="bignumble"><span>{{item.CouponName}}</span><p :class="{active:item.expstyle==1}">{{item.expday}}</p></div>
                      <div class="subtext">说明：{{item.CouponProfile}}</div>
                      <div class="money_show">￥<span>{{item.Money}}</span></div>
                      <div class="tag" v-if="item.CouponStatusNumber==1&&!item.IsFlag" style="top:0.7rem">冻结中</div>
                      <div class="tag" v-if="item.CouponStatusNumber==1&&item.IsFlag">立即领取</div>
                      <div class="tag" v-if="item.CouponStatusNumber==2" style="top:0.7rem">已领取</div>
                      <div class="tag" v-if="item.CouponStatusNumber==3">已过期</div>
                    </div>
                    <div class="coupon_main_box orange" v-if="item.GoodsStatus==1">
                      <div class="bignumble"><span>{{item.CouponName}}</span><p :class="{active:item.expstyle==1}">{{item.expday}}</p></div>
                      <div class="subtext">说明：{{item.CouponProfile}}</div>
                      <div class="money_show">￥<span>{{item.Money}}</span></div>
                      <div class="tag" v-if="item.CouponStatusNumber==1">立即投资</div>
                      <div class="tag" v-if="item.CouponStatusNumber==2" style="top:0.7rem">已使用</div>
                      <div class="tag" v-if="item.CouponStatusNumber==3" style="top:0.7rem">已过期</div>
                    </div>
                    <div class="coupon_main_box orange" v-if="item.GoodsStatus==6">
                      <div class="bignumble"><span>{{item.CouponName}}</span><p :class="{active:item.expstyle==1}">{{item.expday}}</p></div>
                      <div class="subtext">说明：{{item.CouponProfile}}</div>
                      <div class="money_show">￥<span>{{item.Money}}</span></div>
                      <div class="tag" v-if="item.CouponStatusNumber==1">立即投资</div>
                      <div class="tag" v-if="item.CouponStatusNumber==2" style="top:0.7rem">已使用</div>
                      <div class="tag" v-if="item.CouponStatusNumber==3" style="top:0.7rem">已过期</div>
                    </div>
                    <div class="coupon_main_box" v-if="item.GoodsStatus==4">
                      <div class="bignumble"><span>2</span>倍</div>
                      <div class="list">
                        <dl>
                          <dd>限最高投资金额{{item.CouponCondition}}</dd>
                          <dd>不限制投资期限</dd>
                        </dl>
                      </div>
                    </div>
<!--
                    <div :class="['text',{active:cpmoer==index}]" @click="showmper(index)">
                      <p>详细信息<span class="time">{{item.ExpDate.substr(0,10)}}</span></p>
                      <p>来源：{{item.Source}}</p>
                      <p>说明：{{item.Explain}}</p>
                      <i></i>
                    </div> -->
                </li>
                <li style="text-align:center;height:1rem;" v-if="showmoer">{{loaddata}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import heads from '../../components/head'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:"我的优惠券",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      classlist:-1,
      cpmoer:-1,
      total:2,
      loaddata:"加载更多数据",
      datamoer:true,
      showmoer:false,
      obj:{
          mouseWheel: true,
          click:this.iScrollClick() ,
          preventDefault: true,
          tap: true,
          bounce: false  ,
          scrollbars : false,
          momentum: true,//惯性滑动
          scrollX : false,
          scrollY : true,
      }
    }
  },
  mounted : function() {
      let _this = this;
      setTimeout(function(){
        _this.myScroll = new IScroll(document.getElementById('iscroll'),_this.obj);
        _this.myScroll.on('scrollEnd',function(){
          if(this.y<=(this.wrapperHeight-this.scrollerHeight)&&_this.datamoer){
            _this.datamoer = false;
            _this.loaddata = "加载中"
            _this.getdata();
          }
        })
      },300)

  },
  methods:{
    tabClick(type){
        if(type==0){
            this.tradetype=-1
        }else{
            this.tradetype=type
        }
        this.classIndex=type;
        this.init();
        this.getdata(type);
    },
    iScrollClick(){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
           var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
           return parseFloat(s[0]+s[3]) < 44 ? false : true
          }
    },
    addClassFun(GoodsStatus,index){
          if(GoodsStatus==2||GoodsStatus==5){
              this.$router.push('/couponcsah?title='+this.datalist[index].CouponName+'&money='+this.datalist[index].Money+'&CouponProfile='+this.datalist[index].CouponProfile+'&CouponStatusNumber='+this.datalist[index].CouponStatusNumber+'&ExpDate='+this.datalist[index].ExpDate+'&TenderCouponId='+this.datalist[index].TenderCouponId+'&Source='+this.datalist[index].Source+'&IsFlag='+this.datalist[index].IsFlag)
              return
           }

           if(this.classIndex==0){
              this.$router.push('/tender')
              console.log(1111)
           }
    },
    showmper(index){
        if(this.cpmoer==index){
          this.cpmoer = -1
        }else{
          this.cpmoer = index
        }
    },
    init(){
        let _this = this
        this.page=1;
        this.datalist=[];
        this.classlist=-1
        this.myScroll.scrollTo(0, 0);
        setTimeout(function(){
             _this.myScroll.refresh()
           },300)
    },
    getcouponmoney(data){
      let _this =this
      if(this.classIndex==0){
        this.$http(this.$api.getuserusecoupon({"TenderCouponId":data}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            _this.$msg.alert("领取成功",function(){
                _this.init()
                _this.getdata()
              })
          }else{
            _this.$msg.alert(data.data.ResultMessage)
          }
        });
      }

    },
    expday(exptime,isboolean){
     // let thistime = exptime.replace(new RegExp(/-/gm),"/")
       let expday = new Date(exptime);
       let nowday = new Date();
       let actiontime = (expday - nowday) /1000
       let day = 0,hour = 0,minute = 0,second = 0;
        if (actiontime > 0) {
            day = Math.floor(actiontime / (60 * 60 * 24));
            hour = Math.floor(actiontime / (60 * 60)) - (day * 24);
            minute = Math.floor(actiontime / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(actiontime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if(isboolean){
            if(day==3){
              return ["3天后过期",1]
            }else if(day==2){
              return ["2天后过期",1]
            }else if(day==1){
              return ["1天后过期",1]
            }else if(day==0){
              if(hour>0){
                return [hour+"小时后过期",1]
              }else{
                if(minute>0){
                  return [minute+"分钟后过期",1]
                }
              }
            }else{
              return ['有效期至'+exptime,0]
            }
        }else{
          console.log(isboolean)
          return ['有效期至'+exptime,0]
        }

    },
    getdata(){
        let _this=this;
        if(this.datalist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(this.$api.myquerytendercouponlist({"CouponStatus":this.classIndex+1,"IsFalg":false,"Page":this.page,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          console.log(data.data.ResultData)
          _this.page ++

            for(var i=0;i<data.data.ResultData.List.length;i++){

              if(data.data.ResultData.List[i].GoodsStatus==3){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="jx_state"
                }else{
                  data.data.ResultData.List[i].classname="jx_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==2||data.data.ResultData.List[i].GoodsStatus==5){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="xj_state"
                }else{
                  data.data.ResultData.List[i].classname="xj_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==1){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="tz_state"
                }else{
                  data.data.ResultData.List[i].classname="tz_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==4){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="sb_state"
                }else{
                  data.data.ResultData.List[i].classname="sb_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==6){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="ty_state"
                }else{
                  data.data.ResultData.List[i].classname="ty_out"
                }
              }
             // let expdays = _this.expday((data.data.ResultData.List[i].ExpDate).replace(new RegExp(/-/gm),"/"),true)[0]
              if(_this.classIndex==0){
                data.data.ResultData.List[i].expday = _this.expday((data.data.ResultData.List[i].ExpDate).replace(new RegExp(/-/gm),"/"),true)[0]
                data.data.ResultData.List[i].expstyle=_this.expday((data.data.ResultData.List[i].ExpDate).replace(new RegExp(/-/gm),"/"),true)[1]
              }else{
                data.data.ResultData.List[i].expday = _this.expday((data.data.ResultData.List[i].ExpDate).replace(new RegExp(/-/gm),"/"),false)[0]
                data.data.ResultData.List[i].expstyle=_this.expday((data.data.ResultData.List[i].ExpDate).replace(new RegExp(/-/gm),"/"),false)[1]
              }

                _this.datalist.push(data.data.ResultData.List[i])
             }
             console.log(_this.expday(_this.classIndex))
             if(_this.datalist.length>=this.total){
                _this.loaddata = "没有更多数据"
              }else{
                _this.loaddata = "加载更多数据"
              }

          if(!_this.datamoer){
          setTimeout(function(){
             _this.datamoer = true;
             _this.myScroll.refresh()
           },300)

          }
          _this.showmoer = true;
        }
      });
    }
  },
  created :function(){
    this.getdata()
  },
  destroyed() {

  },
  components:{
    heads
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tradelistnav ul{display:flex;align-items:center;justify-content:center; height:1rem; border-bottom:1px solid #ccc;background:#fff;text-align:center;}
.tradelistnav ul span{font-size:0.4rem}
.tradelistnav ul li.active span{border-bottom:0.05rem solid #FF3533;color:#FF3533;padding-bottom:0.20rem}
.couponbox{position: absolute;z-index: 1;top: 2.1rem;bottom: 0;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none;}
.couponbox li{color: #808080;margin:0 auto;width:95%; margin-top:rem(10);}
.couponbox li.jx_state{background:url(/static/img/my/coupon_bg3.png) no-repeat;background-size: 100% 100%;}
.couponbox li.jx_out{background:url(/static/img/my/coupon_out.png) no-repeat;background-size: 100% 100%;}
.couponbox li.tz_state{background:url(/static/img/my/coupon_bg1.png) no-repeat;background-size: 100% 100%;}
.couponbox li.tz_out{background:url(/static/img/my/coupon_out.png) no-repeat ;background-size: 100% 100%;}
.couponbox li.sb_state{background:url(/static/img/my/icon_addInterest2.png) no-repeat ;background-size: 100% 100%;}
.couponbox li.sb_out{background:url(/static/img/my/icon_Gray_addInterest2.png) no-repeat ;background-size: 100% 100%;}
.couponbox li.xj_state{background:url(/static/img/my/coupon_bg2.png) no-repeat  ;background-size: 100% 100%;}
.couponbox li.xj_out{background:url(/static/img/my/coupon_out.png) no-repeat ;background-size: 100% 100%;}
.couponbox li.ty_state{background:url(/static/img/my/coupon_bg1.png) no-repeat  ;background-size: 100% 100%;}
.couponbox li.ty_out{background:url(/static/img/my/coupon_out.png) no-repeat ;background-size: 100% 100%;}
.couponbox li .coupon_main_box{min-height: 3.2rem; position:relative; overflow:hidden;}
.couponbox li .coupon_main_box .bignumble{ width:60%; margin-top:rem(15); font-size:0.45rem; margin-left:rem(10)}
.couponbox li .coupon_main_box .bignumble p{font-size:0.3rem; color:#555;font-weight:normal;margin-top:rem(10);}
.couponbox li .coupon_main_box .bignumble p.active{background:#de3132;width:rem(100);color:#fff; border-radius:rem(8); text-align:center;}
.couponbox li .coupon_main_box .bignumble span{font-size:0.45rem;}
.couponbox li .coupon_main_box .money_show{position:absolute;top: rem(15); right:rem(60); width:rem(100);text-align:right; font-size:0.4rem;}
.couponbox li .coupon_main_box .money_show span{font-size:0.55rem;}
.couponbox li .coupon_main_box .subtext{margin-top:rem(15); margin-left:rem(10);font-size:0.3rem; color:#555; width:85%;}
.couponbox li .coupon_main_box .tag{position:absolute;top: rem(20); right:rem(8); width:rem(20);color:#fff;font-size:0.4rem;}
.couponbox li.state .orange{color:#fe752f}
.couponbox li.state .yellow{color:#ffbb2a}
.couponbox li.state .red{color:#de3132;}
.couponbox li .coupon_main_box .list{width:50%; margin-top:rem(20)}
.couponbox li .coupon_main_box .list dd{text-align:left; margin-bottom:0.125rem;color:#ddd;}
.couponbox li .coupon_main_box .list dd i{width:0.125rem;height:0.125rem;display:inline-block;background:#ddd; margin-right:0.25rem;border-radius:50%; vertical-align:middle;}
.couponbox li .coupon_main_box .list .btn{width:2.0rem; height:0.75rem;color:#fff;background:#ddd;text-align:center;line-height:0.75rem;border-radius:0.125rem;font-size:0.35rem;float:right;margin-right:rem(40);}
.couponbox li .text{text-align:left; padding:0 0.25rem 0.25rem 0.25rem;box-sizing:border-box; background:#ffb8ac; border-bottom-left-radius:rem(5);border-bottom-right-radius:rem(5); overflow:hidden;position:relative; height:0.75rem;}
.couponbox li.jx_out .text,.couponbox li.tz_out .text,.couponbox li.sb_out .text,.couponbox li.xj_out .text,.couponbox li.ty_out .text{background:#e2e2e2;}
.couponbox li .active{height:auto;}
.couponbox li .text p{ margin-top:rem(5); color:#f12342; overflow:hidden;}
.couponbox li.jx_out .text p,.couponbox li.tz_out .text p,.couponbox li.sb_out .text p,.couponbox li.xj_out .text p,.couponbox li.ty_out .text p{color:#c1c1c1;}
.couponbox li .text p span{float:right; width:auto;}
.couponbox li .text i{position:absolute;background:url(/static/img/my/icon_gray_upward2x.png) no-repeat 0rem 0.1rem ;background-size: 100%; width:0.35rem;height:0.35rem; display:block; top:0.1rem;left:4.5rem;}
.couponbox li .text.active i{position:absolute;background:url(/static/img/my/icon_gray_downward2x.png) no-repeat 0rem 0.1rem ;background-size: 100%; width:0.35rem;height:0.35rem; display:block; top:0.1rem;left:4.5rem;}
.couponbox li.state .text i{position:absolute;background:url(/static/img/my/icon_downward2x.png) no-repeat 0rem 0.1rem ;background-size: 100%; width:0.35rem;height:0.35rem; display:block; top:0.1rem;left:4.5rem;}
.couponbox li.state .text.active i{position:absolute;background:url(/static/img/my/icon_upward2x.png) no-repeat 0rem 0.1rem ;background-size: 100%; width:0.35rem;height:0.35rem; display:block; top:0.1rem;left:4.5rem;}
.couponbox li.state .coupon_main_box .list .btn{background:#ffbb2a;}
.couponbox li.state .coupon_main_box .list dd{color:#555;}
.couponbox li.state .coupon_main_box .list dd i{background:#555;}
.navpsw{ width:rem(150); margin:auto; border:1px solid #de3132; margin-top:rem(10); margin-bottom:rem(10);display:flex;border-radius:rem(5); }
.navpsw a{display:block;text-align:center; color:#de3132;height:rem(25); line-height:rem(25);}
.navpsw a.active{background:#de3132;color:#fff;}
/*我的理财*/

</style>
