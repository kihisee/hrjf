<template>
<div class="container">
    <heads :title="title"></heads>
    <div class="success_box">
      <div class="icon"></div>
      <div class="successtext">抱歉，绑卡失败！</div>
      <router-link :to="'/addbank'">重新绑卡</router-link>
      <router-link :to="'/my'" class="back">返回</router-link>
    </div>

</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"绑定银行卡失败",

    }
  },
   methods:{

  },
  created:function(){
    let _this = this

  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.container{height:100%; background:#fff;}
.success_box{padding:rem(20); box-sizing:border-box; overflow:hidden; margin-top:rem(30);}
.success_box .icon{width:rem(80);height:rem(80);@include bg("/static/img/my/icon_fail.png");  margin:auto;}
.successtext{font-size:0.45rem; text-align:center; margin:rem(20) 0;}
.success_box a{width:95%; margin:auto; margin-top:rem(30); display:block; height:rem(45); line-height:rem(45); text-align:center; color:#fff; background-color:#de3132; border-radius:rem(5); font-size:0.45rem;}
.success_box a.back{color:#de3132;border:1px solid #de3132; background:none;}
.subtext{margin-top:rem(20);text-align:center;color:#888;}
</style>