<template>
<div class="container">
  <heads :title="title" v-show="fromzero"></heads>
  <div class="xjh">
    <div class="box">
        <p class="text">{{detail}}</p>
    </div>

  </div>

</div>

</template>

<script>
import heads from '../../components/head'
export default {
  name: 'porjcetdetail',
  data () {
    return {
      title:"项目简介",
      detail:"",
      fromzero:true,
    }
  },
  created:function(){
    let _this = this
    let q = this.$route.query

    if(q.fromzero){
      _this.fromzero=!(q.fromzero)
    }

    this.$http(this.$api.querytenderdetail({"Id":q.id})) // 匹配计划标的
      .then((data) => {
        _this.detail = data.data.ResultData.TenderProfile
        console.log(data.data.ResultData)
      });
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.xjh{
  box-sizing:border-box;
  padding:0.25rem 0.25rem 0px 0.25rem;
  overflow:hidden;
  position: relative;left: 0px;z-index: 0;margin-bottom: 1.25rem;text-align:center;
}
.xjh .box{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555}
.xjh .box p.text{padding:0rem 0.5rem 0.25rem 0.5rem;box-sizing: border-box;line-height:0.75rem;text-align:left; font-size:0.35rem;}

</style>