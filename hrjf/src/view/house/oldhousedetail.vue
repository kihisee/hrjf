<template>
<div class="container">
  <heads :title="title"></heads>
  <div class="slideWarp">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in housedetail.HouseShowPictures" :key="housedetail.HouseShowPictures[slide]">
              <a href="javascript:" @click="showbigimg">
                <img :src="slide" alt="">
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
  <div class="main_box">
    <div class="title">{{housedetail.HouseName}}</div>
    <p class="tig"><span class="blue" v-if="PromotionalLabels.length>0">{{PromotionalLabels[0]}}</span><span class="green" v-if="PromotionalLabels.length>=2">{{PromotionalLabels[1]}}</span><span class="orange" v-if="PromotionalLabels.length>=3">{{PromotionalLabels[2]}}</span></p>
    <div class="big_box">
      <div><span class="sub">售价</span><p>{{housedetail.HouseSalePrice}}</p></div>
      <div><span class="sub">户型</span><p>{{housedetail.HouseType}}</p></div>
      <div><span class="sub">建筑面积</span><p>{{housedetail.HouseCoveredArea}}</p></div>
    </div>
    <div class="detail_box">
      <span>单价：{{housedetail.HouseUnitPrice}}</span>
      <span>楼型：{{housedetail.HouseStructure}}</span>
      <span>朝向：{{housedetail.HouseOrientation}}</span>
      <span>用途：{{housedetail.HousePurpose}}</span>
      <span>楼层：{{housedetail.HouseFloorDesc}}</span>
      <span>年代：{{housedetail.HouseAge}}</span>
      <span>装修：{{housedetail.HouseDecoration}}</span>
      <span>权属：{{housedetail.HouseOwnership}}</span>
      <span class="add">地址：{{housedetail.HouseLocation}}</span>
    </div>
  </div>

  <div class="main_box" style="margin-top:0.25rem">
  <div class="htmlbox">
    <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">房源介绍</p>
          <span class="huaright"></span>
        </div>
    <div class="htmlcont" v-html="housedetail.HouseDescription"></div>
  </div>
</div>
<div v-if="showImg">
<div class="masks"></div>
<div class="alert_box" @click="cancelbigimg()">
    <div class="slideWarp2">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in housedetail.HouseShowPictures" :key="housedetail.HouseShowPictures[slide]">
              <a href="javascript:" @click="cancelbigimg()">
                <img :src="slide" alt="">
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</div>
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
          <h1>{{housedetail.AgentContactPhone}}</h1>

          <a :href="phone" class="submit_btn2"  @click="appcall">确认拨打</a>
        </div>
    </div>
</div>
</div>



</template>

<script>
import heads from '../../components/head'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      title:"个人房源",
      state:this.$store.state,
      housedetail:[],
      PromotionalLabels:[],
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,
        paginationType:'fraction'
      },
      iscollect:false,
      showcall:false,
      phone:"javascript:",
      showImg:false,
    }
  },
  mounted : function() {

  },
  methods:{
    collectFn(){
      let obj
      let _this = this
      let q = this.$route.query

      if(typeof this.state.user=="undefined"){
        //this.$router.push("/login?back=oldhousedetail?id="+q.id)
        this.$lg.applogin("oldhousedetail?id="+q.id)
        return
      }
      if(this.iscollect){
        obj= this.$api.CancelHouseStoreup({"ReferenceId":q.id})

      }else{
        obj= this.$api.StoreupHouse({"ReferenceId":q.id})
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
    callnow(){
      this.showcall = true;
    },
    cancel(){
      this.showcall = false
    },
    showbigimg() {
        this.showImg = true;
    },
    cancelbigimg(){
        this.showImg = false;
    },
    appcall(){
      if(this.$store.state.isapp=='android'){
        this.phone = "javascript:"
        android.callPhone(this.housedetail.AgentContactPhone);
      }else if(this.$store.state.isapp=='ios'){
        this.phone = "javascript:"
        window.webkit.messageHandlers.Method.postMessage({ "type": "callPhone","phone":this.housedetail.AgentContactPhone});
      }else{
        this.phone = "tel:"+this.housedetail.BrokerPhone
      }
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.$http(this.$api.GetHouseDetail({"HouseId":q.id}))
      .then((data) => {
        _this.housedetail = data.data.ResultData
        _this.PromotionalLabels = data.data.ResultData.PromotionalLabels
        if(_this.housedetail.StoreupId>0){
          _this.iscollect = true
        }
        console.log(this.housedetail)
        //_this.phone = "tel:"+_this.housedetail.AgentContactPhone
      });

  },
  components:{
    heads,
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="scss" scoped>
.container{padding-bottom:1.25rem;}
.main_box{background:#fff;padding:rem(15);box-sizing:border-box;overflow:hidden;}
.main_box .title{font-size:0.5rem;}
.main_box .tig{overflow:hidden;margin-top:rem(10)}
.main_box .tig span{float:left;margin-right:rem(5); width:auto; padding:rem(2) rem(5);border-radius:rem(5);}
.main_box .tig span.blue{background:#dcf7ff; color:#19b9e7;}
.main_box .tig span.green{background:#e1fbf2; color:#35bf90;}
.main_box .tig span.orange{background:#fff3eb; color:#ff7843;}
.main_box .big_box{display:flex;padding:rem(15) 0; border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8;text-align:center; color:#666; margin-top:rem(10);}
.main_box .big_box p{font-size:0.45rem; color:#de3031;margin-top:rem(5)}
.main_box .big_box div:nth-child(1),.main_box .big_box div:nth-child(2){border-right:1px solid #d8d8d8;}
.main_box .detail_box{display:flex;flex-wrap:wrap; width:90%;margin:auto;margin-top:rem(10);}
.main_box .detail_box span{width:50%;color:#666;margin-top:rem(5);}
.main_box .detail_box span.add{width:100%;}
.htmlbox{background-color:#fff;box-sizing:border-box; overflow:hidden;}
.htmlbox h1{text-align:center;}
.htmlbox h1 span{padding:0 rem(20);border-left:rem(5) solid #fd6f3b;border-right:rem(5) solid #fd6f3b; font-size:0.45rem;font-weight:normal;}
.submit_btn{overflow:hidden;display:flex;height:1.25rem; margin-top:rem(10); position:fixed;bottom: 0;left:0;}
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
.alert_box .submit_box .submit_btn2{height:rem(45);line-height:rem(45);font-size:0.4rem; color:#fff; text-align:center;background-color:#de3031;display:block; margin-top:rem(10);border-radius:rem(5);}
.alert_box .submit_box p.subred{color:#de3031;text-align:center; margin-top:rem(5)}
.alert_box .submit_box p.sub{color:#888;text-align:center; margin-top:rem(10)}


.toplist{width:rem(115);margin:0 auto rem(10);height:rem(30);text-align:center;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;}
.toplist .midlleword{width:rem(75);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;}
/* .lodhouse_anv_box{border-bottom:1px solid #d8d8d8; padding:rem(15) 0;background:#fff;display:flex;text-align:center;}
.lodhouse_anv_box a{color:#666;font-size:0.4rem;overflow:hidden;}

.lodhouse_anv_box a:after{content:"";display:inline-block; width: 0;height: 0;border-width:rem(5);border-style: solid;border-color: #d1d1d1 transparent transparent transparent; margin-left:rem(10); vertical-align:middle;}
.lodhouse_anv_box a.active:after{border-color: #de3031 transparent transparent transparent;}
.hothouse_box{background:#fff;padding:rem(15);box-sizing:border-box;margin-top:rem(10)}
.hothouse_box h1{padding-bottom:rem(10);border-bottom:1px solid #d8d8d8;}
.hothouse_box h1 span{ padding-left:rem(5);border-left:rem(5) solid #fe6839; font-size:0.45rem;font-weight:normal;}

.hothouse_box ul{overflow:hidden;padding-bottom:rem(15);}
.hothouse_box li{overflow:hidden;padding:rem(15) 0;box-sizing:border-box;border-bottom:1px solid #d8d8d8;}
.hothouse_box li .img{width:rem(120);height:rem(100); float:left;}
.hothouse_box li .img img{border-radius:rem(5);width:100%;height:100%;}
.hothouse_box li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.hothouse_box li .main p.title{font-size:0.4rem;}
.hothouse_box li .main p.add{color:#666; font-size:0.3rem;margin-top:rem(5);overflow:hidden;font-size:0.35rem;}
.hothouse_box li .main p.add span{float:right;color:#de3031;width:auto;}
.hothouse_box li .main p.tig{overflow:hidden;margin-top:rem(5);}
.hothouse_box li .main p.tig span{float:left;margin-right:rem(5); width:auto; padding:rem(2) rem(5);border-radius:rem(5);}
.hothouse_box li .main p.tig span.blue{background:#dcf7ff; color:#19b9e7;}
.hothouse_box li .main p.tig span.green{background:#e1fbf2; color:#35bf90;}
.hothouse_box li .main p.tig span.orange{background:#fff3eb; color:#ff7843;}
.hothouse_box li .main p.money{margin-top::rem(5);color:#666;}
.hothouse_box li .main p.money span{font-size:0.4rem;color:#de3031;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto; color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;}
.nav_box{background:#fff;}
.nav_box .flexbox{display:flex;box-sizing:border-box; padding-bottom:rem(15);flex-wrap:wrap;}
.nav_box li{width:33%; margin-top:rem(10);}
.nav_box li .list{height:rem(35); position:relative;text-align:center; width:90%; margin:auto;}
.nav_box li input[type="radio"]{ margin-top:0.21rem;margin-right:0.375rem;opacity: 0;position: absolute; left: 0; top: 0;}
.nav_box li .list span{display:block; line-height:rem(35); border:1px solid #d8d8d8; text-align:center;width:100%; border-radius:rem(30);}
.nav_box li.active .list span{color:#de3031;border:1px solid #de3031;}
.customMoney{border-top:1px solid #d8d8d8; padding:0 rem(15); box-sizing:border-box;}
.customMoney .title{margin-top:rem(10);font-size:0.45rem;}
.customMoney .input_flex{overflow:hidden;display:flex;box-sizing:border-box; margin-top::rem(15);}
.customMoney .input_flex .inputbox{width:45%;height:rem(35); position:relative;}
.customMoney .input_flex .inputbox input{width:100%;height:rem(35);border:1px solid #d8d8d8; padding-left:rem(10);padding-right:rem(30);box-sizing:border-box;}
.customMoney .input_flex .inputbox span{position:absolute;right:rem(10);top:rem(8);width:auto;}
.customMoney .input_flex .line{display:flex;align-items:center;justify-content:center; height:rem(35);width:5%;margin:0 rem(10)}
.customMoney .input_flex .line span{height:rem(1);background:#ccc;}
.customMoney .btn{ width:rem(150); margin:auto;margin-top:rem(20); padding-bottom:rem(20);}
.customMoney .btn a{display:block;line-height:rem(35); border:1px solid #de3031; text-align:center;width:rem(150); border-radius:rem(30); font-size:0.4rem; color:#de3031;}
.navthree_box .title{ padding:rem(15) rem(15) 0 rem(15); box-sizing:border-box; font-size:0.4rem;} */
/* .typebox{background-color:#fff; padding:rem(15); box-sizing:border-box; overflow:hidden; margin-top:rem(20);}
.nomargin div:nth-child(1){margin-top:0;}
.typebox .title{ padding-bottom:rem(15);border-bottom:1px solid #d8d8d8}
.typebox .title span{border-left:rem(5) solid #fd6f3b; font-size:0.45rem; padding-left:rem(15);}
.list{overflow:hidden;padding-bottom:rem(15);border-bottom:1px solid #d8d8d8;}
.list li{overflow:hidden; border:1px solid #d8d8d8;padding:rem(15);box-sizing:border-box; margin-top:rem(15);}
.list li .img{width:rem(60);height:rem(60);  border-radius:50%;float:left;}
.list li .img img{border-radius:50%;}
.list li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.list li .main p{margin-bottom:rem(5);}
.list li .main p.subtitle{font-size:0.4rem;}
.list li .main p.red{color:#de3132;}
.list li .main p.sub{color:#888;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto;margin-top:rem(20); color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;} */

</style>