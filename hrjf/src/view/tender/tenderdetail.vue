<template>
  <div class="container" style="padding-bottom:1.5rem;">
  <heads :title="title" href="/tender"></heads>
    <div id="iscroll">
        <div>
          <div class="tenderdetail_box">
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
                      <p><strong>{{tenderinfo.TenderUseDay}}</strong></p>
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
            <p class="title">{{tenderinfo.TenderName}}</p>
            <p>融资总额：{{tenderinfo.Money}}元</p>
            <p>剩余可投金额：{{tenderinfo.Money-tenderinfo.PrepayMoney}}元</p>
          </div>
          <div class="row">
            <p v-if="!showlogin">可用余额：<span class="red">登录可见</span><a   @click="gotologin()" class="login">登录</a></p>
            <p v-else>可用余额：<span class="red">{{usermoney}}元</span><router-link :to="'/charge'" class="login">充值</router-link></p>
          </div>
          <div class="row">
            <p>投资金额：<input placeholder="请输入金额"  type="tel" v-on:input ="inputmoney" v-model="tenrdermoney"><span class="right">元</span></p>
          </div>
          <div class="row">
            <p>收益金额：<span v-if="!showincome">投资<span class="red">1</span>万，预计收益<span class="red">{{fee}}</span>元</span><span v-if="showincome">收益<span class="red">{{fee}}</span>元</span></p>
          </div>
        </div>
        <div class="tendermian">
          <div class="row" v-if="iscoupon">
            <p v-if="couponTotal>0 && iscoupon">
            优惠券：
            <span class="right" v-if="TenderCouponId==''">
              <router-link :to="'/mytendercoupon?tenderid='+tenderinfo.Id+'&money='+tenrdermoney"  class="jt"><span class="couponcolor">有{{couponTotal}}张优惠券可用</span></router-link>
            </span>
            <span class="right" v-else>
              <router-link :to="'/mytendercoupon?tenderid='+tenderinfo.Id+'&money='+tenrdermoney+'&TenderCouponId='+TenderCouponId"  class="jt"><span class="couponcolor">使用{{couponNmae}}</span></router-link>
            </span>
            </p>
            <p v-if="couponTotal==0&&isUseCoupon">优惠券：<span class="right red">此标的已使用过优惠券</span></p>
            <p v-if="couponTotal==0&&!isUseCoupon">
              优惠券：
             <!--  <span class="right red">无优惠券可用</span> -->
             <span class="right">
              <router-link :to="'/mytendercoupon?tenderid='+tenderinfo.Id+'&money='+tenrdermoney"  class="jt"><span class="couponcolor">无优惠券可用</span></router-link>
            </span>
            </p>
          </div>
          <div class="row">
            <p><span class="red">友情提示：</span>投资有风险，请合理安排投资组合</p>
          </div>
        </div>
    </div>

      <div class="tenderdetail_box">
          <div class="tendermian">
          <div class="row">
            <p><span>项目名称：</span>{{tenderdetail.TenderName}}</p>
          </div>
          <div class="row">
            <p><span>年化收益：</span><span class="red">{{(tenderinfo.TenderFee*100).toFixed(2)}}%</span></p>
          </div>
          <div class="row">
            <p><span>融资金额：</span>￥{{tenderdetail.Money}}元</p>
          </div>
          <div class="row">
            <p><span>还款方式：</span>{{tenderdetail.RepayType}}</p>
          </div>
          <div class="row">
            <p><span>计息方式：</span>满标当日起息</p>
          </div>
          <div class="row">
            <p><span>发布日期：</span>{{tenderdetail.StartDate}}</p>
          </div>
        </div>
        <div class="tendermian">
          <div class="row">
           <p><router-link :to="'/porjcetdetail?id='+tenderinfo.Id" class="jt2"><i class="r1"></i> 项目简介</router-link></p>
          </div>
          <div class="row">
           <p><router-link :to="'/tenderpaylist?id='+tenderinfo.Id" class="jt2"><i class="r2"></i> 投标记录</router-link></p>
          </div>
          <div class="row">
           <p><router-link :to="'/tenderAgreement?tendername='+tenderinfo.TenderName+'&userday='+tenderinfo.TenderUseDay+'&tenderfee='+tenderinfo.TenderFee" class="jt2"><i class="r3"></i> 投资协议</router-link></p>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="nowsubmit" v-if="tenderinfo.PrepayMoney!=tenderinfo.Money">
    <a href="javascript:" @click="checkcoupone" v-if="couponTotal>0">立即投资</a>
    <a href="javascript:" @click="sunmit" v-else>立即投资</a>
  </div>
  <div class="nowsubmit" style="background:#e1e1e1"  v-else><a href="javascript:">已满标</a></div>
  <div v-if="showcoupondiv">
      <div class="alertcoupone_bg"></div>
      <div class="alertcoupone_div">
        <div class="content">
          <p>您有可用优惠券未使用，是否继续投资？</p>
          <router-link :to="'/mytendercoupon?tenderid='+tenderinfo.Id+'&money='+tenrdermoney" class="gocoupone">前往选择优惠券</router-link>
          <a href="javascript:" @click="gotosunmit" class="submit_btn">不用券，立即投资</a>
          <a class="cancel"  @click="cancel"></a>
        </div>

      </div>
  </div>
  <dialogd @getfin="getfin" v-if="diain" :tenderid="tenderinfo.Id"></dialogd>
   <div class="bgblack" style="background:#000;opacity:0.3;width:100%;height:100%;position:;top:0px;left:0px;z-index:9;position:fixed;" v-show="getfins"></div>
</div>
</template>

<script>
import heads from '../../components/head';
// import IScroll from 'iscroll'
import dialogd from '../../components/dialogd';
export default {
  data () {
    return {
      tenderdetail:"",
      height:0,
      title:'标的详情',
      tenrdermoney:"",
      fee:0,
      couponNmae:"",
      state:this.$store.state,
      couponTotal:0,
      rule:true,
      usermoney:0,
      tenderinfo:"",
      dasharray:Math.PI * 100,
      percent:0,
      showincome:false,
      showlogin:false,
      TenderCouponId:"",
      getfins:false,
      diain:false,
      showcoupondiv:false,
      firststep:true,
      isUseCoupon:false,
      iscoupon:true,
    }
  },
  mounted : function() {
    let _this = this;
    // let obj = {
    //       mouseWheel: true,
    //       click:this.iScrollClick() ,
    //       preventDefault: true,
    //       tap: true,
    //       bounce: false,
    //       disableMouse: false,
    //       disablePointer: true,
    //       disableTouch: false,
    //       scrollbars : false,

    //       momentum: false,//关闭惯性滑动
    //       snap:true, //滑动距离

    //       freeScroll : true,
    //       scrollX : false,
    //       scrollY : true,
    //   }

    //   setTimeout(function(){
    //     let myScroll = new IScroll(document.getElementById('iscroll'),obj);
    //   },300)
  },
  methods:{

    //风险评估组件
    getfin(msg){
      this.getfins=msg
      this.diain=msg
      //this.$router.push('/mytenderlist?index=2')
       let _this = this

      _this.gotosunmit()
    },
    // blurfns(){
    //   let _this = this
    //   document.documentElement.scrollTop = 0
    //    _this.myScroll.refresh()
    // },
    cancel(){
      this.showcoupondiv = false;
    },
    // gotologin(){
    //   let q = this.$route.query
    //   if(q.isnewboy==1){
    //     this.$router.push('/login?back=/tenderDetail&isnewboy=1')
    //   }else{
    //     this.$router.push('/login?back=/tenderDetail?id='+q.id)
    //   }
    // },

    checkcoupone(){
      let q = this.$route.query
      if(this.tenrdermoney==""){
            this.$msg.alert("请输入投资金额")
            return
      }
      if(!q.GoodsStatus&&this.couponTotal>0&&this.iscoupon){
        this.showcoupondiv = true;
      }else{
        this.gotosunmit()
      }
    },
    gotosunmit(){
       let q = this.$route.query
       let obj
       let _this = this
      this.showcoupondiv = false
       if(typeof this.state.user=="undefined"){
              this.$router.push('/login?back=/tenderDetail?id='+q.id)
              return
            }
          if(this.tenrdermoney==""){
            this.$msg.alert("请输入投资金额")
            return
          }


            if(q.GoodsStatus){
              obj = {"Id":this.tenderinfo.Id,"Money":this.tenrdermoney,"TerminalType":2,"TenderCouponId":q.TenderCouponId,"UseType":q.GoodsStatus}
            }else{
              obj = {"Id":this.tenderinfo.Id,"Money":this.tenrdermoney,"TerminalType":2}
            }
            this.$http(this.$api.tenderprepay(obj))
            .then((data) => {
                if(data.data.ResultCode==100000){
                    _this.$msg.alert(data.data.ResultMessage,function(){
                    _this.$router.push('/tender')
                  })
                }else{
                  _this.$msg.alert(data.data.ResultMessage)
                }
            });
    },


    sunmit(){
      let q = this.$route.query
       let obj
       let _this = this

       if(_this.firststep){
         this.$http(this.$api.riskhas({"TokenUser":this.state.user.Token}))
        .then((data)=>{
          if(data.data.ResultData.preference_type == null){
             this.getfins=true,
            this.diain=true

          }else{

             _this.gotosunmit()

          }
        })
        _this.firststep=false
       }else{

         _this.gotosunmit()

      }




    },
    //  iScrollClick(){
    //     if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    //     if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    //     if (/Silk/i.test(navigator.userAgent)) return false;
    //     if (/Android/i.test(navigator.userAgent)) {
    //        var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
    //        return parseFloat(s[0]+s[3]) < 44 ? false : true
    //       }
    // },
    inputmoney(){//绑定购买金额
      let _this = this
      if(this.tenrdermoney==""){
        this.fee = 0
        return
      }
      let re = /^[1-9]\d*$|^0$/;
      if(!re.test(this.tenrdermoney)){
        this.fee = 0
        this.tenrdermoney=""
        _this.$msg.alert("请输入正确的金额")
        return
      }
      if(this.$route.query.id){
        this.getcoupon(_this.$route.query.id)
      }
    },
    income(){ //计算收益
      let _this = this


     if(this.$route.query.GoodsStatus){
      if(this.$route.query.GoodsStatus==1){ //投资券
        // _this.tenrdermoney=parseFloat(this.tenrdermoney)
         _this.couponNmae = this.$route.query.CouponMoney+"元投资券"
        let fee=(parseFloat((this.tenderinfo.TenderUseDay).split('天')[0])/360)*(parseFloat(this.tenrdermoney)+parseFloat(this.$route.query.CouponMoney))*parseFloat(this.tenderinfo.TenderFee)
        this.fee=fee.toFixed(2);
      }
      if(this.$route.query.GoodsStatus==2){ //加息券
        _this.couponNmae = "加息券 +"+(this.$route.query.CouponMoney*100).toFixed(2)+"%"
        let fee=(parseFloat((this.tenderinfo.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*(parseFloat(this.tenderinfo.TenderFee)+parseFloat(this.$route.query.CouponMoney))
        this.fee=fee.toFixed(2);
      }
      if(this.$route.query.GoodsStatus==4){ //双倍券
        _this.couponNmae = "双倍券"
        let fee=(parseFloat((this.tenderinfo.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*parseFloat(this.tenderinfo.TenderFee)
        this.fee=fee*2;
      }

    }else{
      this.couponNmae = "使用优惠券"
       let fee=(parseFloat((this.tenderinfo.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*parseFloat(this.tenderinfo.TenderFee)
        this.fee=fee.toFixed(2);
    }
      if(this.tenrdermoney==""||this.tenrdermoney==0){
        this.fee=(parseFloat((this.tenderinfo.TenderUseDay).split('天')[0])/360)*parseFloat(10000)*parseFloat(this.tenderinfo.TenderFee)
        this.fee=this.fee.toFixed(2);
        this.showincome = false;
        return
      }
      this.showincome = true;
    },
    getcoupon(day){// 获取可用优惠券
      let _this = this

      let money = this.tenrdermoney
      let tempmoney
      if(money=="") money = 0;
      if(typeof this.state.user=="undefined"){
        return
      }

      this.income();
      this.$http(this.$api.GetTenderCouponList({"Page":1,"PageSize":100,"IsFalg":true,"id":this.tenderinfo.Id,"Money":money}))
      .then((data) => {
        console.log(data.data.ResultData)
        _this.couponTotal = data.data.ResultData.canUseTotal;
        _this.isUseCoupon = data.data.ResultData.isUseCoupon;
      });
    },

  },
  created:function(){
      let _this = this
      let indextrue=false
      // this.height = document.documentElement.clientHeight;
      let q = this.$route.query
      let money
      if(typeof this.$route.query.money!="undefined"){
          if(this.$route.query.money==0){
            this.tenrdermoney=""
          }else{
            this.tenrdermoney = this.$route.query.money
          }

        }
      if(q.TenderCouponId){
        this.TenderCouponId = q.TenderCouponId
      }
      this.$http(this.$api.querytenderlist({"Page":1,"PageSize":10}))
      .then((data) => {
            data.data.ResultData.List.forEach(function(v,i){
              if(v.Id==q.id){
                _this.tenderinfo = data.data.ResultData.List[i]
                _this.getcoupon()
                if(q.TenderActiveType==-1){
                  _this.iscoupon=false
                }
                indextrue=true
              }

               setTimeout(function(){
                 console.log(indextrue)
                if(indextrue != true){
                _this.$router.push('/index')
               }
               },0)


            })
      });

      this.$http(this.$api.querytenderdetail({"Id":q.id})) // 匹配计划标的
      .then((data) => {
        _this.tenderdetail = data.data.ResultData
      });




      // 匹配商品ID
      this.$http(this.$api.IndexCouponList({}))
      .then((data) => {

      });
      if(typeof this.state.user=="undefined"){
        return
      }
      this.$store.dispatch('basset')
          .then(() => {
              _this.usermoney=this.state.basset.Balance
    })
      this.showlogin = true;

  },
  components:{
    heads,
    dialogd,
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
.nowsubmit{position:fixed;bottom:0;left:0;height:1.2rem; background:#de3132;}
.nowsubmit a{text-align:center;line-height:1.2rem; color:#fff; font-size:0.45rem;display:block;}
.tendermian{margin-top:rem(10);overflow:hidden;}
.tendermian .row{padding:rem(10) rem(15); background:#fff;border-bottom:1px solid #e1e1e1; overflow:hidden; box-sizing:border-box;}
.tendermian .row p{font-size:0.4rem; margin-top:rem(5);}
.tendermian .row p.title{margin:0;font-weight:bold;}
.tendermian .row .login{width:rem(60);height:rem(30);background:#de3132;line-height:rem(30);color:#fff;text-align:center;display:block;float:right;border-radius:rem(5);}
.tendermian .row .red{color:#de3132;}
.tendermian .row i{height:rem(25); width:rem(25); display:inline-block; margin-right:rem(10); vertical-align:middle;}
.tendermian .row i.r1{@include bg("/static/img/tender/icon_project_protocol.png")}
.tendermian .row i.r2{@include bg("/static/img/tender/icon_project_record.png")}
.tendermian .row i.r3{@include bg("/static/img/tender/icon_project_introduction.png")}
.tendermian .row input::-webkit-input-placeholder{@include sizeColor(0.4rem,#d1d1d1)font-weight:normal;}
.tendermian .row input{border:none; height:rem(30); font-size:0.45rem;}
.tendermian .row a.jt{color:#555;}
.tendermian .row a.jt:after{content:"";display:inline-block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg);}
.tendermian .row a.jt2{color:#555;display:block;}
.tendermian .row a.jt2:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); float:right;}
.tendermian .row span{color:#999}
.tendermian .row span.red{color:#de3132}
.gt{margin-top:rem(10);font-size:0.35; text-align:center; color:#d1d1d1}
.gt i{content:"";display:inline-block;margin-right:rem(10); border-top: rem(2) solid; border-right: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); vertical-align:middle;}
.tendermian .row  a span.couponcolor{color:#de3132; padding-right:rem(20)}


.alertcoupone_bg{background:#000;opacity:0.3;width:100%;height:100%;top:0px;left:0px;z-index:9;position:fixed;}
.alertcoupone_div{background:rgb(255, 255, 255); position: fixed; top: 45%; left: 50%; margin: -3.75rem 0px 0px -4.5rem; width: 9rem; z-index: 10; border-radius: 0.125rem;}
.alertcoupone_div .content{font-size:0.4rem; color:#666; width:90%; margin:0 auto; padding:0.5rem 0; text-align:center; position:relative;}
.alertcoupone_div .content a.gocoupone{width:100%; background:#de3132; color:#fff; text-align:center; height:rem(45); line-height:rem(45); display:block; margin-top:rem(10); border-radius:rem(5);}
.alertcoupone_div .content a.submit_btn{width:100%; background:#fff; color:#de3132; text-align:center; height:rem(45); line-height:rem(45); display:block; margin-top:rem(10); border-radius:rem(5); border:1px solid #de3132;}
.alertcoupone_div .content a.cancel{width:rem(15); height:rem(15); display:block; position:absolute; top: rem(10); right:rem(-5);@include bg("/static/img/my/cancel.png")}
</style>

