<template>
<div class="container">
  <heads :title="title"></heads>
<div class="phone_bind" v-show="oldphonediv">
        <ul class="reg_cont">
            <li style="display:none;" class="form-group"><strong>绑定手机</strong></li>
            <li class="form-group top-group">
                <span class="left_one">原手机号码</span>
                <span class="password_new">
                    {{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(7,11)}}
                </span>
            </li>

            <li style="border-bottom:none;">
                <vincode :MobilePhone="state.user.MobilePhone" types="2" v-on:getcode="getoldvcode"></vincode>
            </li>

        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" id="nextBtn" @click="nextStep()">下一步</a></div>
    </div>
    <div class="phone_bind" id="second-step" v-show="newphonediv">
        <ul class="reg_cont">

            <li>
                <div class="form-group">
                    <span class="left_one">新手机</span>
                    <span class="password_new" style="padding-left:0">
                        <input class="phone_new" placeholder="新手机号" type="text" value="" v-model="newphonebind">
                    </span>

                </div>
            </li>

            <li style="border-bottom:none;">
                <vincode :MobilePhone="newphonebind" types="3" v-on:getcode="getnewvcode"></vincode>
            </li>

        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" @click="submitbindphone()">确认修改</a></div>
    </div>


</div>
</template>

<script>
import vincode from '../../components/vcode'
import heads from '../../components/head';
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title:"修改手机号码",
      state:this.$store.state,
      newphonediv:false,
      oldphonediv:true,
      oldvcode:"",
      newvcode:"",
      newphonebind:""
    }
  },
   methods:{
    getoldvcode(data){
      this.oldvcode=data
    },
    getnewvcode(data){
      this.newvcode=data
    },
   nextStep(){
    let _this=this
    if(this.oldvcode==""){
      this.$msg.alert("验证码不能为空")
      return
    }
    this.$http(this.$api.checkSmsVcode({"MobilePhone":this.state.user.MobilePhone,"MobileVCode":this.oldvcode,"TimeType":2}))
      .then((data) => {
        console.log(data)
        if(data.data.ResultCode==100000){
          _this.newphonediv=true;
          _this.oldphonediv=false;
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });

   },
   submitbindphone(){
    let _this=this
    let rep = /^1[34578]\d{9}$/;
    if(this.newphonebind==""){
        this.$msg.alert("新手机号码不能为空！")
        return false
      }
      if(!rep.test(this.newphonebind)){
        this.$msg.alert("请输入正确的手机号码！")
        return false
      }
      if(this.newvcode==""){
      this.$msg.alert("验证码不能为空")
      return
    }
    this.$http(this.$api.updataphone({"OrgMobilePhone":this.state.user.MobilePhone,"OrgVCode":this.oldvcode,"NewMobilePhone":this.newphonebind,"NewVCode":this.newvcode,"TerminalType":2}))
      .then((data) => {
        if(data.data.ResultCode==100000){
          ls.clear()
          _this.$store.commit("userinfo")
          _this.$store.commit("xjhinfo")
          _this.$msg.alert("修改成功，请重新登录",function(){
             _this.$router.push('/login')
          })
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });
   }
  },
  created:function(){

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
</style>