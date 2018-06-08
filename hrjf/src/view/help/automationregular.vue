<template>
<div class="container">
 <heads :title="title"></heads>
  <div class="contract-body">
                <div class="contract">
                    <h2>生效说明</h2>
                    <p>1、开启关闭均为5分钟生效</p>
                    <p>2、每次发新标的时候，开启自动投标</p>
                    <p>排名说明</p>
                    <p>1、按开启自动投标的功能先后顺序排序，先开启的排名靠前</p>
                    <p>2、关闭自动投标功能后重新开启，排名会移到队尾</p>
                    <p>3、编辑自动投标设置，不影响排名</p>
                    <p>4、自动投标成功后，排名自动到队尾</p>
                    <h2>投标说明</h2>
                    <p>1、自动投标的最小金额至少100元</p>
                    <p>2、当标的剩余可投金额 < 自动投标设置金额时，不执行自动投标</p>
                    <h2>自动投标</h2>
                    <p>3、账户可用余额 < 每次投资金额，不执行自动投标</p>
                    <p>4、同一标的，每个用户只执行一次</p>
                    <p>5、不支持新手标、APP专属标、微信专属标等</p>
                    <p>6、如果余额保留金额+投标金额>可用余额，不执行自动投标</p>
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
      title: '自动投标规则',
    }
  },

  mounted : function() {

  },
  methods:{

  },
  created:function(){

  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>

div.contract { width: auto; padding: 15px;}
div.contract h2 { margin: 8px 0px; }
div.contract p{font-size:0.35rem}
</style>