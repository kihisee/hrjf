<template>
<div class="containerNav">
 <heads :title="title" lefticon="static/img/my/manage.png" imgstyle="width:0.5rem" showicon="true" righticon="static/img/my/msg.png" href="/mysettings" textlink="/msglist" :msgicon="newmsg"></heads>

<div class="per_top">
    <div class="per_money">
        <p class="money_top">总资产(元)</p>
        <p class="p_money" v-if="basset.TotalMoney>=1000">{{(basset.TotalMoney).toLocaleString()}}</p>
        <p class="p_money" v-else>{{basset.TotalMoney}}</p>
        <!-- <a :href="hxhref" class="hxbtn">{{hxbtn}}</a> -->
    </div>
    <ul class="per_topb">
        <li class="tips_fir">
            <p>可用余额(元)</p>
            <span v-if="basset.Balance>=1000">{{(basset.Balance).toLocaleString()}}</span>
            <span v-else>{{basset.Balance}}</span>
        </li>
        <li>
            <p>最新收益(元)</p>
            <span>{{basset.NewMoney}}</span>
        </li>
        <li>
            <p>累计收益(元)</p>
            <span>{{basset.AccumulativeProfit}}</span>
        </li>
    </ul>
</div>
<div class="chongz">
    <a href="javascript:"> <p class="chongzhi accz" @click="checkbindbank('/charge')">充值</p></a>
    <a href="javascript:"><p class="tixian"  @click="checkbindbank('/fetchmoney')">提现</p></a>
</div>

<div class="accont_con">
    <ul>
                <li>
       <!--  <router-link :to="'/myinvite'"  class="my_invite">
                <i></i>
                邀请奖励
                <span class="hot"></span>
            </router-link> -->
            <a href="javascript:"  class="my_invite" @click="goinvite">
              <i></i>
                邀请奖励
                <span class="hot"></span>
            </a>
        </li>
    </ul>
    <ul>
        <li>
            <router-link :to="'/cqbindex'"  class="my_hrb2">
                <i></i>
                活期宝
                <span class="fir_span" v-if="basset.HrbTotalMoney>=1000"><span class="yel_span">{{(basset.HrbTotalMoney).toLocaleString()}}</span>元</span>
                <span class="fir_span" v-else><span class="yel_span">{{basset.HrbTotalMoney}}</span>元</span>
            </router-link>
        </li>
        <li>
        <router-link :to="'/mytenderlist'"  class="my_buss">
                <i></i>
                我的理财
                <span class="fir_span" v-if="basset.TenderTotalMoney>=1000"><span class="yel_span">{{(basset.TenderTotalMoney).toLocaleString()}}</span>元</span>
                <span class="fir_span" v-else><span class="yel_span">{{basset.TenderTotalMoney}}</span>元</span>
            </router-link>
        </li>
        <li>
        <router-link :to="'/mycouponlist'"  class="my_youhui">
                <i></i>
                我的优惠券
                <span class="fir_span"><span class="yel_span">{{basset.CouponCount}}</span>张</span>
            </router-link>
        </li>
        <li>
        <router-link :to="'/autotender'"  class="my_autotender">
                <i></i>
                自动投标
            </router-link>
        </li>
    </ul>

        <ul>
        <li>
        <router-link :to="'/tradelist'"  class="my_jiaoyi">

                <i></i>
                交易记录
        </router-link>
        </li>
         <li>
         <router-link :to="'/mybank'"  class="my_bank">

                <i></i>
                我的银行卡
          </router-link>
        </li>

       <li>

            <router-link :to="'/exchangecommandcoupon'"  class="my_kouling">
                <i></i>
                口令红包
            </router-link>
        </li>
        <li>

            <a @click="clickrisk()" class="my_risk">
                <i></i>
                风险评估
            </a>
        </li>
<!--         <li>
            <router-link :to="'/tradelist'"  class="my_chong">
                <i></i>
                充值记录
            </router-link>
        </li>
        <li>
        <router-link :to="'/tradelist'"  class="my_tixian">
                <i></i>
                提现记录
            </router-link>
        </li> -->
    </ul>

<!--     <ul>

        <li>
        <router-link :to="'/mysettings'"  class="my_grshe">
                <i></i>
                个人设置
            </router-link>
        </li>

         <li>
        <a @click="clickrisk()"  class="my_dcwj">
                <i></i>
                风险评估
            </a>
        </li>
    </ul> -->
</div>
<div class="kefu_box">
    <div class="kefucenter_box">
        <a :href="kefuqq" @click="alertkefutime(1)">
        <!-- <a href="http://wpa.qq.com/msgrd?v=3&uin=383871&site=qq&menu=yes" class="my_kefu"><i></i>在线客服</a> -->
        <!-- <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzMzI1Nl8yMDE5NzhfNDAwODg1MDc0Nl8yXw\" class="my_kouling"><i></i>口令红包<a> -->
            <p><i class="lefticon"></i>在线客服</p>
            <p><span class="time">服务时间：8:30-17:30</span></p>
        </a>
    </div>
    <div class="kefucenter_box">
        <a :href="kephone" @click="alertkefutime(2)">
            <p><i class="lefticon"></i><span class="tel">{{kefutext}}</span></p>
            <p><span class="time">服务时间：8:30-20:30</span></p>
        </a>
    </div>
</div>
<globlenav></globlenav>

<dialogdmy @getfin="getfin" v-if="diain"></dialogdmy>
<div class="bgblack" style="background:#000;opacity:0.3;width:100%;height:100%;position:;top:0px;left:0px;z-index:10;position:fixed;" v-show="getfins"></div>

</div>


</template>

<script>

import globlenav from '../../components/nav'
import heads from '../../components/head'
import dialogdmy from '../../components/dialogdmy'
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title:"我的账户",
      state:this.$store.state,
      basset:{},
      bindyibao:false,
      getfins:false,
      diain:false,
      newmsg:false,
      kefuqq:"",
      kephone:"",
      kefutext:"",
      iskefutime:true,
      isqqkefutime:true
    }
  },
  methods:{
    goinvite(){
      let _this = this
      this.$http(this.$api.getqueryinviterewardasset({}))
        .then(function(data){
          if(data.data.ResultData.IsEmployee){
            _this.$router.push('/invitestaff')
            return
          }else{
            _this.$router.push('/myinvite')
             return
          }

       });
    },
    GetWorkHours(st,engt,type){
        let date = new Date()
        let hours = date.getHours();
        let Minutes = date.getMinutes();
        if(Minutes<10){Minutes = "0"+Minutes}
        let totaltime = hours.toString()+Minutes.toString()
        let sttime = st.split(":")[0]+st.split(":")[1]
        let engtime = engt.split(":")[0]+engt.split(":")[1]
        let over = "17:30"
        let overtime = over.split(":")[0]+over.split(":")[1]
        if(type==1){
            if(parseInt(totaltime)>parseInt(sttime)&&parseInt(totaltime)<parseInt(engtime)){
                this.isqqkefutime = true
            }else{
              this.kefuqq = "javascript:"
              this.isqqkefutime = false
            }
        }else if(type==2){
          if(parseInt(totaltime)>parseInt(sttime)&&parseInt(totaltime)<parseInt(engtime)){
              if(parseInt(totaltime)>parseInt(overtime)&&parseInt(totaltime)<parseInt(engtime)){
                this.kephone =  "tel:18807460290"
                this.kefutext = "18807460290"
              }else{
                this.kephone =  "tel:4008760616"
                this.kefutext = "400-876-0616"
              }

            this.iskefutime = true
          }else{
            this.kefutext = "18807460290"
            this.kephone = "javascript:"
            this.iskefutime = false
          }
        }


    },
    alertkefutime(type){
      if(type==2){
          if(!this.iskefutime){
           this.$msg.alert("抱歉现在是休息时间。<p>如有疑问，请在上班时间联系客服吧！</p>服务时间 8:30-20:30")
          }
      }
      if(type==1){
          if(!this.isqqkefutime){
             this.$msg.alert("抱歉现在是休息时间。<p>如有疑问，请在上班时间联系客服吧！</p>服务时间 8:30-17:30")
          }
      }

    },
    checkbindbank(src){ //
        let _this=this

      this.$http(this.$api.GetBankCardInfo({}))
      .then((data) => {
        console.log(data.data.ResultData)
        if(!data.data.ResultData.cardInfo.cardStatus==2){
            _this.$msg.alert("请先绑定银行卡",function(){
                _this.$router.push('/addbank')
            })
        }else{
              _this.$router.push(src)

        }
      });
    },

     getfin(msg){
      this.getfins=msg
      this.diain=msg
    },

    clickrisk(){
        let _this=this
        this.$http(this.$api.riskEvaluate({"TokenUser":this.state.user.Token}))
      .then((data) => {
            console.log(data)
            if(data.data.ResultData.preference_type == null ||data.data.ResultData.preference_type == 0  ){
                //_this.$router.push('/risk')
                _this.getfins=true
                _this.diain=true
            }else{
              _this.$router.push('/riskfinal')
            }
      })
    }
  },
  created :function(){
    let _this=this
    this.GetWorkHours("8:30","20:30",2)
    this.$http(this.$api.QueryOnlineServiceInfo({}))
    .then((data) => {
      this.kefuqq = 'http://wpa.qq.com/msgrd?v=3&uin='+data.data.ResultData.OnlineServiceQQNumber+'&site=qq&menu=yes'
      this.GetWorkHours("8:30","17:30",1)
    })
    if(typeof this.state.isweixin !="undefined"){
        this.$http(this.$api.GetUserInfo({}))
        .then((data) => {
          console.log(data.data.ResultData)
          if(data.data.ResultCode==100000){
              let user = ls.getItem("_user")
              let usertoken = user.Token
              let obj = data.data.ResultData
              obj.Token = usertoken
              ls.setItem("_user",obj)
              _this.$store.commit("userinfo")
          }
        });
      }
    this.$http(this.$api.getmsglist({"MessageContentType":this.tradetype,"Page":this.page,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List.length!=0){
          data.data.ResultData.List.forEach(function(v){
            if(v.MessageStatus==2){
              _this.newmsg = true;
            }
          })
        }
    })
    this.$store.dispatch('basset')
          .then(() => {
              this.basset=this.state.basset
    })
    console.log(this.state.user)
    console.log(this.state.basset)

  },
  components:{
    globlenav,
    heads,
    dialogdmy
  }
}
</script>
<style lang="scss" scoped>
.per_top{height: 4.75rem;overflow: hidden;}
.ipsregRemarks{ width: 90%;margin: 0px auto; margin-top:0.25rem; border-bottom: 1px solid #d4d4d4; font-size: 0.35rem;color:#f00; padding-bottom: 0.25rem;}
.per_money{padding-left:0.625rem;text-align: left;color: #fff; background-size: 100%; position:relative; padding-top: 1.0rem;height:2.5rem; background:-webkit-linear-gradient(#de3132, #f87055);}
.money_top{font-size: 0.5rem;line-height: 0.625rem;}
.p_money{font-size: 0.75rem;line-height: 0.875rem;}

.per_money a.hxbtn{ position:absolute; right:10%; top:35%; width:2.0rem; height:0.875rem; line-height: 0.875rem; text-align:center; background-color: #fff; border-radius: 0.125rem; font-size: 0.35rem; color:#333;}
.per_topb{background-color: rgba(255,255,255,0.1);height: 1.25rem; color: #fff;text-align: center; background: -webkit-linear-gradient( #f98670,#ff9478);}
.per_topb li{float: left;width: 33.33%;background: url(/static/img/my/bgg_left.png) no-repeat left center;height: 1.25rem;line-height: 0.625rem;padding:0.015625rem 0;font-size: 0.35rem;}
.per_topb li .yello{color:#fff241;}
.per_topb li.tips_fir{background:none;width:33.33%;}
.chongz{height: 1.35rem;background: #fff;font-size: 0.45rem; }
.chongz p{float: left;width: 49%;color:#949494;height: 1.0rem;line-height: 1.0rem;margin:0.175rem 0; text-align:center;}
.chongz .chongzhi{border-right:1px solid #ccc;}
.chongz .chongzhi{color:#de3132}
.accont_con{background:#f3f3f3;}
.accont_con ul{background:#fff;margin-top:0.25rem;}
.accont_con ul li{width:auto;padding-left:0.375rem;line-height: 1.25rem;height: 1.25rem;border-bottom:1px solid #eee; position:relative;}
.accont_con ul li span.hot{@include bg("/static/img/my/hot.png"); position:absolute; top: rem(10); left:rem(150);width: 1.2rem;height: 0.6rem;}
.accont_con ul li:last-child{border-bottom: none;}
.accont_con ul li a{display: block;margin:0 auto;width: auto;padding-right:0.4rem;height: 1.25rem;line-height: 1.25rem;color: #626262;text-align: left;background-size:0.2rem; font-size: 0.4rem;}
.accont_con ul li a:before{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(0); color:#ddd}
.accont_con ul li a i{width: 0.8rem;height: 0.8rem;float: left;margin:0.2rem 0.5rem 0 0; }
.accont_con ul li a .fir_span{float: right;color: #bcbcbc;width: 45%;font-size: 0.35rem;text-align: right;padding-right: 0.125rem;}
.accont_con ul li a .fir_spand{float: right;color: #bcbcbc;width: 45%;font-size: 0.35rem;text-align: right;padding-right: 0.125rem;font-weight: bold;}
.accont_con ul li a .yel_span{color: #de3132;}
.accont_con ul li a.my_autotender i{background:url(/static/img/my/icon_1.png) no-repeat;background-size:100%}
.accont_con ul li a.my_buss i{background:url(/static/img/my/icon_2.png) no-repeat;background-size:100%}
.accont_con ul li a.my_youhui i{background:url(/static/img/my/icon_3.png) no-repeat;background-size:100%}
.accont_con ul li a.my_jiaoyi i{background:url(/static/img/my/icon_4.png) no-repeat;background-size:100%}
.accont_con ul li a.my_chong i{background:url(/static/img/my/icon_5.png) no-repeat;background-size:100%}
.accont_con ul li a.my_tixian i{background:url(/static/img/my/icon_6.png) no-repeat;background-size:100%}
.accont_con ul li a.my_grshe i{background:url(/static/img/my/icon_7.png) no-repeat;background-size:100%}
.accont_con ul li a.my_dcwj i{background:url(/static/img/my/risk.png) no-repeat;background-size:100%}
.accont_con ul li a.my_bank i{background:url(/static/img/my/icon_8.png) no-repeat;background-size:100%}
.accont_con ul li a.my_xxzhong i{background:url(/static/img/my/icon_9.png) no-repeat;background-size:100%}
.accont_con ul li a.my_invite i{background:url(/static/img/my/icon_10.png) no-repeat;background-size:100%}
.accont_con ul li a.my_link i{background:url(/static/img/my/icon_11.png) no-repeat;background-size:100%}
.accont_con ul li a.my_hrb2 i{background:url(/static/img/my/icon_15.png) no-repeat;background-size:100%}
.accont_con ul li a.my_kefu i{background:url(/static/img/my/icon_13.png) no-repeat;background-size:100%}
.accont_con ul li a.my_kouling i{background:url(/static/img/my/icon_14.png) no-repeat;background-size:100%}
.accont_con ul li a.my_risk i{background:url(/static/img/my/risk.png) no-repeat;background-size:100%}
.kefu_box{padding:rem(10);box-sizing:border-box; overflow:hidden;}
.kefu_box .kefucenter_box{background:#fff;width:49%;float:left; text-align:center; padding-bottom:rem(10)}
.kefu_box .kefucenter_box:nth-child(2){float:right;}
.kefu_box .kefucenter_box a{color:#555;}
.kefu_box .kefucenter_box p{margin-top:rem(10);}
.kefu_box .kefucenter_box a p span.time{background:#e8ab59; display:block; color:#fff; border-radius:rem(10); text-align:center; width:90%; margin:auto;font-size:rem(12)}
.kefu_box .kefucenter_box a p span.tel{font-size:rem(18); color:#ea4f43;}
.kefu_box .kefucenter_box .lefticon{width: 0.9rem;height: 0.9rem;display:inline-block;background:url(/static/img/my/kefu_icon.png) no-repeat;background-size:100%; vertical-align:middle; margin-right:rem(10)}
.kefu_box .kefucenter_box:nth-child(2) .lefticon{background:url(/static/img/my/phone.png) no-repeat;background-size:100%;}




</style>