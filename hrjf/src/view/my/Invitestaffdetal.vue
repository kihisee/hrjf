<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="topbox">
     <p v-if="userinviteinfo.RealName!=null">{{userinviteinfo.RealName}}</p>
     <p v-else>{{userinviteinfo.UserName}}</p>
    <div class="myinvitenumber"><span class="phone">手机号 {{mobile}}</span><span>ID {{userinviteinfo.UserId}}</span></div>
    <div class="myinvitenumber" style="margin-top:0.1rem"><p>注册时间 {{userinviteinfo.RegTime}}</p></div>
 </div>
<div class="usermoney">
  <div class="tendermoney">
    <span>{{userinviteinfo.TenderTotalMoney}}</span>
    <p>满标累计固定理财（元）</p>
  </div>
  <div class="hqbmoney">
    <span>{{userinviteinfo.TenderCorpusMoney}}</span>
    <p>满标待收固定理财（元）</p>
  </div>
    <div class="tendermoney onborder">
    <span>{{userinviteinfo.Hrb2TotalMoney}}</span>
    <p>活期宝当前余额（元）</p>
  </div>
  <div class="hqbmoney onborder color">
    <span>{{userinviteinfo.AwardMoney}}</span>
    <p>您的奖励金额（元）</p>
  </div>
</div>

<div class="link_box">
  <ul>
    <li v-for="(item,index) in userinvite.InvestList">
      <div class="title">{{item.tender_name}}<span v-if="item.order_status==1">还款中</span><span v-if="item.order_status==2" class="over">已结束</span></div>
      <div class="tender"><span>期限：{{item.use_day}}</span><span class="center">利率：{{item.fee*100}}%</span><span class="monoy">{{item.tender_money}}元</span></div>
      <div class="day"><span>满标：{{item.prepay_full_time}}</span><span class="textright">到期：{{item.end_time}}</span></div>
      <div class="mymoney">您的奖励：<span>+{{item.award_money}}</span></div>
    </li>
<li style="text-align:center;padding:0.25rem 0; height:auto; border:none;background:none">已加载全部数据</li>
  </ul>
</div>



</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
    title:"邀请用户详情",
      userinvite:"",
      mobile:"",
      isuser:false,
      userinviteinfo:""
    }
  },
  methods:{
    nowSharp(){
      this.$share()
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    if(q.jjuser==0){
      this.isuser = false
    }else if(q.jjuser==1){
      this.isuser = true;
    }
    this.mobile = q.mobile
      this.$http(this.$api.QueryInviteUserInvestDetail({"InvestUserId":q.userid,"IsTopInvitedUser":this.isuser}))
        .then(function(data){
          _this.userinviteinfo = data.data.ResultData
          console.log(data.data.ResultData)
       });
      this.$http(this.$api.QueryInviteUserInvestList({"InvestUserId":q.userid,"Page":this.page,"PageSize":300,"IsTopInvitedUser":this.isuser}))
        .then(function(data){
        _this.userinvite = data.data.ResultData
          console.log(data.data.ResultData)
       });
  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.usermoney{ box-sizing:border-box;}
.topbox{text-align:center;color: #fff; background-size: 100%; padding-top: 0.25rem;height:3rem; background:-webkit-linear-gradient(#de3132, #f87055);}
.topbox .staffdetail{text-align:center; font-size:0.6rem; color:#fff; width:auto; margin:auto; display:block;}
.topbox .staffdetail::after{content:"";display:inline-block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);   margin-top:rem(15);  margin-left:rem(10)}
.topbox p{margin-top:rem(10); font-size:0.45rem;}
.topbox .myinvitenumber{margin-top:rem(20); text-align:left; padding-left:rem(20); box-sizing:border-box; overflow:hidden;}
.topbox .myinvitenumber span{display:inline-block; width:rem(120); border-radius:rem(3);border:1px solid #fff; margin-left:rem(10); text-align:center;}
.topbox .myinvitenumber span.phone{width:rem(160)}
.topbox .myinvitenumber p{padding-left:rem(10); font-size:0.35rem;}
.usermoney{background:#fff;text-align:center; overflow:hidden; padding:rem(10);}
.usermoney p{color:#555;}
.usermoney .tendermoney{border-right:1px solid #999; float:left; width:49%; border-bottom:1px solid #999; padding-bottom:rem(10)}
.usermoney .hqbmoney{float:left; width:49%; border-bottom:1px solid #999;padding-bottom:rem(10)}
.usermoney .onborder{border-bottom:none; padding-top:rem(10);}
.usermoney span{font-size:0.5rem;color:#555;}
.usermoney .color p,.usermoney .color span{color:#de3132;}
.link_box ul{overflow:hidden; box-sizing:border-box;}
.link_box li{margin-top:rem(10); background:#fff; padding:rem(10);box-sizing:border-box; overflow:hidden;}
.link_box li .title{font-size:0.4rem; overflow:hidden;}
.link_box li .title span{float:right; border-radius:rem(10); background:#ffbb2a;font-size:0.3rem;text-align:center; display:block; width:rem(60);color:#fff;}
.link_box li .title span.over{background:#d1d1d1}
.link_box li .tender{margin-top:rem(10);display:flex;}
.link_box li .tender span.center{text-align:center;}
.link_box li .tender span.monoy{text-align:right; font-size:0.45rem; color:#de3132; font-weight:bold;}
.link_box li .day{margin-top:rem(5);display:flex;}
.link_box li .day span.textright{text-align:right;}
.link_box li .mymoney{border-top:1px dashed #ccc; margin-top:rem(10); padding-top:rem(10);text-align:right;}
.sharpbtn{ background:#fff;padding:rem(15) 0;position:absolute;bottom:0;}
.sharpbtn a{width:60%;height:rem(35);line-height:rem(35); text-align:center; margin:auto; background:$orange; display:block; color:#fff; border-radius:rem(5)}
</style>
