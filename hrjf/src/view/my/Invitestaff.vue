<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="topbox">
     <router-link :to="'/invitedetaillist?money='+inviteTotal.NotAwardMoney" class="staffdetail">{{inviteTotal.NotAwardMoney}}</router-link>
     <p>待月结奖励（元）</p>
    <div class="myinvitenumber">专属邀请码<span>{{inviteTotal.InviteCode}}</span></div>
 </div>
<div class="usermoney">
  <div class="tendermoney">
    <span>{{inviteTotal.TotalTenderMoney}}</span>
    <p>客户总待收固定理财（元）</p>
  </div>
  <div class="hqbmoney">
    <span>{{inviteTotal.TotalHrbMoney}}</span>
    <p>客户总待收活期宝余额（元）</p>
  </div>
    <div class="tendermoney onborder">
    <span>{{inviteTotal.InviteTenderPayerMoney}}</span>
    <p>客户本月投资金额（元）</p>
  </div>
  <div class="hqbmoney onborder">
    <span>{{inviteTotal.InviteTenderFinishMoney}}</span>
    <p>客户本月到期金额（元）</p>
  </div>
</div>

<div class="link_box">
  <ul>
    <li><router-link :to="'/invitestafflist'" class="invitelist"><i></i>奖励记录（元）<span>{{inviteTotal.HistoryTotal}}</span></router-link></li>
    <li><router-link :to="'/invitemyuserlist'" class="myinvitelist"><i></i>我的邀请（人）<span>{{inviteTotal.InviteCount}}</span></router-link></li>
    <li><router-link :to="'/invitemyjjuserlist'" class="mysubinvitelist"><i></i>我的间接邀请（人）<span>{{inviteTotal.TopInviteUserCount}}</span></router-link></li>
  </ul>
</div>
<div class="sharpbtn"><a href="javascript:" @click="nowSharp">邀请好友赚现金</a></div>


</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
    title:"员工邀请奖励",
    inviteTotal:""
    }
  },
  methods:{
    nowSharp(){
      this.$share({"title":"8888元新手投资礼包，投资还有更多活动等着你参与！","href":"/invitelink?i="+this.inviteTotal.InviteCode})
    }
  },
  created :function(){
    let _this=this

        this.$http(this.$api.getqueryinviterewardasset({}))
        .then(function(data){
          console.log(data.data.ResultData)
          if(!data.data.ResultData.IsEmployee){
            _this.$router.push('/myinvite')
             return
          }
         _this.$http(_this.$api.getQueryInviteTotal({}))
          .then(function(data){
            _this.$share({"title":"8888元新手投资礼包，投资还有更多活动等着你参与！","href":"/invitelink?i="+_this.inviteTotal.InviteCode,"img":"/activity/sharePhoto/titleicon.jpg"},false)
            _this.inviteTotal=data.data.ResultData
         });
       });



  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.topbox{text-align:center;color: #fff; background-size: 100%; padding-top: 0.25rem;height:3rem; background:-webkit-linear-gradient(#de3132, #f87055);}
.topbox .staffdetail{text-align:center; font-size:0.6rem; color:#fff; width:auto; margin:auto; display:block;}
.topbox .staffdetail::after{content:"";display:inline-block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);   margin-top:rem(15);  margin-left:rem(10)}
.topbox p{margin-top:rem(10);}
.topbox .myinvitenumber{margin-top:rem(20);}
.topbox .myinvitenumber span{display:inline-block; width:rem(120); border-radius:rem(10);border:1px solid #fff; margin-left:rem(10);}
.usermoney{background:#fff;text-align:center; overflow:hidden; padding:rem(10); box-sizing:border-box;}
.usermoney p{color:#999;}
.usermoney .tendermoney{border-right:1px solid #d8d8d8; float:left; width:49%; border-bottom:1px solid #d8d8d8; padding-bottom:rem(10)}
.usermoney .hqbmoney{float:left; width:49%; border-bottom:1px solid #d8d8d8;padding-bottom:rem(10)}
.usermoney .onborder{border-bottom:none; padding-top:rem(10);}
.usermoney span{font-size:0.5rem;color:#999;}

.link_box ul{overflow:hidden; box-sizing:border-box;}
.link_box li{margin-top:rem(10); background:#fff; line-height:rem(50);height:rem(50); padding:0 rem(10);box-sizing:border-box;}
.link_box ul li a{color:#555; font-size:0.40rem; display:block;height:rem(50);}
.link_box ul li a i{@include widthHeight(rem(20),rem(20)); display:inline-block; margin-right:rem(10); vertical-align:middle;}
.link_box ul li a.invitelist i{@include bg("/static/img/my/staff_icon1.png");}
.link_box ul li a.myinvitelist i{@include bg("/static/img/my/staff_icon2.png");}
.link_box ul li a.mysubinvitelist i{@include bg("/static/img/my/staff_icon3.png");}
.link_box ul li a:before{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10)}
.link_box ul li a span{float:right;width:auto; margin-right:rem(10)}
.sharpbtn{ background:#fff;padding:rem(15) 0;position:absolute;bottom:0;}
.sharpbtn a{width:80%;height:rem(50);line-height:rem(50); text-align:center; margin:auto; background:$orange; display:block; color:#fff; border-radius:rem(5); font-size:0.45rem;}
</style>
