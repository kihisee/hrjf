<template>

  <div class="containerNav">
    <!-- <div class="box boxxs" v-if="isSshow">
        <router-link :to="'/tenderdetailnew?PrizeMoney=0'">
        <div class="title">新手体验标<span>百万体验金投标</span><p><i class="xin"></i></p></div>
        <div class="clear">
          <div class="left nhl">
             <span>预计年化利率</span>
             <p><strong>10.20</strong>%</p>
          </div>
          <div class="left nhl">
              <span>期限</span>
              <p><strong>2</strong>天</p>
          </div>
          <div class="jdtbox">
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
              <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray"  :stroke-dashoffset="0.55*dasharray"/>
              <g>
              <text x="50" y="45" text-anchor="middle" fill="#de3132">55%</text>
              <text x="50" y="75" text-anchor="middle" fill="#de3132" font-size="0.45rem">剩余</text>
              </g>
            </svg>
          </div>
        </div>
        </router-link>
    </div> -->
  <div class="xjh2">
    <div class="box2 boxddd"> <!-- 登录 -->
          <a href="javascript:">
            <h3>
            <span class="title new_title">活期宝</span>
            <span class="icon new_icon">
          </span>
            </h3>
            <div class="oldProfit" style="overflow:hidden;">
              <p class="numberSizi">8<span>.0%-</span>10<span>.0%</span></p>
              <p class="xjhtext xjhtextgray">预期年化收益率</p>
            <div class="fixe">
            <div class="fixerow">

              <p class="row1text newtext"><span class="redspan">随存随取</span>  100元起投  <span class="redspan">第8天起涨息</span></p>
            </div>
            </div>
            <div class="fixe newtiyanbiaobtn">
            <div class="fixerow2"><a href="javascript:" class="" @click="tiyan()"><p class="row2text">立即转入</p></a></div>
            </div>
            </div>
          </a>
      </div>
  </div>

    <div class="box" v-for="(item,index) in tenderlist">
        <router-link :to="'/tenderdetail?id='+item.Id+'&TenderActiveType='+item.TenderActiveType">
        <div class="title">{{item.TenderName}}<span v-if="item.TenderActiveType==-1">首投专享，限投一次</span><p v-if="item.TenderActiveType==0"><i class="jia"></i><i class="li"></i></p></div>
        <div class="clear">
          <div class="left nhl">
             <span>预计年化利率</span>
            <p v-if="item.TenderActiveType==-1"><strong>{{(item.TenderFee*100).toFixed(1)-2}}</strong>%+<strong>2</strong>%</p>
             <p v-else><strong>{{(item.TenderFee*100).toFixed(1)}}</strong>%</p>
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
  <globlenav></globlenav>
</div>
</template>

<script>
import globlenav from '../../components/nav';
export default {
  data () {
    return {
      tenderlist:'',
      dasharray:Math.PI * 100,
      percent:0,

      isSshow:true,
    }
  },
  methods:{
tiyan(){
      this.$router.push("/cqbindex")
    },
  },
  created:function(){
      let _this = this
      this.$http(this.$api.querytenderlist({"Page":1,"PageSize":10}))
      .then((data) => {
        _this.tenderlist = data.data.ResultData.List
        console.log(data.data.ResultData.List)
      });

       this.$http(this.$api.QueryTYJCoupon({}))
      .then((data) => {
        console.log(data)
        _this.isSshow=data.data.ResultData.isShow
        //console.log(data.data.ResultData.isShow)
        console.log(_this.isSshow)
      });

  },
  components:{
    globlenav
  }
}
</script>
<style lang="scss" scoped>
.box{margin:auto;margin-bottom:0.25rem;background:$white;padding:0.35rem 0.4rem; padding-top:0.1rem;box-sizing:border-box; overflow:hidden; width:95%;margin-top:rem(10);}
.boxxs{background:url(../../../static/img/tender/newshare.png) no-repeat left top #fff;background-size:8%; }
.box .title{color:#555;font-size:0.45rem;}
.box .title span{color:#de3132; font-size:0.35rem;padding-left:rem(10);vertical-align:middle;}
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


.xjh2{box-sizing:border-box;overflow:hidden;position: relative;left: 0px;z-index: 0;text-align:center; margin-top:rem(10);}
.xjh2 .box2{background-color: #fff;border-radius: 0.125rem; margin-top: 0.25rem; color:#555}

.xjh2 .box2 a h3 {border-bottom: 1px dashed #ccc;height: 0.9rem;font-size: 0.45rem;line-height: 1.1rem;display: flex;color: #333; position:relative;margin:0 auto;width:90%;padding:0;}
.xjh2 .box2 a h3 .title { width: 53%; text-align: left; font-weight:normal; overflow:hidden;}
.xjh2 .box2 a h3 .icon { width: 30%; text-align: right; }
.xjh2 .box2 a h3 .icon i { font-size: 0.3rem; -webkit-text-size-adjust: none; color: #ffbb2a; border: 1px double #ffbb2a; display: block; float: left; width: auto; line-height: normal; padding: 0.025rem 0.075rem; font-style: normal; margin-top: 0.3rem;  margin-right:0.125rem}
.xjh2 .box2 a h3 .new_title{background:url(/static/img/index/tiyan_title_bg.png) no-repeat ; background-size:100%; color:#fff; position:absolute; top:rem(-8); line-height: 0.9rem; width:3.4rem;  text-align:center;}
.xjh2 .box2 a h3 .new_icon{position:absolute; right:0.1rem; width:rem(60);font-size:rem(12);background:url(/static/img/index/tiyanq.png) no-repeat center center;background-size:100%;display:block;text-align:center;color:#fff;}


.xjh2 .box2 .intenderlistbox { display: flex; box-sizing: border-box; padding: 0.30rem 0.25rem 0.5rem; color:#555;}
.xjh2 .box2 .intenderlistbox span.red{ color:#ffbb2a; }
.xjh2 .box2 .intenderlistbox span.size{font-size:0.35rem}
.xjh2 .box2 .intenderlistbox span strong { font-size: 0.65rem; }
.xjh2 .box2 .intenderlistbox .flexone { width: 25%; text-align: left; }
.xjh2 .box2 .intenderlistbox .flextow { width: 22%; text-align: right; margin-right: 3%}
.xjh2 .box2 .intenderlistbox .flexthree { width: 50%; text-align: left; }
.xjh2 .box2 .intenderlistbox .flexthree  p{ text-indent:0.15rem; }
.xjh2 .box2 .intenderlistbox .flexone p:nth-child(1),.xjh2 .box2 a .intenderlistbox .flextow p:nth-child(1),.xjh2 .box2 a .intenderlistbox .jdt{overflow: hidden; height:0.85rem;display:flex;align-items:center;justify-content:center; }
//.xjh2 .box a .intenderlistbox .jdt { overflow: hidden; height:0.85rem;display:flex;align-items:center;justify-content:center; }
.xjh2 .box2 .intenderlistbox .jdt .jdttext { float: left; width: auto; margin-left: 0.125rem; }
.xjh2 .box2 .intenderlistbox .jdt_box { height: 0.25rem; background: #e1e1e1; border-radius: 0.125rem; float: left; width: 70%; margin-top: 0.075rem; }
.xjh2 .box2 .intenderlistbox .jdt_box .jdtmian { height: 0.25rem; border-radius: 0.125rem; background: #ffbb2a; }


.xjh2 .xjhtext{margin-top:0.2rem; font-size: 0.4rem;color:#73879c;}
.xjh2 .xjhtextgray{color:#73879c}
.xjh2 .numberSizi{font-size: 1rem; font-weight: bold;color:#de3031;margin-top: 0.85rem;}
.xjh2 .numberSizi span{font-size:rem(16);}
.xjh2 .login{font-size: 0.35rem;line-height: 0.375rem;margin: 0.25rem 0 0.5rem 0;}
.xjh2 .login a{text-decoration:underline; color:#ffbb2a;}
.xjh2 .fixe{display:flex; margin-top: 0.25rem;}
.xjh2 .fixe .fixerow:nth-child(1){}
.xjh2 .fixe .row1text{color:#73879c;}
.xjh2 .fixe .row1text .redspan{color:#de3031;}
.xjh2 .fixe .fixerow .rednumbel{font-size:0.55rem;color:#ffbb2a;margin-top: 0.125rem;}
.xjh2 .fixe .fixerow .rednumbel2{font-size: 0.55rem;color:#ffbb2a; margin-top: 0.125rem;}
.xjh2 .fixe .rednumbel2 strong{font-size: 0.35rem;}
.xjh2 .fixe .fixerow2 a{background-color: #fdf3de;color:#ffbb2a; padding:0.3rem 0px; display:block;}
.xjh2 .fixe .fixerow2 .row2text{font-size: 0.5rem;}
.xjh2 .fixe .fixerow2:nth-child(2) a{background: -webkit-linear-gradient(left,#ffbb2a,#ff7c2d);color:#fff;}
.xjh2 .fixe .fixerow2 .rednumbel2{font-size: 0.3rem; }
.xjh2 .fixe .newtext{font-size:0.3rem;height:rem(30);line-height:rem(30)}
.xjh2 .fixe .newtext span.newspan{color:#73879c;display:block;float:left;}
.xjh2 .fixe .newtext span.newspan:first-child{text-align:right;width:46%;}
.xjh2 .fixe .newtext span.newspan:last-child{text-align:left;width:46%;line-height:rem(25)}
.xjh2 .fixe .newtext b.newb{width:8%;text-align:center;font-weight:normal;display:block;float:left;color:#eee;height:100%;}
.xjh2 .fixe .newtext b.lastb span{font-size:rem(22)}
.xjh2 .fixe .newtext b.lastb{font-weight:normal;color:#de3031;padding-left:rem(5)}
.xjh2 .fixe .newtext span strong{font-size:0.45rem}
.xjh2 .newtiyanbiaobtn{width:80%;margin:auto;text-align:center;  margin-bottom:0.575rem;margin-top:0.4rem;}
.xjh2 .newtiyanbiaobtn .fixerow2 a{border-radius:0.125rem; background:#de3031; color:#fff;}


</style>

