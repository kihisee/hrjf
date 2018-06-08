<template>
    <div d="iscroll">
      <div>
          <div  class="tenderdetail_box" style="height: 667px;">
            <div  class="tendermian">
              <div  class="row">
                <p ><span >项目名称：</span>{{Alldata.TenderName}}</p>
              </div>
              <div  class="row">
                <p ><span >现金年化收益：</span><span  class="red">{{(tenderfee*100).toFixed(2)}}%</span></p>
              </div>
              <div  class="row">
                <p ><span >融资金额：</span>￥{{Alldata.Money}}元</p>
              </div>

              <div  class="row">
                <p ><span >剩余可投金额：</span>{{Alldata.Money-prepayMoney}}元</p>
              </div>

              <div  class="row">
                <p ><span >还款方式：</span>{{Alldata.RepayType}}</p>
              </div>
              <div  class="row">
                <p ><span >计息方式：</span>满标当日起息</p>
              </div>
              <div  class="row">
                <p ><span >发布日期：</span>{{Alldata.StartDate}}</p>
              </div>
            </div>
            <div  class="tendermian">
             <div class="row">
           <p><router-link :to="'/porjcetdetail?id='+tenderId+'&fromzero=true'" class="jt2"><i class="r1"></i> 项目简介</router-link></p>
          </div>
          <div class="row">
           <p><router-link :to="'/tenderpaylist?id='+tenderId+'&fromzero=true'" class="jt2"><i class="r2"></i> 投标记录</router-link></p>
          </div>
              <div  class="row">
                <p ><router-link :to="'/tenderAgreement?tendername='+tenderName+'&userday='+userday+'&tenderfee='+tenderfee+'&fromzero=true'" class="jt2"><i class="r3"></i> 投资协议</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import heads from '../../components/head';
import IScroll from 'iscroll'
import dialogd from '../../components/dialogd';
export default {
  data () {
    return {
      Alldata:[],
      TenderDetail:[],
      TenderProportion:0,
      ExtraFee:0,
      pay:0,

      tenderId:0,
      tenderfee:0,
      tenderName:'',
      userday:0,
      prepayMoney:0,
    }
  },
  methods:{


  },
  created:function(){
      let _this = this
      let query= this.$route.query

    console.log(query.tenderId)

    _this.tenderId=query.tenderId
    _this.tenderfee=query.tenderfee
    _this.tenderName=query.tenderName
     _this.userday=query.userday
     _this.prepayMoney=query.prepayMoney

       this.$http(this.$api.querytenderdetail({"Id":query.tenderId})) // 匹配计划标的
      .then((data) => {
        console.log(data)
        _this.Alldata=data.data.ResultData
        //console.log(_this.Alldata)
      });


  },
  components:{

  }
}
</script>
<style lang="scss" scoped>

.nowsubmit a{text-align:center;line-height:1.2rem; color:#fff; font-size:0.45rem;display:block;}
.tendermian{margin-top:rem(10);overflow:hidden;}
.tendermian .row{padding:rem(10) rem(15); background:#fff;border-bottom:1px solid #e1e1e1; overflow:hidden; box-sizing:border-box;}
.tendermian .row p{font-size:0.4rem; margin-top:rem(5);}
.tendermian .row p.title{margin:0;font-weight:bold;}
.tendermian .row .login{width:rem(60);height:rem(30);background:#de3132;line-height:rem(30);color:#fff;text-align:center;display:block;float:right;border-radius:rem(5);}
.tendermian .row .red{color:#de3132;}
.tendermian .row i{height:rem(25); width:rem(25); display:inline-block; margin-right:rem(10); vertical-align:middle;}
.tendermian .row i.r1{@include bg("/static/img/tender/icon_project_protocol.png")}
.tendermian .row i.r2{@include bg("/static/img/tender/icon_project_record.png")}
.tendermian .row i.r3{@include bg("/static/img/tender/icon_project_introduction.png")}
.tendermian .row input::-webkit-input-placeholder{@include sizeColor(0.4rem,#d1d1d1)font-weight:normal;}
.tendermian .row input{border:none; height:rem(30); font-size:0.45rem;}
.tendermian .row a.jt{color:#555;}
.tendermian .row a.jt:after{content:"";display:inline-block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg);}
.tendermian .row a.jt2{color:#555;display:block;}
.tendermian .row a.jt2:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); float:right;}
.tendermian .row span{color:#999}
.gt{margin-top:rem(10);font-size:0.35; text-align:center; color:#d1d1d1}
.gt i{content:"";display:inline-block;margin-right:rem(10); border-top: rem(2) solid; border-right: rem(2) solid; width: rem(10); height: rem(10); transform: rotate(-45deg); vertical-align:middle;}
.tendermian .row  a span.couponcolor{color:#de3132; padding-right:rem(20)}
</style>

