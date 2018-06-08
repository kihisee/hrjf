<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="banner"><img :src="loanarr.Img"></div>
 <div class="maxmoney_box">
   <div class="maxmoneypd_box">
      <div class="maxmoneymain_box">
          <p>最高可借出额度（元）</p>
          <p><span>{{loanarr.MaxMoney}}</span></p>
      </div>
   </div>
 </div>
<div class="typebox" style="margin-top:0">
  <div class="list">
    <ul>
      <li>
        <div class="img"><img src="/static/img/loan/detail_icon_1.png"></div>
        <div class="main">
          <p class="subtitle">期限范围</p>
          <p class="sub">{{loanarr.Deadline}}</p>
        </div>
      </li>
      <li>
        <div class="img"><img src="/static/img/loan/detail_icon_2.png"></div>
        <div class="main">
          <p class="subtitle">申请条件</p>
          <p class="sub">{{loanarr.Condition}}</p>
        </div>
      </li>
      <li>
        <div class="img"><img src="/static/img/loan/detail_icon_3.png"></div>
        <div class="main">
          <p class="subtitle">申请基本材料</p>
          <p class="sub">{{loanarr.Materials}}</p>
        </div>
      </li>
      <li>
        <div class="img"><img src="/static/img/loan/detail_icon_4.png"></div>
        <div class="main">
          <p class="subtitle">还款方式</p>
          <p class="sub">{{loanarr.Repayment}}</p>
        </div>
      </li>
      <li>
        <div class="img"><img src="/static/img/loan/detail_icon_5.png"></div>
        <div class="main">
          <p class="subtitle">服务城市</p>
          <p class="sub">{{loanarr.City}}</p>
        </div>
      </li>
    </ul>

  </div>

</div>
<div class="htmlbox">
  <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">产品介绍</p>
          <span class="huaright"></span>
        </div>
  <div class="htmlcont" v-html="loanarr.Content"></div>
</div>
<div class="loansubtext">{{loanarr.Offer}}</div>

<div class="submitbtn"><a href="javascript:" @click="showsubmit">立即申请</a></div>


<div v-if="submit">
  <div class="masks"  @click="cancel(0)"></div>
  <div class="alert_box">
    <div class="submit_box">
      <a href="javascript:" class="cancel" @click="cancel(0)"></a>
      <h1>填写申请信息</h1>
      <input placeholder="请输入您的姓名" type="text" v-model="username">
      <input placeholder="请输入您的手机号码" type="text" v-model="userphone">
      <a href="javascript:" class="submit_btn" @click="submitnow">确认申请贷款</a>
      <p class="sub">确认即同意《个人信息使用授权条款》</p>
    </div>
  </div>
</div>

<div v-if="success">
  <div class="masks"  @click="cancel(1)"></div>
    <div class="alert_box">
        <div class="submit_box">
          <a href="javascript:" class="cancel" @click="cancel(1)"></a>
          <h1>申请受理成功</h1>
          <p class="sub">请保持您的电话通畅<br>工作人员会在24小时内与您联系！</p>
          <a href="javascript:" class="submit_btn" @click="cancel(1)">我知道了</a>
        </div>
    </div>
</div>

</div>



</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"贷款",
      state:this.$store.state,
      username:"",
      userphone:"",
      submit:false,
      success:false,
      loanarr:[]
    }
  },
  mounted : function() {

  },
  methods:{
    cancel(index){
      if(index==0){
        this.submit = false
      }else if(index==1){
        this.success = false
      }

    },
    showsubmit(){
      let q = this.$route.query
      if(typeof this.state.user=="undefined"){
        this.$lg.applogin("loandetail?id="+q.id)
        //this.$router.push("/login?back=loandetail?id="+q.id)
        return
      }
      this.submit = true
    },
    submitnow(){
      let rep = /^1[3456789]\d{9}$/;
      let _this = this
      if(this.username==""){
        this.$msg.alert("请输入您的姓名！")
        return false
      }
      if(this.userphone==""){
        this.$msg.alert("请输入您的手机号码！")
        return false
      }
      if(!rep.test(this.userphone)){
        this.$msg.alert("请输入正确的手机号码！")
        return false
      }

      this.$http(this.$api.ApplyLoan({"LoansID":this.loanarr.ID,"Name":this.username,"Mobile":this.userphone}))
      .then((data) => {
         console.log(data.data.ResultData)
         if(data.data.ResultCode==100000){
            _this.success = true
            _this.submit = false

         }
      });
    },
    userinfo(){
              let _this = this
                // this.$http(this.$api.QueryRealNameInfo({}))
                //  .then((data) => {
                //     _this.username = data.data.ResultData.RealName
                //     _this.userphone = _this.state.user.MobilePhone
                // })
        this.$http(this.$api.GetUserInfo({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
              console.log(data.data.ResultData)
                   _this.username = data.data.ResultData.UserName
                  _this.userphone = data.data.ResultData.MobilePhone
          }
        });
            },
            userRealNameStatus(){
                let _this = this
              if(typeof this.state.user=="undefined"){
                return
              }
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus==3){
                        _this.userinfo()
                    }

                })
            }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.userRealNameStatus()
    this.$http(this.$api.LoansDetails({"ID":q.id}))
    .then((data) => {
       this.loanarr = data.data.ResultData
       console.log(this.loanarr)
    });


  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.container{padding-bottom:rem(45);}
.typebox{background-color:#fff; padding:rem(15); box-sizing:border-box; overflow:hidden;}
.maxmoney_box{height:1.5rem;position:relative;}
.maxmoneypd_box{height:2.5rem;position:absolute;top:-1.75rem;padding:rem(15);box-sizing:border-box;}
.maxmoneymain_box{height:2.5rem;background-color:#fff;padding:rem(15);box-sizing:border-box;border-radius:rem(5); margin:auto;}
.maxmoneymain_box p{text-align:center;margin-top:rem(5);}
.maxmoneymain_box p span{font-size:0.6rem;color:#de3132;}
.list{overflow:hidden;}
.list li{overflow:hidden; padding-top:rem(15);box-sizing:border-box;}
.list li .img{width:rem(30);height:rem(30); float:left;}
.list li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.list li .main p{margin-bottom:rem(5);}
.list li .main p.subtitle{font-size:0.4rem;}
.list li .main p.red{color:#de3132;}
.list li .main p.sub{color:#888;}
.toplist{width:rem(115);margin:0 auto rem(10);height:rem(30);text-align:center;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;}
.toplist .midlleword{width:rem(75);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto;margin-top:rem(20); color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;}
.htmlbox{margin-top:rem(10);background-color:#fff;padding:rem(10);box-sizing:border-box;}
.htmlbox h1{text-align:center;}
.htmlbox h1 span{padding:0 rem(20);border-left:rem(5) solid #fd6f3b;border-right:rem(5) solid #fd6f3b; font-size:0.45rem;font-weight:normal;}
.htmlbox .htmlcont{margin-top:rem(10); overflow:hidden; box-sizing:border-box;}
.loansubtext{text-align:center; margin:rem(30) 0;}
.submitbtn a{height:rem(45);line-height:rem(45);font-size:0.45rem; color:#fff; text-align:center;background-color:#de3031;position:fixed; bottom:0;display:block;}
.masks{ width:100%; height:100%; background:rgba(0,0,0,0.5); position:fixed; left:0; top:0; z-index:100;}
.alert_box{width:100%;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center; position:fixed;top: 0;left:0;z-index: 101;}
.alert_box .submit_box{width:70%; margin:auto; background-color:#fff;padding:rem(15);border-radius:rem(8);position:relative;}
.alert_box .submit_box a.cancel{position:absolute;width:rem(15);height:rem(15);display:block; @include bg("/static/img/my/cancel.png");right:rem(10); top:rem(10);}
.alert_box .submit_box h1{text-align:center; font-size:0.45rem; font-weight:normal;}
.alert_box .submit_box input{height:rem(45); border-radius:0.125rem; outline: none; border:1px solid #d8d8d8; margin-top:rem(10); padding:0 rem(15); box-sizing:border-box; width:100%; font-size:0.4rem;}
.alert_box .submit_box .submit_btn{height:rem(45);line-height:rem(45);font-size:0.4rem; color:#fff; text-align:center;background-color:#de3031;display:block; margin-top:rem(10);border-radius:rem(5);}
.alert_box .submit_box p.subred{color:#de3031;text-align:center; margin-top:rem(5)}
.alert_box .submit_box p.sub{color:#de3132;text-align:center; margin-top:rem(10)}
</style>