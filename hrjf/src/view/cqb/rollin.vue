<template>
<div id="frame">
  <heads :title="title"></heads>
  <div class="hrb2_in_box">
    <ul>
        <li><span class="title">账户余额</span><span class="one"><strong id="userMoney">{{state.basset.Balance}}</strong>元</span><router-link :to="'/charge'" class="cz">充值</router-link></li>
        <li><span class="title">活期宝余额</span><span><strong id="ktMoney">{{hqbMoeny}}</strong>元</span></li>
        <li><span class="title">转入金额</span><span><input type="text" placeholder="转入金额不低于100" id="money" style="width:3.75rem;"  v-model="money" @focus="isfocus()">元</span></li>


    </ul>


</div>
<div class="xieyi"><input type="checkbox" v-model="ischeckbox"><router-link :to="'/hqbAgreement'">已阅读并同意《活期宝投资协议》</router-link></div>

<div class="goin"><input type="button" value="确认转入" @click="submithrb()"></div>


</div>
</div>

</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '活期宝转入',
      state:this.$store.state,
      tendermoney:0,
      money:"",
      openbtn:"",
      tongyi:true,
      diain:false,
      hqbMoeny:0,
      ischeckbox:false
    }
  },

  mounted : function() {

  },
  methods:{
    isfocus(){
      this.money=""
    },
    submithrb(){
      let _this=this
      if(!this.ischeckbox){
        this.$msg.alert("请阅读并同意《活期宝投资协议》")
        return
      }
      if(this.money==""){
        this.$msg.alert("请输入转入金额")
        return
      }
      if(this.money<100){
        this.$msg.alert("转入金额不能低于100元")
        return
      }
      if(this.money>this.state.basset.Balance){
        this.$msg.alert("账户余额不足，请充值！")
        return
      }
      // console.log(this.money % 100)
      // if(this.money % 100!=0||this.money<=0){
      //   this.$msg.alert("转入金额必须为100倍数")
      //   return
      // }
      this.$http(this.$api.HQBRollIn({"Money":this.money,"TerminalType":2}))
      .then((data) => {
        if(data.data.ResultCode==100000){
            _this.$http(this.$api.HQBqueryhrbasset({}))
            .then((data) => {
              _this.basset = data.data.ResultData;
            })
            _this.$msg.alert("转入成功",function(){
              _this.$router.push('/cqbindex')
            })
        }
       });
    },

  },
  created:function(){
    let _this = this;
    this.$store.dispatch('basset')
          .then(() => {
              this.basset=this.state.basset
    })
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
.xieyi input{margin-left:rem(10);}
.xieyi {margin-top:rem(20); }
.xieyi a{color:#de3132;font-size:0.4rem;}
</style>