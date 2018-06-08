<template>
<div id="frame">
 <heads :title="title"></heads>

  <div class="contentdiv">

    <div class="jingdu">
      <ul class="circlename">
        <li :class={red:liststatus[0]}>处理中</li>
        <li :class={red:liststatus[1]}>配送中</li>
        <li :class={red:liststatus[2]}>完成交易</li>
      </ul>

      <ul class="circle">
        <li :class={redcircle:liststatus[0]} ></li>
        <p class="line"  :class={redline:liststatus[1]}></p>
        <li  :class={redcircle:liststatus[1]}></li>
        <p class="line"  :class={redline:liststatus[2]}></p>
        <li  :class={redcircle:liststatus[2]} ></li>
      </ul>
    </div>

    <div class="wuliuxx">
        <p class="wordwhere">物流信息：{{listdata.OrderTrack}}</p>
        <p class="checkdetail" @click="gotohit()">查看详情</p>
    </div>

    <div class="ddxx">
       <div class="normal"><p>订单详情:</p><span style="color:#de3031">{{listdata.OrderJDStaute}}</span></div>
       <div class="normal"><p>订单编号:</p><span>{{listdata.OrderID}}</span></div>
       <div class="normal"><p>下单时间:</p><span>{{listdata.OrderTime}}</span></div>
    </div>

  </div>

  <div class="contentdiv">
     <div class="ddxx">
       <div class="normal"><p>兑换积分:</p><span style="color:#de3031">{{listdata.NeedPoint}}</span></div>
       <div class="normal"><p>收货地址:</p><span>{{listdata.Address}}</span></div>
       <div class="normal"><p>收货人:</p><span>{{listdata.Name}}{{listdata.Mobile}}</span></div>
    <!--    <div class="normal"><p>配送方式:</p><span>顺丰快递454521212</span></div> -->
       <div class="line"></div>
       <div class="finalp">如有疑问，请致电客服：400-876-0616</div>
    </div>
  </div>

</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '订单详情',
      state:this.$store.state,

      listdata:[],

      orderid:0,

      liststatus:[false,false,false],
    }
  },
  methods:{
  gotohit(){
      let _this=this
      console.log(_this.orderid)
      _this.$router.push('/wuliudetail?id='+_this.orderid)
    },

  },
  components:{

  },
  created:function(){
     let _this =this
    let query = this.$route.query
     let id=query.item
     _this.orderid=query.item

    this.$http(this.$api.OrderDetails({"id":id}))
    .then((data) => {
          console.log(data)

          _this.listdata=data.data.ResultData;
          for(let i=0;i<_this.listdata.OrderStaute;i++){
            _this.liststatus[i]=true
          }
          console.log(_this.liststatus)

    })
  },
    components:{
    heads,
  }
}
</script>

<style lang="scss" scoped>
.contentdiv{background:#fff;width:95%;margin:rem(10) auto;box-shadow: rem(2) rem(2) rem(2) #ccc;overflow:auto;}
.contentdiv .jingdu{width:90%;margin:0 auto;overflow:auto;border-bottom:rem(1) solid #ccc;}
.contentdiv .jingdu .circlename{display: flex;margin:rem(20) 0 rem(10)}
.contentdiv .jingdu .circlename li{width:33%; justify-content:center ;text-align: center; }
.contentdiv .jingdu .circlename li{color:#888888;font-size:rem(16)}
.contentdiv .jingdu .circlename li.red{color:#de3031}
.contentdiv .jingdu .circle{clear:both;width:75%;margin:0 auto rem(10); height:rem(30)}
.contentdiv .jingdu .circle li,.contentdiv .jingdu .circle p{float:left;}
.contentdiv .jingdu .circle li.redcircle{width:11%;height:rem(30);background:url(../../../static/img/pointstore/dagou.png) no-repeat;background-size:100%;}
.contentdiv .jingdu .circle li{width:11%;height:rem(30);background:url(../../../static/img/pointstore/graydian.png) no-repeat;background-size:100%;}
.contentdiv .jingdu .circle p.redline{width:27%;height:rem(2);margin:rem(13) rem(5) 0;background:#de3031;}
.contentdiv .jingdu .circle p{width:27%;height:rem(2);margin:rem(13) rem(5) 0;background:#c5c5c5;}
.contentdiv .wuliuxx{width:90%;margin:0 auto;line-height: rem(40);font-size:rem(14);border-bottom:rem(1) solid #ccc;height:rem(40)}
.contentdiv .wuliuxx .wordwhere{width:75%;float:left;color:#5e6c7b;text-indent:rem(5);overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.contentdiv .wuliuxx .checkdetail{width:25%;float:right;text-align:right;color:#de3031;}
.contentdiv .ddxx{width:90%;margin:rem(15) auto 0;height:auto;overflow:auto;}
.contentdiv .ddxx div.normal{text-indent:rem(5);line-height:rem(35);color:#9c9c9c;font-size:rem(14);min-height:rem(35);overflow:auto;}
.contentdiv .ddxx div.normal p{width:25%;float:left;}
.contentdiv .ddxx div.normal span{color:#444444;display:block;float:right;width:75%;}
.contentdiv .ddxx .line{height:rem(1);background:#ccc;width:100%;margin:rem(10) auto 0;}
.contentdiv .ddxx .finalp{color:#888888;text-align:right;line-height:rem(40);font-size:rem(12)}
</style>
