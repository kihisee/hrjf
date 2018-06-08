<template>
<div class="container">
 <heads :title="title"></heads>
<div class="list_box">
  <ul>
    <li v-for="(item,index) in list.InviteUserList">
      <div class="left">
        {{item.realName}}
        <p>注册时间：{{item.createTime}}</p>
      </div>
      <div class="right">
        <p v-if="item.sumVariable<=0">您暂未获得奖励</p>
        <p v-else>您已获得奖励<span>{{item.sumVariable}}</span>元</p>
      </div>
    </li>
  </ul>
</div>

</div>
</template>

<script>
import heads from '../../components/head'


export default {
  data () {
    return {
      title:"我的邀请奖励",
      list:""
    }
  },
  methods:{
    getdata(){
        let _this=this;
       this.$http(this.$api.QueryMyInviteRewad({"Page":this.page,"PageSize":100}))
      .then((data) => {
      //console.log(data.data.ResultData)
      _this.list = data.data.ResultData
      });
    }
  },
  created :function(){
    this.getdata()

  },
  destroyed() {

  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.list_box {overflow:hidden; box-sizing:border-box;}
.list_box li{background:#fff; padding:rem(10);overflow:hidden; box-sizing:border-box; margin-top:rem(10);}
.list_box li .right p{margin-top:rem(10); font-size:0.4rem; color:#ffbb2a}
.list_box li .right p span{color:#de3132; font-weight:bold;}
</style>
