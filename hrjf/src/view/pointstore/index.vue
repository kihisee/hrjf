<template>
<div class="containerNav">
 <heads :title="title"  textlink="/introduction"></heads>
    <div class="pointStoreList">
      <div class="topimg">
            <p class="award" @click="gotojilu()">领取记录</p>
            <div class="neimg">
              <img :src="Portrait" />
            </div>
            <p class="personname"><span>{{touxiangx}}</span>  </p>
      </div>

      <div class="lizi">

         <swiper :options="swiperOption" class="inul"    @touchstart.native='touchStart'        @touchmove.native='touchMove'       @touchend.native='touchEnd'>
       <!--  <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
        <router-link :to="'/activity?title='+slide.Title+'&link='+slide.Link" v-if="!isWeiXin">
          <img :src="slide.Url" alt="">
          </router-link>
          <a :href="slide.Link" v-else>
            <img :src="slide.Url" alt="">
          </a>
        </swiper-slide> -->
          <swiper-slide class="putong" :class="huyuanname"  ref="first">


              <div class="contentli" @click="gotoexplain()">
                  <div class="topspan">
                      <span class="detail">等级说明</span>
                  </div>
                  <p class="member">{{bannerList.Level}}</p>
                  <p class="arrive">当前等级</p>
                  <div class="botdetails">
                    <p class="botdleft">{{logindatain.CardNo}}</p>
                    <p class="botdright">使用金服的第{{logindatain.UseDay}}天<span></span></p>
                  </div>
              </div>

          </swiper-slide>
          <swiper-slide  class="putong" :class="nextname">
          <div class="contentli"  @click="gotoexplain()">
                  <div class="topspan">
                      <span class="detail">等级说明</span>
                  </div>
                  <p class="member">{{bannerList.NextLevel}}</p>
                  <p class="arrive">你还未达到此级别</p>
                  <div class="botdetails">
                    <p class="botdleft">{{logindatain.CardNo}}</p>
                    <p class="botdright">使用金服的第{{logindatain.UseDay}}天<span></span></p>
                  </div>
              </div>
          </swiper-slide>
<!--           <div class="swiper-button-prev" slot="button-prev"  @click="gotochange()"></div>
          <div class="swiper-button-next" slot="button-next" @click="gotochange()"></div> -->
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>

      </div>
      <div class="iscrollcss">
            <div class="jiantou" v-html="dangprev" :class="{nonetip:dangprevtop}" v-if="dangprevtop"></div>
            <div class="jiantou" v-else>再投资<span>{{bannerList.NeedPay}}</span>元固定理财即可升级</div>
      </div>
    </div>
    <div class="pointStoreList" style="margin:0.25rem 0 0rem;padding-bottom:2rem">
      <div class="quanyi">
        <div class="qytop">
          <p>{{kaname}}卡·会员权益</p>
          <span @click="gotoquanyi()">权益详情>></span>
        </div>

        <ol class="quanyiol">
          <li v-for="(item,index) in huiyuanlist" @click="goPonup(item)">
            <p class="imgol">
              <img v-bind:src="'static/img/pointstore/tubiao'+(index+1)+'.png'">
              <span v-if="item.CanDraw"></span>
            </p>
            <p class="qyolr">
                <span class="gray">{{item.GiftBagName}}</span>
                <span class="bor"  v-for="items in item.GiftBagDesc">{{items}}</span>
            </p>
          </li>
        </ol>
      </div>
    </div>

    <div class="Popup" v-show="Popup">
        <p class="Popuptop">恭喜您获得{{GiftBagName}}</p>
        <p class="scomoney">{{GiftBagDesc}}</p>
        <p class="jixu">继续升级即可获得更多礼包，享受更多权益</p>
        <p class="Iknow" @click="Iknow()">我知道了</p>
    </div>

    <div class="grayop" v-show="Popup"></div>

  </div>
</template>

<script>
import globlenav from '../../components/nav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '会员俱乐部',
      state:this.$store.state,
      pointWidth:50,
      points:[],
      activitys:[],
      isWeiXin:false,

      Portrait:"static/img/pointstore/rentou.png",
      isShow:false,

      bannerList:"",



       swiperOption: {
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: false,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
         observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
      },

        logindatain:'',

        huyuanname:'',
        nextname:'',

        kaname:"",

        huiyuanlist:[],

        huiyuanlistnow:[],
        huiyuanlistnext:[],

        huiyuanleval:0,


      startX:0,//开始触摸的位置
      moveX:0,//滑动时的位置
      endX:0,//结束触摸的位置
      disX:0,//移动距离

      Popup:false,

      GiftBagDesc:'',
      GiftBagName:'',

      touxiangx:'',

      dangprev:'',
      dangprevtop:false,
    }
  },
  methods:{
    store(index){
      this.$store.commit("storedetail",this.points[index])
      this.$router.push('/storedetail')
    },


    getuserphoto(){
      let _this =this
      if(typeof this.$store.state.user=="undefined"){
        return
    }

     _this.$http(_this.$api.GetPortrait({}))
    .then((data) => {
       if(data.data.ResultData.Portrait!=""){
        _this.Portrait = data.data.ResultData.Portrait

       }
      });
    },

      gotoexplain(){
        this.$router.push('/levalexplain')
      },

      Iknow(){
        let _this=this
        _this.Popup=false
        setTimeout(function(){
           _this.$router.go(0)
        },0)


      },

      goPonup(item){
        console.log(item);
        let _this=this;
        if(item.CanDraw){
        this.$http(this.$api.GiftBagDraw({GiftBagType:item.GiftBagType}))
        .then((data) => {
          console.log(data)
          _this.Popup=true;
          _this.GiftBagDesc=data.data.ResultData[0].GiftBagDesc[0];
          _this.GiftBagName=data.data.ResultData[0].GiftBagName;
        });
        }
      },

      gotochange(){
        let _this =this
        if(_this.huiyuanleval ==_this.logindatain.Level){
            _this.huiyuanleval+=1
              _this.kaname=_this.bannerList.NextLevel.slice(0,2)
              this.$http(this.$api.GiftBagList({level:_this.logindatain.Level+1}))
              .then((data) => {
                 _this.huiyuanlist=data.data.ResultData;
              });
        }else{
             _this.huiyuanleval-=1
            _this.kaname=_this.bannerList.Level.slice(0,2)
             this.$http(this.$api.GiftBagList({level:_this.logindatain.Level}))
              .then((data) => {
                 _this.huiyuanlist=data.data.ResultData;
              });
        }
      },
      gotoquanyi(){
        this.$router.push('/member')
      },


    touchEnd:function(ev){
      ev = ev || event;
      let _this=this
                        ev.preventDefault();

                        if(ev.changedTouches.length == 1) {
                            let endX = ev.changedTouches[0].clientX;
                             this.disX = endX-this.startX;
                       }

                       if(Math.abs(this.disX)>=50){
                         if(document.querySelector(".swiper-slide").className=="putong swiper-slide swiper-slide-prev"){

                           _this.huiyuanlist=_this.huiyuanlistnow
                           _this.kaname=_this.bannerList.Level.slice(0,2)
                         }else if(document.querySelector(".swiper-slide").className=="putong swiper-slide swiper-slide-active"){
                            _this.huiyuanlist=_this.huiyuanlistnext
                            _this.kaname=_this.bannerList.NextLevel.slice(0,2)
                         }

                        setTimeout(function(){

                          if(document.querySelectorAll(".putong")[0].getAttribute("onswiper")){
                              document.querySelectorAll(".putong")[0].setAttribute('onswiper','')


                          }else{

                             document.querySelectorAll(".putong")[0].setAttribute('onswiper','yes')
                          }

                          for(let i=0;i<document.querySelector(".swiper-slide").className.split(" ").length;i++){
                            //if(=="swiper-slide-active"){}
                            if(document.querySelector(".swiper-slide").className.split(" ")[i]=="swiper-slide-active"){
                              _this.huiyuanlist=_this.huiyuanlistnow
                              _this.kaname=_this.bannerList.Level.slice(0,2)
                            }else{
                              _this.huiyuanlist=_this.huiyuanlistnext
                            _this.kaname=_this.bannerList.NextLevel.slice(0,2)
                            }
                          }

                        },0)

                       }

    },

     touchStart:function(ev) {
         ev = ev || event;
         ev.preventDefault();
            if(ev.touches.length == 1) {    //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                this.startX = ev.touches[0].clientX; // 记录开始位置
         }
      },
     touchMove:function(ev){
        ev = ev || event;
            ev.preventDefault();
           if(ev.touches.length == 1) {
             //滑动时距离浏览器左侧的距离
                this.moveX = ev.touches[0].clientX;

                //实时的滑动的距离-起始位置=实时移动的位置
                this.disX = this.moveX-this.startX;
               if(this.disX<0 || this.disX == 0) {

            }else if(this.disX>0){


               }
             }
    },



    gotojilu(){
      this.$router.push("/memberdetail")
    }

  },
  created:function(){
    let _this =this
    this.getuserphoto();
      this.$http(this.$api.DiscoverLoginInfo({}))
      .then((data) => {
         _this.logindatain=data.data.ResultData
         console.log(_this.logindatain)

         if(_this.logindatain.Name=='未实名'){
                _this.touxiangx=_this.logindatain.Mobile;
         }else{
                _this.touxiangx=_this.logindatain.Name;
         }
         _this.huiyuanleval=_this.logindatain.Level

          this.$http(this.$api.GiftBagList({level:_this.logindatain.Level}))
        .then((data) => {
          console.log(data)
           _this.huiyuanlist=data.data.ResultData;

           console.log(_this.huiyuanlist)

           _this.huiyuanlistnow=data.data.ResultData;
        });


         this.$http(this.$api.GiftBagList({level:_this.logindatain.Level+1}))
        .then((data) => {
          console.log(data)
           _this.huiyuanlistnext=data.data.ResultData;
        });
      });

       this.$http(this.$api.LevelUpNeedPay({}))
      .then((data) => {
        _this.bannerList=data.data.ResultData

        console.log(_this.bannerList)

         _this.kaname=_this.bannerList.Level.slice(0,2)
         if(_this.bannerList.Level=="普通会员"){
          _this.huyuanname="putong"
         }else if(_this.bannerList.Level=="白银会员"){
            _this.huyuanname="baiying"
            console.log("baiying")
         }else if(_this.bannerList.Level=="黄金会员"){
            _this.huyuanname="huangjing"
         }else if(_this.bannerList.Level=="铂金会员"){
            _this.huyuanname="bojing"
         }else if(_this.bannerList.Level=="白钻会员"){
            _this.huyuanname="baizuan"
         }else if(_this.bannerList.Level=="黑钻会员"){
            _this.huyuanname="blackzuan swiper-no-swiping"
         }

         if(_this.bannerList.NextLevel=="普通会员"){
          _this.nextname="putong"
         }else if(_this.bannerList.NextLevel=="白银会员"){
            _this.nextname="baiyin"
         }else if(_this.bannerList.NextLevel=="黄金会员"){
            _this.nextname="huangjing"
         }else if(_this.bannerList.NextLevel=="铂金会员"){
            _this.nextname="bojing"
         }else if(_this.bannerList.NextLevel=="白钻会员"){
            _this.nextname="baizuan"
         }else if(_this.bannerList.NextLevel=="黑钻会员"){
            _this.nextname="blackzuan"
         }else if(_this.bannerList.NextLevel=="已满级"){
            _this.nextname="none"
            _this.dangprev="您当前已是已是最高等级会员"
            _this.dangprevtop=true
         }


      });

  },
  components:{
    swiper,
    swiperSlide,
    globlenav,
    heads
  }
}
</script>
<style lang="scss" scoped>
.pointStoreList{background:#fff;overflow:hidden; width:100%;}
.pointStoreList h1{ padding:0 0.375rem; box-sizing:border-box;height:1rem; line-height:1rem; position:relative;}
.pointStoreList h1 a span{border-left:0.075rem solid #ffbb2a;color:#ffbb2a;font-size:0.4rem; padding-left:0.25rem; }
.pointStoreList h2{ padding:0 0.375rem; box-sizing:border-box;height:1rem; line-height:1rem;position:relative;}
.pointStoreList h2 a span{border-left:0.075rem solid #0006fd;color:#0006fd;font-size:0.4rem; padding-left:0.25rem; }
.pointStoreList h1 i.grayright,.pointStoreList h2 i.grayright{width:0.45rem; height:0.5rem;display:block;background-size: 50%; position:absolute; top:0.25rem;right:0; position:absolute;top: 0.275rem; right:0;}

.containerNav{padding-bottom:0;}

.pointStoreList h1 a,.pointStoreList h2 a{display:block;}
.pointStoreList .inul{margin-right:0.375rem;padding-bottom:0.375rem;overflow:hidden;}
.pointStoreList .inul .putong{width:8rem;background:none; float:left; }
.pointStoreList .inul .none{width:8rem;background:none; float:left; }

.pointStoreList .inul .putong{background:url(../../../static/img/pointstore/putong.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .baiying{background:url(../../../static/img/pointstore/baiyin.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .baizuan{background:url(../../../static/img/pointstore/baizuan.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .blackzuan{background:url(../../../static/img/pointstore/blackjing.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .bojing{background:url(../../../static/img/pointstore/bojing.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .huangjing{background:url(../../../static/img/pointstore/huangjing.png) no-repeat center top;background-size:100%;min-height:rem(220)}
.pointStoreList .inul .putong.active{transform:translateX(0) scale(1.0);  opacity: 1;}
.pointStoreList .inul .putong .contentli{height:rem(120);width:90%;margin:rem(15) auto;}
.pointStoreList .inul .putong .contentli .topspan{height:rem(15);width:100%;overflow:hidden;}
.pointStoreList .inul .putong .contentli .topspan .detail{height:rem(15);line-height:rem(15);width:rem(65);background:#fff;color:#9f884f;text-align:center;border-radius:rem(10);padding:0 rem(2);display:block;float:right;}
.pointStoreList .inul .putong .contentli .member{font-size:rem(20);color:#fff;font-weight:bold;text-shadow:rem(2) rem(2) rem(4) #bbac8b;clear: both;margin-top: rem(-10)}
.pointStoreList .inul .putong .contentli .arrive{font-size:rem(12);color:#fff;padding-top:rem(3)}
.pointStoreList .inul .putong .contentli .botdetails{padding-top:rem(90);color:#fff;overflow:hidden;}
.pointStoreList .inul .putong .contentli .botdetails .botdleft{float:left;font-size:rem(16);width:40%;}
.pointStoreList .inul .putong .contentli .botdetails .botdleft span{font-size:rem(14)}
.pointStoreList .inul .putong .contentli .botdetails .botdright{float:right;width:60%;text-align:right;font-size:rem(14);}
.pointStoreList .inul .putong .contentli .botdetails .botdright span{ width: 0;height: 0; border-top:5px solid transparent; border-left: 10px solid #fff; border-bottom: 5px solid transparent;display:block;float:right;margin:rem(5) 0 0 rem(5);}



.pointStoreList .activitysbanner{padding:0 0.375rem; box-sizing:border-box;margin-bottom:0.375rem; border-radius:0.125rem;overflow:hidden; }
.pointStoreList .activitysbanner a{display:block}
.pointStoreList .activitysbanner img{ height:2.5rem; }
.pointStoreList .activitysmreo{height:0.75rem; line-height:0.75rem; text-align:center;margin-bottom:0.375rem}
.pointStoreList .activitysmreo a{font-size:0.4rem; display:block; color:#555}
.pointStoreList .activitysbanner .activity_box{position:relative; width:100%; height:100%;}
.pointStoreList .activitysbanner .bg{position:absolute; top:0;left:0;background:rgba(0,0,0,0.5);z-index:1; width:100%; height:100%}
.pointStoreList .activitysbanner .icon{position:absolute; top:0.375rem;left:0.75rem;z-index:2;background-size: 80%; width:3.0rem; height:2.1rem}


.quanyi{}
.quanyi .qytop{width:95%;margin:rem(20) auto;position:relative;}
.quanyi .qytop p{width:40%;margin:rem(10) auto;height:rem(30);line-height:rem(30);text-align:center;background:#ecbd4c;color:#fff;border-radius:rem(15);font-size:rem(16)}
.quanyi .qytop span{position: absolute;top:rem(10);right:rem(5);width:rem(90);color:#798ba3;font-size:rem(12);text-align:right;display:block;}

.quanyi .quanyiol{width:90%;margin:rem(0) auto;padding:rem(10) 0;overflow:hidden;}
.quanyi .quanyiol li{float:left;width:48%;margin:rem(10) rem(2);min-height:rem(70)}
.quanyi .quanyiol li .imgol{width:45%;float:left;text-align:center;position:relative;}
.quanyi .quanyiol li .imgol img{width:80%;}
.quanyi .quanyiol li .imgol span{position:absolute;top:rem(2);right:rem(3);width:rem(8);height:rem(8);border-radius:rem(8);display:block;background:#de3132;}
.quanyi .quanyiol li .qyolr{width:50%;float:right;}
.quanyi .quanyiol li .qyolr span{display:block;display: block;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.quanyi .quanyiol li .qyolr span.gray{color:#798ba3;font-size:rem(13);margin-bottom:rem(3);}
.quanyi .quanyiol li .qyolr span.bor{color:#929292;border-left:2px solid #ecbd4c;margin:rem(3) 0;text-indent:rem(3);font-size:rem(12);}

.topimg{width:90%;margin:rem(15) auto rem(10);}
.topimg .neimg{height:rem(50);width:rem(50);margin:0 auto;}
.topimg .neimg img{ border-radius:50%;}
.topimg .personname{text-align:center;color:#747474;padding:rem(5) 0 0;}
.topimg .personname span{font-size:rem(16)}
.topimg .award{text-align:center;color:#8593a1;border:rem(1) solid #dedede;border-radius:rem(7);line-height:rem(18);display:block;width:rem(65);float:right;margin-top:rem(-5)}


.lizi{width:90%;margin:0 auto;height:rem(220)}
.swiper-button-next,.swiper-button-prev{opacity:0.4;background:none;}
.swiper-button-prev:after {
  border: rem(20) solid transparent;
  border-right: rem(20) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  content: ' '
}

.swiper-button-next:after {
  border: rem(20) solid transparent;
  border-left: rem(20) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  content: ' '
}


.iscrollcss{width:90%;margin:rem(5) auto rem(15);overflow:hidden;}
.iscrollcss .jiantou{width:90%;margin:0 auto;height:rem(35);line-height:rem(35);text-align:center;background:url(../../../static/img/pointstore/huangqt.png) no-repeat rem(30) center #e7e7e7;background-size:3%;border-radius:rem(20);color:#8593a1;font-size:rem(15)}
.iscrollcss .jiantou span{color:#de3031;}

.Popup{width:rem(340);height:rem(360);position: fixed;top:50%;left:50%;margin:rem(-180) 0 0 rem(-170);background:url(../../../static/img/pointstore/tqianc.png) no-repeat center top;z-index:999;background-size:100%;text-align:center;}
.grayop{width:100%;height:100%;background:#000;opacity:0.3;z-index:99;position:fixed;top:0;left:0;}
.Popup .Popuptop{margin:rem(185) 0 rem(5);color:#fff;font-weight:bold;font-size:rem(20)}
.Popup .scomoney{color:#fff;font-size:rem(16);margin:rem(5) 0 rem(20)}
.Popup .jixu{color:#949494;font-size:rem(14);margin:rem(25) 0 rem(5)}
.Popup .Iknow{width:rem(130);margin:rem(15) auto 0;height:rem(40);line-height:rem(40);color:#fff;font-size:rem(16);background:#de3031;border-radius:rem(5)}

.iscrollcss .nonetip{background:#e7e7e7;width:70%;padding:rem(0) rem(10);}
</style>