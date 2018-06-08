<template>
<div class="container">
 <heads :title="title"></heads>

<div class="row_box">
  <p><span class="title">开发商</span><span>{{housedetail.Developers}}</span></p>
</div>

<div class="row_box">
  <p><span class="title">楼盘状态</span><span>{{housedetail.SaleState}}</span></p>
  <p><span class="title">参考均价</span><span>{{housedetail.Price}}</span></p>
  <p><span class="title">最新开盘</span><span>{{housedetail.OpenNewTime}}</span></p>
  <p><span class="title">交楼时间</span><span>{{housedetail.DeliverTime}}</span></p>
</div>

<div class="row_box">
  <p><span class="title">区域位置</span><span>{{housedetail.Area}}</span></p>
  <p><span class="title">楼盘地址</span><span class="text">{{housedetail.HousesAddress}}</span></p>
  <p><span class="title">售楼处地址</span><span class="text">{{housedetail.SaleAddress}}</span></p>
</div>

<div class="row_box">
  <p><span class="title">建筑类型</span><span>{{housedetail.BuildingType}}</span></p>
  <p><span class="title">产权年限</span><span>{{housedetail.PeriodInt}}</span></p>
  <p><span class="title">装修标准</span><span>{{housedetail.DecorationStandard}}</span></p>
  <p><span class="title">占地面积</span><span>{{housedetail.FloorSpace}}</span></p>
  <p><span class="title">建筑面积</span><span>{{housedetail.BuildingSpace}}</span></p>
  <p><span class="title">容积率</span><span>{{housedetail.PlotRatio}}</span></p>
  <p><span class="title">绿化率</span><span>{{housedetail.GreeningRatio}}</span></p>
  <p><span class="title">规划户型</span><span>{{housedetail.PlanNum}}</span></p>
  <p><span class="title">规划车位</span><span>{{housedetail.PlanCar}}</span></p>
</div>
<div class="row_box">
  <p><span class="title">物业类型</span><span>{{housedetail.PropertyType}}</span></p>
  <p><span class="title">物业公司</span><span>{{housedetail.PropertyCompany}}</span></p>
  <p><span class="title">物业费</span><span>{{housedetail.PropertyCost}}</span></p>
  <p><span class="title">供水类型</span><span>{{housedetail.OfferWater}}</span></p>
  <p><span class="title">供电类型</span><span>{{housedetail.OfferElectricity}}</span></p>
</div>
<div class="row_box">
  <p class="xkz"><span class="title">许可证</span><span class="text"><span v-for="item in housedetail.Licence" class="xkz">{{item.card}}</span></span></p>
</div>

<div class="submit_btn">
  <div class="collect" @click="collectFn"><i :class="{active:iscollect}"></i><p>收藏</p></div>
  <div class="submit"><a href="javascript:" @click="callnow">咨询经纪人</a></div>
</div>
<div v-if="showcall">
  <div class="masks"  @click="cancel()"></div>
    <div class="alert_box">
        <div class="submit_box">
          <a href="javascript:" class="cancel" @click="cancel()"></a>
          <p class="sub">是否拨打咨询热线？</p>
          <h1>{{textphone}}</h1>

          <a :href="phone" class="submit_btn" @click="appcall">确认拨打</a>
        </div>
    </div>
</div>
</div>


</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"楼盘信息",
      state:this.$store.state,
      housedetail:[],
      iscollect:false,
      showcall:false,
      phone:"javascript:",
      textphone:""
    }
  },
  mounted : function() {

  },
  methods:{
    callnow(){
      this.showcall = true;
    },
    cancel(){
      this.showcall = false
    },
    collectFn(){
      let obj
      let _this = this
      let q = this.$route.query

      if(typeof this.state.user=="undefined"){
        // this.$router.push("/login?back=newhouseinfo?id="+q.id)
        this.$lg.applogin("newhouseinfo?id="+q.id)

        return
      }
      if(this.iscollect){
        obj= this.$api.HouseCancelStoreup({"ReferenceId":q.id})

      }else{
        obj= this.$api.HousesStoreup({"ReferenceId":q.id})
      }
      this.$http(obj)
      .then((data) => {
        if(data.data.ResultCode==100000){
          let msg
          if(_this.iscollect){
            msg = "取消收藏成功"
            _this.iscollect = false
          }else{
            msg = "收藏成功"
            _this.iscollect = true
          }
          _this.$msg.alert(msg)
        }
      });
    },

    gethousedetail(){
      let _this = this
      let q = this.$route.query
      this.$http(this.$api.HousesDetailsInfo({"ID":q.id}))
      .then((data) => {
         this.housedetail = data.data.ResultData
         this.textphone = data.data.ResultData.BrokerPhone
         //this.phone = "tel:"+data.data.ResultData.BrokerPhone
         console.log(this.housedetail)

      });
    },
    appcall(){
      if(this.$store.state.isapp=='android'){
        this.phone = "javascript:"
        android.callPhone(this.textphone);
      }else if(this.$store.state.isapp=='ios'){
        this.phone = "javascript:"
        window.webkit.messageHandlers.Method.postMessage({ "type": "callPhone","phone":this.textphone});
      }else{
        this.phone = "tel:"+this.textphone
      }
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.gethousedetail();


  },
  components:{
    heads,

  }
}
</script>
<style lang="scss" scoped>
.row_box{box-sizing:border-box;background:#fff;margin-top:rem(10);}
.row_box p{display:flex;border-bottom:1px solid #d8d8d8;min-height:rem(45);line-height:rem(45);padding:0 rem(15);box-sizing:border-box;}
.row_box span.title{width:30%;color:#888;}
.row_box span.text{line-height:normal;padding-top:rem(10);height:rem(45);}
.row_box p.xkz{height:auto;}
.row_box p.xkz span{display:block;}
.row_box p.xkz span.text{height:auto;padding-bottom:rem(10);}
.submit_btn{overflow:hidden;display:flex;height:1.25rem; margin-top:rem(10);}
.submit_btn .collect{width:40%; background:#fff;text-align:center;}
.submit_btn .collect i{width:rem(20);height:rem(20);@include bg("/static/img/house/xx.png");margin:auto;display:block;margin-top:rem(5);}
.submit_btn .collect i.active{@include bg("/static/img/house/xx2.png")}
.submit_btn .collect p{color:#888;margin-top::rem(3)}
.submit_btn .submit{background:#de3031;}
.submit_btn .submit a{display:block; line-height:1.25rem;color:#fff; font-size:0.45rem;text-align:center;}

.slideWarp2 img{height:auto;}
.swiper-pagination-fraction{color:#fff;}
.masks{ width:100%; height:100%; background:rgba(0,0,0,0.5); position:fixed; left:0; top:0; z-index:1000;}
.alert_box{width:100%;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center; position:fixed;top: 0;left:0;z-index: 1001;}
.alert_box .submit_box{width:70%; margin:auto; background-color:#fff;padding:rem(15);border-radius:rem(8);position:relative;}
.alert_box .submit_box a.cancel{position:absolute;width:rem(15);height:rem(15);display:block; @include bg("/static/img/my/cancel.png");right:rem(10); top:rem(10);}
.alert_box .submit_box h1{text-align:center; font-size:0.6rem; font-weight:normal; margin-top:rem(10);}
.alert_box .submit_box input{height:rem(45); border-radius:0.125rem; outline: none; border:1px solid #d8d8d8; margin-top:rem(10); padding:0 rem(15); box-sizing:border-box; width:100%;}
.alert_box .submit_box .submit_btn{height:rem(45);line-height:rem(45);font-size:0.4rem; color:#fff; text-align:center;background-color:#de3031;display:block; margin-top:rem(10);border-radius:rem(5);}
.alert_box .submit_box p.subred{color:#de3031;text-align:center; margin-top:rem(5)}
.alert_box .submit_box p.sub{color:#888;text-align:center; margin-top:rem(10)}
</style>