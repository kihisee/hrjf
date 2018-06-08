<template>
   <div id="frame">
    <div id="con" style="margin:0;">
    <div class="nybanner">

      <div class="nycontent">
        <div class="nytext">

            <div class="nymidtext nymidtexts">
                <p class="nymidbot" @click="shareclick()">立即下载APP，参与瓜分红包</p>
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



     shareclick(){
        let _this=this
           let query = this.$route.query

          let browser = {
            versions: function () {
                let u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }


          if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
              var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                      //在微信中打开
              }
              if (ua.match(/WeiBo/i) == "weibo") {
                      //在新浪微博客户端打开
              }
              if (ua.match(/QQ/i) == "qq") {
                      //在QQ空间打开
              }
              if (browser.versions.ios) {
                      //是否在IOS浏览器打开
                     window.location.href ="https://itunes.apple.com/cn/app/id1178579593?mt=8"
              }
              if(browser.versions.android){
                      //是否在安卓浏览器打开
                      window.location.href ="http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
              }
      } else {
              //否则就是PC浏览器打开
      }



     },
  },


created:function(){
      let _this=this
     let query = this.$route.query

  document.title = "跨年赚钱计划，瓜分888万现金"

},


  beforeDestory() {
      document.title = "恒瑞财富网"
  },
}
</script>


<style lang="scss" scoped>

.nybanner{height:auto;background: url(../../../static/img/chirt/nybanner.jpg) no-repeat center top #f63b35;background-size: 100%;}
.nycontent{width:95%;margin:0 auto;height:auto;padding-top: 7rem;padding-bottom:0.5rem;}
.nycontent .nytext{width:100%;height:2rem;margin:0 auto;background:url(../../../static/img/chirt/nytitle.png) no-repeat center rem(20) #fff2d7;border-radius:0.35rem;padding-top:3rem;background-size: 97%;}
.nycontent .nytext .nymidtext{width:80%;height:2.5rem;margin:0rem auto 0;text-align:center;}
.nycontent .nytext .nymidtext .nymidtop{padding-top:0.75rem;font-size:0.75rem;color:#dd3547;}
.nycontent .nytext .nymidtext .nymidtop span{font-size:1.15rem;font-weight: bold;}
.nycontent .nytext .nymidtexts{height:2rem;padding-top: 0rem;}
.nycontent .nytext .nymidtext .nymidtops{font-size:0.4rem;color:#dd3547;height:1.35rem;line-height:1.35rem;font-weight:bold;width:75%;border:1px solid #fbcc72;margin:0rem auto 0.2rem;}
.nycontent .nytext .nymidtext .nymidbot{width:88%;height:1.2rem;border-radius:0.1rem;background:#f2576a;color:#fff;line-height:1.2rem;margin:0rem auto 0;font-size:rem(18)}
.nycontent .nyrule{width:95%;margin:0.5rem auto 0;color:#fff;line-height:0.85rem;font-size:0.4rem;text-align: left;}
</style>