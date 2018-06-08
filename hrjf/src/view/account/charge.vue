<template>
<div class="login_wrap">
<heads :title="title" href="/my"></heads>
<div class="cz_cont" style="margin-top:0">
   <div class="form-chongz form-chongz form-group" style="border:none;height:auto;line-height:normal;padding-bottom:0.5rem;overflow:hidden">
    <span class="left_bank" :style="background" style="width:12%">
    </span>
                 <p class="bank_p" style="width:80%">
                     <span class="fir_bank" style="color:#555; font-size:0.4rem">{{bankname}}</span>
                     <span class="sco_num" style="float:right;width:auto;color:#555; font-size:0.4rem" v-if="isBindBank">尾号({{bankcode}})</span>
                 </p>
                <p style="overflow:hidden" v-if="isBindBank"><span style="float:right;width:auto;font-size:0.4rem;color:#bcbcbc;padding-right:0.7rem">单笔{{bankinfo.TranferLimit}} 单日{{bankinfo.TransferDayLimit}} 单月{{bankinfo.TranferMonthLimit}}</span></p>
    </div>
</div>
<div class="cz_contb">
    <div class="form-chongz form-chongzl">
        <span class="left_one">可用金额：</span>
        <p class="fcz_p"><span>{{state.basset.Balance}}</span>元</p>
    </div>
</div>
<div class="cz_cont" id="chongzhi">
    <div class="form-chongz form-chongzl">
        <span class="left_one">充值金额</span>
        <input type="text" name="rechargeMoney" id="rechargeMoney" placeholder="请输入充值金额" v-on:input ="checkmoney()"  v-model="money">
        <span class="cz_yuan">元</span>
    </div>

</div>

<div class="cz_cont">
    <div class="form-chongz form-chongzl form-group" style="border:none"><span class="left_one" style="width:25%">验证码</span> <input id="MobileVCode" placeholder="请输入验证码" type="tel" v-model="vcode"> <input type="button" :class="color" :value="timerCodeMsg" v-bind:disabled="dis" @click="getvcode()"></div>
</div>

<div class="cz_contb" v-show="mobileshow">
    <div class="form-chongz form-chongzl">
        <p class="fcz_p" style="width:100%">验证码已发送到您的手机{{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(state.user.MobilePhone.length-4,state.user.MobilePhone.length)}}</p>
    </div>
</div>

<div class="fin_wen cz_fin">

    <div class="div_zh">
        <a href="javascript:;" class="lijitou" @click="submityibao()">确定充值</a>
    </div>
</div>
<div>
        <router-link :to="'/transfer'" style="text-align:center;color:#de3132;font-size:0.40rem;margin-top:0.25rem;text-decoration:underline; display:block">
                线下转账
        </router-link></div>
<!-- <div v-if="open">
    <div class="black_bg"></div>
    <div class="main_alert_box">
        <div class="main_box">
            <h1>充值说明</h1>
            <div class="content">
            <p>1. 您充值的资金若未或投资就提现，第三方支付公司会收取您提现金额的1%作为转账费用，且当日充值金额若发起的提现，次日到账。节假日顺延工作到账。</p>
            <p>2. 请尽量使用储蓄卡进行充值，并确认您的银行卡开通了网上银行业务</p>
            <p>3. 快捷支付充值每人单笔最高额度6万、单日最高额度30万</p>
            <p>4. 如需加快到账或长时间未到账可拨打：4008-055-066 或联系在线客服</p>
            </div>
            <div class="bottombtn">
                <a href="javascript:" @click="setprompt()">我知道了</a>
                <input type="checkbox" v-model="checkbox"/>不再弹出
            </div>
        </div>
    </div>
</div> -->
</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
        title:"充值",
        background:"",
        bankstyle:"",
        bankname:"",
        bankcode:"",
        vcode:"",
        color:"yzmwz",
        money:"",
        phone:"",
        RealName:"",
        smsId:"",
        smsData:"",
        bankinfo:{
            TranferLimit:"",
            TransferDayLimit:"",
            TranferMonthLimit:"",
        },
        state:this.$store.state,
        open:true,
        checkbox:true,
        mobileshow:false,
        banktype:1,
        timerCodeMsg:"获取验证码",
        sendMsgDisabled :true,
        time:60,
        dis:false,
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
                 _this.$msg.alert("请输入充值金额")
                 return
            }
            if(this.vcode==""){
                 _this.$msg.alert("请输入手机验证码")
                 return
            }

                this.$http(this.$api.HFRecharge({"cardNo":this.bankinfo.cardNo,"bankName":this.bankinfo.bankName,"realName":_this.RealName,"cardMobile":this.phone,"vcode":this.vcode,"smsId":this.smsId,"smsData":this.smsData,"money":this.money,"terminalType":2}))
                .then((data) => {
                    if(data.data.ResultCode ==100000 ){
                        // _this.$msg.alert(data.data.ResultMessage,function(){
                        //     _this.$store.dispatch('basset')
                        //      _this.$router.push('/my')
                        // })
                        _this.$store.dispatch('basset')
                        _this.$router.push('/chargesuccess')
                    }

                });

        },
        getvcode(){
            let _this =this
            this.$http(this.$api.MobileVCode({"mobile":this.phone,"type":201}))
            .then((data) => {
                if(data.data.ResultCode !=100000 ){
                    _this.$msg.alert(data.data.ResultMessage)
                }else{
                    console.log(data.data.ResultData)
                    _this.sendMsgDisabled = true
                    _this.smsId = data.data.ResultData.smsId
                    _this.smsData = data.data.ResultData.smsData
                    let interval = window.setInterval(function() {
                      if ((_this.time --) <= 0) {
                        _this.time = 60
                        _this.sendMsgDisabled = false;
                        _this.timerCodeMsg="获取验证码";
                        window.clearInterval(interval)
                        _this.dis=false
                        _this.color="yzmwz"
                      }else{
                        _this.timerCodeMsg=_this.time+'秒后获取'
                        _this.dis=true
                        _this.color="yzmwz_bd"
                      }
                    }, 1000)
                  }
            });
        },
        getprompt(){
            let ls = window.localStorage
            let getprompt = ls.getItem("chargeprompt")
            if(getprompt){
                this.open = false;
            }
        },
        setprompt(){
            let ls = window.localStorage
            if(this.checkbox){
                ls.setItem("chargeprompt",true)
            }
            this.open = false;
        },
        getuserinfo(){
            let _this = this
             this.$http(this.$api.getuserinfoTotal({}))
             .then((data) => {
                console.log(data.data)
                _this.RealName = data.data.ResultData.RealName
            });
        }
       },
       created :function(){
        let _this=this
        this.$store.dispatch('basset')
          .then(() => {
              this.basset=this.state.basset
        })

            this.$http(this.$api.GetBankCardInfo({}))
            .then((data) => {
                    if(data.data.ResultData.cardInfo.cardStatus!=2){
                        _this.bankname="未绑定银行卡"
                        _this.isBindBank = false
                        _this.background = "background:url(/static/img/my/icon_8.png) no-repeat  0.25rem  center; background-size: 0.75rem;"
                         _this.$msg.confirm("请绑定银行卡后充值！",function(){
                            _this.$router.push('/addbank')
                         },function(){
                            _this.$router.push('/transfer')
                         },"线下转账","去绑卡")
                         return
                    }
                            _this.getprompt()
                            _this.getuserinfo()
                            _this.bankinfo = data.data.ResultData.cardInfo
                            _this.bankname=data.data.ResultData.cardInfo.bankName
                            let cardno = data.data.ResultData.cardInfo.cardNo
                            _this.bankcode=cardno.substr(cardno.length-4,cardno.length)
                            _this.phone = data.data.ResultData.cardInfo.cardMobile
                            let src = "background:url("+data.data.ResultData.cardInfo.BankIcon+") no-repeat  0.25rem  center; background-size: 0.75rem;"
                            _this.background=src
                            // bankname.forEach(function(value) {
                            //     if(value.bankname==data.data.ResultData.cardInfo.bankName){
                            //         _this.bankstyle=value.bankstyle
                            //         let src = "background:url(static/img/banklogo/"+_this.bankstyle+".png) no-repeat  0.25rem  center; background-size: 0.75rem;"
                            //         _this.background=src
                            //     }
                            // });


            });

       },
    components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
/**充值**/
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
.form-chongz .fcz_p{height: 1.25rem;line-height: 1.25rem;color: #bcbcbc;float: left;width: 60%;text-align: left;text-indent: 1em;font-size:0.35rem;}
.form-chongz .fcz_p span{color: #de3132; font-size:0.45rem;}
.form-chongz input {width:65%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.form-chongz .wangjimima {color:#333;font-size:0.35rem;}
.form-chongz .left_one{text-indent: 0em;width: 25%;height: 1.25rem;line-height: 1.25rem;}
.left_onse {font-size:0.35rem;color:#606060;}
.form-chongz .left_ones{width:100%;}
.cz_yuan{display: inline-block;width: 10%;font-size: 0.4rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;color: #bcbcbc;}
// .left_bank{display: inline-block;width: 17%;font-size: 0.35rem;float: left;height:1.25rem;background: url(../img/minsheng.png) no-repeat center center;background-size:0.775rem 0.7rem; }
.bank_p{width:80%;float: left;height: 1.25rem;line-height: 1.25rem;text-align: left;color:#626262;text-indent: 0.5em;}
.bank_p span{color:#bcbcbc;padding-left:0px;}
.bank_p .sco_num{padding-left: 0.25rem;font-size:0.35rem;}
.cz_fin{margin-top:0.625rem;width: 90%;line-height: 1.25rem; margin:auto;}
.cz_fins{margin-top:0.125rem;width: 85%;line-height: 1.25rem;}
.cz_fin .div_zh{line-height: 1.25rem;height: 1.25rem; margin-top:rem(30)}
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
.form-group .yzmwz_bd{position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#e1e1e1;text-indent: 0em;padding:0rem;border-radius:rem(5);}

.lijitou{ width:100%; height:1.2rem; line-height:1.2rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;font-size:0.45rem;}
</style>
