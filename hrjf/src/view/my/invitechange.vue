<template>
<div class="container">
    <heads :title="title"></heads>
  <div class="hrb2_in_box">
    <ul>
        <li>可兑换奖励余额<span class="red">{{myinvitmoney}}</span>元</li>
        <li><span class="title">兑换金额</span><span><input type="text" placeholder="最小兑换金额100" id="money" style="width:3.75rem;"  v-model="money"></span></li>
    </ul>
</div>
    <div class="btn">
        <a href="javascript:" @click="invitechange()">确认兑换</a>
    </div>
<div class="invitetext_box">
  <p>兑换奖励说明：</p>
  <p>1、奖励兑换成功后直接发放到个人账户的可用余额里；</p>
  <p>2、您可以把兑换的金额用于投资或者提现；</p>
  <p>3、如您兑换奖励遇到任何问题可拨打400-876-0616或者联系在线客服；</p>
</div>
</div>


</template>

<script>

import heads from '../../components/head'
export default {
  data () {
    return {
      title:"兑换奖励",
      money:"",
      myinvitmoney:""
    }
  },
  methods:{
    invitechange(){
        let _this = this


      if(this.money==""){
        this.$msg.alert("请输入兑换金额")
        return
      }
      if(this.money<100){
        this.$msg.alert("兑换金额不能低于100元")
        return
      }
      if(this.money>this.myinvitmoney){
        this.$msg.alert("兑换金额不能大于兑换余额")
        return
      }
      if(typeof this.money.split('.')[1]!="undefined"&&this.money.split('.')[1].length>2){
        this.$msg.alert("兑换金额小数不能大于2位")
        return
      }
        this.$http(this.$api.ChangeInviteReward({"Money":this.money}))
          .then((data) => {
            _this.changemoney()
                _this.$msg.alert(data.data.ResultMessage)
          })
    },
    changemoney(){
        let _this=this

        _this.$http(_this.$api.QueryMyRewardMoneyDetail({}))
          .then(function(data){
            console.log(data.data.ResultData)
            _this.myinvitmoney=data.data.ResultData.CanExcReward
         });
    }
  },
  created :function(){
    this.changemoney()
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.kouling_box{margin-top:rem(20); text-align:center;}
.kouling_box .inputkouling{border:1px solid #de3132;margin-top:rem(10); height:rem(30); border-radius:rem(5);padding-left:rem(10)}
.btn{width:90%; height:rem(40);background:#de3132; border-radius:rem(5); margin:auto; margin-top:rem(20); line-height:rem(40);text-align:center;}
.btn a{display:block; color:#fff; font-size:0.45rem;}
.hrb2_in_box{margin-top: 0.25rem;background-color: #fff;text-align: left;overflow: hidden; }
.hrb2_in_box ul {padding: 0px 0.375rem;box-sizing:border-box;}
.hrb2_in_box li{ border-bottom: 1px solid #f2f2f2;line-height: 1.125rem;overflow: hidden;}
.hrb2_in_box li span.title{ width: 2.2rem;float: left;display: block;text-align: left; font-size:0.40rem}
.hrb2_in_box li span.red{color:#de3132; font-size:0.4rem; font-weight:bold;}
.hrb2_in_box li strong{color: #de3132;padding-right: 0.25rem;font-size:0.40rem;}
.hrb2_in_box li input[type="text"]{ background-color: #fff;border: none;outline: none;font-size: 0.45rem;color: #de3132;font-family: "arial";font-weight: bold;text-align: left;margin-right: 0.25rem;}
input::-webkit-input-placeholder{@include sizeColor(0.4rem,$gray)font-weight:normal;}
.invitetext_box{background:#fff; padding:rem(10); overflow:hidden; box-sizing:border-box; width:95%; margin:auto;margin-top:rem(30)}
</style>