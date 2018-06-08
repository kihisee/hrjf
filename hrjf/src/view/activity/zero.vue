<template>
    <div class="container">
          <div class="banner">
            <img src="../../../static/img/activity/zero/acbanner.jpg" />
          </div>

          <div class="titletop">0元购专区</div>

          <div class="listul">
            <ul>
              <li v-for="(item,index) in Alldata" @click="gotodetail(item.tender_plan_id,item.day)">
                <p class="toptitle">存{{item.day/30}}个月</p>
                <img :src="item.icon_max_url" />
                <p class="blackgray">{{item.name}}</p>
                <p class="redp"><span class="lightorg">市场价:<span>{{item.price}}</span>元</span><span class="boldp">现价:0元</span></p>
                <p class="zise">存{{item.pay}}元拿走</p>
                <p class="lastp">额外享受收益<span>{{item.extraFee}}</span>元</p>
              </li>

            </ul>
          </div>

            <div class="titletop">0元购规则</div>


            <div class="zerobot">
              <ul>
                <li>1、根据0元购商品所需要的投资金额，通过活动指定投资页面一次性投资，即可以0元获得该商品；  </li>
                <li>2、额外享受的收益按月返回到个人账户，标的到期后返还本金；</li>
                <li>3、用户0元购商品在3个工作日内，将有客服电话联系用户核实收货地址，请保持在平台预留手机号码通讯畅通，商品预计在5个工作日内发货；</li>
                <li>4、0元购商品来源于京东商城，不定时更新，以活动指定页面为准；</li>
                <li>5、商品详情及服务以商品页面为准；</li>
                <li>6、积分商城0元购最终解释权归恒瑞金服所有。</li>
              </ul>
            </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      state:this.$store.state,
      Alldata:[],
    }
  },
  methods:{
    gotodetail(index,day){
      let _this = this
      let query = this.$route.query
      if(typeof this.state.user=="undefined"){
          this.$msg.alert("请先登录!",function(){
              this.$lg.applogin()
            })
      }else{
        this.$router.push('/zerotenderdetail?tender='+index+'&day='+day)
      }

    },
  },
  created:function(){
    let _this = this
    let query = this.$route.query

    this.$http(this.$api.QueryGoodsTenderIndex({pageindex:1,pagesize:6}))
      .then((data) => {
            _this.Alldata=data.data.ResultData.lstGoodsTenderIndex
            console.log(_this.Alldata)
      })
  },
  beforeDestory() {
  },
  components:{

  },
}
</script>


<style lang="scss" scoped>
.container{background:#4f1e82;}
.titletop{background:url(../../../static/img/activity/zero/titlebg.png) no-repeat center top;height:rem(40);width:100%;text-align: center;background-size:80%;line-height: rem(40);color:#fff;margin:rem(15) 0; }
.listul{width:90%;margin:0 auto;height:auto;overflow:auto;}
.listul li{width:49%;float:left;background:url(../../../static/img/activity/zero/listlibg.png) no-repeat center top;height:rem(250);background-size:100%;margin:rem(10) 0;text-align:center;}
.listul li:nth-child(2n){float:right;}
.listul li .toptitle{text-indent: rem(10);color:#fff;text-shadow:rem(1) rem(1) rem(1) #333;font-size:rem(12);height:rem(30);text-align:left;}
.listul li img{width:50%;}
.listul li .blackgray{color:#333333;display: block;width:90%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin:0 auto;}
.listul li .boldp{color:#ff0303;}
.listul li .redp{color:#ff6262;}
.listul li .lightorg{font-size:rem(12)}
.listul li .lightorg span{text-decoration: line-through;}
.listul li .zise{width:80%;margin:rem(5) auto;height:rem(25);line-height:rem(25);background:url(../../../static/img/activity/zero/bottonbg.png) no-repeat center top;background-size:100%;color:#fff;}
.listul li .lastp{color:#333333;}
.listul li .lastp span{color:#ff0303;}
.zerobot{background:url(../../../static/img/activity/zero/bottombg.jpg) no-repeat center bottom;background-size:100%;}
.zerobot ul{width:90%;margin:0 auto;color:#fff;line-height:rem(25);padding: rem(0) 0 rem(150)}
</style>