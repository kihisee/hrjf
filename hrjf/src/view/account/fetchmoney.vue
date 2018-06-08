<template>
<div class="container">
  <heads :title="title" href="/my"></heads>
<div class="cz_contb">
    <div class="form-chongz form-chongzl">
        <span class="left_one">可用金额：</span>
        <p class="fcz_p"><span>{{state.basset.Balance}}</span>元</p>
    </div>
</div>
<div class="cz_cont" id="chongzhi">
    <div class="form-chongz form-chongzl">
        <span class="left_one">提现金额</span>
        <input type="text" name="rechargeMoney" id="rechargeMoney" placeholder="请输入提现金额"  v-model="money"  v-on:input ="checkmoney()">
        <span class="cz_yuan">元</span>
    </div>
        <div class="form-group form-chongz form-chongzl">
    <span class="left_one">提现卡号</span>
    <span class="left_bank" :style="background" style="width:12%">
    </span>
                 <p class="bank_p" style="width:auto">
                     <span class="fir_bank">{{bankname}}</span>
                     <span class="sco_num" v-if="isBindBank">尾号（{{bankcode.substr(bankcode.length-4,bankcode.length)}}）</span>
                 </p>

    </div>
</div>

<div class="cz_cont">

    <div class="form-chongz form-chongzl form-group" style="border:none">
        <span class="left_one">交易密码</span>
        <input id="PayPassword" name="PayPassword" placeholder="请输入交易密码" style="width: 55%;" type="password"  v-model="password">
        <router-link :to="'/setpaypsw'" class="wangjimima">
        忘记密码?
        </router-link>
    </div>
</div>





    <div class="main_alert_box">
        <div class="main_box">
            <h1>提现说明</h1>
            <div class="content" style="height:65%;overflow-y:auto;">
        <p class="putong">1、用户所充值资金未进行其他投资，且存入活期宝不超过48小时，提现时需要收取提现资金1%的手续费； </p>
        <p class="putong">2、单笔提现金额低于100元的，收取每笔2元的小额提现手续费。</p>
            </div>

        </div>
<div class="fin_wen cz_fin">

    <div class="div_zh">
        <a href="javascript:;" class="lijitou" @click="submityibao()">确定提现</a>
    </div>
</div>
</div>

</div>
</template>

<script>
import heads from '../../components/head';
export default {
  data () {
    return {
        title:"提现",
        background:"",
        bankstyle:"",
        bankname:"",
        bankcode:"",
        bankid:"",
        open:true,
        checkbox:true,
        money:"",
        state:this.$store.state,
        password:"",
        isPayPassword:false,
        isBindBank:true
    }
  },
  methods:{
        checkmoney(){
               if(this.money !=''&& this.money.substr(0,1) == '.'){
                    this.money="";
                }
        this.money = this.money.replace(/^0*(0\.|[1-9])/, '$1');
        this.money = this.money.replace(/[^\d.]/g,"");
        this.money = this.money.replace(/\.{2,}/g,".");
        this.money = this.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        if(this.money.indexOf(".")< 0 && this.money !=""){
            if(this.money.substr(0,1) == '0' && this.money.length == 2){
                this.money= this.money.substr(1,this.money.length);
            }
        }


        },
        submityibao(){
            let _this =this
            if(this.money==""){
                 _this.$msg.alert("请输入提现金额")
                 return
            }
            if(this.money<=0){
                 _this.$msg.alert("请输入正确的提现金额")
                 return
            }
            if(this.money>this.state.basset.Balance){
                _this.$msg.alert("提现金额不能大于余额")
                 return
            }

            _this.checkmoneypsw()
            // if(this.banktype==2){
            //     this.$http(this.$api.YePayWithDraw({"amount":this.money,"paypwd":this.password,"yePayVersion":1.0}))
            //     .then((data) => {
            //         if(data.data.ResultCode==100000){
            //             _this.$msg.alert(data.data.ResultMessage,function(){
            //                 _this.$store.dispatch('basset')
            //                 _this.$router.push('/my')
            //             })
            //         }

            //     });
            // }else if(this.banktype==1){
            //     _this.checkmoneypsw()
            // }
        },
        checkmoneypsw(){
            let _this =this
            this.$http(this.$api.ValidatePayPwd({"PayPwd":this.password}))
                .then((data) => {
                    if(data.data.ResultCode ==100000){
                        this.$http(this.$api.userfetchmoney({"Money":this.money,"Id":this.bankid}))
                        .then((data) => {
                           // _this.$store.dispatch('basset')

                            _this.$msg.alert("提现成功！",function(){
                                _this.$router.push('/my')
                            })
                        });
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
                    }

            });
        },
        showbank(data){
            let _this=this

                let src = "background:url("+data+") no-repeat  0.25rem  center; background-size: 0.75rem;"
                _this.background=src
        },
        getprompt(){
            let ls = window.localStorage
            let getprompt = ls.getItem("fetchprompt")
            if(getprompt){
                this.open = false;
            }
        },
        setprompt(){
            let ls = window.localStorage
            if(this.checkbox){
                ls.setItem("fetchprompt",true)
            }
            this.open = false;
        }
       },
       components:{
    heads
  },
       created :function(){
            let _this=this
            this.$store.dispatch('basset')
          .then(() => {
              this.basset=this.state.basset
        })
            this.getprompt();
            this.$http(this.$api.isPayPassword({}))
            .then((data) => {
                console.log(data.data.ResultData)
                let ispsw = data.data.ResultData ==="false" ? false : true;
                if(ispsw){
                    _this.isPayPassword = true;
                }else{
                    _this.$msg.confirm("提现操作前请先设置支付密码！",function(){
                            _this.$router.push('/setpaypsw')
                         },function(){
                            _this.$router.push('/my')
                         },"取消","去设置")
                         return
                }
            });
            this.$http(this.$api.GetBankCardInfo({}))
            .then((data) => {
                    if(data.data.ResultData.cardInfo.cardStatus!=2){
                        _this.isBindBank = false
                         _this.$msg.confirm("请绑定银行卡再提现！",function(){
                            _this.$router.push('/addbank')
                         },function(){
                            _this.$router.push('/my')
                         },"取消","去绑卡")
                         return
                    }
                     _this.bankid = data.data.ResultData.cardInfo.cardCode
                            _this.bankinfo = data.data.ResultData.cardInfo
                            _this.bankname=data.data.ResultData.cardInfo.bankName
                            _this.bankcode = data.data.ResultData.cardInfo.cardNo
                            _this.phone = data.data.ResultData.cardInfo.cardMobile
                            _this.showbank(data.data.ResultData.cardInfo.BankIcon)
            });


       }
}
</script>

<style lang="scss" scoped>
.cz_contb{background:none;padding-top:0.025rem;margin:0px auto -0.25rem;height:1.25rem;}
.cz_cont {background:#fff;padding-top:0.025rem;margin:0.25rem auto 0;position: relative;}
.form-chongz {width:90%;margin:0px auto;position:relative;}
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
.form-chongz .yunap {float:right;width:10%;height:1.25rem;line-height:1.25rem;}
.form-chongzl {height:1.25rem;}
.form-chongzll {height:3.8rem;}
.form-chongzlld {height:5.25rem;}
.form-chongzka {}
.form-chongzka ul li{border-bottom: 1px solid #d2d2d2;height: 1.25rem;line-height: 1.25rem;}
.form-chongzka .field-validation-error {line-height:1.25rem;color:#999;}
.form-chongzka ul .error-tips {display:block;clear:both;}
.form-chongzka ul li:last-child{border-bottom: none;}
.form-chongz .fcz_p{height: 1.25rem;line-height: 1.25rem;color: #bcbcbc;float: left;width: 60%;text-align: left;text-indent: 1em;}
.form-chongz .fcz_p span{color: #de3132; font-size:0.45rem;}
.form-chongz input {width:65%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.form-chongz .wangjimima {color:#de3132;font-size:0.35rem;}
.form-chongz .left_one{text-indent: 0em;width: 25%;height: 1.25rem;line-height: 1.25rem;}
.left_onse {font-size:0.35rem;color:#606060;}
.form-chongz .left_ones{width:100%;}
.cz_yuan{display: inline-block;width: 10%;font-size: 0.4rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;color: #bcbcbc;}
// .left_bank{display: inline-block;width: 17%;font-size: 0.35rem;float: left;height:1.25rem;background: url(../img/minsheng.png) no-repeat center center;background-size:0.775rem 0.7rem; }
.bank_p{width:80%;float: left;height: 1.25rem;line-height: 1.25rem;text-align: left;color:#626262;text-indent: 0.5em;}
.bank_p span{color:#bcbcbc;padding-left:0px;}
.bank_p .sco_num{padding-left: 0.25rem;font-size:0.35rem;}
.cz_fin{margin-top:0.625rem;width: 100%;line-height: 1.25rem; margin:auto;}
.cz_fins{margin-top:0.125rem;width: 85%;line-height: 1.25rem;}
.cz_fin .div_zh{line-height: 1.25rem;height: 1.25rem;margin-top:rem(30)}
.left_bank{display: inline-block;width: 17%;font-size: 0.35rem;float: left;height:1.25rem; }

// .kaihu{background: url(../img/li_you.png) no-repeat right center;background-size:0.25rem;}
// .gray_lin{height: 1.25rem;line-height:1.25rem;background: url(../img/havetoca.png) no-repeat left center;background-size: 0.5rem;display: none;}
// .gray_lin ul{width: 95%;margin:0 auto;}
.gray_lin ul li{height:1.125rem;line-height: 1.125rem;text-align: left;text-indent: 2.0rem;border-bottom:1px solid #d2d2d2;background: url(/static/img/my//bank_ico.png) no-repeat 0.5rem center;background-size:1.0rem;}
.gray_lin ul li.bank-ny{background-position-y:-1.125rem;}
.gray_lin ul li.bank-gs{background-position-y:0px;}
.gray_lin ul li.bank-js{background-position-y:-2.3rem;}

.gray_lin ul li.bank-jt{background-position-y:-5.95rem;}
.gray_lin ul li.bank-zg{background-position-y:-3.55rem;}
.gray_lin ul li.bank-zy{background-position-y:-10.875rem;background-size:1.125rem;}
.gray_lin ul li.bank-zx{background-position-y:-10.65rem;}
.gray_lin ul li.bank-gd{background-position-y:-10.55rem;background-size:1.325rem;}
.gray_lin ul li.bank-pa{background-position-y:-14.6rem;background-size:1.125rem;}
.gray_lin ul li.bank-yj{background-position-y:-11.85rem;}
.gray_lin ul li.bank-sh{background-position-y:-15.15rem;}
.gray_lin ul li.bank-pf{background-position-y:-8.65rem;}
.gray_lin ul li.bank-ms{background-position-y:-7.0rem;}
/*cmb bank*/
.gray_lin ul li.bank-cmb{background-position-y:-4.75rem;}
.gray_lin ul li.bank-zs{background-position-y:-4.75rem;}
.kaihutop{position: relative;}
.bank_lin{position: absolute;top:1.25rem;left: 0px;z-index: 999;background: #fff;width: 100%;height:5.85rem;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#de3132;text-indent: 0em;padding:0rem;-webkit-appearance: none; border:none; border-radius:rem(5);}
.lijitou{ width:100%; height:1.2rem; line-height:1.2rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;font-size:0.45rem;}
.main_alert_box{padding:rem(20); box-sizing:border-box;}
.main_box h1{margin-bottom:rem(10); border-bottom:1px solid #ccc; color:#de3132; padding-bottom:rem(10);font-size:0.4rem;}
.main_box p{font-size:0.35rem; color:#888; margin-top:rem(10)}
</style>
