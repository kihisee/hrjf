<template>
<div class="container">
    <heads :title="title"></heads>
    <div class="koulinglist title">
        <ul>
        <li><span>兑换时间</span><span>口令</span><span>优惠券</span></li>
        </ul>
    </div>
  <div class="koulinglist">
        <ul>
        <li v-for="item in list"><span>{{item.CreateTime}}</span><span>{{item.Command}}</span><span>{{item.Money}}</span></li>
        </ul>
    </div>

</div>


</template>

<script>

import heads from '../../components/head'
export default {
  data () {
    return {
      title:"兑换优惠券记录",
      list:""
    }
  },
  methods:{
    submitkouling(){

    }
  },
  created :function(){
    let _this=this

        this.$http(this.$api.GetMyCommandExchangeRecords({"Page":1,"PageSize":100}))
          .then((data) => {
                _this.list= data.data.ResultData.List
                console.log(_this.list)
                _this.list.forEach(function(v,i){
                  if(v.CouponType==2){
                    _this.list[i].Money = v.Money+"元现金红包"
                  }
                  if(v.CouponType==100){
                    _this.list[i].Money = v.Money+"元投资券"
                  }
                  if(v.CouponType==110){
                    _this.list[i].Money = (v.Money*100)+"%加息券"
                  }
                  if(v.CouponType==4){
                    _this.list[i].Money = "双倍加息券"
                  }
                  if(v.CouponType==6||v.CouponType==0){
                    _this.list[i].Money = v.Money+"体验券"
                  }
                })
          })

  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.koulinglist{margin-top:rem(10);}
.koulinglist li{display:flex;text-align:center; background:#fff;padding:rem(10) 0; color:#999}
.title li{color:#333;}
</style>