<template>
<div id="frame">
        <div id="con">
  <div class="link_head">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>
            <div class="cz_cont kaihutop kaihutopdx">
                <div class="topformx fofirx" @click="showdiv(0)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">什么是活期宝?</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==0"><p>活期宝是一款随投随取的活期投资方式，是用户参与恒瑞金服网随机自动投标计划，且在t+1日后，可随时出让所持有债权，提高投资的灵活度和资金使用率。</p></div>
                <div class="topformx"  @click="showdiv(1)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">多久能收到利息收益？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==1"><p>转入的资金在当天由公司进行份额确认，第二天开始计息，第三天就能收到第二天的利息收益。</p></div>
                <div class="topformx"   @click="showdiv(2)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">收益率是怎么计算的？</span>

                    </div>
                </div>
                <div class="tth" v-if="isshow==2"><p>活期宝年化收益率8%-10% ，100元起投，第1至7天时年化收益8%，第8天起开始涨息，每天涨息0.2%，年化收益最高可提高至10%。</p></div>
                <div class="topformx"  @click="showdiv(3)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">活期宝的收益结算有什么规则？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==3"><p>活期宝的收益每日结算，每天到账前一天的收益。转出部分的资金，当天没有收益。</p></div>

                <div class="topformx"  @click="showdiv(4)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">取出资金对收益利率的影响吗？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==4"><p>涨息期间如取出本金，则提升利率将按资金转出的比例降低。如当前利率为10%（基础利率8%+提升利率2%），活期宝内资金取出50%，则提升利率下降50%，由2%降至1%，总利率变为9%（基础利率8%+提升利率1%）。如活期宝账户内本金小于100元，年化利率降回 8% ，停止加息。</p></div>
                <div class="topformx"   @click="showdiv(5)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">如何计算每天的利息收益？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==5"><p>活期宝每天按照当天的年化利率计算当天收益，如当天利率达10%，则当天的利息收益为本金×10%/365</p></div>

                <div class="topformx"  @click="showdiv(6)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">活期宝如何存取?</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==6"><p>活期宝内的资金可以从个人账户余额中直接转入，也可以随时转出至个人账户余额中。</p></div>
                <div class="topformx"  @click="showdiv(7)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">转入转出资金有限制吗？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==7"><p>转入最少100元</p></div>
                <div class="topformx" @click="showdiv(8)">
                    <div class="form-chongzdx kaihux">
                        <span class="left_one">平台会收取哪些费用？</span>
                    </div>
                </div>
                <div class="tth" v-if="isshow==8"><p>平台对投资人不收取任何费用。</p></div>
            </div>
        </div>


    </div>
</template>

<script>

export default {
  data () {
    return {
      title: '常见问题',
      isshow:null
    }
  },

  mounted : function() {

  },
  methods:{
    showdiv(index){
      this.isshow=index
    }
  },
  created:function(){

  },
  components:{

  }
}
</script>
<style lang="scss" scoped>
.kaihutopdx{padding-bottom: 0.5rem;background: #f3f3f3;}
.kadx {text-align:left;}
.cz_cont .form-chongzdx {width:90%;margin:0px auto;position:relative;height: 1.125rem;}
.cz_cont .topformx{width:100%;position:relative;height: 1.125rem;border-top:1px solid #d2d2d2;background: #fff;}
.cz_cont .fofirx{border-top: none;}
.cz_cont .topformx .left_one{color:#4f4f4f;line-height: 1.125rem;height: 1.125rem;text-indent:1.5em;}
// .kaihux{background: url(../img/left-san.png) no-repeat left center;background-size:0.25rem;}
.kaihux::before{content: "";border-radius: 50%;width:0.3rem;height:0.3rem;display: inline-block; background:#d8d8d8; margin-right:rem(15); vertical-align:middle;}
.cz_cont .topformx .left_one{color:#4f4f4f;line-height: 1.125rem;height: 1.125rem;text-indent:1.5em;width: 100%;}

.tth{width: 100%;line-height: 0.625rem;font-size: 0.3rem;text-align: left;background: #fff;}
.tth p{width: 90%;margin:0 auto;text-indent:2em;color:#999999;line-height:0.75rem;padding-bottom:0.5rem;}

.cz_cont .form-chongzdxz {width:90%;margin:0px auto;position:relative;height:auto;}
.cz_cont .topformxz{width:100%;position:relative;border-top:1px solid #d2d2d2;background: #fff;}
.cz_cont .form-chongzdxz .titop{font-size: 0.45rem;color:#333;line-height: 1.125rem;font-weight: bold;}
.cz_cont .form-chongzdxz .tinormal{font-size: 0.35rem;color:#111;line-height: 0.625rem;text-align: left;}
.cz_cont .fofirx{border-top: none;}
</style>