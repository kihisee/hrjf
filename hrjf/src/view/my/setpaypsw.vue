<template>
<div class="container">
  <heads :title="title"></heads>
<div id="loginForm">
<div class="navpsw" v-if="setpay"><a href="javascript:" :class="{active:index==1}" @click="tab(1)">修改</a><a href="javascript:" :class="{active:index==2}" @click="tab(2)">重置</a></div>
<div class="forget_box" v-if="index==1">
        <ul>
            <li class="reg_cont reg_conts" v-if="setpay">
                <div class="form-group top-group">
                    <span class="left_one">原密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="原密码" v-model="orgpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="设置新密码" v-model="newpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="确认新密码" v-model="againpassword">
                </div>
            </li>

            <li><a href="javascript:" class="btn" @click="send()">确认提交</a></li>
        </ul>
    </div>
</div>
<div class="forget_box" v-if="index==2">
        <ul>
            <li class="reg_cont reg_conts">
                <div class="form-group top-group">
                    <span class="left_one">手机号码</span>
                    <span class="password_new">
                    {{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(7,11)}}
                    </span>

                </div>
            </li>
            <li class="reg_cont reg_conts">
                <vincode :MobilePhone="state.user.MobilePhone" :types="4" v-on:getcode="getvcode"></vincode>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="设置新密码" v-model="newpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="确认新密码" v-model="againpassword">
                </div>
            </li>

            <li><a href="javascript:" class="btn" @click="send()">确认提交</a></li>
        </ul>
    </div>
</div>


</div>
</template>

<script>
import vincode from '../../components/vcode'
import heads from '../../components/head';
export default {
  data () {
    return {
        title:"设置交易密码",
        state:this.$store.state,
        orgpassword:"",
        newpassword:"",
        againpassword:"",
        vcode:"",
        index:1,
        setpay:false
    }
  },
  methods:{
    tab(index){
        console.log(index)
        this.index=index
    },
    checkinput(){
            //let cpsw= /^([\d]?[a-zA-Z]?[@()!#$%^&*()-_=~{}?]?){8,20}$/;
            let cpsw=/[\u4e00-\u9fa5]/g;
            let gpsw = /[\s]/g
            if(this.newpassword==""){
                    this.$msg.alert("请输入新密码！")
                    return false
            }
            if(cpsw.test(this.newpassword)||gpsw.test(this.newpassword)||this.newpassword.length<8||this.newpassword.length>20){
                this.$msg.alert("密码长度为8-20位字符!")
                return false
            }
            if(this.againpassword==""){
                    this.$msg.alert("请输入确认密码！")
                    return false
            }
            if(this.againpassword!=this.newpassword){
                    this.$msg.alert("密码不一致！")
                    return false
            }
            if(this.setpay){
                if(this.vcode==""){
                    this.$msg.alert("请输入手机验证码！")
                    return false
                }
            }
            return true
    },
        send(){
            let _this = this
            let obj = {}
            if(!this.checkinput()){
                return
            }
            if(this.setpay){
                obj.PayPwd = this.newpassword;
                obj.MobileVCode = this.vcode;
                obj.TerminalType=2;

            }else{
                obj.PayPwd = this.newpassword;
                obj.OrgPayPassword = this.orgpassword;
                obj.TerminalType=2;
            }

              this.$http(this.$api.setpaypsw(obj))
                    .then(function(data){
                    if(data.data.ResultCode==100000){
                        _this.$msg.alert("设置交易密码成功",function(){
                            _this.$router.push('/my')
                        })
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
                    }
              })

        },
        getvcode(data){
          this.vcode=data
        },
       },
 created :function(){
    let _this =this
    this.$http(this.$api.isPayPassword({}))
      .then((data) => {
        if(data.data.ResultData=="true"){
          _this.setpay=true;
          _this.title="修改交易密码"
        }

      });
  },
  components:{
    vincode,
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
.password_new{float: left;width: 70%;text-align: left;padding-left: 0.25rem;  box-sizing: border-box; font-size:0.4rem}

.forget_box .reg_conts {padding:0px;}
.forget_box li {min-height:auto;line-height:0px;}
#VCode {width:30%;height:0.75rem;margin:0px;border:none;font-size:0.35rem;box-shadow:none;}

span.field-validation-error{line-height:0.325rem!important;display:block;}

span.field-validation-valid {line-height:0px;display:block;}

.form-group input.newinnput {border:none !important;box-shadow:none;}

.form-chongz .right_onedl {text-indent:1em;text-align:center;line-height:50px;display:block;float:left;width:70%;color:#999;}

.forget_box .phone_bind_numb {line-height:50px;color:#333;text-align:center;font-weight:normal;}
.next{ width:60%; height:1.0rem; line-height:1.0rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;}
.next a{ color:#fff; font-size:0.4rem;display:block}
.forget_box{ font-size:0.35rem; min-height:0.75rem; line-height:0.75rem;}
.forget_box h1{ text-align:center; background-color:#FFF; border-bottom:1px solid #f4f4f4;}
.forget_box h1 span{ color:#FF3533;}
.forget_box li{min-height:1.0rem; line-height:1.0rem; padding:0.2rem; width:auto; overflow:hidden;}
.forget_box li a.btn{height:1.0rem; width:90%; text-align:center; line-height:1.0rem; display:block; background-color:#de3132; color:#FFF;border-radius:0.125rem; margin:auto;}
.forget_box .yzmwz{width: 30% !important; margin: 0.25rem 0; line-height: 0.75rem;height:0.75rem;padding:0;text-indent:0;float:none;display:inline-block;}
.navpsw{ width:rem(150); margin:auto; border:1px solid #de3132; margin-top:rem(10); margin-bottom:rem(10);display:flex;border-radius:rem(5); }
.navpsw a{display:block;text-align:center; color:#de3132;height:rem(25); line-height:rem(25);}
.navpsw a.active{background:#de3132;color:#fff;}
</style>
