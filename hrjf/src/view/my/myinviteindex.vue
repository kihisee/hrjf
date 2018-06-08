<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="topbox">
     <router-link :to="'/invitechange'" class="invitechange">兑换奖励</router-link>
    <div class="myinvitenumber"><span>{{inviteTotal.CanExcReward}}</span><p>可兑换奖励（元）</p></div>
 </div>
<div class="usermoney">
  <div class="tendermoney">
  <a href="javascript:" :class="{active:index==1}" @click="tab(1)">
    <span>{{inviteTotal.TotalReward}}</span>
    <p>总奖励（元）</p>
    </a>
  </div>
  <div class="hqbmoney">
  <a href="javascript:" :class="{active:index==2}" @click="tab(2)">
    <span>{{inviteTotal.ExchangeedReward}}</span>
    <p>已兑换奖励（元）</p>
    </a>
  </div>

</div>

<div class="link_box">
  <ul>
    <li v-for="item in list">
      <div class="left">
          {{item.createTime}}
          <p>{{item.remark}}</p>
        </div>
        <div class="right">

          <p v-if="index==1">+<span>{{item.variable}}</span>元</p>
          <p :class="['red',{'green':item.charge_status==2},{'blue':item.charge_status==5}]" v-else><span>{{item.variable}}</span>元</p>
        </div>
      </li>
  </ul>
</div>
<div class="nodata" v-if="list.length==0">
  <div class="img"></div>
  <p>您还没有奖励哦！</p>
</div>



</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
      title:"我的奖励",
      inviteTotal:"",
      list:"",
      index:1
    }
  },
  methods:{
    tab(index){
      if(index==1){
        this.index = 1
        this.changellist()

      }else if(index==2){
        this.totallist()
        this.index = 2
      }
    },
    totallist(){
      let _this=this
      this.$http(this.$api.QueryRewadTradeHistory({"Page":1,"PageSize":100}))
          .then(function(data){
            _this.list=data.data.ResultData.HistoryTradeList
            console.log(_this.list)
         });
    },
    changellist(){
      let _this=this
      this.$http(this.$api.QueryMyInviteRewadDetail({"Page":1,"PageSize":100}))
          .then(function(data){
            _this.list=data.data.ResultData.InviteUserList

         });
    },
  },
  created :function(){
    let _this=this
        _this.$http(_this.$api.QueryMyRewardMoneyDetail({}))
          .then(function(data){
            _this.inviteTotal=data.data.ResultData
         });

        this.changellist()

  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.topbox{text-align:center;color: #fff; background-size: 100%; padding-top: 0.25rem;height:3.3rem; @include bg("/static/img/my/invite/banner2.jpg");background-size:100%;overflow:hidden;}
.topbox a{width:rem(120); height:rem(30); display:block; float:right; margin-right:rem(50); margin-top:rem(30)}
.topbox .myinvitenumber{ width:rem(200); margin-top:rem(20); float:left; font-size:0.4rem;}
.topbox .myinvitenumber span{font-size:0.55rem; color:#de3132; font-weight:bold;}
.topbox .invitechange{background:#de3132; line-height:rem(30); color:#fff; text-align:center; font-size:0.4rem; border-radius:rem(15);}
.usermoney{text-align:center; overflow:hidden; background:#fff;}
.usermoney a{display:block; padding:rem(10) 0;}
.usermoney a.active{border-bottom:2px solid #de3132;}
.usermoney a.active p{color:#de3132;}
.usermoney p{color:#999;}
.usermoney .tendermoney{ float:left; width:49%;}
.usermoney .hqbmoney{float:left; width:49%;}
.usermoney .onborder{border-bottom:none; padding-top:rem(10);}
.usermoney a span{font-size:0.5rem;color:#de3132;}
.link_box{margin-top:rem(5); overflow:hidden;}
.link_box ul{background:#fff;}
.link_box li{ padding:rem(10);overflow:hidden; box-sizing:border-box; border-bottom:1px solid #ccc; width:95%; margin:auto;}
.link_box li .left{}
.link_box li .left p{color:#888}
.link_box li .right p{margin-top:rem(10); font-size:0.4rem; color:#ffbb2a;}
.link_box li .right p span{color:#de3132;}
.link_box li .right p.red{color:#de3132}
.link_box li .right p.green,.link_box li .right p.green span{color:#86d806}

.link_box li .right p.blue,.link_box li .right p.blue span{color:#00abfb}
.nodata {margin:auto;margin-top:rem(50); width:rem(200);}
.nodata .img{width:rem(100); height:rem(100); @include bg("/static/img/my/invite/smile.png");background-size:100%;margin:auto;}
.nodata p{margin-top:rem(20);text-align:center;font-size:0.4rem;}
</style>
