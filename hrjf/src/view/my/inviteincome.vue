<template>
<div class="container">
    <heads :title="title"></heads>
    <div class="invite_box_bg">
      <div class="lizi">举个例子</div>
      <div class="hongbao_bg">
        <div class="text">邀请客户投资<span>{{money}}元</span>,<span>{{isactive}}</span>天期限</div>
        <div class="text f45">马上可获得<span><strong>{{invitemoney}}</strong></span>元奖励</div>
        <div class="inputbox">
          <div class="w80">
            <input placeholder="输入投资金额" type="text" v-on:input ="invitebtn" v-model="money">
            <span class="yuan">元</span>
            <div class="investday_box">
              <p class="line"></p>
              <ul>
                <li v-for="(item,index) in day"><a href="javascript:" :class="{'active':isactive==item}" @click="invitebtn(index)"><i></i></a></li>
              </ul>
              <div class="textday"><span v-for="item in day">{{item}}天</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="textbox">
        <p>规则说明：</p>
        <p>1、参与活动用户可通过活动链接、二维码将【恒瑞金服】推荐给新用户；</p>
        <p>2、如果被推荐新用户下载了【恒瑞金服】app，注册并进行首次投资，首投完成后推荐人即可以收到现金奖励一份；</p>
        <p>3、推荐人可推荐新用户投活期宝及固定理财，温馨提示：</p>
        <p>tips：1. 投资固定理财获得现金奖励高于活期宝现金奖励；</p>
        <p>tips：2.：邀请用户投资活期宝计息金额10万元，您每天可有1元佣金奖励，如此类推</p>
        <p>4、活动期内，被推荐新用户首次投资至30天内的每次投资，推荐人都可获得现金奖励，投资金额越高，现金奖励金额越高；</p>
        <p>5、现金奖励需满100元才可转入个人账户可用余额。</p>
      </div>
    </div>
    <div class="subimg">
      <div class="imgbox">
        <div class="title"><i>1</i>邀请好友</div>
        <div class="imgtext">点击【我】-【邀请奖励】进入活动页面的“邀请好友赚现金”按钮，选择微信好友/朋友圈/QQ好友/二维码等方式发送给朋友。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img1.png" /></div>
      </div>
      <div class="imgbox">
        <div class="title"><i>2</i>好友进行注册</div>
        <div class="imgtext">方式一：微信分享  好友点击链接进入页面输入手机号码验证进行注册。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img2.png" /></div>
        <div class="imgtext">方式二：二维码分享  好友扫码进入页面输入手机号码验证进行注册。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img3.png" /></div>
      </div>
      <div class="imgbox">
        <div class="title"><i>3</i>好友进行投资</div>
        <div class="imgtext">1：好友注册完成后-下载【恒瑞金服】APP-进行登录。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img4.png" /></div>
        <div class="imgtext">2：好友登录以后-打开【我】-充值-绑定银行卡。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img5.png" /></div>
        <div class="imgtext">3：好友绑定银行卡后-填写充值金额-提交待审核-去投资-理财-填写投资金额-立即投资。</div>
        <div class="img"><img src="/static/img/my/invite/guize_img6.png" /></div>
      </div>
      <div class="imgbox">
        <div class="title"><i>4</i>兑换邀请奖励</div>
        <div class="imgtext">点击-【查看我的奖励】-兑换奖励-确定兑换</div>
        <div class="img"><img src="/static/img/my/invite/guize_img7.png" /></div>
      </div>
      <div class="share_box" v-if="sharebtn">
        <a href="javascript:" @click="share()">邀请好友赚现金</a>
      </div>
      <div class="logo"><img src="/static/img/my/jinfu_logo.png" /></div>
    </div>
</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"邀请奖励规则",
      money:100000,
      day:[30,90,180,360],
      isactive:360,
      invitemoney:"",
      sharebtn:false
    }
  },
   methods:{
       invitebtn(index){
          let _this=this;
          if(this.money==""){
            this.$msg.alert("请输入投资金额")
            return
          }
          if(!/^\+?[1-9][0-9]*$/.test(this.money)){
             this.$msg.alert("只能输入整数",function(){
              _this.money=100000;
             })
            return
          }
          if(typeof index!=="undefined"&&typeof index==="number"){
            this.isactive = this.day[index];

          }
          console.log(this.isactive)
          this.$http(this.$api.GetInviteRewardBycalculate({"Money":this.money,"InvestDay":this.isactive}))
          .then((data) => {
            _this.invitemoney = data.data.ResultData;
          })
       },
       share(){
        this.$lg.appshare()
      }
  },
  created:function(){
    let _this = this
    this.invitebtn();
    if(!this.$lg.isapp){
      this.sharebtn = true;
    }
  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.invite_box_bg{background:-webkit-linear-gradient(#ffab5b, #d43223); overflow:hidden; padding-bottom:rem(30); border-bottom:rem(10) solid #b32012;}
.lizi{margin-top:rem(10);margin-left:rem(20); width:rem(130);height:rem(30); line-height:rem(30);background:#fbda66; text-align:center; color:#de3031;font-size:0.4rem; border-radius:rem(5);}
.hongbao_bg{@include bg("/static/img/my/invite_hb_bg.png"); width:90%; margin:auto; height:rem(420); margin-top:rem(20);overflow:hidden;}
.hongbao_bg .text{ text-align:center;width:rem(305);margin-top:rem(50); font-size:0.4rem;margin-left:rem(25);}
.hongbao_bg .text:nth-child(2){margin-top:rem(20);}
.hongbao_bg .text span{color:#f00;}
.hongbao_bg .f45{font-size:0.45rem; font-weight:bold;}
.hongbao_bg .inputbox{margin-top:rem(150);width:rem(330);margin-left:rem(10);}
.hongbao_bg .inputbox .w80{width:80%; margin:auto; overflow:hidden; position:relative;}
.hongbao_bg .inputbox .w80 .yuan{position:absolute;top:rem(10);right:rem(10);width:auto; font-size:0.4rem;}
.hongbao_bg .inputbox input{ width:100%; height:rem(30); padding:rem(20); box-sizing:border-box; border:0; border-radius:rem(5); font-size:0.4rem;}

.investday_box{margin-top:rem(20);overflow:hidden; position: relative; height:rem(80);}
.investday_box p{background:#ffbf5b; height:rem(10); margin-top:rem(10);border-radius:rem(5);}
.investday_box ul{display:flex;position: absolute; top:0;left:0;justify-content:space-between;}
.investday_box ul li{width:rem(30);}
.investday_box ul li a i{@include bg("/static/img/my/invite_btn_sl.png"); width:rem(30); height:rem(30); display:block;text-align:justify}
.investday_box ul li a{display:block;}
.investday_box ul li a.active i{@include bg("/static/img/my/invite_btn_sl_ac.png"); }
.investday_box .textday{margin-top:rem(20);display:flex;justify-content:space-between;text-align:center;}
.investday_box .textday span{text-align:left;width:1.1rem;color:#fff;}
.investday_box .textday span:nth-child(3),.investday_box .textday span:nth-child(4){text-align:right;}
.textbox{ width:85%; margin:auto; margin-top:rem(20); font-size:0.4rem; color:#fff;}
.textbox p{margin-top:rem(10);}
.subimg{background:#d43223;overflow:hidden; padding-bottom:rem(30);border-top:rem(3) solid #f45243;}
.subimg .imgbox{background:#b32d21;border-radius:rem(10);  width:90%;margin:auto;margin-top:rem(20); overflow:hidden; padding:0 rem(20);box-sizing:border-box;}
.subimg .imgbox .title{font-size:0.6rem; margin-top:rem(10); color:#fff; padding-left:rem(10);}
.subimg .imgbox .title i{font-size:1.2rem; color:#d53223; font-weight:bold; padding-right:rem(15); vertical-align:middle;}
.subimg .imgbox .imgtext{color:#fff; font-size:0.4;}
.subimg .imgbox .img{margin-top:rem(20);margin-bottom:rem(20);}
.share_box{background:-webkit-linear-gradient(#fceb80, #f6cd46); height:rem(50);width:90%;margin:auto;margin-top:rem(20); overflow:hidden;}
.share_box a{display:block; line-height:rem(50); text-align:center; color:#f61515; font-size:0.45rem;}
.logo{text-align:center; margin-top:rem(20);}
.logo img{width:4.5rem;}
</style>