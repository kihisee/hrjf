<template>
<div class="login_wrap">

   <heads :title="title" href="/my"></heads>
<div v-if="isBindBanklist">
<!-- <div class="bank_namag">
    <ul>
        <li>
            <ul>
                <li>
                    <div class="card-list">
                        <i :class="bankstyle"></i>
                        <span class="word">
                            <span>{{bankname}}</span>&nbsp;尾号（{{bankecode}}）
                        </span>

                    </div>
                </li>
            </ul>

        </li>
    </ul>
</div>
<p class="warm-tip">温馨提示：为提高您的资金安全性，现已不能删除和变更提现银行卡，如您确需变更，请联系客服热线：4008-760-616。</p> -->
     <div class="bank_box" @click="goaddbank">
        <p class="bankname"><i :class="bankstyle"></i>建设银行</p>
        <p class="bankcode"><i></i>**** **** **** {{bankecode}}</p>
    </div>
    <div class="text">
        ▪ 温馨提示
        <p>
            <span class="blue" v-if="cardStatus==6">认证中</span>
            <span class="lv" v-if="cardStatus==2">已认证</span>
            <span class="red" v-if="cardStatus==3">认证失败</span>
            <span class="red" v-if="cardStatus==1">未认证</span>
        </p>
    </div>
</div>
<div class="add-card" v-if="isBindBank">
        <router-link :to="'/addbank'">
            <p>
                添加银行卡
            </p>
        </router-link>
</div>


</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
        title:"绑定银行卡",
        isBindBank:false,
        isBindBanklist:false,
        bankname:"",
        bankecode:"",
        bankstyle:"",
        cardStatus:""
    }
  },
  methods:{
    goaddbank(){
        if(this.cardStatus==2){
            this.$router.push('/untilbank')
        }else{
            this.$router.push('/addbank')
        }
    }
  },
  created :function(){
    let _this =this
    let bankname = [
    {bankname:"邮政储蓄",bankstyle:"bank-psbc"},
    {bankname:"浦发银行",bankstyle:"bank-spdb"},
    {bankname:"民生银行",bankstyle:"bank-cmbc"},
    {bankname:"招商银行",bankstyle:"bank-cmb"},
    {bankname:"建设银行",bankstyle:"bank-ccb"},
    {bankname:"广发银行",bankstyle:"bank-gdb"},
    {bankname:"平安银行",bankstyle:"bank-pab"},
    {bankname:"工商银行",bankstyle:"bank-icbc"},
    {bankname:"华夏银行",bankstyle:"bank-hxb"},
    {bankname:"农业银行",bankstyle:"bank-abc"},
    {bankname:"兴业银行",bankstyle:"bank-cib"},
    {bankname:"光大银行",bankstyle:"bank-cebb"},
    {bankname:"交通银行",bankstyle:"bank-boco"},
    {bankname:"中信银行",bankstyle:"bank-ecitic"},
    {bankname:"中国银行",bankstyle:"bank-china"},
    ]
    this.$http(this.$api.GetBankCardInfo({}))
      .then((data) => {
        console.log(data.data.ResultData)
        //cardStatus==2 已认证 //cardStatus==3 认证失败 //cardStatus==6 认证中
        if(!data.data.ResultData.hasCard){
            _this.isBindBank=true;
            _this.isBindBanklist=false
        }else{

                            _this.isBindBank=false;
                            _this.isBindBanklist=true
                            _this.bankname=data.data.ResultData.cardInfo.bankName
                            let cardno = data.data.ResultData.cardInfo.cardNo
                            _this.bankecode=cardno.substr(cardno.length-4,cardno.length)
                            _this.cardStatus = data.data.ResultData.cardInfo.cardStatus
                            //_this.bankstyle = 'background:url('+data.data.ResultData.cardInfo.BankIcon+') no-repeat;background-size:100%;'
                            bankname.forEach(function(value) {
                                if(value.bankname==data.data.ResultData.cardInfo.bankName){
                                    _this.bankstyle=value.bankstyle
                                }
                            });
        }
      });
  },
    components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.bank_namag .card-list{ width:90%; height:1.5rem; line-height:1.5rem; margin:0 auto; background:#fff; margin-bottom:0.5rem; border-bottom:0.025rem solid #a1a1a1; color:#a1a1a1; border-radius:0.125rem; font-family:"微软雅黑";}

.bank_namag .card-list i{ background:url(/static/img/my/bank-logoo.png) no-repeat; height:1.0rem;float:left;line-height:1.0rem; margin-top:0.25rem; background-size:74%}
.bank_namag .card-list .word{height:1.5rem; float:left; }

.bank_namag .card-list i{width:15%; margin-left:10%;}
.bank_namag .card-list .word{ width:58%; font-size:0.4rem}
.bank_namag ul li ul li:first-child .card-list{ margin-top:0.5rem;}
.add-card{width:90%; height:1.5rem; line-height:1.5rem; margin:0 auto;margin-bottom:0.25rem; border-bottom:1px solid #a1a1a1; color:#a1a1a1; border-radius:0.125rem; font-family:"微软雅黑"; background:#fff; margin-top:0.625rem}
.add-card p{height:1.5rem; line-height:1.5rem; margin:0 auto; text-align:right; width: 35%;background:url(/static/img/my/add.png) no-repeat left center;  background-size:0.575rem 0.575rem; font-size:0.40rem}

.add-card a{ color:#a1a1a1;}
p.warm-tip{ width:90%; margin:0 auto; text-align:left; text-align:justify; font-family:"微软雅黑"; font-size:0.4rem}


.bank_box{ width:90%; height:2rem;  margin:0 auto; background:#fff; margin-bottom:0.5rem; border-bottom:0.025rem solid #a1a1a1; color:#a1a1a1; border-radius:0.125rem; font-family:"微软雅黑"; margin-top:rem(20)}
.bank_box p.bankname{background:#fe752f; height:1rem;border-top-left-radius::0.125rem;border-top-right-radius::0.125rem; line-height:1rem; color:#fff; font-size:0.4rem;}
.bank_box p.bankname i{width:rem(30);height:rem(30); display:inline-block; vertical-align:middle; margin-left:rem(20); margin-right:rem(20);}
/*浦发银行*/
.bank_box p.bankname i.bank-spdb{background:url(/static/img/my/banklogo/bank-spdb.png) no-repeat; background-size:100% 100%;}
/*工商银行*/
.bank_box p.bankname i.bank-icbc{background:url(/static/img/my/banklogo/bank-icbc.png) no-repeat; background-size:100% 100%;}
/*招商银行*/
.bank_box p.bankname i.bank-cmb{ background:url(/static/img/my/banklogo/bank-cmb.png) no-repeat; background-size:100% 100%;}
/*交通银行*/
.bank_box p.bankname i.bank-boco{background:url(/static/img/my/banklogo/bank-boco.png) no-repeat; background-size:100% 100%;}
/*平安银行*/
.bank_box p.bankname i.bank-pab{background:url(/static/img/my/banklogo/bank-pab.png) no-repeat; background-size:100% 100%;}
/*广发银行*/
.bank_box p.bankname i.bank-gdb{background:url(/static/img/my/banklogo/bank-gdb.png) no-repeat; background-size:100% 100%;}
/*建设银行*/
.bank_box p.bankname i.bank-ccb{background:url(/static/img/my/banklogo/bank-ccb.png) no-repeat; background-size:100% 100%;}
/*农业银行*/
.bank_box p.bankname i.bank-abc{background:url(/static/img/my/banklogo/bank-abc.png) no-repeat; background-size:100% 100%;}
/*光大银行*/
.bank_box p.bankname i.bank-cebb{background:url(/static/img/my/banklogo/bank-cebb.png) no-repeat; background-size:100% 100%;}
/*中信银行*/
.bank_box p.bankname i.bank-ecitic{background:url(/static/img/my/banklogo/bank-ecitic.png) no-repeat; background-size:100% 100%;}
/*中国银行*/
.bank_box p.bankname i.bank-china{background:url(/static/img/my/banklogo/bank-china.png) no-repeat; background-size:100% 100%;}

/*邮政储蓄*/
.bank_box p.bankname i.bank-psbc{ background:url(/static/img/my/banklogo/bank-psbc.png) no-repeat; background-size:100% 100%;}
/*民生银行*/
.bank_box p.bankname i.bank-cmbc{ background:url(/static/img/my/banklogo/bank-cmbc.png) no-repeat; background-size:100% 100%;}
/*华夏银行*/
.bank_box p.bankname i.bank-hxb{ background:url(/static/img/my/banklogo/bank-hxb.png) no-repeat; background-size:100% 100%;}
/*兴业银行*/
.bank_box p.bankname i.bank-cib{ background:url(/static/img/my/banklogo/bank-cib.png) no-repeat; background-size:100% 100%;}
.bank_box p.bankcode{height:1rem;font-size:0.4rem;line-height:1rem;}
.bank_box p.bankcode i{width:rem(30);height:rem(30); display:inline-block; vertical-align:middle; margin-left:rem(20); margin-right:rem(20);background:url(/static/img/my/bankcoder_icon.jpg) no-repeat; background-size:100%; margin-top:rem(5);}
.text{ width:90%; margin:auto; margin-top:rem(20); color:#de3132; font-size:0.4rem;}
.text p{ margin-top:rem(10);padding-top:rem(10); border-top:1px solid #ccc;}
.text p span.lv{color:#7bd41b;}
.text p span.red{color:#de3132;}
.text p span.blue{color:#065ff3;}
</style>
