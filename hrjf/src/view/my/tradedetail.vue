<template>
<div class="containerN">
 <heads :title="title"></heads>
        <div class="mingx">
            <div class="mingxT">
                <p class="mx_tzje">{{state.tradedetail.name}}</p>
                <p class="mx_money" v-if="state.tradedetail.typeindex==0">{{Math.abs(state.tradedetail.Variable).toFixed(2)}}<span>元</span></p>
                <p class="mx_money" v-else>{{state.tradedetail.Variable}}<span>元</span></p>
            </div>

            <div class="mingxM">
                <div class="wordfirst" v-if="">
                    <span class="wf_le">交易信息</span>
                    <span class="wf_ri" v-if="state.tradedetail.typeindex==0">{{state.tradedetail.subtext}}{{Math.abs(state.tradedetail.Variable).toFixed(2)}}元</span>
                    <span class="wf_ri" v-else>{{state.tradedetail.subtext}}{{state.tradedetail.Variable}}元</span>
                </div>

                <div class="wordmid">
                    <span class="wf_le">交易单号</span>
                    <span class="wf_ri">{{state.tradedetail.Reference}}</span>
                </div>

                <div class="wordmid">
                    <span class="wf_le">交易时间</span>
                    <span class="wf_ri">{{state.tradedetail.CreateTime}}</span>
                </div>
                <div class="wordmid">
                    <span class="wf_le">支付摘要</span>
                    <span class="wf_ri">{{state.tradedetail.TradeType}}</span>
                </div>
                <div class="wordmid">
                    <span class="wf_le">交易状态</span>
                    <span class="wf_ri">{{state.tradedetail.TradeStatus}}</span>
                </div>


            </div>
        </div>

</div>
</template>

<script>
import heads from '../../components/head'


export default {
  data () {
    return {
        title:"交易明细详情",
      state:this.$store.state
    }
  },
  methods:{

  },
  created :function(){
    console.log(this.state.tradedetail)
  },
    components:{
    heads
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container{background:#fff;height:100%;}
.mingx .mingxT { background: #de3132; padding: 0.375rem 0 0.75rem; color: #fff; }
.mingx .mx_tzje { text-align: left; text-indent: 1em; font-size: 0.4rem; line-height: 0.875rem; }
.mingx .mx_money { text-align: left; font-size: 0.9rem; line-height: 1.125rem;text-indent: 1.3em; }
.mingx .mx_money span { font-size: 0.4rem; }
.mingx .wordfirst { line-height: 1.25rem; height: 1.25rem; border-bottom: #d2d2d2 solid 1px; }
.mingx .wordfirst span{font-size:0.4rem}
.mingx .wordmid { line-height: 1.0rem; height: 1.0rem; }
.mingx .wf_le { color: #bcbcbc; width: 27%; float: left; text-align: left; text-indent: 1em; }
.mingx .wf_ri { color: #666666; width: 73%; float: left; text-align: left; }
</style>
