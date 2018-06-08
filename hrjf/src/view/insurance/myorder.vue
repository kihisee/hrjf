<template>
   <div id="frame">
    <heads :title="title"   v-if="isapp"></heads>
    <div id="con">

 <div class="whitebox carlist" v-for="item in cardata">

    <div class="clickdiv" @click="gotodetail(item.Id,item.InsuranceType)">
      <div class="whitetop">
        <img class="wherepic"  :src="item.CarInsurancePicture" />
      </div>
    </div>

    <div class="boxbot"><div class="timeleft">预约时间：{{item.ApplyTime}}</div><div class="quxyy" @click="cancel(item.ApplyId)">取消预约</div></div>
  </div>



   <div class="whitebox" v-for="(item,index) in allData" >
    <div class="clickdiv"  @click="gotodetail(item.Id,item.InsuranceType)">
      <div class="whitetop">
        <div class="wtopleft">
          <p class="toptitle">{{item.InsuranceName}}</p>
          <div class="botdetail">
            承保年龄：{{item.InsuredAgePeriod}} | 保障期限：{{item.InsuredPeriod}}
          </div>
        </div>
        <div class="wtopright">
          <img class="wherepic"  :src="item.InsurerLogo" />
        </div>
      </div>
      <div class="whitelist" v-if="item.InsurancePlanTypeList.length">
            <ul :class="{overflow:item.InsurancePlanTypeList[0].PlanTypeItemList.length>3}">
              <li v-for="items in item.InsurancePlanTypeList[0].PlanTypeItemList" >
                <p class="listleft">{{items.InsurancePlanItemName}}</p>
                <p class="listright">{{items.InsurancePayment}}</p>
              </li>
            </ul>
            <ul v-if="item.InsurancePlanTypeList[0].PlanTypeItemList.length>3">
              <li>
                 <p class="listleft">.......</p>
                  <p class="listright">........</p>
              </li>
            </ul>
      </div>
      <div class="howmoney">￥{{item.LeastInsuranceFee}}<span>起</span></div>
      </div>
      <div class="boxbot"><div class="timeleft">预约时间：{{item.ApplyTime}}</div><div class="quxyy" @click="cancel(item.ApplyId)">取消预约</div></div>
    </div>

    <div class="allnone" v-if="allnone">
      <p>您没有预约的保险</p>
    </div>

<!--    <div class="wihtebox" v-for="item in allData">
      <div class="whitetop">
        <div class="wtopleft">
          <p class="toptitle">{{item.InsuranceName}}</p>
          <div class="botdetail">
            承保年龄：{{item.InsuredAgePeriod}}周岁 | 保障期限：{{item.InsuredPeriod}}
          </div>
        </div>
        <div class="wtopright">
          <img class="wherepic"  :src="tem.InsurerLogo" />
        </div>
      </div>
      <div class="whitelist">
        <ul>
          <li>
            <p class="listleft">年度总限额</p>
            <p class="listright">200万元起</p>
          </li>
          <li>
            <p class="listleft">住院医疗费用</p>
            <p class="listright">100万元起<span>（计入一般医...</span></p>
          </li>
          <li>
            <p class="listleft">指定门诊医疗费用</p>
            <p class="listright">100万元起<span>（计入一般医...</span></p>
          </li>
          <li>
            <p class="listleft">住院前后7天门诊急诊费用</p>
             <p class="listright">100万元起<span>（计入一般医...</span></p>
          </li>
          <li>
            <p class="listleft">.......</p>
             <p class="listright">.......</p>
          </li>
        </ul>
      </div>
      <div class="howmoney">￥329.00<span>起</span></div>
    </div> -->

  </div>
 </div>




</template>

<script>
import globlenav from '../../components/nav';
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '预约',

      allData:[],

      cardata:[],
      apiData:[],

      infirst:[],

      InsurancePlanTypeList:[],

      state:this.$store.state,
      allnone:false,
      isover:false,
       isapp:false,
    }
  },
  methods:{
     gotodetail(index,InsuranceType){
      let _this=this
      if(InsuranceType==1){
        _this.$router.push('/cardetail?Id='+index)
      }else{
         _this.$router.push('/insurancedetail?Id='+index)
      }

    },
    cancel(index){
       let _this=this
       this.$http(this.$api.CancelInsuranceApply({"ApplyId":index}))
        .then((data) => {
             console.log(data)
             if(data.data.ResultCode==100000){
              _this.$msg.alert(data.data.ResultMessage,function(){
                 _this.$http(this.$api.GetInsuranceApplys({}))
                .then((data) => {
                  console.log(data)
                  if(data.data.ResultCode==100000){
                    location.reload();
                  }
                })
              })
             }
        })
    },

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    _this.isapp=_this.$lg.isapp()



    if(query.isapp=="false"){
        _this.isapp=false
        console.log(_this.isapp)
      }else{
        _this.isapp=true
        console.log(_this.isapp)
      }

    _this.title="我的预约"

     if(typeof _this.state.user=="undefined"){
       _this.$msg.alert("请先登录",function(){
        _this.$router.push('/login?back=myorder')
            return false
       })

      }



  this.$http(this.$api.GetInsuranceApplys({}))
  .then((data) => {
    console.log(data)
      _this.apiData=data.data.ResultData
      if(_this.apiData.List.length){
          console.log(1)
          for(let i=0;i<_this.apiData.List.length;i++){
                   if(_this.apiData.List[i].InsuranceType!=1){
                    //_this.apiData.List[i].InsurancePlanTypeList[0].PlanTypeItemList.length=3;

                    _this.allData.push(_this.apiData.List[i])
                  }else{
                    _this.cardata.push(_this.apiData.List[i])
                  }
            }
      }else{
        console.log(2)
        _this.allnone=true
      }




      _this.InsurancePlanTypeList.length=_this.allData.length


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
.whitebox{background:#fff;overflow:auto;margin:rem(10) 0 }
.whitetop{width:90%;margin:0 auto;padding:rem(10) 0;border-bottom: rem(1) dashed #ccc;overflow:auto;}
.carlist .whitetop{width:100%;margin:0 auto;padding:rem(0) 0 rem(10);border-bottom:none;overflow:auto;}
.whitetop .wtopleft{width:70%;float:left;}
.whitetop .wtopright{width:30%;float:right;}
.whitetop .wtopleft .toptitle{font-size:rem(18);color:#333333;}
.whitetop .wtopleft .botdetail{font-size:rem(14);color:#666666;line-height: rem(30)}

.whitelist{width:90%;margin:0 auto;border-bottom:rem(1) solid #ccc;overflow:auto;padding:rem(5) 0 rem(10)}
.whitelist ul{}
.whitelist ul.overyi{height:rem(90);overflow:hidden;}
.whitelist ul li{line-height:rem(30)}
.whitelist ul li .listleft{width:55%;float:left;color:#666666;}
.whitelist ul li .listright{width:45%;float:right;color:#333333;text-align:right;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitelist ul li .listright span{color:#666666;font-weight:normal;}
.howmoney{width:90%;margin:0 auto;color:#de3031;font-size:rem(20);line-height:rem(35);padding:rem(5) 0;}
.howmoney span{color:#999999;font-size:rem(12);}
.boxbot{width:90%;margin:0 auto;background:#fff;line-height:rem(45);color:#333;font-size:rem(14);overflow:auto;padding:rem(10) 0;border-top: rem(1) solid #ccc;}
.boxbot .timeleft{width:63%;float:left;font-size:rem(12)}
.boxbot .quxyy{width:35%;float:right;text-align:center;line-height:rem(35);border:rem(1) #ddd solid;border-radius:rem(20);margin-top: rem(5)}

.clickdiv{overflow:hidden;}
.allnone{width:100%;height:100%;background:url(../../../static/img/my/invite/smile.png) no-repeat center rem(30);background-size:30%;position:absolute;top:rem(40);left:0;}
.allnone p{padding-top:rem(180);text-align:center;color:#aaa;font-size:rem(16)}

.whitelist ul.overflow{height:rem(90);overflow:hidden;}
</style>

