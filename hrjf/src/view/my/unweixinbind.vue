<template>
<div class="container">
 <heads :title="title"></heads>
<div class="phone_bind">
        <ul class="reg_cont">
            <li class="form-group top-group">
                <span class="left_one">登录密码</span>
                <input class="duihuang_tex newinnput" type="password" placeholder="请输入登录密码！" v-model="password">
            </li>
        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" id="nextBtn" @click="unbind()">确认解绑</a></div>
    </div>


</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"解绑微信账号",
      password:"",
    }
  },
   methods:{

   unbind(){
    let _this=this

    this.$http(this.$api.ajaxwxunbind({"Token":this.password}))
      .then((data) => {
          if(data.data.ResultCode==100000){
              _this.$msg.alert("解绑微信账号成功",function(){
                  _this.$router.push('/my')
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
    heads
  }
}
</script>
<style lang="scss" scoped>
/*解绑微信*/
/**注册页**/
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
.reg_cont {background:#fff;padding-top:0.025rem;}
.reg_contfir {margin-top:0px;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.top-group {border-top:none;}
.form-group input {width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.password_new{float: left;width: 70%;text-align: left;padding-left: 0.25rem;  box-sizing: border-box; font-size:0.4rem}

.forget_box .reg_conts {padding:0px;}
.forget_box li {min-height:auto;line-height:0px;}

.next{ width:60%; height:1.2rem; line-height:1.2rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;}
.next a{ color:#fff; font-size:0.45rem;display:block}
</style>
