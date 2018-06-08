<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="box_bg">
    <div class="couponesash_box">
       <div class="coupontitle">{{coupontitle}}</div>
       <div class="couponmoney">￥<span>{{money}}</span></div>
       <div class="couponetext">
         详细说明：
         <p>1、{{CouponProfile}}</p>
         <p>2、来源：{{Source}}</p>
         <p>3、有效期至{{ExpDate}}</p>
       </div>
       <div class="statebtn" v-if="CouponStatusNumber==1&&IsFlag" @click="getcouponmoney">立即领取</div>
       <div class="statebtn" v-if="CouponStatusNumber==1&&!IsFlag" @click="gotender">前往投资</div>
       <div class="djzstate" v-if="CouponStatusNumber==1&&!IsFlag">冻结中</div>
       <div class="ouverbtn" v-if="CouponStatusNumber==2">已领取</div>
       <div class="ouverbtn" v-if="CouponStatusNumber==3">已过期</div>
    </div>
 </div>

</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
      title:"红包详情",
      coupontitle:"",
      money:0.00,
      CouponProfile:"",
      CouponStatusNumber:"",
      ExpDate:"",
      TenderCouponId:"",
      Source:"",
      IsFlag:false
    }
  },
    methods:{
      gotender(){
        this.$router.push('/tender')
      },
    getcouponmoney(){
      let _this =this
      if(this.CouponStatusNumber==1){
        this.$http(this.$api.getuserusecoupon({"TenderCouponId":this.TenderCouponId}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            _this.$msg.alert("领取成功",function(){
                _this.$router.push('/my')
              })
          }else{
            _this.$msg.alert(data.data.ResultMessage)
          }
        });
      }

    },
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.coupontitle = q.title
    this.money = q.money
    this.CouponProfile = q.CouponProfile
    this.CouponStatusNumber = q.CouponStatusNumber
    this.ExpDate = q.ExpDate
    this.TenderCouponId = q.TenderCouponId
    this.Source = q.Source
    if(q.IsFlag ==="false"){
      this.IsFlag = false
    }else{
      this.IsFlag = true
    }

  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.container{height:100%;overflow: hidden;position: relative;left: 0px;top:0;z-index: 0; bottom:0}
.box_bg{height:100%;@include bg("/static/img/my/couponcash.jpg"); position:absolute; overflow:hidden;top:1.1rem;left:0;bottom:1.25rem;background-size:100% 100%;}
.box_bg .couponesash_box{width:88%; margin:auto; overflow:hidden;}
.box_bg .couponesash_box .coupontitle{margin-top:rem(60); color:#fff; font-size:0.4rem; text-align:center;}
.box_bg .couponesash_box .couponmoney{margin-top:rem(20);color:#fa994d;text-align:center;}
.box_bg .couponesash_box .couponmoney span{font-size:1rem;}
.box_bg .couponesash_box .couponetext{color:#fff; margin-top:rem(80); padding:rem(15); box-sizing:border-box;}
.box_bg .couponesash_box .couponetext p{margin-top:rem(10);}
.box_bg .couponesash_box .statebtn{width:rem(200); height:rem(40); background:#ffde00; line-height:rem(40); text-align:center; border-radius:rem(5); margin:auto; color:#de3132; margin-top:rem(20);}
.box_bg .couponesash_box .ouverbtn{width:rem(200); height:rem(40); background:#aaaaaa; line-height:rem(40); text-align:center; border-radius:rem(5); margin:auto; color:#fff; margin-top:rem(20);}
.box_bg .couponesash_box .djzstate{width:rem(200); height:rem(40); background:#ff8182; line-height:rem(40); text-align:center; border-radius:rem(5); margin:auto; color:#fff; margin-top:rem(20);}
</style>
