<template>
<div class="container">
  <heads :title="title"></heads>
  <div class="slideWarp">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in housedetail.Img" :key="housedetail.Img[slide]">
              <a href="javascript:" @click="showbigimg()">
                <img :src="slide" alt="">
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
  <div class="main_box">
    <div class="title">{{housedetail.Specification}}<span class="tag">{{housedetail.SaleState}}</span><span class="Price">{{housedetail.Price}}</span></div>
    <div class="tig"><span class="blue" v-if="tag.length>0">{{tag[0]}}</span><span class="green" v-if="tag.length>=2">{{tag[1]}}</span><span class="orange" v-if="tag.length>=3">{{tag[2]}}</span></div>
    <div class="detail_box">
      <span>面积：{{housedetail.Area}}</span>
      <!-- <span>物业类型：{{housedetail.HouseStructure}}</span> -->
      <span>朝向：{{housedetail.Orientation}}</span>
      <span>户型结构：{{housedetail.Structure}}</span>
    </div>
  </div>

  <div class="main_box" style="margin-top:0.25rem">
  <div class="htmlbox">
    <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">户型信息</p>
          <span class="huaright"></span>
        </div>
    <div class="htmlcont" v-html="housedetail.Content"></div>
  </div>
</div>
<div v-if="showImg">
<div class="masks"></div>
<div class="alert_box" @click="cancelbigimg()">
    <div class="slideWarp2">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in housedetail.Img" :key="housedetail.Img[slide]">
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
          <h1>{{textphone}}</h1>
          <a :href="phone" class="submit_btn2" @click="appcall">确认拨打</a>
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
      title:"楼盘信息",
      state:this.$store.state,
      housedetail:[],
      tag:[],
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
      textphone:"",
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
        this.$lg.applogin("newhousetypedetail?id="+q.id)
        //this.$router.push("/login?back=newhousetypedetail?id="+q.id)
        return
      }
      if(this.iscollect){
        obj= this.$api.HouseCancelStoreup({"ReferenceId":q.houseid})

      }else{
        obj= this.$api.HousesStoreup({"ReferenceId":q.houseid})
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
    this.textphone = q.phone
    this.$http(this.$api.HousesTypeDetails({"ID":q.id}))
      .then((data) => {
        _this.housedetail = data.data.ResultData.Info
        _this.tag = data.data.ResultData.Info.Tag
        if(data.data.ResultData.StoreUpID>0){
          _this.iscollect = true
        }
        console.log(data.data.ResultData)
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
.main_box .title{font-size:0.5rem; overflow:hidden;}
.main_box .title span.tag{background:#e1fbf2; color:#35bf90; display:inline-block; width:rem(50);text-align:center;margin-left:rem(20);border-radius:rem(5);font-size:0.35rem;}
.main_box .title span.Price{float:right; color:#de3031; font-size:0.50rem; width:auto;}
.main_box .tig{overflow:hidden;margin-top:rem(10)}
.main_box .tig span{float:left;margin-right:rem(5); width:auto; padding:rem(2) rem(5);border-radius:rem(5);}
.main_box .tig span.blue{background:#dcf7ff; color:#19b9e7;}
.main_box .tig span.green{background:#e1fbf2; color:#35bf90;}
.main_box .tig span.orange{background:#fff3eb; color:#ff7843;}
.main_box .big_box{display:flex;padding:rem(15) 0; border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8;text-align:center; color:#666;}
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

</style>