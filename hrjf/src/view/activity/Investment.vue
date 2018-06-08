<template>
   <div id="frame">
    <div id="con" style="margin:0;">
    <div class="nybanner">

      <div class="nycontent">
        <div class="nytext">
            <div class="nymidtext" v-if="loginyn">
                <p class="nymidtop"><span>{{money}}</span>元</p>
                <p class="nymidbot">活动期间您的固定理财增投金额</p>
            </div>

            <div class="nymidtext nymidtexts"  v-if="!loginyn">
                <p class="nymidtops" @click="loginclick()">登录查看你的投资金额</p>
                <p class="nymidbot" @click="loginclick()">马上登录</p>
            </div>
        </div>

       <div class="nyrule">
            <p>活动规则：</p>
            <p>1、活动时间：2018年2月1日-2月23日23：59；</p>
            <p>2、活动期间用户增投资固定理财90天及以上标累计金额至少达到5000元，则可以参与瓜分100万现金；</p>
            <p>3、Tips1:投资金额越高，瓜分大金额现金几率越高；</p>
            <p style="text-indent:1.5em"> Tips2:从30天标及活期宝转出金额投资到固定理财，转出对应金额不算新增投资；</p>
            <p>4、瓜分100万现金时间为：2018年2月24日12:00-22:00； 红包最迟账时间为：2018年2月26日；</p>
            <p>5、瓜分金额为随机瓜分；</p>
            <p>6、本次活动最终解释权归恒瑞金服所有。</p>
        </div>
    </div>




    </div>


  </div>


  </div>
</template>

<script>
import ls from '../../store/lStorage.js'
import config from '../../api/ajax.js'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      title:'跨年赚钱计划，瓜分888万现金',
      userTimes:0,//九宫格抽奖次数
      loginyn:false,//是否登录
       resutlToken:'',
       state:this.$store.state,
       money:0,
    }
  },
  methods:{
    checkAppLogin(){//判断是否APP登录
        let query = this.$route.query
        let _this = this
        if(typeof query.ver=="undefined"){//微信打开
            if(typeof this.state.user=="undefined"){
              return false
            }else{
              return true;//微信已登录

            }
        }else{
            if(query.token){//APP打开
                    _this.resutlToken = query.token;
                    _this.rowlogin = false;
                     if(_this.resutlToken!=""){
                        ls.setItem("_user",{"Token":query.token})
                        this.$store.commit("userinfo")
                      }
                return true;//APP已登录
              }else{
              //console.log(234)
               return false;
              }
        }
      },

     loginclick(){
        let _this=this
           let query = this.$route.query
           _this.$lg.applogin()
          //  if(typeof query.ver=="undefined"){//微信打开
          //      window.top.location.href="/login?back=investment"
          //       }else{
          //         //console.log(4444)
          //         if (query.ver == 'android') {
          //             var resutl = android.SyncLogin();
          //             _this.resutlToken = resutl.toString();
          //             _this.isApp=false;
          //         }
          //         else if (query.ver == 'ios') {
          //             var resutl = window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });

          //             _this.resutlToken = resutl.toString();

          //             _this.isApp=false;
          //         }
          // }
     },

      weixinShare(){
      },
  },


created:function(){
      let _this=this
     let query = this.$route.query
    _this.checkAppLogin()

    if(_this.checkAppLogin()){
        _this.loginyn=true
      this.$http(this.$api.QueryNewYearIncreaseInvestCouponInfo({}))
      .then((data) => {
         console.log(data);
         _this.money=data.data.ResultData.TenderMoney
      })
    }else{
        _this.loginyn=false
    }

_this.weixinShare()
  document.title = "跨年赚钱计划，瓜分888万现金"

},


  beforeDestory() {
      document.title = "恒瑞财富网"
  },
}
</script>


<style lang="scss" scoped>

.nybanner{height:auto;background: url(../../../static/img/chirt/nybanner.jpg) no-repeat center top #f63b35;background-size: 100%;}
.nycontent{width:95%;margin:0 auto;height:auto;padding-top: 7rem;padding-bottom: 0.5rem;}
.nycontent .nytext{width:100%;height:4.9rem;margin:0 auto;background:url(../../../static/img/chirt/nytitle.png) no-repeat center rem(20) #fff2d7;border-radius:0.35rem;padding-top:3rem;background-size: 97%;}
.nycontent .nytext .nymidtext{width:80%;height:4.5rem;margin:0rem auto 0;text-align:center;background:url(../../../static/img/chirt/yellowk.png) no-repeat center top;background-size: 100%;}
.nycontent .nytext .nymidtext .nymidtop{padding-top:0.75rem;font-size:0.75rem;color:#dd3547;}
.nycontent .nytext .nymidtext .nymidtop span{font-size:1.15rem;font-weight: bold;}
.nycontent .nytext .nymidtexts{height:3.8rem;padding-top: 0.7rem;}
.nycontent .nytext .nymidtext .nymidtops{font-size:0.4rem;color:#dd3547;height:1.35rem;line-height:1.35rem;font-weight:bold;width:75%;border:1px solid #fbcc72;margin:0rem auto 0.2rem;}
.nycontent .nytext .nymidtext .nymidbot{width:75%;height:0.75rem;border-radius:0.1rem;background:#f2576a;color:#fff;line-height:0.75rem;margin:0.1rem auto 0;}
.nycontent .nyrule{width:95%;margin:0.5rem auto 0;color:#fff;line-height:0.85rem;font-size:0.4rem;text-align: left;}
</style>