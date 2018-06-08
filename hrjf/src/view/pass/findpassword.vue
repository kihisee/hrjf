<template>
<div class="container">
  <heads :title="title"></heads>
<div id="loginForm">
<div class="forget_box">
        <ul>
            <li class="reg_cont reg_conts">
                <div class="form-group top-group">
                    <span class="left_one" style="width:39%;">注册时的手机号码</span>
                    <input class="newinnput" id="Mobile" name="Mobile" placeholder="" style="width:51%;" type="text" v-model="oldphone">

                </div>
                <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">验证码</span>
                    <input autocomplete="off" class="duihuang_yz newinnput"  id="VCode" name="VCode" placeholder="" type="text" v-model="vcode">
                    <input type="button"  v-on:click="send"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis">

                </div>
                <p class="error-tips">
                    <span class="field-validation-valid"></span>
                </p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" v-model="newpassword">
                </div>
                    <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" v-model="againpassword">
                </div>
                    <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li><a href="javascript:" class="btn" id="submitBtn" @click="sendfind()">确认</a></li>
        </ul>
    </div>
</div>


</div>
</template>

<script>
import ls from '../../store/lStorage.js'
import heads from '../../components/head';
export default {
  data () {
    return {
      title:"忘记密码",
        oldphone:"",
        vcode:"",
        newpassword:"",
        againpassword:"",
        sendMsgDisabled :true,
        timerCodeMsg:"获取验证码",
         time:60,
        dis:false
    }
  },
  methods:{
        send(){
            let me = this
            let rep = /^1[34578]\d{9}$/;
            if(this.oldphone==""){
                this.$msg.alert("手机号码不能为空！")
                return false
              }
            if(!rep.test(this.oldphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
              this.$http(this.$api.vcode({"MobilePhone":me.oldphone,"type":5}))
                    .then(function(data){
                    console.log(me.oldphone);
                    if(data.data.ResultCode !=100000 ){
                          me.$msg.alert(data.data.ResultMessage,function(){
                            console.log(data.data.ResultCode)
                    })
                    }else{
                        console.log(data)
                        me.sendMsgDisabled = true
                        let interval = window.setInterval(function() {
                          if ((me.time --) <= 0) {
                            me.time = 60
                            me.sendMsgDisabled = false
                            me.timerCodeMsg="获取验证码";
                            window.clearInterval(interval)
                            me.dis=false
                          }else{
                            me.timerCodeMsg=me.time+'秒后获取'
                            me.dis=true
                          }
                        }, 1000)
                    }
                   })
        },
        checkinput(){
              let rep = /^1[34578]\d{9}$/;
              let cpsw= /^(\w){8,20}$/;
              if(this.oldphone==""){
                this.$msg.alert("手机号码不能为空！")
                return false
              }
            if(!rep.test(this.oldphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
              if(this.vcode==""){
                this.$msg.alert("验证码不能为空！")
                return false
              }
              if(this.newpassword==""){
                this.$msg.alert("新密码不能为空！")
                return false
              }
              if(this.newpassword != this.againpassword){
                this.$msg.alert("密码不一致")
                return false
                }
              if(!cpsw.test(this.newpassword)||!cpsw.test(this.againpassword)){
                this.$msg.alert("密码长度为8-20位字符！")
                return false
              }
              return true
            },
        sendfind(){
            let me = this
            if(!this.checkinput()){
                return
            }
                this.$http(this.$api.findpass({"MobilePhone":me.oldphone,"MobileVCode":me.vcode,"NewPassword":me.newpassword,"TerminalType":1,"type":5}))
                    .then(function(data){
                    if(data.data.ResultCode !=100000 ){
                          me.$msg.alert(data.data.ResultMessage,function(){
                            console.log(data)
                    })
                    }else{
                         ls.clear()
                        me.$router.push('/login')
                    }
                   })

        }
       },
components:{

    heads
  },
}
</script>

<style lang="scss" scoped>
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
.reg_cont {background:#fff;padding-top:0.025rem;}
.reg_contfir {margin-top:0px;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.top-group {border-top:none;}
.form-group input {width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.password_new{float: left;width: 70%;text-align: left;padding-left: 0.25rem;  box-sizing: border-box; font-size:0.4rem;}

.forget_box .reg_conts {padding:0px;}
.forget_box li {min-height:auto;line-height:0px;}
#VCode {width:30%;height:0.75rem;margin:0px;border:none;font-size:0.35rem;box-shadow:none;}

span.field-validation-error{line-height:0.325rem!important;display:block;}

span.field-validation-valid {line-height:0px;display:block;}

.form-group input.newinnput {border:none !important;box-shadow:none;}

.form-chongz .right_onedl {text-indent:1em;text-align:center;line-height:50px;display:block;float:left;width:70%;color:#999;}

.forget_box .phone_bind_numb {line-height:50px;color:#333;text-align:center;font-weight:normal;}

.forget_box{ font-size:0.35rem; min-height:0.75rem; line-height:0.75rem;}
.forget_box h1{ text-align:center; background-color:#FFF; border-bottom:1px solid #f4f4f4;}
.forget_box h1 span{ color:#FF3533;}
.forget_box li{min-height:1.0rem; line-height:1.0rem; padding:0.2rem; width:auto; overflow:hidden;}
.forget_box li a.btn{height:1.0rem; width:90%; text-align:center; line-height:1.0rem; display:block; background-color:#de3132; color:#FFF;border-radius:0.125rem; margin:auto; font-size:0.4rem; margin-top:rem(10);}
.forget_box .yzmwz{width: 30% !important; margin: 0.25rem 0; line-height: 0.75rem;height:0.75rem;padding:0;text-indent:0;float:none;display:inline-block;}
.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#de3132;text-indent: 0em;padding:0rem;}
.form-group .yzmwz_bd{position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#e1e1e1;text-indent: 0em;padding:0rem;}

</style>
