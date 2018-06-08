<template>
<div class="container">
    <heads :title="title" showtext="true" text="兑换记录" textlink="/getmycommandexchangerecords"></heads>
    <div class="kouling_box">
        <p>输入口令</p>
        <p><input type="text" value="" v-model="kouling" class="inputkouling"></p>
    </div>
    <div class="btn">
        <a href="javascript:" @click="submitkouling()">确认兑换</a>
    </div>

</div>


</template>

<script>

import heads from '../../components/head'
export default {
  data () {
    return {
      title:"兑换优惠券",
      kouling:""
    }
  },
  methods:{
    submitkouling(){
        let _this = this
        if(this.kouling==""){
          _this.$msg.alert("请输入口令！")
          return
        }
        this.$http(this.$api.ExChangeCommandCoupon({"Command":this.kouling}))
          .then((data) => {
                _this.$msg.alert(data.data.ResultMessage)
          })
    }
  },
  created :function(){
    let _this=this


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
</style>