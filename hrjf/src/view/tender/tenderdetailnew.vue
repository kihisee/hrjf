<template>
  <div class="container">
  <heads :title="title"></heads>
    <div id="iscroll" :style="{height:height+'px'}">
        <div style="touch-action: none;">
          <div class="tenderdetail_box" :style="{height:height+'px'}">
        <div class="detailtitle">
             <div class="box">
   <!--              <div class="title">{{tenderinfo.TenderName}}<p v-if="tenderinfo.TenderActiveType==0"><i>加息券</i><i>投资券</i></p></div> -->
                <div class="clear">
                  <div class="left nhl">
                     <span>预计年化(%)</span>
                     <p><strong>{{(tenderinfo.TenderFee*100).toFixed(2)}}</strong></p>
                  </div>
                  <div class="left nhl">
                      <span>融资期限</span>
                      <p><strong>{{tenderinfo.TenderUseDay}}天</strong></p>
                  </div>
                  <div class="jdtbox">
                    <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
                      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="(1-(tenderinfo.PrepayMoney/tenderinfo.Money))*dasharray" />
                      <g v-if="tenderinfo.PrepayMoney!=tenderinfo.Money">
                      <text x="50" y="45" text-anchor="middle" fill="#fff">{{(100-tenderinfo.PrepayMoney*100/tenderinfo.Money).toFixed(0)}}%</text>
                      <text x="50" y="75" text-anchor="middle" fill="#fff" font-size="0.45rem">剩余</text>
                      </g>
                      <g v-else>
                        <text x="50" y="60" text-anchor="middle" fill="#fff" font-size="0.45rem">已投满</text>
                      </g>
                    </svg>
                  </div>
                </div>
            </div>
        </div>
        <div class="tendermian">
          <div class="row">
            <p class="title">新手体验标</p>
            <p>融资总额：{{tenderinfo.Money}}元</p>
            <p>剩余可投金额：{{tenderinfo.Money-tenderinfo.PrepayMoney}}元</p>
          </div>
          <div class="row">
            <p v-if="!showlogin">可用余额：<span class="red">---</span></p>
            <p v-else>可用余额：<span class="red">{{usermoney}}元</span></p>
          </div>
          <div class="row">
            <p>投资金额：<input placeholder="请输入金额"  type="tel" v-on:input ="inputmoney" v-model="tenrdermoney" disabled="disabled"><span class="right">元</span></p>
          </div>
          <div class="row">
            <p>收益金额：<span>收益<span class="red">{{tenderfee}}</span>元</span></p>
          </div>
        </div>
        <div class="tendermian">
          <div class="row">
            <p>
            优惠券：
            <span class="right">
              <a v-if="!hasCoupon">无新手体验券</a>
              <a v-else>新手体验券{{tenrdermoney}}元</a>
            </span>
            </p>
          </div>
          <div class="row">
            <p><span class="red">友情提示：</span>投资有风险，请合理安排投资组合</p>
          </div>
        </div>
    </div>

    </div>

  </div>
  <div class="nowsubmit"><a href="javascript:" @click="nohasCoupon" v-if="!hasCoupon">立即投资</a><a href="javascript:" @click="sunmit" v-else>立即投资</a></div>
</div>
</template>

<script>
import heads from '../../components/head';
import IScroll from 'iscroll'
export default {
  data () {
    return {
      tenderdetail:"",
      height:0,
      title:'标的详情',
      tenrdermoney:0,
      fee:0,
      couponNmae:"",
      state:this.$store.state,
      couponTotal:0,
      rule:true,

      tenderinfo:[],
      dasharray:Math.PI * 100,
      percent:0,
      showincome:false,
      showlogin:false,

      tenderfee:0,

       usermoney:0,

       nomoney:true,

       isSshow:true,
       hasCoupon:true,

    }
  },
  mounted : function() {



  },
  methods:{
    sunmit(){
      let _this=this
      let q = this.$route.query
      // if(typeof this.state.user=="undefined"){
      //   this.$router.push('/login?back=/tenderDetailnew?id='+q.id+'&PrizeMoney='+q.PrizeMoney)
      //   return
      // }
      // if(this.tenrdermoney==""){
      //   this.$msg.alert("请输入投资金额")
      //   return
      // }

        this.$http(this.$api.SendProfitForTYJ({'couponId':q.id}))
        .then((data) => {
          console.log(data)
          if(data.data.ResultData){
               _this.$msg.alert("投资成功",function(){
                        _this.$router.push("/index" )
                      })
          }
        })


    },

    nohasCoupon(){
      let _this=this
       this.$msg.confirm("该体验标仅限三天内注册的新用户使用体验金投资！立即前往领取您的新手标体验金吧！",function(){
          _this.$router.push('/experienceMoney')
       },function(){

       },"取消","前往领取")
    },

    inputmoney(){//绑定购买金额
      let _this = this
      if(this.$route.query.id){
        this.getcoupon(_this.$route.query.id)
      }
    },


  },
  created:function(){
      let _this = this
      this.height = document.documentElement.clientHeight;
      let q = this.$route.query
      let money
      if(typeof this.$route.query.money!="undefined"){
          this.tenrdermoney = this.$route.query.money
        }




       _this.tenderinfo.TenderFee = 0.1020
       _this.tenderinfo.TenderUseDay=2
       _this.tenderinfo.Money = 400000
       _this.tenderinfo.PrepayMoney=180000



       if(_this.tenrdermoney!=0){
          _this.nomoney=false
       }





      if(typeof this.state.user=="undefined"){
        return
      }
      this.showlogin = true;


        this.$store.dispatch('basset')
          .then(() => {
              _this.usermoney=this.state.basset.Balance
    })



       this.$http(this.$api.QueryTYJCoupon({}))
      .then((data) => {

        _this.isSshow=data.data.ResultData.isShow
        //console.log(data.data.ResultData.isShow)
        _this.hasCoupon=data.data.ResultData.hasCoupon
         console.log(_this.hasCoupon)
         if(data.data.ResultData.hasCoupon){
          _this.tenrdermoney=6688
           _this.tenderfee=((_this.tenrdermoney*_this.tenderinfo.TenderFee)/360*_this.tenderinfo.TenderUseDay).toFixed(2)
         }else{
          _this.tenrdermoney=0
           _this.tenderfee=((_this.tenrdermoney*_this.tenderinfo.TenderFee)/360*_this.tenderinfo.TenderUseDay).toFixed(2)
         }
      });



  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.detailtitle .box{margin:auto;margin-bottom:0.25rem;padding:0.35rem 0.4rem; padding-top:0.1rem;box-sizing:border-box; overflow:hidden; width:100%;background:-webkit-linear-gradient(#de3132, $orange);}
.detailtitle .box .clear{position:relative;overflow:hidden; height:rem(80);}
.detailtitle .box .clear .nhl{ margin-top:rem(15); width:rem(100);}
.detailtitle .box .clear .nhl span{color:#fff;display:block;text-align:center;}
.detailtitle .box .clear .nhl p{color:#fff; font-size:0.5rem;text-align:center;margin-top:rem(15);}

.jdtbox{position:absolute;top: 0;right:0;width:rem(80);height:rem(80); margin-top:rem(10);}
.jdtbox svg{width:rem(80);height:rem(70);font-size:0.55rem;}
.jdtbox circle{stroke-width:0.16rem;transform-origin:center;}
.jdtbox .progress-background{transform:scale(0.9);stroke:#d1d1d1;}
.jdtbox .progress-bar{transform: scale(0.9) rotate(-90deg);stroke: #fff;}
.nowsubmit{position:absolute;bottom:0;left:0;height:1.2rem; background:#de3132;}
.nowsubmit a{text-align:center;line-height:1.2rem; color:#fff; font-size:0.45rem;display:block;}
.tendermian{margin-top:rem(10);overflow:hidden;}
.tendermian .row{padding:rem(10) rem(15); background:#fff;border-bottom:1px solid #e1e1e1; overflow:hidden; box-sizing:border-box;}
.tendermian .row p{font-size:0.4rem; margin-top:rem(5);}
.tendermian .row p.title{margin:0;font-weight:bold;}
.tendermian .row .login{width:rem(60);height:rem(30);background:#de3132;line-height:rem(30);color:#fff;text-align:center;display:block;float:right;border-radius:rem(5);}
.tendermian .row .red{color:#de3132;}
.tendermian .row input::-webkit-input-placeholder{@include sizeColor(0.4rem,#d1d1d1)font-weight:normal;}
.tendermian .row input{border:none; height:rem(30); font-size:0.45rem;background:#fff;}
.tendermian .row a.jt{color:#555;}
.tendermian .row a.jt:after{content:"";display:inline-block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg);}
.tendermian .row a.jt2{color:#555;display:block;}
.tendermian .row a.jt2:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); float:right;}
.gt{margin-top:rem(10);font-size:0.35; text-align:center; color:#d1d1d1}
.gt i{content:"";display:inline-block;margin-right:rem(10); border-top: rem(2) solid; border-right: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); vertical-align:middle;}

</style>

