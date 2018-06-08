<template>
<div class="container">
 <heads :title="title" showtext="true" text="我的收藏" textlink="/myhouselist"></heads>
<div class="slideWarp">
  <swiper :options="swiperOption">
          <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">

            <a :href="slide.Link">
              <img :src="slide.Url" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
<div class="house_nav_box">
  <div class="housenav" @click="linkpage('new')">
    <p class="title">新盘新房</p>
    <p class="colors blue">优质房源 投资升值</p>
    <p class="newhouse_img houseimg"></p>
  </div>
  <div class="housenav" @click="linkpage('old')">
    <p class="title">二手房</p>
    <p class="colors green">实房保真 安心挑选</p>
    <p class="oldhouse_img houseimg"></p>
  </div>
</div>

<div class="trait_house">
  <h1><span>特色房源</span></h1>
  <div class="trait_btn_box">
    <div class="trait_btn">
        <router-link :to="'/oldhouselist?WithElevator=true'">带电梯</router-link>
        <router-link :to="'/oldhouselist?FineDecoration=true'">精装房</router-link>
        <router-link :to="'/oldhouselist?FalseNewHouse=true'">准新房</router-link>
    </div>
    <div class="trait_btn">
      <router-link :to="'/oldhouselist?FineDecorationTwo=true'">精装两居</router-link>
      <router-link :to="'/oldhouselist?SmallThreeHouse=true'">小三居</router-link>
      <router-link :to="'/oldhouselist?LittleHouse=true'">小户型</router-link>
    </div>
  </div>
</div>

<div class="hothouse_box">
  <h1><span>热门楼盘</span></h1>
  <ul>
    <li v-for="item in newhouselist" @click="detail(1,item.ID)">
        <div class="img"><img :src="item.Img"></div>
        <div class="main">
          <p class="title">{{item.Name}}</p>
          <p class="add">地址：{{item.HousesAddress}}</p>
          <p class="tig"><span class="blue" v-if="item.Tag.length>0">{{item.Tag[0]}}</span><span class="green" v-if="item.Tag.length>=2">{{item.Tag[1]}}</span><span class="orange" v-if="item.Tag.length>=3">{{item.Tag[2]}}</span></p>
          <p class="money"><span class="red">{{item.Price}}</span> {{item.BuildingSpace}}</p>
        </div>
    </li>

  </ul>
  <router-link :to="'/newhouselist'"  class="moer">查看更多</router-link>
</div>

<div class="hothouse_box">
  <h1><span>为您推荐</span></h1>
  <ul>
    <li v-for="item in oldhouselist" @click="detail(2,item.HouseId)">
        <div class="img"><img :src="item.HouseShowPictures"></div>
        <div class="main">
          <p class="title">{{item.HouseName}}</p>
          <p class="add">{{item.HouseType}}·{{item.HouseCoveredArea}}·{{item.HouseOrientation}}<span>{{item.HouseSalePrice}}</span></p>
          <p class="add">地址：{{item.HouseLocation}}</p>
          <p class="tig"><span class="blue" v-if="item.PromotionalLabels.length>0">{{item.PromotionalLabels[0]}}</span><span class="green" v-if="item.PromotionalLabels.length>=2">{{item.PromotionalLabels[1]}}</span><span class="orange" v-if="item.PromotionalLabels.length>=3">{{item.PromotionalLabels[2]}}</span></p>
        </div>
    </li>
  </ul>
  <router-link :to="'/oldhouselist'"  class="moer">查看更多</router-link>
</div>

</div>


</template>

<script>
import heads from '../../components/head'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      title:"房产",
      state:this.$store.state,
      loanarr:[],
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
      newhouselist:[],
      oldhouselist:[]
    }
  },
  mounted : function() {

  },
  methods:{
    linkpage(url){
      if(url=="new"){
        this.$router.push("/newhouselist")
      }else if(url=="old"){
        this.$router.push("/oldhouselist")
      }

    },
    detail(type,id){
      let q = this.$route.query
      if(type==1){
        this.$router.push("/newhousedetail?id="+id)
      }else if(type==2){
        this.$router.push("/oldhousedetail?id="+id)
      }

    },
    getoldhouselist(){
      this.$http(this.$api.GetHouses({"Page":1,"PageSize":3,"IsHot":true}))
      .then((data) => {
         this.oldhouselist = data.data.ResultData.List
         console.log(this.oldhouselist)
      });
    },
    getnewhouselist(){
      let _this = this
      this.$http(this.$api.HousesList({"Page":1,"PageSize":3}))
      .then((data) => {
         this.newhouselist = data.data.ResultData.List
         console.log(this.newhouselist)
         //this.Tag = data.data.ResultData.List.Tag

      });
    },

  },
  created :function(){
    let _this=this
    this.getnewhouselist();
    this.getoldhouselist();
    this.$http(this.$api.GetHouseAds({}))
    .then((data) => {
       this.bannerList = data.data.ResultData
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

.house_nav_box{padding:rem(5);box-sizing:border-box; display:flex;}
.house_nav_box .housenav{background:#fff;border-radius:rem(5); padding:rem(10); position:relative;}
.house_nav_box div:nth-child(1){margin-right:rem(5);}
.house_nav_box .housenav p.title{font-size:0.45rem}
.house_nav_box .housenav p.blue{color:#7ba0f3;margin-top:rem(10);}
.house_nav_box .housenav p.green{color:#2abc8e;margin-top:rem(10);}
.house_nav_box .housenav p.houseimg{position:absolute;width:rem(50);height:rem(50);  right:rem(10);top:rem(10);border-radius:50%;}
.newhouse_img{@include bg("/static/img/house/newhouseicon.png");}
.oldhouse_img{@include bg("/static/img/house/oldhouseicon.png");}
.trait_house{background:#fff;padding:rem(15);box-sizing:border-box;}
.trait_house h1{padding-bottom:rem(10);border-bottom:1px solid #d8d8d8;}
.trait_house h1 span{ padding-left:rem(5);border-left:rem(5) solid #fe6839; font-size:0.45rem;font-weight:normal;}
.trait_btn_box{width:90%;margin:auto;}
.trait_btn{display:flex;margin-top:rem(15)}
.trait_btn a{padding:rem(10);background:#f1f1f1; color:#666; margin-left:rem(10);text-align:center;border-radius:rem(5); display:block}

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