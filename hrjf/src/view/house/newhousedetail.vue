<template>
<div class="container">
  <heads :title="title"></heads>
  <div class="slideWarp">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in banner" :key="banner[slide]">
              <a href="javascript:" @click="showbigimg">
                <img :src="slide" alt="">
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
  <div class="main_box">
    <div class="title">{{housedetail.Name}}</div>
    <div class="tig"><span class="blue" v-if="tag.length>0">{{tag[0]}}</span><span class="green" v-if="tag.length>=2">{{tag[1]}}</span><span class="orange" v-if="tag.length>=3">{{tag[2]}}</span></div>
    <div class="big_box">
      <div><p>均价：<span>{{housedetail.Price}}</span></p></div>
      <div><p>地址：{{housedetail.HousesAddress}}</p></div>
      <div><p>开盘：{{housedetail.OpenTime}}</p></div>
    </div>
    <div class="hux_box">
      <div class="tag_title">
        <span class="blue tagtitle">在售户型</span>
        <a href="javascript:" @click="linktype">全部户型</a>
      </div>
      <div class="hux_list">
        <ul :style="{width:housetype.length*220/40+'rem'}">
          <li v-for="item in housetype" @click="detail(item.ID)">
            <div class="listmain">
              <p class="titile">{{item.Specification}}<span>{{item.SaleState}}</span></p>
              <p class="sub">建面{{item.Area}} 朝向{{item.Orientation}}</p>
              <p class="money">约{{item.Price}}</p>
              <p class="tag"><span v-for="items in item.Tag">{{items}}</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <div class="housenews_box">
      <div class="tag_title">
        <span class="green tagtitle">楼盘动态</span>
        <router-link :to="'/newhousenews?id='+houseId">查看全部</router-link>
      </div>
      <div class="news">
        <div v-for="item in news">
          <div class="day">{{item.Time}}</div>
          <div class="cont">{{item.Content}}</div>
        </div>
      </div>
    </div>

    <div class="houseinfo_box">
      <div class="tag_title">
        <span class="orange tagtitle">楼盘信息</span>
        <router-link :to="'/newhouseinfo?id='+houseId">查看全部</router-link>
      </div>
      <div class="info">
        <p>开发商：{{housedetail.Developers}}</p>
        <p>最新开盘：{{housedetail.OpenNewTime}}</p>
        <p>交楼时间：{{housedetail.DeliverTime}}</p>
        <p>产权年限：{{housedetail.PeriodInt}}</p>
        <p>许可证：<span>{{housedetail.LicenceCard}}</span></p>
      </div>
    </div>

  </div>



<div v-if="showImg">
<div class="masks"></div>
<div class="alert_box" @click="cancelbigimg()">
    <div class="slideWarp2">
    <swiper :options="swiperOption">
            <swiper-slide v-for="slide in banner" :key="banner[slide]">
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
          <h1>{{housedetail.BrokerPhone}}</h1>

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
      title:"新房楼盘详情",
      state:this.$store.state,
      banner:"",
      housedetail:[],
      tag:[],
      news:[],
      housetype:[],
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
      houseId:""
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
        //this.$router.push("/login?back=newhousedetail?id="+q.id)
        this.$lg.applogin("newhousedetail?id="+q.id)
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
    detail(id){
      let q = this.$route.query
      this.$router.push("/newhousetypedetail?id="+id+"&phone="+this.housedetail.BrokerPhone+"&houseid="+q.id)
    },
    linktype(){
      let q = this.$route.query
      this.$router.push("/newhousetypelist?id="+q.id+"&phone="+this.housedetail.BrokerPhone)
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
        android.callPhone(this.housedetail.BrokerPhone);
      }else if(this.$store.state.isapp=='ios'){
        this.phone = "javascript:"
        window.webkit.messageHandlers.Method.postMessage({ "type": "callPhone","phone":this.housedetail.BrokerPhone});
      }else{
        this.phone = "tel:"+this.housedetail.BrokerPhone
      }
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.houseId = q.id
    this.$http(this.$api.HousesDetails({"ID":q.id}))
      .then((data) => {
        _this.housedetail = data.data.ResultData.Details
        console.log(data.data.ResultData)
        _this.news = data.data.ResultData.News
        _this.housetype = data.data.ResultData.Type
        _this.banner = data.data.ResultData.Details.Imgs
        _this.tag = data.data.ResultData.Details.Tag
        //_this.phone = "tel:"+data.data.ResultData.Details.BrokerPhone
        if(data.data.ResultData.StoreUpID>0){
          _this.iscollect = true;
        }
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
.main_box .big_box{padding:rem(15) 0; border-top:1px solid #d8d8d8;border-bottom:1px solid #d8d8d8; color:#666; margin-top:rem(10);}
.main_box .big_box p{margin-top:rem(5);font-size:0.4rem; }
.main_box .big_box p span{color:#de3031;}

.hux_box{padding-bottom:rem(15);border-bottom:1px solid #d8d8d8;}
.tag_title{overflow:hidden; margin-top:rem(10);}
.tag_title .tagtitle{width:rem(80); height:rem(30);float:left;  display:block;text-align:center;line-height:rem(30);border-radius:rem(5);}
.tag_title .blue{background:#dcf7ff;color:#19b9e7;}
.tag_title .green{background:#e1fbf2; color:#35bf90;}
.tag_title .orange{background:#fff3eb; color:#ff7843;}
.tag_title a{float:right;width:rem(80);margin-top:rem(5); color:#888;}
.tag_title a:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-right:rem(5);margin-top:rem(5); color:#9a9a9a;}
.nav_box{background:#fff;}

.hux_list{overflow:auto;margin-top:rem(10);}
.hux_list ul{width:rem(680);}
.hux_list ul li{float:left;padding:rem(10); border:1px solid #d8d8d8; width:rem(180);margin-right:rem(15);}
.hux_list ul li .titile{font-size:0.4rem;}
.hux_list ul li .titile span{background:#dcf7ff; color:#19b9e7; display:inline-block; width:rem(50);text-align:center;margin-left:rem(20);border-radius:rem(5);font-size:0.35rem;}
.hux_list ul li .sub{color:#888;margin-top:rem(5);}
.hux_list ul li .money{margin-top:rem(5);font-size:0.4rem;color:#de3031;}
.hux_list ul li .tag{display:flex;margin-top:rem(5);}
.hux_list ul li .tag span{width:rem(80);height:rem(30);line-height:rem(30);text-align:center; border:1px solid #d8d8d8;margin-right:rem(10);border-radius:rem(5); color:#888;}

.news{margin-top::rem(10);border-bottom:1px solid #d8d8d8;padding-bottom:rem(15);}
.news .day{font-size:0.4rem;margin-top::rem(10);}
.news .cont{color:#888;margin-top::rem(10);}

.info p{color:#888;margin-top:rem(10);}

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
.alert_box{width:100%;box-sizing:border-box; position:fixed;top: 30%;left:0;z-index: 1001;}
.alert_box .submit_box{width:70%; margin:auto; background-color:#fff;padding:rem(15);border-radius:rem(8);position:relative;}
.alert_box .submit_box a.cancel{position:absolute;width:rem(15);height:rem(15);display:block; @include bg("/static/img/my/cancel.png");right:rem(10); top:rem(10);}
.alert_box .submit_box h1{text-align:center; font-size:0.6rem; font-weight:normal; margin-top:rem(10);}
.alert_box .submit_box input{height:rem(45); border-radius:0.125rem; outline: none; border:1px solid #d8d8d8; margin-top:rem(10); padding:0 rem(15); box-sizing:border-box; width:100%;}
.alert_box .submit_box .submit_btn2{height:rem(45);line-height:rem(45);font-size:0.4rem; color:#fff; text-align:center;background-color:#de3031;display:block; margin-top:rem(10);border-radius:rem(5);}
.alert_box .submit_box p.subred{color:#de3031;text-align:center; margin-top:rem(5)}
.alert_box .submit_box p.sub{color:#888;text-align:center; margin-top:rem(10)}

</style>