<template>
<div id="frame">
  <heads :title="title"></heads>
<div class="hrb2_in_box">
    <ul>
        <li><span class="title">活期宝余额</span><span><strong id="userMoney">{{hqbMoeny}}</strong>元</span></li>
        <li><span class="title">转出金额</span><span><input type="text" placeholder="输入转出金额" id="money" style="width:3.75rem;" v-model="money">元</span></li>
    </ul>
</div>

<div class="goin"><input type="button" value="立即转出"  @click="submithrb()"></div>
</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '活期宝转出',
      hqbMoeny:0,
      money:""
    }
  },

  mounted : function() {

  },
  methods:{
     submithrb(){
      let _this=this
      if(this.money==""){
        this.$msg.alert("请输入转出金额")
        return
      }
      if(this.money>this.hqbMoeny){
        this.$msg.alert("转出金额不能大于可转出金额")
        return
      }

      this.$http(this.$api.HQBRollOut({"Money":this.money,"TerminalType":2}))
    .then((data) => {
        if(data.data.ResultCode==100000){
          _this.$http(this.$api.HQBqueryhrbasset({}))
          .then((data) => {
            _this.hqbMoeny = data.data.ResultData.Moeny;
          })
          _this.$msg.alert("转出成功",function(){
            _this.$router.push('/cqbindex')

          })
        }
     });
    }
  },
  created:function(){
    let _this = this;
    this.$http(this.$api.HQBqueryhrbasset({}))
          .then((data) => {
            _this.hqbMoeny = data.data.ResultData.Moeny;
          })
  },
  components:{
heads
  }
}
</script>
<style lang="scss" scoped>
.hrb2_in_box{margin-top: 0.25rem;background-color: #fff;text-align: left;overflow: hidden; }
.hrb2_in_box ul {padding: 0px 0.375rem;box-sizing:border-box;}
.hrb2_in_box li{ border-bottom: 1px solid #f2f2f2;line-height: 1.125rem;overflow: hidden;text-align: right;}
.hrb2_in_box li span.title{ width: 2.5rem;float: left;display: block;text-align: left; font-size:0.40rem}
.hrb2_in_box li span.one{margin-right:rem(10)}
.hrb2_in_box li strong{color: #de3132;padding-right: 0.25rem;font-size:0.40rem;}
.hrb2_in_box li a.cz{ border:1px solid #de3132; color:#de3132; padding:rem(1) rem(8);}
.hrb2_in_box li a.joinmoney{color:#de3132;border: 0.025rem solid #de3132;padding: 0.05rem 0.15rem;border-radius: 0.075rem;width: 0.875rem;height: 0.625rem;display: inline-block;vertical-align: middle;line-height: 0.625rem;text-align: center;margin-left: 0.25rem;}
.hrb2_in_box li input[type="text"]{ background-color: #fff;border: none;outline: none;font-size: 0.45rem;color: #de3132;font-family: "arial";font-weight: bold;text-align: right;margin-right: 0.25rem;}
.goin { width: 95%;margin: auto;}
input::-webkit-input-placeholder{@include sizeColor(0.4rem,$gray)font-weight:normal;}
.goin input{ width: 100%;height: 1.125rem;line-height: 1.125rem;text-align: center;background-color: #de3132;color: #fff;border: none;border-radius: 0.125rem;margin-top: 0.375rem;outline: none;font-size: 0.4rem;font-family: "微软雅黑";}

</style>