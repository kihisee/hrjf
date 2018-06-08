<template>
<div class="container">
  <heads :title="title"></heads>
<div id="loginForm">
<div class="forget_box">
        <ul>
            <li class="reg_cont reg_conts">
                <div class="form-group top-group">
                    <span class="left_one" style="width:20%">原密码</span>
                    <input class="newinnput" name="Mobile" placeholder="原密码" type="password" v-model="oldpassword">

                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one" style="width:20%">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="设置新密码" v-model="newpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one" style="width:20%">确认密码</span>
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
import ls from '../../store/lStorage.js'
import heads from '../../components/head';
export default {
  data () {
    return {
        title:"修改登录密码",
        oldpassword:"",
        newpassword:"",
        againpassword:"",
    }
  },
  methods:{
        send(){
            let _this = this
            if(this.oldpassword==""){
                this.$msg.alert("请输入原密码")
                return
            }
            if(this.newpassword!=this.againpassword){
                this.$msg.alert("新密码不一致！")
                return
            }
              this.$http(this.$api.updatapaw({"OrgLoginPassword":this.oldpassword,"NewLoginPassword":this.newpassword,"TerminalType":2}))
                    .then(function(data){
                    if(data.data.ResultCode==100000){
                        ls.clear()
                        _this.$store.commit("userinfo")
                        _this.$store.commit("xjhinfo")
                        _this.$msg.alert("设置新密码成功,请重新登录",function(){
                            _this.$router.push('/login')
                        })
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
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
.password_new{float: left;width: 70%;text-align: left;padding-left: 0.25rem;  box-sizing: border-box; font-size:0.4rem}

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
.forget_box li a.btn{height:1.0rem; width:90%; text-align:center; line-height:1.0rem; display:block; background-color:#de3132; color:#FFF;border-radius:0.125rem; margin:auto;}
.forget_box .yzmwz{width: 30% !important; margin: 0.25rem 0; line-height: 0.75rem;height:0.75rem;padding:0;text-indent:0;float:none;display:inline-block;}

</style>
