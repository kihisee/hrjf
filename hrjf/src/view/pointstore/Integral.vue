<template>
   <div id="frame">
    <heads :title="title"  textlink="/record" showtext="true"  text="兑换记录"></heads>
    <div id="con" style="text-align:left">


    <div class="inteqral">
        <div class="topbanner">
          <a :href="IndexTopdata.Link">
              <img v-bind:src="IndexTopdata.Url" />
          </a>

          <p class="newscore">当前可用积分：<span v-if="!islogin">未登录</span><span v-else>{{nowcount}}</span></p>
        </div>

        <div class="tabul">
          <ul>
            <li>
              <router-link to="Integralcenter?center=0">
                <img src="static/img/pointstore/minemedal.png" />
                <p>我的勋章</p>
              </router-link>
            </li>
            <li>
             <router-link to="Integralcenter?center=1">
                <img src="static/img/pointstore/integral.png" />
                <p>赚积分</p>
              </router-link>
            </li>
            <li>
             <router-link to="Integralcenter?center=2">

                <img src="static/img/pointstore/integralrecord.png" />
                <p>积分记录</p>
              </router-link>
            </li>
          </ul>
        </div>


        <div class="bottab">
          <ul class="firstul">
            <li v-for="(item,index) in CouponTypedata" @click="gototabli(index,item.PrizeType)"    :class="{activeli: activeindex== index}">
                  {{item.Name}}
            </li>
          </ul>



        </div>

        <div class="finaltab">
          <ul class="coulist">
            <li v-for="(item,index) in CouponList" @click="gotodetail(item.ID,item.PrizeType)">
                <div class="imglist" v-bind:style="[{backgroundImage:'url('+item.Icon_min_url+')',backgroundSize:'60%',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}]">

                </div>
                <p class="coulisttopp">{{item.Name}}</p>
                <p class="coulistbotp">{{item.Need_point}}积分<span></span></p>
            </li>
          </ul>
        </div>
    </div>




    </div>
  </div>
</template>

<script>
import globlenav from '../../components/nav';
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '积分商城',
      state:this.$store.state,

      islogin:false,

      IndexTopdata:[],
      CouponTypedata:[],
      activeindex:0,
      CouponList:[],

      otCouponList:[],

      nowcount:0,
    }
  },
  methods:{
    gototabli(index,size){
      let _this =this
      _this.activeindex=index

      this.$http(this.$api.IndexCouponList({page:0,PageSize:10,PrizeType:size}))
      .then((data) => {
        console.log(data)
        _this.otCouponList=data.data.ResultData.List
        for(let i=0;i<_this.otCouponList.length;i++){

           _this.otCouponList[i].PrizeType=size
           // console.log(_this.otCouponList[i])
         }
         _this.CouponList= _this.otCouponList


        // for(let i=0;i<_this.CouponList.length;i++){
        //   console.log(_this.CouponList[i])
        // }
      });
    },
    gotodetail(ID,PrizeType){
       let _this=this
     _this.$router.push("/storedetail?id="+ID+"&PrizeType="+PrizeType)
    }

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    let size=query.which

    this.$http(this.$api.IndexCouponList({page:0,PageSize:10,PrizeType:size}))
      .then((data) => {

      _this.otCouponList=data.data.ResultData.List
        for(let i=0;i<_this.otCouponList.length;i++){

           _this.otCouponList[i].PrizeType=size
           // console.log(_this.otCouponList[i])
         }
         _this.CouponList= _this.otCouponList

      });


     if(typeof _this.state.user=="undefined"){
          _this.islogin=false;
      }else{
        _this.islogin=true;
         this.$http(this.$api.DiscoverLoginInfo({}))
        .then((data) => {
           console.log(data)
           _this.nowcount=data.data.ResultData.Gold
        });
      }


       this.$http(this.$api.IndexTop({}))
      .then((data) => {

         _this.IndexTopdata=data.data.ResultData.Banner[0]
         //console.log(_this.IndexTopdata)
      });

        this.$http(this.$api.IndexCouponType({}))
      .then((data) => {

         _this.CouponTypedata=data.data.ResultData
      });









  },
  components:{
    globlenav,
    heads,
  }
}
</script>
<style lang="scss" scoped>
.topbanner img{width:100%;}
.topbanner .newscore{width:85%;margin:0 auto;padding-left:rem(25);background:url(../../../static/img/pointstore/xunz.png) no-repeat left center;background-size:5%;height:rem(35);line-height: rem(35);color:#334455;font-size:rem(14);}
.topbanner .newscore span{color:#de3031;}
.tabul{background:#fff;width:100%;padding:rem(10) 0;}
.tabul ul{display:flex;width:85%;margin:0 auto;}
.tabul ul li{ justify-content:center;text-align: center;}
.tabul ul li img{width:60%;}
.tabul ul li p{color:#73879c;}

.bottab{overflow:auto;margin-top: rem(10)}
.bottab ul.firstul{width:120%;border-bottom:rem(1) solid #ccc;height:rem(46);background:#fff;}
.bottab ul.firstul li{width:rem(90);float:left;height:rem(45);line-height:rem(45);text-align:center;color:#73879c;font-size:rem(14)}
.bottab ul.firstul li.activeli{color:#de3031;border-bottom:rem(1) solid #de3031;}

.finaltab ul.coulist{margin-top:rem(10)}
.finaltab ul.coulist li{width:49%;background:#fff;text-align:center;margin:0 0 rem(5);}
.finaltab ul.coulist li:nth-child(2n){float:right;}
.finaltab ul.coulist li:nth-child(2n+1){float:left;}
.finaltab ul.coulist li .imglist{height:rem(180);line-height:rem(180);background-size:60%;}
.finaltab ul.coulist li img{width:80%;}
.finaltab ul.coulist li p{width:90%;margin:0 auto;text-align:left;}
.finaltab ul.coulist li .coulisttopp{display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color:#334455;font-size:rem(14);padding:rem(3) 0;}
.finaltab ul.coulist li .coulistbotp{color:#de3031;font-size:rem(18);padding:rem(5) 0 rem(10);}
.finaltab ul.coulist li .coulistbotp span{color:#99aabb;font-size:rem(12);text-indent:rem(5)}
</style>

