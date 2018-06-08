<template>
<div class="container">
        <heads :title="title"></heads>
        <div class="mingx">
            <div class="mingxT">
                <p class="mx_tzje" style="font-size:0.4rem">{{tendetaildata.TenderName}}</p>
                <p class="mx_money">{{(tendetaildata.TenderProfit*tendetaildata.IsDouble).toFixed(2)}}<span>元</span></p>
                <p style="text-align:center; color:#de3132; margin-top:0.2rem;"><span>收益</span></p>
            </div>

            <div class="mytenderdetaillist_one">
                <ul>
                    <li><span>投资金额</span><span>{{tendetaildata.PrepayMoney}}元</span></li>
                    <li class="f3"><span>现金年化收益</span><span>{{tendetaildata.TenderFee*100}}%</span></li>
                    <li><span>投资期限</span><span>{{tendetaildata.UserDay}}</span></li>
                    <li class="f3"><span>还款方式</span><span>{{tendetaildata.TenderWay}}</span></li>
                    <li><span>起息时间</span><span>{{tendetaildata.StartTime}}</span></li>
                    <li class="f3"><span>到息时间</span><span>{{tendetaildata.EneTime}}</span></li>
                    <li><span>投资协议</span> <span><router-link :to="'/tenderAgreement?ordercode='+ordercode"></router-link></span></li>



                </ul>
            </div>
            <div class="mytenderdetaillist_tow">
                <h1><i></i>还款明细</h1>
                <ul>
                    <li v-for="item in feelist"><span>{{item.LastTime}}</span><span class="textleft">{{item.FeeStatus}} {{item.Money.toFixed(2)}}元<i v-if="item.IsOverdue==1" @click="alertdata('预期'+item.OverdueDays+'天')">逾</i></span></li>
                </ul>
            </div>
        </div>
</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"交易详情",
      tendetaildata:[],
      feelist:[],
      ordercode:''
    }
  },
  methods:{
    alertdata(data){
      this.$msg.alert(data)
    }
  },
  created :function(){
    let _this = this
    let query = this.$route.query
    this.ordercode = query.ordercode
    this.$http(this.$api.getquerymytenderdetail({"OrderCode":query.ordercode}))
      .then((data) => {
        console.log(data.data.ResultData)
        _this.feelist=data.data.ResultData.FeeList
        _this.tendetaildata=data.data.ResultData.TenderDetail
      });
  },
  components:{
    heads
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mytenderdetaillist_one li,.mytenderdetaillist_tow li{display:flex;align-items:center;justify-content:center; height:0.75rem; line-height:0.75rem;}
.mytenderdetaillist_one li.f3{background:#fff;}
.mytenderdetaillist_tow{background:#fff;}
.mytenderdetaillist_tow h1{height:0.75rem;line-height:0.75rem; color:#de3132;border-bottom:1px solid #ccc;font-size:0.4rem;text-align:left;padding-left:0.25rem}
.mytenderdetaillist_tow h1 i{width:rem(20); height:rem(20); display:inline-block;@include bg("/static/img/my/detailicon.png"); margin-right:rem(10);  vertical-align:middle;}
.mytenderdetaillist_tow li{ height:1rem; line-height:1rem;border-bottom:1px solid #ccc; text-align:center;}
.mytenderdetaillist_one li span{text-align:center;}
.mytenderdetaillist_tow li span.textleft{text-align:left;}
.mytenderdetaillist_one li span a{display:block; width:100%; height:1rem; }
.mytenderdetaillist_one li span a:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(50); color:#d1d1d1;}
.mytenderdetaillist_tow li i{width:rem(20); height:rem(20); display:inline-block; border-radius:50%; background-color:#de3132; color:#fff; text-align:center;line-height:rem(20); font-size:0.2rem;font-style:normal; margin-left:rem(10)}
.mingx .mingxT { @include bg("/static/img/my/icon_detailFancing.png"); padding: 0.375rem 0 0.75rem; color: #fff;  height:2.5rem;}
.mingx .mx_tzje { text-align: center; font-size: 0.35rem; color:#000; margin-top:rem(10); }
.mingx .mx_money { text-align: center; font-size: 0.5rem;  margin-top:rem(30);color:#de3132}
.mingx .mx_money span { font-size: 0.4rem; }
.mingx .wordfirst { line-height: 1.25rem; height: 1.25rem; border-bottom: #d2d2d2 solid 1px; }
.mingx .wordfirst span{font-size:0.4rem}
.mingx .wordmid { line-height: 1.0rem; height: 1.0rem; }
.mingx .wf_le { color: #bcbcbc; width: 27%; float: left; text-align: left; text-indent: 1em; }
.mingx .wf_ri { color: #666666; width: 73%; float: left; text-align: left; }
</style>
