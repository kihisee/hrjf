<template>
  <div class="container">
    <heads :title="title"  v-if="isapp" ></heads>
    <div id="con">


    <div class="content">
        <div class="imgbanner">
          <img  src="../../../static/img/insurance/tender_result_true.png" />
        </div>

        <p class="grayp">投资成功</p>
        <div class="botfinsh" @click="goToTender()">完成</div>

    </div>




  </div>
 </div>




</template>

<script>
import globlenav from '../../components/nav';
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '投保需知',
      InsurancePlanFileList:[],
      isapp:false,
    }
  },
  methods:{
    goToTender(){
      let _this=this;
      if(this.$store.state.isapp =='ios'){//IOS打开
        window.webkit.messageHandlers.Method.postMessage({ type: "backToRoot" });
        alert("ios")
      }else{//安卓打开
        android.backToRoot();
      }
    }
  },
  created:function(){
    let _this =this
    let query = this.$route.query

  },
  components:{
    globlenav,
    heads,
  }
}
</script>
<style lang="scss" scoped>
.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;height:100%;}
.container{overflow:auto;}
.content .imgbanner{width:30%;margin:rem(140) auto rem(30);}
.botfinsh{line-height: rem(40);width:60%;background:#de3132;color:#fff;font-size:rem(16);text-align:center;margin:0 auto;border-radius:rem(5)}
.grayp{line-height:rem(40);text-align:center;color:#000;font-size:rem(20);margin:rem(10) 0 rem(30);font-weight: normal;}
</style>

