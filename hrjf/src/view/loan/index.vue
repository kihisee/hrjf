<template>
<div class="container">
 <heads :title="title" showtext="true" text="我的预约" textlink="/myloan"></heads>
<div class="slideWarp">
  <swiper :options="swiperOption">
          <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">

            <a href="javascript:">
              <img :src="slide.Url" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
<div class="nomargin">
  <div class="typebox" v-for="item in loanarr">
    <div class="title"><span>{{item.Name}}</span></div>
    <div class="list">
      <ul>
        <li v-for="items in item.List" @click="detail(items.ID)">
          <div class="img"><img :src="items.Icon"></div>
          <div class="main">
            <p class="subtitle">{{items.Name}}</p>
            <p class="red">最高额度：{{items.MaxMoney}}</p>
            <p class="sub">{{items.Intro}}</p>
          </div>
        </li>
      </ul>

    </div>
    <a href="javascript:" class="moer" @click="moer(item.Type)">查看更多</a>
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
      title:"贷款",
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
    }
  },
  mounted : function() {

  },
  methods:{
    moer(type){
      this.$router.push("/loanlist?type="+type)
    },
    detail(id){
      this.$router.push("/loandetail?id="+id)
    }
  },
  created :function(){
    let _this=this
    this.$http(this.$api.LoansIndex({}))
    .then((data) => {
       this.loanarr = data.data.ResultData.Data
       console.log(this.loanarr)
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
.typebox{background-color:#fff; padding:rem(15); box-sizing:border-box; overflow:hidden; margin-top:rem(20);}
.nomargin div:nth-child(1){margin-top:0;}
.typebox .title{ padding-bottom:rem(15);border-bottom:1px solid #d8d8d8}
.typebox .title span{border-left:rem(5) solid #fd6f3b; font-size:0.45rem; padding-left:rem(15);}
.list{overflow:hidden;padding-bottom:rem(15);border-bottom:1px solid #d8d8d8;}
.list li{overflow:hidden; border:1px solid #d8d8d8;padding:rem(15);box-sizing:border-box; margin-top:rem(15);}
.list li .img{width:rem(60);height:rem(60);  border-radius:50%;float:left;}
.list li .img img{border-radius:50%;width:rem(60);height:rem(60); }
.list li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.list li .main p{margin-bottom:rem(5);}
.list li .main p.subtitle{font-size:0.4rem;}
.list li .main p.red{color:#de3132;}
.list li .main p.sub{color:#888;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto;margin-top:rem(20); color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;}

</style>