<template>
<div class="container">
    <heads :title="title"></heads>
    <div class="success_box">
      <div class="icon"></div>
      <div class="subtext" v-if="mark==2">
        <span>处理时间可能比较长</span>
        <p>稍后可前往"我"-"我的银行卡"查看处理结果</p>
      </div>
      <div class="successtext">{{text}}</div>
      <router-link :to="'/my'">返回</router-link>
    </div>

</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"绑定银行卡处理",
      text:"正在处理中，请稍后",
      bindbank:false,
      cardStatus:null,
      changebank:false,
      mark:0,
    }
  },
  mounted : function() {
    this.getbankinfo();
  },
   methods:{
    getbankinfo(){
      let _this = this
      this.$http(this.$api.GetBankCardInfo({}))
      .then((data) => {
          _this.cardStatus = data.data.ResultData.cardInfo.cardStatus
          console.log(_this.cardStatus)
          if(_this.cardStatus==6){
            if(!_this.changebank){
              _this.mark++
              window.setTimeout(function() {
                  _this.getbankinfo()
                  if(_this.mark==2){
                    _this.changebank = true;
                    _this.$router.push('/bindbankno')
                  }

              }, 4000)
            }
          }else if(_this.cardStatus==3){
              _this.$router.push('/bindbankno')
            }else if(_this.cardStatus==2){
              _this.$router.push('/bindbankok')
            }
      });
    },
    getaddbankinfo(){
      let _this = this
      let interval = window.setTimeout(function() {

      }, 4000)
    }
  },
  created:function(){
    let _this = this

  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.container{height:100%; background:#fff;}
.success_box{padding:rem(20); box-sizing:border-box; overflow:hidden; margin-top:rem(30);}
.success_box .icon{width:rem(120);height:rem(120);@include bg("/static/img/my/addbank_icon.png");  margin:auto;}
.successtext{font-size:0.45rem; text-align:center; margin:rem(20) 0;}
.success_box a{width:95%; margin:auto; margin-top:rem(30); display:block; height:rem(45); line-height:rem(45); text-align:center; color:#fff; background-color:#de3132; border-radius:rem(5); font-size:0.45rem;}
.subtext{margin-top:rem(20);text-align:center;color:#888;}

</style>