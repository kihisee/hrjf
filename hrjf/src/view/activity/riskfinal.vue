<template>
   <div id="frame">

      <div class="link_head">
        <h1>
          <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
          {{title}}

        </h1>
      </div>

      <div class="riskcont">
          <p class="jietitle">{{ jietitle }}</p>
          <p class="jiecont">{{ jiecont }}</p>
      </div>



    <div class="box" v-for="(item,index) in tenderlist" v-if="xianshi">
        <router-link :to="'/tenderdetail?id='+item.Id">
        <div class="title">{{item.TenderName}}<p v-if="item.TenderActiveType==0"><i class="jia"></i><i class="li"></i></p></div>
        <div class="clear">
          <div class="left nhl">
             <span>预计年化利率</span>
             <p><strong>{{(item.TenderFee*100).toFixed(1).split('.')[0]}}</strong>%</p>
          </div>
          <div class="left nhl">
              <span>期限</span>
              <p><strong>{{item.TenderUseDay}}</strong></p>
          </div>
          <div class="jdtbox">
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
              <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="(1-(item.PrepayMoney/item.Money))*dasharray" />
              <g v-if="item.PrepayMoney!=item.Money">
              <text x="50" y="45" text-anchor="middle" fill="#de3132">{{(100-item.PrepayMoney*100/item.Money).toFixed(0)}}%</text>
              <text x="50" y="75" text-anchor="middle" fill="#de3132" font-size="0.45rem">剩余</text>
              </g>
              <g v-else>
                <text x="50" y="60" text-anchor="middle" fill="#d4d4d4" font-size="0.45rem">已投满</text>
              </g>
            </svg>
          </div>
        </div>
        </router-link>
    </div>

    <div class="botlist">
      <div class="listin">
          <a @click="ckgd" v-text="tendertext"></a>
          <a @click="tzzx"  v-show="xianshi">重新评估>></a>

      </div>
    </div>
  </div>
</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title: '评估结果',
      jietitle:"",
      jiecont:"",
      xianshi:true,
       jijix:{"title":"积极型","content":"倾向于以一定的可预见风险换取超额收益"},
       wenjianx: {"title":"稳健型","content":"期望通过持续、渐进的投资获得高于定期存款的回报，适当回避风险的同时保证收益，跑赢通货膨胀"},
       baoshoux:{"title":"保守型","content":"愿意承担少量的投资风险，回避风险的同时有一定的收益保证"},
       tenderlist:'',

       dasharray:Math.PI * 100,

       tendertext:'查看更多投资',


    }
  },
  methods:{
        tenderdetail(index){
          ls.setItem("tenderdetail",this.tenderlist[index]);
          this.$store.commit("tenderdetail",this.tenderlist[index])
          this.$router.push('/tenderDetail')
        },
        tzzx(){
         this.$router.push('/risk')
        },
        ckgd(){
          let _this=this;
          let query= this.$route.query
          if(query.tenderid){
            this.$router.push('/tenderdetail?id='+query.tenderid)
          }else{
            this.$router.push('/index')
          }

        }
  },
  created:function(){
    let query = this.$route.query
    let _this=this;

    if(query.from=="tender"){
      _this.xianshi=false
    }
   if(query.tenderid){
      _this.tendertext='继续投资'
    }


     this.$http(this.$api.gettenderlist({"Page":1,"PageSize":2}))
      .then((data) => {
        if(data.data.ResultData.List!=""){
          console.log(data)
          _this.tenderlist=data.data.ResultData.List

         // console.log(_this.tenderlist)
        }
      });


      this.$http(this.$api.riskEvaluate({"TokenUser":query.token}))
      .then((data) => {
            console.log(data)
            console.log(data.data.ResultData.score)

             //console.log(query.number)
              let fenshu=data.data.ResultData.score
              if(fenshu >= 40){
                  _this.jietitle=_this.jijix.title;
                  _this.jiecont=_this.jijix.content;
              }else if(fenshu < 49 && fenshu >= 30){
                _this.jietitle=_this.wenjianx.title;
                _this.jiecont=_this.wenjianx.content;
              }else{
                _this.jietitle=_this.baoshoux.title;
                _this.jiecont=_this.baoshoux.content;
              }
      })
  },
  components:{

  }
}
</script>



<style lang="scss" scoped>
.riskcont{width:95%;margin:0.25rem auto;background:#fff;border-radius: 0.125rem;}
.riskcont{width:95%;margin:0.25rem auto;background:#fff;border-radius: 0.125rem;text-align: left;font-size: 16px;padding-bottom: 50px;;}
.riskcont .toprisk{width:95%;padding:0.125rem ;}
.riskcont .riskul{width:95%;margin:0 auto;line-height: 35px;}
.riskcont  a{ display:block; width:85%; height:50px; line-height:50px; text-align:center; border-radius:10px; font-size:16px; color:#fff; background:#ffbb2a; margin-top:50px;margin:20px auto;}
.riskcont .jietitle{padding:0.375rem 0;width:95%;margin:0 auto;font-size:0.5rem;font-weight: bold;}
.riskcont .jiecont{width:95%;margin:0 auto;}

.botlist{width:95%;margin:0 auto;background:#fff;border-radius: 0.075rem;}
.botlist .listin{padding:0.6rem 0.5rem;width:85%;margin:0 auto;height:2rem}
.botlist .listin a{height:0.75rem;line-height: 0.75rem;color:#fff;background:#de3132;display:block;float:left;width:45%;text-align: center;border-radius: 0.125rem;margin-right:0.125rem;}
.botlist .listin a:first-child{float:left;background:#de3132;display:block;width:100%;height:35px;line-height: 35px;}
.botlist .listin a:last-child{display:inline-block;width:100%;color:#de3132;background:none;}
.tanword{text-align: left;}
.tanword .risktop{width:95%;margin:0.25rem auto 0;background:#fff;border-radius: 0.125rem;font-size: 0.4rem;padding: 0.25rem 0 0;}
.tanword .risktop p{width:95%;margin:0 auto;color:#333;padding:0.1rem 0;font-size: 0.35rem;text-align: left;text-indent: 2em;}
.tanword .inright{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#ffbb2a;border-radius: 5px;margin:0.25rem auto;display:block;color:#fff;font-size: 0.4rem;}
.tanword .xtop{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#ffbb2a;border-radius: 5px;color:#fff;font-size: 0.4rem;display:inline-block;float:left}
.tanword .che{width:95%;margin:0.25rem auto;font-size: 0.36rem;padding-bottom: 0.25rem;color:#999;}
.adiv{width:80%;margin:0 auto;height:1rem;}




.box{margin:auto;margin-bottom:0.25rem;background:$white;padding:0.35rem 0.4rem; padding-top:0.1rem;box-sizing:border-box; overflow:hidden; width:95%;margin-top:rem(10);}
.box .title{color:#555;font-size:0.45rem;}
.box .title p{float:right;width:auto;}
.box .title p i{width:rem(50);height:rem(15);display:inline-block;font-size:rem(12);text-align:center;margin-right:0.25rem;font-style:normal; margin-top:rem(5);color:$orange;}
.box .title p i.jia{@include bg("/static/img/tender/jia.png")}
.box .title p i.li{@include bg("/static/img/tender/li.png")}
.box .title p i.xin{@include bg("/static/img/tender/xin.png")}
.box .clear{position:relative;overflow:hidden; height:rem(80);}
.box .clear .nhl{ margin-top:rem(15); width:rem(100);}
.box .clear .nhl span{color:$gray;display:block;text-align:center;}
.box .clear .nhl p{color:#de3132; font-size:0.5rem;text-align:center;margin-top:rem(15);}

.jdtbox{position:absolute;top: 0;right:0;width:rem(80);height:rem(80); margin-top:rem(10);}
.jdtbox svg{width:rem(80);height:rem(70);font-size:0.55rem;}
.jdtbox circle{stroke-width:0.16rem;transform-origin:center;}
.jdtbox .progress-background{transform:scale(0.9);stroke:#e1e1e1;}
.jdtbox .progress-bar{transform: scale(0.9) rotate(-90deg);stroke: #de3132;}
</style>