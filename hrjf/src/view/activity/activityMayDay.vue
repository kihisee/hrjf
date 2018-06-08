<template>
    <div class="container">
       <div class="mayday_box">
          <div class="banner"><img src="static/img/activity/kmh/active51_banner.jpg" alt=""></div>
          <div class="main_box">
            <p class="toptitle">您当前增投金额</p>
            <div class="tendermoneyPbox">
              <div class="tendermoney_box">
                 <p v-if="!islogin"><a href="javascript:" class="btn" @click="login">登录</a><span class="login_no">查看您的增投金额</span></p>
                 <p v-else>
                    <span class="login_ok" v-if="tendermoney>1000">{{(tendermoney).toLocaleString()}}</span>
                    <span class="login_ok" v-else>{{tendermoney}}</span>
                    <span class="text">元</span>
                </p>
              </div>
            </div>
            <p class="explain">活动期间增加投资的才是增投，若有标的到期增投金额会减少</p>
            <a href="javascript:" class="gotender" @click="gotenderlist">前往投资</a>
            <div class="table_box">
              <p>补贴金额</p>
                  <table class="u-info">
                        <tr>
                            <td class="title">增投金额（元）</td>
                            <td class="title">劳动补贴金</td>
                        </tr>
                        <tr>
                            <td>5000≤Y＜20000</td>
                            <td>38元</td>
                        </tr>
                        <tr>
                            <td>20000≤Y＜50000</td>
                            <td>88元</td>
                        </tr>
                        <tr>
                            <td>50000≤Y＜100000</td>
                            <td>168元</td>
                        </tr>
                        <tr>
                            <td>100000≤Y＜200000</td>
                            <td>288元</td>
                        </tr>
                        <tr>
                            <td>200000≤Y＜500000</td>
                            <td>688元</td>
                        </tr>
                        <tr>
                            <td>Y≥500000  </td>
                            <td>1288元</td>
                        </tr>
                    </table>
            </div>
            <div class="subexplain">
              <h1>活动规则</h1>
              <ol>
                <li>活动时间：2018年4月30日-5月16日</li>
                <li>参与对象：新老用户</li>
                <li>活动期间用户增投固定理财至少达到5000元，则可以获得劳动补贴金</li>
                <li>Tips1:投资金额越高，劳动补贴金额越高<p>Tips2:从以往固定理财及活期宝转出金额重新投资，转出对应金额不算新增投资</p></li>
                <li>活动结束后3个工作日内，奖励以现金红包的方式发放至个人账户中</li>
                <li>本次活动最终解释权归恒瑞金服所有</li>
              </ol>
            </div>
          </div>
          <div class="footer">*活动最终解释权归恒瑞金服所有*</div>
      </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      title:"51劳动补贴金",
      islogin:false,
      tendermoney:0
    }
  },
  methods:{
    login(){
      this.$lg.applogin()
    },
    gotenderlist(){
          let ver = this.$route.query.ver
          if (ver == 'ios') {
            window.webkit.messageHandlers.Method.postMessage({ "type": "financing" });
          }else if(ver == 'android'){
            android.financing();
          }else{
            this.$router.push('/tender')
          }
    },
    getInviteCode(){
          let _this = this
          let query = this.$route.query
          if(typeof this.$store.state.user ==="undefined"||!this.$lg.isapp()||typeof query.type==="undefined"){
              return
          }
          this.$http(this.$api.getQueryInviteTotal({}))
          .then(function(data){
            _this.share(data.data.ResultData.InviteCode)
         });
      },
      share(InviteCode){
        let _this = this
        let query = this.$route.query
        let obj,subobj
        if(query.type==1){
          obj = this.$api.getbanner({})
          subobj = 1
        }else if(query.type==2){
          obj = this.$api.NoticeAndActivity({})
          subobj = 2
        }else{
          return
        }
        this.$http(obj)
        .then((data) => {
          let dataobj
          if(subobj==1){
              dataobj = data.data.ResultData.List
          }else if(subobj==2){
              dataobj = data.data.ResultData.Activity
          }
           dataobj.forEach(function(v){
              if(query.inviteTitle==v.Title){
                var url = v.InviteUrl;
        　　　　var arrUrl = url.split("//");
        　　　　var start = arrUrl[1].indexOf("/");
        　　　　var relUrl = arrUrl[1].substring(start);
                _this.$share({"title":v.InviteTitle,"href":relUrl+'?i='+InviteCode},false)
              }
           })
        });

      }


  },
  created:function(){
    let _this = this
    this.getInviteCode()
    if(typeof this.$store.state.user ==="undefined"){
        return
     }
     this.islogin = true;
    this.$http(this.$api.ActivityQueryMayDayIncreaseInvestInfo({}))
    .then((data) => {
        if(data.data.ResultCode==100000){
          _this.tendermoney = data.data.ResultData.TenderMoney
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

    })


  },
  beforeDestory() {

  },
  components:{

  }
}
</script>


<style lang="scss" scoped>
.mayday_box{background:#fff7e6;}
.mayday_box .main_box{width:95%; margin:auto;}
.mayday_box .toptitle{font-size:0.45rem; font-weight:bold; color:#967226; margin-top:rem(20); text-align:center;}
.mayday_box .tendermoneyPbox{background:#d1ae35; padding:rem(5); border-radius:rem(5); box-sizing:border-box; margin-top:rem(20);}
.mayday_box .tendermoney_box{background:#967226; border-radius:rem(5); height:rem(40); text-align:center;}
.mayday_box .tendermoney_box a.btn{width:rem(60); height:rem(25); line-height:rem(25); display:inline-block; margin-right:rem(15); background:#fff6cd; color:#967226; font-size:0.4rem; font-weight:bold;border-radius:rem(5); margin-top:rem(8)}
.explain{color:#967226;text-align:center; margin-top:rem(10);}
.gotender{ height:rem(40); line-height:rem(40);text-align:center; color:#6073d4; font-weight:bold; font-size:0.45rem; display:block; background:#fff;border:1px solid #f5c01d; border-radius:rem(5); margin-top:rem(10);}
.mayday_box .tendermoney_box span.login_no{font-size:0.4rem;font-weight:bold;color:#fff6cd;}
.mayday_box .tendermoney_box span.login_ok{font-size:0.45rem;color:#fff6cd; line-height:rem(40);}
.mayday_box .tendermoney_box span.text{font-size:0.4rem; color:#fdad0e;font-weight:bold;}
.table_box p{font-size:0.4rem; text-align:center; color:#967226; margin-top:rem(10);}
.mayday_box table{border-collapse: collapse; width:100%; margin-top:rem(10);background:#fcebb7;}
.mayday_box table td{border:1px solid #e7cd76; padding:rem(8); font-size:0.3rem;text-align:center;font-size:0.35rem;}
.mayday_box table td.title{color:#967226;font-weight:bold;}
.mayday_box ol{list-style:inside;}
.mayday_box ol li{list-style:inside;list-style-type:decimal; font-size:0.35rem; color:#666666;}
.mayday_box ol li p{text-indent:0.4rem;}
.subexplain{margin-top:rem(20);}
.subexplain ol{margin-top:rem(10);}
.footer{height:rem(35); line-height:rem(35); text-align:center; color:#fff; background:#fbc400;margin-top:rem(20);}
</style>