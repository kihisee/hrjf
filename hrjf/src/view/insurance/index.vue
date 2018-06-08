<template>
   <div id="frame">
    <heads :title="title"   :textlink="linktoorder+'?isapp='+isapp" showtext="true"  text="我的预约"></heads>
    <div id="con">


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

  <div class="ulicon">
    <ul>
      <li v-for="(item,index) in insurancelist" @click="gonext(index,item)">
        <p></p>
        <p> {{item}}</p>
      </li>
    </ul>
  </div>

  <div class="fireicon">
      <p></p>
      <p>为您推荐</p>
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
    </div>

        <div class="botlink">
          <p>没有推荐了哦！<br />为您提供更多的优质车险服务，<a :href="'/carlist?InsuranceType=1&item=车险&isapp'+isapp">点击查看>></a></p>
      </div>
  </div>
    </div>




</template>

<script>
import globlenav from '../../components/nav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '保险',

      insurancelist:["车险","医疗险","旅游险","重疾险","意外险","其他险"],

      allData:[],

      apiData:[],
      cardata:[],
      state:this.$store.state,

      linktoorder:'',


      bannerList:'',
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,
      },

         isapp:true,
    }
  },
  methods:{
    gonext(index,item){
      let _this=this
      if(index==0){
        _this.$router.push('/carlist?InsuranceType='+(index+1)+"&item="+item+"&isapp="+_this.isapp)
      }else{
        _this.$router.push('/disease?InsuranceType='+(index+1)+"&item="+item+"&isapp="+_this.isapp)
      }
    },
     gotodetail(index,InsuranceType){
      let _this=this
     if(InsuranceType==1){
        _this.$router.push('/cardetail?Id='+index+"&isapp="+_this.isapp)
      }else{
         _this.$router.push('/insurancedetail?Id='+index+"&isapp="+_this.isapp)
      }

    }

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    _this.isapp=_this.$lg.isapp()


     this.$http(this.$api.GetInsurances({"InsuranceType":null,"IsHot":true,"PageSize":10,"Page":1}))
    .then((data) => {
        //_this.allData=data.data.ResultData
        _this.apiData=data.data.ResultData
        console.log(data)
        for(let i=0;i<_this.apiData.List.length;i++){
             if(_this.apiData.List[i].InsuranceType!=1){
              _this.allData.push(_this.apiData.List[i])
            }else{
              _this.cardata.push(_this.apiData.List[i])
            }
        }


    })

     this.$http(this.$api.GetInsuranceAds({}))
    .then((data) => {
      console.log(data)
         _this.bannerList=data.data.ResultData
    })

    if(typeof _this.state.user=="undefined"){
        _this.linktoorder="login?back=insurance"
      }else{
        _this.linktoorder="myorder"
      }

  },
  components:{
    globlenav,
    heads,
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="scss" scoped>
.topbanner img{width:100%;}
.ulicon{width:100%;background: #fff;overflow: auto;}
.ulicon ul{width:90%;margin:rem(10) auto 0;}
.ulicon ul li{float:left;width:33%;text-align: center;}
.ulicon ul li p:first-child{width:rem(60);height:rem(60);margin:0 auto;border-radius: rem(60);}
.ulicon ul li:first-child p:first-child{background:url(../../../static/img/insurance/caricon.png) no-repeat left center;background-size:100%;}
.ulicon ul li:nth-child(2) p:first-child{background:url(../../../static/img/insurance/yellowicon.png) no-repeat left center;background-size:100%;}
.ulicon ul li:nth-child(3) p:first-child{background:url(../../../static/img/insurance/lvicon.png) no-repeat left center;background-size:100%;}
.ulicon ul li:nth-child(4) p:first-child{background:url(../../../static/img/insurance/hillicon.png) no-repeat left center;background-size:100%;}
.ulicon ul li:nth-child(5) p:first-child{background:url(../../../static/img/insurance/yiicon.png) no-repeat left center;background-size:100%;}
.ulicon ul li:nth-child(6) p:first-child{background:url(../../../static/img/insurance/othericon.png) no-repeat left center;background-size:100%;}

.ulicon ul li p:last-child{color:#666;line-height: rem(30)}
.fireicon{margin:rem(5) auto;width:90%;}
.fireicon p:first-child{width:10%;float:left;height:rem(30);background:url(../../../static/img/insurance/hot.png) no-repeat left center;background-size: 70%;}
.fireicon p:last-child{line-height: rem(30);color:#333333;font-size: rem(16)}
.whitebox{background:#fff;overflow:auto;margin:rem(10) 0 }
.whitetop{width:90%;margin:0 auto;padding:rem(10) 0;border-bottom: rem(1) dashed #ccc;overflow:auto;}
.carlist .whitetop{border-bottom:none;padding:0;width:100%;}
.whitetop .wtopleft{width:70%;float:left;}
.whitetop .wtopright{width:30%;float:right;}
.whitetop .wtopleft .toptitle{font-size:rem(18);color:#333333;}
.whitetop .wtopleft .botdetail{font-size:rem(14);color:#666666;line-height: rem(30)}

.whitelist{width:90%;margin:0 auto;border-bottom:rem(1) solid #ccc;overflow:auto;padding:rem(5) 0 rem(10)}
.whitelist ul.overflow{height:rem(90);overflow:hidden;}
.whitelist ul li{line-height:rem(30)}
.whitelist ul li .listleft{width:55%;float:left;color:#666666;}
.whitelist ul li .listright{width:45%;float:right;color:#333333;text-align:right;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitelist ul li .listright span{color:#666666;font-weight:normal;}
.howmoney{width:90%;margin:0 auto;color:#de3031;font-size:rem(20);line-height:rem(35);padding:rem(5) 0;}
.howmoney span{color:#999999;font-size:rem(12);}

.botlink{background:#fff;padding:rem(10) 0;}
.botlink p{width:70%;margin:0 auto;text-align:center;color:#999999;line-height:rem(20)}
.botlink p a{color:#3ea4f3;}
</style>

