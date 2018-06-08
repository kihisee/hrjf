<template>
   <div id="frame">
    <heads :title="title"  v-if="isapp" ></heads>
    <div id="con">


    <div class="content" v-html="InsurancePlanFileList.InsuranceFileDescription"></div>




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


  },
  created:function(){
    let _this =this

    let query = this.$route.query
    _this.isapp=_this.$lg.isapp()
    if(query.isapp=="false"){
            _this.isapp=false
          }else{
            _this.isapp=true
          }
    this.$http(this.$api.GetInsuranceDetail({"InsuranceId":query.InsuranceId}))
    .then((data) => {
        console.log(data)
        for(let i=0;i<data.data.ResultData.InsurancePlanFileList.length;i++){
          if(data.data.ResultData.InsurancePlanFileList[i].Id==query.Id){
            _this.InsurancePlanFileList=data.data.ResultData.InsurancePlanFileList[i];
            _this.title= _this.InsurancePlanFileList.InsuranceFileName
          }
       }
    })

  },
  components:{
    globlenav,
    heads,
  }
}
</script>
<style lang="scss" scoped>
.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;}
</style>

