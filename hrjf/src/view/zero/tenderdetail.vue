<template>
<div class="container">
    <!-- <heads :title="title" href="/tender"></heads> -->

    <div class="productpic">
      <img :src="Alldata.icon_max_url" />
    </div>

    <div class="whitedetail">
      <div class="content">

        <p class="toptitle">{{Alldata.name}}</p>

        <div class="number">
          <p class="nleft">市场参考价：{{Alldata.price}}元  现价：0元</p>
          <p class="nright">剩余数量：{{Alldata.remainAmount}}</p>
        </div>

        <p class="touzi">投资金额：<span>{{bpay}}元</span></p>

        <div class="listtime">
          <p>投资期限：</p>
          <ul>
          <li v-for="(item,index) in listtime"  :class="{activeli:index == num}"   @click="tab(index,item.IsEnable)">{{item.day}}天</li>

          </ul>
        </div>

      <div class="circle">
            <div class="leftlist">

                <div class="touzi">
                  <p>额外收益：<span>{{bExtraFee}}元</span></p>
                  <b @click="tanques()">?</b>
                </div>

                <div class="touzi">
                    <p>购买数量：</p>
                     <div class="number">
                              <button class="decrease disabled" @click="decrease()">-</button>
                               <input id="number" type="number" v-model="count">
                               <button class="increase" @click="increase()">+</button>
                    </div>
                </div>
              </div>
                  <div class="jdtbox" @click="gotode()" v-show="IsEnable">
                    <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <circle r="50" cx="50" cy="50" fill="transparent" class="progress-background"></circle>
                      <circle r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="(1-TenderProportion)*dasharray" class="progress-bar"></circle>
                      <g>
                        <text x="50" y="35" text-anchor="middle" fill="#de3132">{{((1-TenderProportion).toFixed(2)*100)}}%</text>
                        <text x="50" y="55" text-anchor="middle" fill="#de3132" font-size="0.45rem">剩余</text>
                        <text x="50" y="75" text-anchor="middle" fill="#333" font-size="0.40rem">查看标的</text>
                      </g>
                    </svg>
                  </div>
        </div>
        <div class="number">
          <input type="checkbox" v-model="checkbox"/>
            <p @click="tenderAgreement()">《投资协议》</p>
        </div>



      </div>


    </div>
    <div class="shpdetail">
          <p class="sdtop">商品详情</p>
          <div class="prodectde" v-html="Alldata.remark"></div>

          <div class="lijitouzi" v-if="IsEnable"><p  @click="gototender()">立即投资</p></div>
          <div class="lijitouzi" v-else><p class="notclick">立即投资</p></div>
      </div>
  <myaddress :allcomdata="allcomdata" class="postop" v-if="postop" @gopostop="getpostop"></myaddress>
</div>


</template>

<script>
import heads from '../../components/head';
import IScroll from 'iscroll'
import dialogd from '../../components/dialogd';
import myaddress from '../../components/activity/myaddress'
export default {
  data () {
    return {
      title:"商品详情",
      listtime:[],
      num:0,

      dasharray:Math.PI * 100,


      Alldata:[],
      needpay:0,
      ExtraFee:0,

      bExtraFee:0,
      bpay:0,

      pay:0,

      TenderDetail:[],

      count:1,

      TenderProportion:0,
      checkbox:true,

      day:0,

      tenderId:0,
      tenderfee:0,
      tenderName:'',
      prepayMoney:0,
      IsEnable:false,

      tender_plan_id:0,

      allcomdata:[],
      postop:false,
    }
  },
  mounted : function() {
    let _this = this;
  },
  methods:{
    tab(index,Etr){
      let _this = this
      let query = this.$route.query

     _this.num = index;
     _this.count=1;

       for(var x in _this.TenderDetail){
          if(_this.TenderDetail[x].day == _this.listtime[index].day){
              console.log(_this.TenderDetail[x])
              _this.ExtraFee=_this.TenderDetail[x].ExtraFee
              _this.bExtraFee=(_this.ExtraFee).toFixed(2)
              _this.pay=(_this.TenderDetail[x].pay).toFixed(2)
              _this.bpay=_this.pay
              _this.TenderProportion=(_this.TenderDetail[x].TenderProportion).toFixed(2)
              _this.day=_this.TenderDetail[x].day
              _this.tenderfee=_this.TenderDetail[x].fee
              _this.tenderName=_this.TenderDetail[x].tenderName
              _this.prepayMoney=_this.TenderDetail[x].prepayMoney

              _this.IsEnable=_this.TenderDetail[x].IsEnable

              _this.tender_plan_id=_this.TenderDetail[x].tender_plan_id

              _this.tenderId=_this.TenderDetail[x].tenderId
          }
      }

    },

    getpostop(msg){
      let _this=this
      _this.postop=msg
    },

    decrease(){
      let _this=this;
      if(_this.count==1){
        _this.count=1;
      }else{
        _this.count--;
        _this.bExtraFee=(_this.ExtraFee*_this.count).toFixed(2)
        _this.bpay= (_this.pay*_this.count).toFixed(2)
      }
    },
    increase(){
      let _this=this;
      _this.count++;
      _this.bExtraFee=(_this.ExtraFee*_this.count).toFixed(2)
      _this.bpay=( _this.pay*_this.count).toFixed(2)

    },

    gototender(){
      let _this = this
      let query = this.$route.query

      console.log(query.tender,_this.count)

      if(!_this.checkbox){
        this.$msg.alert("请先同意投资协议 ")

        return false
      }

      //_this.$router.push('/myaddress?tender_plan_id='+_this.tender_plan_id+'&day='+_this.day+'&investCount='+_this.count+'&name='+_this.Alldata.name+'&pay='+_this.bpay+'&tender='+query.tender)
      this.allcomdata={tender_plan_id:_this.tender_plan_id,day:_this.day,investCount:_this.count,name:_this.Alldata.name,pay:_this.bpay,tender:query.tender}
      _this.postop=true;
      return


    },

    tenderAgreement(){
      let _this = this
      let query = this.$route.query
      _this.$router.push('/tenderAgreement?tendername='+_this.tenderName+'&userday='+_this.day+'&tenderfee='+_this.tenderfee+'&fromzero=true')

    },

    gotode(){
       let _this = this
      let query = this.$route.query
      _this.$router.push('/zerotenderwork?tenderId='+_this.tenderId+'&userday='+_this.day+'&tenderfee='+_this.tenderfee+'&tenderName='+_this.tenderName+"&prepayMoney="+_this.prepayMoney)
    },


     tanques(){
      this.$msg.alert("投标成功后，除商品以外获得的现金收益。")

    },

  },
  created:function(){
      let _this = this
      let query = this.$route.query

      if(typeof this.$store.state.user === 'undefined'){

      }else{//微信已登录
          _this.userphone=this.$store.state.user.MobilePhone
          if(this.$store.state.RealName){
            _this.username=this.$store.state.RealName
          }
      }


       this.$http(this.$api.QueryGoodsTenderList({"tender_plan_id":query.tender,"pday":query.day}))
      .then((data) => {

              _this.Alldata=data.data.ResultData
             _this.TenderDetail= _this.Alldata.TenderDetail
              console.log(data)
             for(var x in _this.TenderDetail){

                _this.listtime.push({"day":_this.TenderDetail[x].day,"IsEnable":_this.TenderDetail[x].IsEnable})
                if(_this.TenderDetail[x].day==query.day){

                    _this.ExtraFee=(_this.TenderDetail[x].ExtraFee).toFixed(2)
                    _this.pay=_this.TenderDetail[x].pay

                    _this.tenderId=_this.TenderDetail[x].tenderId

                    _this.tenderfee=(_this.TenderDetail[x].fee).toFixed(2)
                    _this.tenderName=_this.TenderDetail[x].tenderName
                    _this.prepayMoney=_this.TenderDetail[x].prepayMoney

                    _this.tab(x,_this.TenderDetail[x].IsEnable)
                    _this.TenderProportion=(_this.TenderDetail[x].TenderProportion).toFixed(2)
                }
                // _this.listtime[x].day=_this.TenderDetail[x].day
                // _this.listtime[x].IsEnable=_this.TenderDetail[x].IsEnable

             }

             console.log( _this.listtime)
      })

      if(query.message){
        // this.$http(this.$api.GoodsTenderPay({tender_plan_id:query.tender,investCount:query.investCount}))
        //     .then((data) => {
        //       console.log(data)
        //       if(data.data.ResultCode=100000){
        //         this.$msg.alert(data.data.ResultMessage)
        //       }
        //     })
          this.$msg.alert(query.message,function(){
             //_this.$router.push('/zerotenderdetail?tender='+query.tender+'&day='+query.day)
             //console.log(query.tender,query.day)
             _this.$router.push('/zerotenderdetail?tender='+query.tender+'&day='+query.day)
          })
      }
  },
  components:{
    heads,
    dialogd,
    myaddress,
  }
}
</script>
<style lang="scss" scoped>
.productpic{text-align :center;}
.productpic img{width:50%;margin:rem(10) auto;}
.whitedetail{background:#fff;padding:rem(5) 0;}
.whitedetail .content{width:90%;margin:0 auto;}
.whitedetail .content .toptitle{font-size:rem(15);color:#333333;line-height: rem(45);}
.whitedetail .content .number{font-size:rem(13);color:#666666;line-height: rem(35);height:rem(35)}
.whitedetail .content .number input{float:left;width:auto;display:block;margin-top:rem(12)}
.whitedetail .content .number p{float:left;width:auto;}
.whitedetail .content .number .nleft{float:left;width:65%;}
.whitedetail .content .number .nright{float:right;width:35%;}
.whitedetail .content .touzi{line-height: rem(35);color:#333333;height:rem(35)}
.whitedetail .content .touzi span{color:#df3030;}
.whitedetail .content .touzi p{width:auto;float:left;margin-right:rem(5)}
.whitedetail .content .touzi b{width:rem(15);height:rem(15);line-height:rem(15);border-radius:rem(15);display:block;text-align:center;background:#fff;color:#df3030;border:rem(1) solid #df3030;float:left;margin-top:rem(8)}
.whitedetail .listtime{height:rem(30);line-height:rem(30);}
.whitedetail .listtime p{float:left;width:auto;}
.whitedetail .listtime ul{float:left;width:rem(240);}
.whitedetail .listtime ul li{float:left;width:rem(60);line-height:rem(25);text-align:center;background:#eeeeee;color:#333;border-radius:rem(15);margin:rem(2) rem(5) 0}
.whitedetail .listtime ul li.activeli{background:#df3030;color:#fff;}
.whitedetail .content .touzi .number button{height:rem(22);line-height:rem(22);text-align:center;border-radius:rem(3) 0 0 rem(3);border:rem(1) solid #000;color:#333;background:#fff;float:left;}
.whitedetail .content .touzi .number button.increase{border-radius: 0 rem(3) rem(3) 0;}
.whitedetail .content .touzi .number input{height:rem(20);line-height:rem(20);text-align:center;border:none;border-top:rem(1) solid #333;border-bottom:rem(1) solid #333;padding:0;margin:0;width:rem(60);float:left;}

.circle{position: relative;}
.jdtbox{position:absolute;top: 0;right:0;width:rem(80);height:rem(80); margin-top:rem(10);}
.jdtbox svg{width:rem(80);height:rem(70);font-size:0.55rem;}
.jdtbox circle{stroke-width:0.16rem;transform-origin:center;}
.jdtbox .progress-background{transform:scale(0.9);stroke:#e1e1e1;}
.jdtbox .progress-bar{transform: scale(0.9) rotate(-90deg);stroke: #de3132;}

.shpdetail{border-bottom:rem(1) solid #e8e8e8;color:#333;background:#fff;margin:rem(15) auto;overflow:auto;}
.shpdetail p{height:rem(35);line-height:rem(35);width:90%;margin:0 auto;}
.shpdetail .lijitouzi{width:100%;margin:rem(10) auto 0;background:#fff;text-align:center;color:#fff;font-size:rem(16);position:fixed;bottom:rem(0);left:0;overflow:auto;}
.shpdetail .lijitouzi p{width:90%;margin:rem(10) auto;height:rem(45);line-height:rem(45);background:#df3030;border-radius:rem(5);}
.shpdetail .lijitouzi p.notclick{background:#ccc;}

.prodectde{width:90%;margin:0 auto;}
.prodectde img{width:100%;}

.postop{position: fixed;top:0;left:0;}
</style>

