<template>
<div class="container">
  <heads :title="title" v-show="fromzero"></heads>
  <div class="xjh">
  <div class="text">共{{total}}笔交易</div>
    <div class="box" v-for="item in detailinfo">
        <div class="tenderlistbox">
          <div class="flexone">
          <p>{{item.UserName.substr(0,1)+'***'+item.UserName.substr(item.UserName.length-1,item.UserName.length)}}</p>

          </div>
          <div class="flextow" v-if="item.Money>=10000">￥{{(item.Money/10000).toFixed(2)}}万<p>{{item.CreateTime}}</p></div>
          <div class="flextow" v-else>￥{{item.Money}}<p>{{item.CreateTime}}</p></div>
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
      title: '投标记录',
      detailinfo:{},
      total:"",
      fromzero:true,
    }
  },

  mounted : function() {

  },
  methods:{

  },
  created:function(){
    let _this = this;
    let q = this.$route.query

    if(q.fromzero){
      _this.fromzero=!(q.fromzero)
    }

    this.$http(this.$api.gettenderquerytenderpayer({"Page":1,"PageSize":300,"Id":q.id}))
    .then((data) => {
      console.log(data.data.ResultData)
      _this.total = data.data.ResultData.Total
      _this.detailinfo =data.data.ResultData.List
     });
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.xjh{box-sizing:border-box;padding:0.25rem 0.25rem 0px 0.25rem;overflow:hidden;position: relative;left: 0px;z-index: 0;margin-bottom: 1.25rem;text-align:center;}
.xjh .box{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555}
.xjh .box .tenderlistbox{display:flex;box-sizing: border-box;padding:0.25rem;}
.xjh .box .tenderlistbox .flexone{width:40%; text-align:left; font-size:0.4rem;}
.xjh .box .tenderlistbox .flextow{width:60%;text-align:right;font-size:0.4rem}
.xjh .box .tenderlistbox .flextow p{font-size:0.35rem; color:#999}
.text{text-align:left; margin-top:rem(5); margin-bottom:rem(20); font-size:0.4rem;}
</style>
