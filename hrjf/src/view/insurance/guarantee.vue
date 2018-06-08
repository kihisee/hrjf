<template>
   <div id="frame">
    <heads :title="title"   v-if="isapp"></heads>
    <div id="con">


    <div class="content">
        <div class="contop">
          <span></span>
          {{InsurancePlanItemName}}
        </div>

        <p class="blackp">{{InsurancePayment}}</p>

        <p class="gray">{{detail}}</p>
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
      title: '保障方案',
      allData:[],
      detail:'',
      InsurancePlanItemName:'',
      InsurancePayment:'',
       isapp:false,
    }
  },
  methods:{


  },
  created:function(){
    let _this =this

    let query = this.$route.query
    _this.isapp=_this.$lg.isapp()
    _this.isapp=query.isapp

    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }

     this.$http(this.$api.GetInsuranceDetail({"InsuranceId":query.InsuranceId}))
    .then((data) => {
       console.log(data)
         _this.allData=data.data.ResultData
         console.log(_this.allData)
         for(let i=0;i<_this.allData.InsurancePlanTypeList[query.activeindex].PlanTypeItemList.length;i++){
          console.log(1)
           if(_this.allData.InsurancePlanTypeList[query.activeindex].PlanTypeItemList[i].Id==query.Id){
            console.log(query.Id)
            _this.detail=_this.allData.InsurancePlanTypeList[query.activeindex].PlanTypeItemList[i].InsuranceDescription
            _this.InsurancePlanItemName=_this.allData.InsurancePlanTypeList[query.activeindex].PlanTypeItemList[i].InsurancePlanItemName
             _this.InsurancePayment=_this.allData.InsurancePlanTypeList[query.activeindex].PlanTypeItemList[i].InsurancePayment
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
.content .contop{font-size:rem(18);color:#333;line-height: rem(40);border-bottom:rem(1) solid #ccc;}
.content .contop span{display: block;width:rem(10);height:rem(10);border-radius:rem(10);background:#de3031;float:left;margin: rem(15) rem(5) 0 0 }
.content .blackp{color:#333;font-size:rem(16);line-height:rem(35)}
.content .gray{font-size:rem(14);color:#999999;}
</style>

