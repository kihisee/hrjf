<template>
  <div class="containerNav">
<!--     <div class="link_head">
      <h1>
          {{title}}
       </h1>
    </div> -->
    <div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
<!--         <router-link :to="'/activity?title='+slide.Title+'&link='+slide.Link" v-if="!isWeiXin">
          <img :src="slide.Url" alt="">
          </router-link> -->
          <a :href="slide.Link+'?inviteTitle='+slide.Title+'&type=1'">
            <img :src="slide.Url" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>

<div class="gonggao">
  <router-link class="imgleft" to="Noticelist">
  </router-link>
    <div class="scorllten">
        <ul  :style="{ top }" :class="{ scrollcontent:isUl }">
              <li v-for="(item,index) in Noticelist" @click="gonoticedetail(index)">{{item.Title}}</li>
      </ul>
  </div>
</div>

<div class="listtu">
  <ul>
    <li v-for="(item, index)  in Activitylist">
      <router-link :to="item.Link">
        <img class="toppic" :src="item.Url">
        <p class="botword">{{item.Title}}</p>
      </router-link>
    </li>

  </ul>

</div>

 <div class="listbig">
    <div class="bigcon">
      <ul>
        <li v-for="(itema, index) in Modules">
            <a :href="itema.Link">
              <p class="bigtop">{{itema.Title}}</p>
              <img :src="itema.Url" />
             </a>
        </li>
      </ul>
    </div>
</div>

<div class="allwhite" v-if="ishotfang">
   <div class="titlewhite">
      <b></b>热门楼盘
    </div>
  <div class="listsco">
          <div class="listdetail">
              <ul>
                  <li v-for="item in HousesList" @click="gotofang(item.ID)">
                  <div class="grayleft"><img :src="item.Img"/></div>

                     <div class="grayleftright">
                      <p class="topbold">{{item.Name}}</p>
                      <p class="botlight">{{item.HousesAddress}}</p>
                       <dl>
                        <dt>{{item.Tag[0]}}</dt>
                        <dd>{{item.Tag[1]}}</dd>
                        <dd>{{item.Tag[2]}}</dd>
                      </dl>
                      <p class="botgray">{{item.Price}} <span> {{item.BuildingSpace}} </span></p>
                    </div>
                  </li>
              </ul>


          </div>

  </div>
  <p class="shouqi" v-html="scheck" @click="lookmore()"></p>
</div>

<div class="allwhite" v-if="ishotbao">
  <div class="titlewhite">
    <b></b>热门保险
  </div>
  <div class="whitebox carlist" v-for="item in cardata" @click="gotodetail(item.Id,item.InsuranceType)">
    <div class="whitetop">
      <img class="wherepic"  :src="item.CarInsurancePicture" />
    </div>
  </div>
  <div class="whitebox"  v-for="item in allData"  @click="gotodetail(item.Id,item.InsuranceType)">
      <div class="whitetop">
          <div class="wtopleft">
            <p class="toptitle">{{item.InsuranceName}}</p>
              <div class="botdetail">
                承保年龄：{{item.InsuredAgePeriod}} | 保障期限：{{item.InsuredPeriod}}
              </div>
          </div>
          <div class="wtopright">
            <img class="wherepic"  :src="item.InsurerLogo" />
          </div>
      </div>
      <div class="whitelist" v-if="item.InsurancePlanTypeList.length">
            <ul :class="{overflow:item.InsurancePlanTypeList[0].PlanTypeItemList.length>3}">
              <li v-for="items in item.InsurancePlanTypeList[0].PlanTypeItemList" >
                <p class="listleft">{{items.InsurancePlanItemName}}</p>
                <p class="listright">{{items.InsurancePayment}}</p>
              </li>
            </ul>
            <ul v-if="item.InsurancePlanTypeList[0].PlanTypeItemList.length>3">
              <li>
                 <p class="listleft">.......</p>
                  <p class="listright">........</p>
              </li>
            </ul>
      </div>
      <div class="howmoney">￥{{item.LeastInsuranceFee}}<span>起</span></div>
  </div>
  <p class="shouqi" v-html="scheck" @click="lookmorebao()"></p>
</div>

<div class="indexbot">
       <ul class="indexbotul">
        <li>
          <div class="ulindiv">
            <p>恒瑞集团旗下平台</p>
            <p>20万人的选择</p>
          </div>
        </li>
        <li>
          <div class="ulindiv">
            <p>中国经济新领军企业</p>
            <p>稳健发展</p>
          </div>
        </li>
      </ul>

      <div class="tipsbot"></div>
    </div>

    <div class="xjh"  v-if="isnone">

       <div class="box" v-if="isnone"><!-- 未登录 -->
          <a href="javascript:">
            <h3>
            <span class="title new_title">新手标</span>
            <!-- <span class="icon new_icon">体验券          </span> -->
            </h3>
            <div class="oldProfit" style="overflow:hidden;">
              <p class="numberSizi"><!-- {{tiyanTender.tender.TenderFee*100}} -->{{(newdata.tender.TenderFee)*100-2}}<span>%+</span>2<span>%</span></p>
              <p class="xjhtext xjhtextgray">预期年化收益率</p>
            <div class="fixe">
            <div class="fixerow">

              <p class="row1text newtext"> <span class="newspan">每人限投<span style="color:#de3031">5万</span>，</span>  <!-- <b class="newb"></b> --> <span  class="newspan">每个新用户<b class="lastb"><span></span>1次</b>机会</span></p>
            </div>

            </div>
              <div class="fixe newtiyanbiaobtn">
                 <div class="fixerow2"><a href="javascript:" class="" @click="xstiyan()"><p class="row2text">立即投资</p></a></div>
              </div>
            </div>
          </a>
      </div>



      <div class="box boxddd"  v-if="isnone"  > <!-- 登录 -->
          <a href="javascript:">
            <h3>
            <span class="title new_title">活期宝</span>
            <span class="icon new_icon">
          </span>
            </h3>
            <div class="oldProfit" style="overflow:hidden;">
              <p class="numberSizi">8<span>.0%-</span>10<span>.0%</span></p>
              <p class="xjhtext xjhtextgray">预期年化收益率</p>
            <div class="fixe">
            <div class="fixerow">

              <p class="row1text newtext"><span class="redspan">随存随取</span>  100元起投  <span class="redspan">第8天起涨息</span></p>
            </div>
            </div>
            <div class="fixe newtiyanbiaobtn">
            <div class="fixerow2"><a href="javascript:" class="" @click="tiyan()"><p class="row2text">立即转入</p></a></div>
            </div>
            </div>
          </a>
      </div>



    </div>
  <globlenav></globlenav>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import globlenav from '../components/nav';
import ls from '../store/lStorage.js'
export default {
  name: 'home',
  data () {
    return {
      title: '恒瑞理财',
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,

      },
      bannerList:"",
      tenderlist:'',
      tiyanTender:{},
      isWeiXin:false,

      checklist:true,

      scheck:"查看更多",
      check:true,

       activeIndex: 0,
      isUl:true,
      scorllhow:5,

      Noticelist:{},
      Activitylist:{},

      isnone:false,

      tiyanword:"",

      tiyanshow:true,

      istender:false,

      newdata:"",
      newdataFee:'',


      Modules:[],
      HousesList:[],

      allData:[],

      apiData:[],
      cardata:[],

      ishotbao:true,
      ishotfang:true,

    }
  },
  methods:{
    tenderdetail(index){
      ls.setItem("tenderdetail",this.tenderlist[index]);
      this.$store.commit("tenderdetail",this.tenderlist[index])
      this.$router.push('/tenderDetail')
    },

   gonoticedetail(index){
    this.$router.push('Noticedetail?id='+index)
   },

    tiyan(){
      this.$router.push("/cqbindex")
    },

    xstiyan(){
       this.$router.push("/tenderdetail?id="+this.newdata.tender.Id+"&TenderActiveType=-1")
    },

     getUrlParam(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            let r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
      },

      lookmore(){
          this.$router.push("/newhouselist")
      },

      lookmorebao(){
          this.$router.push("/insurance")
      },
       gotofang(index){
          this.$router.push("/newhousedetail?id="+index)
      },

      gotodetail(index,InsuranceType){
      let _this=this
     if(InsuranceType==1){
        _this.$router.push('/cardetail?Id='+index)
      }else{
         _this.$router.push('/insurancedetail?Id='+index)
      }

    }


  },
  created:function(){
      let _this = this
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       this.isWeiXin = true;
      }else{
        this.isWeiXin = false;
      }

      this.$http(this.$api.getbanner({}))
          .then((data) => {
            if(data.data.ResultData.List!=""){
              _this.bannerList=data.data.ResultData.List

            }
      });

      this.$http(this.$api.gettenderlist({"Page":1,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List!=""){
          _this.tenderlist=data.data.ResultData.List
        }

      });
      this.$http(this.$api.QueryActiveTenderDetail({}))
          .then((data) => {

            _this.tiyanTender = data.data.ResultData
            _this.tiyanshow=data.data.ResultData.isShow

              //金服头条列表
      this.$http(this.$api.NoticeAndActivity({}))
      .then((data) => {
        let before=[]
        _this.Noticelist=data.data.ResultData.Notice

        before=data.data.ResultData.Activity
        _this.scorllhow=data.data.ResultData.Notice.length-1
        console.log(before)
        for(let c=0;c< before.length;c++){
            let arrurl=before[c].Link.split("/")[3]

            before[c].Link=arrurl
        }

        _this.Activitylist=before



        // if(!_this.tiyanshow){

        //   _this.Activitylist[2].Link="experienceMoney";
        // }
      });
      });


        /*体验标链接*/
        this.$http(this.$api.querytenderlist({"Page":1,"PageSize":10}))
      .then((data) => {

        // for(let i=0;i<data.data.ResultData.List.length;i++){
        //   if(data.data.ResultData.List[i].TenderActiveType==-1){
        //     _this.newdata=data.data.ResultData.List[i]

        //   }
        // }

      });

      /*是否为体验标*/
        this.$http(this.$api.QueryNewTenderDetail({}))
      .then((data) => {
          console.log( data.data.ResultData)

          //console.log(typeof data.data.ResultData.isShow,data.data.ResultData.isShow)

           if(data.data.ResultData.isShow){
              _this.tiyanword="新手专享标"
              _this.istender = true
              _this.newdata=data.data.ResultData
              console.log(_this.newdata.isShow)
            }else{
              _this.tiyanword="活期宝"
            }
      });


       /*首页类别*/
        this.$http(this.$api.GetAppModules({}))
      .then((data) => {
          let allM=[]
          allM=data.data.ResultData
          _this.Modules=allM
          console.log(_this.Modules)
      });


       /*热门楼盘*/
        this.$http(this.$api.HousesList({"Page":1,"PageSize":2}))
      .then((data) => {

          _this.HousesList=data.data.ResultData.List
          console.log( _this.HousesList)
          if(_this.HousesList.length==0){
            _this.ishotfang=false
          }else{
            _this.ishotfang=true
          }


      });

       /*热门保险*/
      this.$http(this.$api.GetInsurances({"IsHomeHot":true}))
    .then((data) => {
        _this.apiData=data.data.ResultData

        if(_this.apiData.List.length==0){
          _this.ishotbao=false
        }else{
          _this.ishotbao=true
        }

        console.log(_this.apiData.List)
        for(let i=0;i<_this.apiData.List.length;i++){
            if(i<2){
               if(_this.apiData.List[i].InsuranceType==1){
                  _this.cardata.push(_this.apiData.List[i])
               }else{
                _this.allData.push(_this.apiData.List[i])
               }
            }

        }


    })




  },
  components:{
    swiper,
    swiperSlide,
    globlenav
  },

  computed: {
  top:function() {
      return - this.activeIndex * 0.575+ 'rem';
    },
},


mounted() {

    setInterval(_ => {
    //console.log(6*Math.floor(this.prizeList.length/6));

      if(this.activeIndex < this.scorllhow){
          this.activeIndex += 1;
          this.isUl=true
      }else{
          this.isUl=false
          this.activeIndex = 0;
      }

    }, 1500);
}
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.xjh{
  box-sizing:border-box;
  padding:0.25rem 0.25rem 0px 0.25rem;
  overflow:hidden;
  position: relative;left: 0px;z-index: 0;margin-bottom: 1.25rem;text-align:center;
}
.xjh .box{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555}
.xjh .box h1,.xjh .box h2,.xjh .box h3{ font-size: 0.45rem; font-weight: normal; height:1.125rem; line-height: 1.125rem;  padding:0px 0.375rem;box-sizing:border-box; vertical-align:middle; overflow:hidden;}
.xjh .box h3{overflow:visible;}
.xjh .box h1 span.h1title,.xjh .box h2 span.h1title{margin-right: 0.25rem;display:block; float:left; width:auto;}
.box h1 span.subtitle{font-size:0.3rem;-webkit-text-size-adjust:none; color:#ffbb2a; border:1px double #ffbb2a;display:block; float:left; width:auto;line-height: normal; margin-top:0.25rem; padding:0.075rem; border-radius: 0.075rem;}
.xjh .box h1 div{border-bottom: 1px dashed #ccc; height: 1.11rem;}
.xjh .box a h3 {border-bottom: 1px dashed #ccc;height: 0.9rem;font-size: 0.45rem;line-height: 1.1rem;display: flex;color: #333; position:relative;margin:0 auto;width:90%;padding:0;}
.xjh .box a h3 .title { width: 53%; text-align: left; font-weight:normal; overflow:hidden;}
.xjh .box a h3 .icon { width: 30%; text-align: right; }
.xjh .box a h3 .icon i { font-size: 0.3rem; -webkit-text-size-adjust: none; color: #ffbb2a; border: 1px double #ffbb2a; display: block; float: left; width: auto; line-height: normal; padding: 0.025rem 0.075rem; font-style: normal; margin-top: 0.3rem;  margin-right:0.125rem}
.xjh .box a h3 .new_title{background:url(../../static/img/index/tiyan_title_bg.png) no-repeat ; background-size:100%; color:#fff; position:absolute; top:rem(-8); line-height: 0.9rem; width:3.4rem;  text-align:center;}
.xjh .box a h3 .new_icon{position:absolute; right:0.1rem; width:rem(60);font-size:rem(12);background:url(../../static/img/index/tiyanq.png) no-repeat center center;background-size:100%;display:block;text-align:center;color:#fff;}


.xjh .box .intenderlistbox { display: flex; box-sizing: border-box; padding: 0.30rem 0.25rem 0.5rem; color:#555;}
.xjh .box .intenderlistbox span.red{ color:#ffbb2a; }
.xjh .box .intenderlistbox span.size{font-size:0.35rem}
.xjh .box .intenderlistbox span strong { font-size: 0.65rem; }
.xjh .box .intenderlistbox .flexone { width: 25%; text-align: left; }
.xjh .box .intenderlistbox .flextow { width: 22%; text-align: right; margin-right: 3%}
.xjh .box .intenderlistbox .flexthree { width: 50%; text-align: left; }
.xjh .box .intenderlistbox .flexthree  p{ text-indent:0.15rem; }
.xjh .box .intenderlistbox .flexone p:nth-child(1),.xjh .box a .intenderlistbox .flextow p:nth-child(1),.xjh .box a .intenderlistbox .jdt{overflow: hidden; height:0.85rem;display:flex;align-items:center;justify-content:center; }
//.xjh .box a .intenderlistbox .jdt { overflow: hidden; height:0.85rem;display:flex;align-items:center;justify-content:center; }
.xjh .box .intenderlistbox .jdt .jdttext { float: left; width: auto; margin-left: 0.125rem; }
.xjh .box .intenderlistbox .jdt_box { height: 0.25rem; background: #e1e1e1; border-radius: 0.125rem; float: left; width: 70%; margin-top: 0.075rem; }
.xjh .box .intenderlistbox .jdt_box .jdtmian { height: 0.25rem; border-radius: 0.125rem; background: #ffbb2a; }


.xjh .xjhtext{margin-top:0.2rem; font-size: 0.4rem;color:#73879c;}
.xjh .xjhtextgray{color:#73879c}
.xjh .numberSizi{font-size: 1rem; font-weight: bold;color:#de3031;margin-top: 0.85rem;}
.xjh .numberSizi span{font-size:rem(16);}
.xjh .login{font-size: 0.35rem;line-height: 0.375rem;margin: 0.25rem 0 0.5rem 0;}
.xjh .login a{text-decoration:underline; color:#ffbb2a;}
.xjh .fixe{display:flex; margin-top: 0.25rem;}
.xjh .fixe .fixerow:nth-child(1){}
.xjh .fixe .row1text{color:#73879c;}
.xjh .fixe .row1text .redspan{color:#de3031;}
.xjh .fixe .fixerow .rednumbel{font-size:0.55rem;color:#ffbb2a;margin-top: 0.125rem;}
.xjh .fixe .fixerow .rednumbel2{font-size: 0.55rem;color:#ffbb2a; margin-top: 0.125rem;}
.xjh .fixe .rednumbel2 strong{font-size: 0.35rem;}
.xjh .fixe .fixerow2 a{background-color: #fdf3de;color:#ffbb2a; padding:0.3rem 0px; display:block;}
.xjh .fixe .fixerow2 .row2text{font-size: 0.5rem;}
.xjh .fixe .fixerow2:nth-child(2) a{background: -webkit-linear-gradient(left,#ffbb2a,#ff7c2d);color:#fff;}
.xjh .fixe .fixerow2 .rednumbel2{font-size: 0.3rem; }
.xjh .fixe .newtext{font-size:0.3rem;height:rem(30);line-height:rem(30)}
.xjh .fixe .newtext span.newspan{color:#73879c;display:block;float:left;}
.xjh .fixe .newtext span.newspan:first-child{text-align:right;width:46%;}
.xjh .fixe .newtext span.newspan:last-child{text-align:left;width:46%;line-height:rem(25)}
.xjh .fixe .newtext b.newb{width:8%;text-align:center;font-weight:normal;display:block;float:left;color:#eee;height:100%;}
.xjh .fixe .newtext b.lastb span{font-size:rem(22)}
.xjh .fixe .newtext b.lastb{font-weight:normal;color:#de3031;padding-left:rem(5)}
.xjh .fixe .newtext span strong{font-size:0.45rem}
.xjh .newtiyanbiaobtn{width:80%;margin:auto;text-align:center;  margin-bottom:0.575rem;margin-top:0.4rem;}
.xjh .newtiyanbiaobtn .fixerow2 a{border-radius:0.125rem; background:#de3031; color:#fff;}

.xjh .tenderOver .intenderlistbox{position:relative;}
.xjh .tenderOver a h3 .icon i{border: 1px double #e1e1e1; color:#ccc}
.xjh .tenderOver .intenderlistbox span.red {color: #ccc;}
.xjh .tenderOver .intenderlistbox .jdt_box .jdtmian{background:#e1e1e1}
.xjh .tenderOver .typeicon{width:1.875rem; height:1.875rem; position:absolute; top:0;  right:1.5rem;background:url(../../static/img/index/money_type.png) no-repeat; background-size:100%}



.flexthree .hold{width:80px; height:80px;background:#fff;position:absolute;top:-20px;}
.flexthree .hold1{clip:rect(0px,80px,80px,40px);}
.flexthree .hold2{clip:rect(0px,40px,80px,0px);}
.flexthree .hold1 p.hiyh{border-radius:40px; width:80px; height:80px; clip:rect(0px,80px,80px,40px);position:absolute;transform:rotate(180deg);z-index:10;top:0px;}
.flexthree .hold2 p.hiyh{border-radius:40px; width:80px; height:80px; clip:rect(0px,40px,80px,0px);position:absolute;transform:rotate(180deg);z-index:10;top:0px;}
.flexthree .hold .jr{background:#efc813;}
.flexthree .hold .gy{background:#efc813;}
.flexthree .hold .qy{background:#efc813;}


.gonggao{height:rem(35);background:#fff;box-shadow: rem(0) rem(4) rem(10) #ccc;margin:rem(5) 0}
.gonggao .imgleft{background:url(../../static/img/index/jftoutiao.png) no-repeat rem(20) center;height:100%;width:25%;background-size:75%;float:left;display:block;}

.scorllten{height:rem(23);margin-top:rem(6);overflow:hidden;width:70%;float:left;background:url(../../static/img/index/laba.png) no-repeat rem(10) center;background-size:10%;}
.gonggao .scorllten ul{}
.gonggao .scorllten ul li{line-height:rem(23);}

.gonggao .scorllten ul{width:100%;margin:0 auto;position:relative;}
.gonggao .scorllten ul li{height:rem(23);line-height: rem(23);border-left:rem(1) solid #ccc;padding-left:rem(45);color:#73879c; overflow:hidden;}

.listtu{background:#fff;margin:rem(5) 0;box-shadow: rem(0) rem(4) rem(10) #ccc;text-align:center;}
.listtu ul{width:95%;margin:0 auto;display:flex;justify-content:center ;}
.listtu ul li{height:auto;padding:rem(5) 0;width:rem(78);margin:0 auto;}
.listtu ul li:nth-child(1) p.toppic{background:url(../../static/img/index/tubiao1.png) no-repeat center center;background-size:50%;}
.listtu ul li:nth-child(2) p.toppic{background:url(../../static/img/index/tubiao2.png) no-repeat center center;background-size:50%;}
.listtu ul li:nth-child(3) p.toppic{background:url(../../static/img/index/tubiao3.png) no-repeat center center;background-size:50%;}
.listtu ul li p.botword{height:rem(20);line-height:rem(20);color:#73879c;}
.listtu ul li .toppic{width:70%;margin:0 auto;padding:rem(5) 0;}

.indexbot{width:95%;margin:0 auto;}
.indexbot .indexbotul{height:rem(65)}
.indexbot .indexbotul li{background:#fff;}
.indexbot .indexbotul li:first-child{width:49%;float:left;background:url(../../static/img/index/hengrui.png) no-repeat rem(12) center #fff;background-size:17%;}
.indexbot .indexbotul li:last-child{width:49%;float:right;background:url(../../static/img/index/loucen.png) no-repeat rem(12) center #fff;background-size:17%;}
.indexbot .indexbotul li:first-child div{}
.indexbot .indexbotul li:last-child div{}
.indexbot .indexbotul li div{border:1px solid #e6ddc8;margin:rem(5) auto;width:94%;padding:rem(10) 0;}
.indexbot .indexbotul li div p{color:#99aabb;font-size:rem(14);text-align:left;text-indent:rem(40);line-height:rem(20);}
.indexbot .indexbotul li div p:first-child{font-weight:bold;}
.indexbot .tipsbot{background:url(../../static/img/index/botword.png) no-repeat center center;height:rem(40);width:70%;margin:rem(10) auto;background-size:100%;}

.listbig{}
.listbig .bigcon{width:95%;margin:0 auto;}
.listbig .bigcon ul{overflow:hidden;margin:rem(10) 0;}
.listbig .bigcon ul li{background:#fff;width:48%;float:left;margin-bottom:rem(10)}
.listbig .bigcon ul li img{display:block;}
.listbig .bigcon ul li:nth-child(2n){width:48%;float:right;}
.listbig .bigcon ul li .bigtop{text-align:left;text-indent:rem(5);line-height:rem(35);font-size:rem(16);font-weight:bold;color:#333;}


.listdetail{width:100%;}
.listdetail ul{}
.listdetail ul li{background:#fff;overflow:auto;margin:rem(10) 0;}
.listdetail ul li .grayleft{margin:rem(10) 0 rem(10) rem(0) ;float:left;border-radius:rem(5);width:36%;height:rem(90);background:none;}
.listdetail ul li .grayleftright{margin:rem(10) 0;width:62%;float:right;line-height:rem(25);height:rem(80)}
.listdetail ul li .grayleftright .topbold{color:#333333;font-size:rem(16);padding-top:rem(0)}
.listdetail ul li .grayleftright .botlight{color:#999;font-size:rem(14);line-height:rem(20);height:rem(20);overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
.listdetail ul li .grayleftright dl{height:rem(25);line-height:rem(25);text-align:center;}
.listdetail ul li .grayleftright dl dt{width:auto;float:left;border-radius:rem(3);background:#dcf7ff;color:#19b9e7;padding:rem(0) rem(1);}
.listdetail ul li .grayleftright dl dd{width:auto;padding:rem(0) rem(1);float:left;margin:0 rem(2);border-radius:rem(3);}
.listdetail ul li .grayleftright dl dd:nth-child(2){background:#e1fbf2;color:#57c89f;}
.listdetail ul li .grayleftright dl dd:nth-child(3){background:#fff3eb;color:#ff7843;}
.listdetail ul li .grayleftright .botgray{color:#de3031;}
.listdetail ul li .grayleftright .botgray span{color:#666666;}

.whitebox{background:#fff;overflow:auto;margin:rem(0) 0 }

.whitetop{width:90%;margin:0 auto;padding:rem(10) 0;border-bottom: rem(1) dashed #ccc;border-top: rem(1) solid #ccc;overflow:auto;}
.carlist .whitetop{border:none;padding:0;width:100%;}
.whitetop .wtopleft{width:70%;float:left;}
.whitetop .wtopright{width:30%;float:right;}
.whitetop .wtopleft .toptitle{font-size:rem(18);color:#333333;}
.whitetop .wtopleft .botdetail{font-size:rem(14);color:#666666;line-height: rem(30)}

.whitelist{width:90%;margin:0 auto;border-bottom:rem(1) solid #ccc;overflow:auto;padding:rem(5) 0 rem(10)}
.whitelist ul.overflow{height:rem(90);overflow:hidden;}
.whitelist ul li{line-height:rem(30)}
.whitelist ul li .listleft{width:55%;float:left;color:#666666;text-align:left;}
.whitelist ul li .listright{width:45%;float:right;color:#333333;text-align:right;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitelist ul li .listright span{color:#666666;font-weight:normal;}
.howmoney{width:90%;margin:0 auto;color:#de3031;font-size:rem(20);line-height:rem(35);padding:rem(5) 0;border-bottom:none;}
.howmoney span{color:#999999;font-size:rem(12);}

.allwhite{overflow:auto;background:#fff;margin-bottom:rem(10)}
.allwhite .titlewhite{width:90%;margin:0 auto;line-height:rem(45);color:#333;font-size:rem(18);font-weight:bold;border-bottom:rem(1) solid #ccc;}
.allwhite .titlewhite b{width:rem(7);height:rem(25);float:left;margin:rem(10) rem(5) 0 0;background:#fd723c;}

.allwhite .listsco{width:90%;margin:0 auto;}

.checkmore{line-height:rem(50);color:#3ea4f3;position:relative;text-align:center;}
.shouqi{line-height:rem(50);color:#3ea4f3;position:relative;text-align:center;width:90%;margin:0 auto;border-top:rem(1) solid #ccc;}
.shouqi:after{
  border: rem(10) solid transparent;
  border-left: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(15);
  right: rem(126);
  content: ' ';
}
.shouqi:before{
  border: rem(10) solid transparent;
  border-left: rem(10) solid #999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(15);
  content: ' ';
  border-left-color: #999999;
  right: rem(125);
}

</style>