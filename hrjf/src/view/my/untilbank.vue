<template>
<div class="container">
    <heads :title="title"></heads>
<div class="new_bank cz_cont">
        <ul>
            <li style="position:relative;">
                <span class="left_one add_card">银行卡号：</span>
                <span>{{bankinfo.bankName}} 尾号（{{bankcode}}）</span>

            </li>
            <li style="position:relative;">
            <span class="left_one add_card">开户省：</span>
               <span>{{bankinfo.cardProvince}}</span>
            </li>
            <li style="position:relative;">
                <span class="left_one add_card">开户市：</span>
                <span>{{bankinfo.cardCity}}</span>
            </li>

       <div class="cz_cont" style="margin-top:0">
            <div class="form-chongz form-chongzl form-group" style="border-bottom:1px solid #ccc;border-top:none;">
                <span class="left_one" style="width:25%">手机号码</span>
                <input id="MobileVCode" placeholder="" type="tel" v-model="phone" v-if="showphone">
                <span class="duiqi" style="border:none" v-else>{{mobile}}</span>
                <input type="button" class="yzmwz" value="修改" @click="changephone()">
            </div>
        </div>
        <div class="cz_cont">
            <div class="form-chongz form-chongzl form-group" style="border:none">
                <span class="left_one" style="width:25%">验证码</span>
                <input id="MobileVCode" placeholder="请输入验证码" type="tel" v-model="vcode">
                <input type="button" :class="color" :value="timerCodeMsg" v-bind:disabled="dis" @click="getvcode()">
            </div>
        </div>

        </ul>

    </div>
    <a href="javascript:" id="submitBtn" class="next" @click="send()">确定解绑</a>
    <div style="width:90%;margin:auto;margin-top:1rem;">
        <span style="color:#de3132">注：如银行预留手机号有更改，请修改手机号码再提交解除绑定</span>
    </div>
</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
        title:"解绑银行卡",
        phone:"",
        smsId:"",
        smsData:"",
        vcode:"",
        timerCodeMsg:"获取验证码",
        sendMsgDisabled :true,
        time:60,
        dis:false,
        color:"yzmwz",
        state:this.$store.state,
        bankinfo:"",
        bankcode:"",
        showphone:false,
        mobile:""
    }
  },
  methods:{
        checkinput(){
            let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
            let rephone = /^1[34578]\d{9}$/; //手机号码
            let rebank = /^\+?[1-9][0-9]*$/;
            if(this.showphone){
             if(this.phone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }
            if(!rephone.test(this.phone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
          }
          if(this.vcode==""){
                this.$msg.alert("请输入验证码！")
                return false
            }
            return true
        },
        changephone(){
            this.showphone = !this.showphone
        },
        getvcode(){
            let _this =this
            if(!this.showphone){
                this.phone = this.bankinfo.cardMobile
            }
            this.$http(this.$api.MobileVCode({"mobile":this.phone,"type":105}))
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
        send(){
            let _this = this
            if(!this.checkinput()){
                return
            }
            if(!this.showphone){
                this.phone = this.bankinfo.cardMobile
            }
            this.$http(this.$api.BankDelete({"cardCode":this.bankinfo.cardCode,"vcode":this.vcode,"smsId":this.smsId,"smsData":this.smsData,"cardMobile":this.phone}))
            .then(function(data){
                if(data.data.ResultCode==100000 ){
                    _this.$msg.alert("解绑成功！",function(){
                        _this.$router.push('/mybank')
                    })
                }else{
                     _this.$msg.alert("解绑请求已受理，如解绑成功将删除此卡，如未成功请确认信息无误后重试。",function(){
                        _this.$router.push('/mybank')
                     })
                }
            })

        },

       },
   created :function(){
    let _this=this
            this.$http(this.$api.GetBankCardInfo({}))
            .then(function(data){
                    _this.bankinfo = data.data.ResultData.cardInfo
                    let cardno = data.data.ResultData.cardInfo.cardNo
                     _this.bankcode=cardno.substr(cardno.length-4,cardno.length)
                    let cardMobile = data.data.ResultData.cardInfo.cardMobile
                    _this.mobile = (cardMobile).substr(0,3)+'****'+(cardMobile).substr(cardMobile.length-4,cardMobile.length)
                    console.log(_this.bankinfo)
            })
   },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.cz_cont {background:#fff;padding-top:0.025rem;margin:0.25rem auto 0;position: relative;}
.bank_namag .tip-sure{ font-family:"微软雅黑"; margin:0.5rem auto;color:#4f4f4f;}
.new_bank ul{ width:90%; margin:0 auto;}
.new_bank ul li{ border-bottom: 1px solid #d2d2d2;height: 1.25rem;line-height: 1.25rem;}
.new_bank ul li:last-child{ border-bottom:none;}
.add_card{ text-indent:0; width:30%; color:#626262;}
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
select#DetailBankName{ width:70%;height:0.75rem; border-radius:0.125rem; outline: none;}
select.BankName{ width:70%; height:0.75rem; border-radius:0.125rem; outline: none;}
select#BankProvID{ width:35%; height:0.75rem; border-radius:0.125rem; outline: none;}
select#BankCityID{ width:34%; height:0.75rem; border-radius:0.125rem; outline: none;}
select.BankName option{ font-size:14px}

input#UserName,input#CardNo,input#ConfirmCardNo,input#IdCard,input#MobilePhone{ width: 70%;height: 0.75rem;line-height: 0.75rem;padding: 0.25rem 0;margin: 0px;border: none;text-indent: 1em;outline: 0;float: left;font-size: 0.35rem;}
.form-group {width:100%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#de3132;text-indent: 0em;padding:0rem;-webkit-appearance: none; border:none; border-radius:rem(5);}
.form-group .yzmwz_bd{position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#e1e1e1;text-indent: 0em;padding:0rem;}

.form-group input,.form-group span.duiqi{width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.next{ width:80%; height:1.0rem; line-height:1.0rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;font-size:0.45rem;}
.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#de3132;text-indent: 0em;padding:0rem;-webkit-appearance: none; border:none; border-radius:rem(5);}
.form-group .yzmwz_bd{position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#e1e1e1;text-indent: 0em;padding:0rem;border-radius:rem(5);}
</style>
