<template>
  <div class="container">
    <heads :title="title"  v-if="isapp" ></heads>
    <div id="con">

      <div class="listdetail"  id="iscroll"  :class="{inapp:!isapp}">
      <ul>
       <li class="wihtebox" v-for="(item,index) in allData"  @click="gotodetail(item.Id,item.InsuranceType)">
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
          <div class="whitelist" v-if="explainlist[index]">
            <ul :class="{ overclass:explainlist[index].PlanTypeItemList.length>3 }" >
              <li v-for="items in item.InsurancePlanTypeList[0].PlanTypeItemList"  >
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
        </li>
        <li style="text-align:center;height:1rem; border:none;background:none;line-height:1rem;padding:0rem 0 0.25rem"  v-if="showmoer">{{loaddata}}</li>
      </ul>
      </div>

  </div>
 </div>




</template>

<script>
import heads from '../../components/head'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title: '投保需知',

      allData:[],

      explainlist:[],
       isapp:false,
       page:1,
      loaddata:"加载更多数据",
      total:2,
      datamoer:true,
      showmoer:true,
            obj:{
          mouseWheel: true,
          click:this.iScrollClick() ,
          preventDefault: true,
          tap: true,
          bounce: false  ,
          scrollbars : false,
          momentum: true,//惯性滑动
          scrollX : false,
          scrollY : true,
      },
    }
  },
  mounted : function() {
      let _this = this;
      setTimeout(function(){
        _this.myScroll = new IScroll(document.getElementById('iscroll'),_this.obj);
        _this.myScroll.on('scrollEnd',function(){
          if(this.y<=(this.wrapperHeight-this.scrollerHeight)&&_this.datamoer){
            _this.datamoer = false;
            _this.loaddata = "加载中"
            _this.getdata();

          }
        })
      },300)
  },
  methods:{
     gotodetail(index,InsuranceType){
      let _this=this
      if(InsuranceType==1){
        _this.$router.push('/cardetail?Id='+index+"&isapp="+_this.isapp)
      }else{
         _this.$router.push('/insurancedetail?Id='+index+"&isapp="+_this.isapp)
      }

    },
    iScrollClick(){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
           var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
           return parseFloat(s[0]+s[3]) < 44 ? false : true
          }
    },
    getdata(){
          let _this=this;
          let query = this.$route.query
            if(this.allData.length>=this.total){
            _this.loaddata = "没有更多数据"
            _this.datamoer = 0
            _this.myScroll.refresh()
            return
          }

         this.$http(this.$api.GetInsurances({"InsuranceType":query.InsuranceType,"IsHot ":null,"Page":_this.page ,"PageSize":10}))
        .then((data) => {
             console.log(data)

               if(data.data.ResultData.List.length!=0){
              _this.total = data.data.ResultData.Total
              console.log(_this.total)
              _this.page ++

                for(var i=0;i<data.data.ResultData.List.length;i++){
                    _this.allData.push(data.data.ResultData.List[i])
                 }
               for(let i=0;i<_this.allData.length;i++){
                  _this.explainlist.push(_this.allData[i].InsurancePlanTypeList[0])
                }
                 console.log(_this.allData)
              if(data.data.ResultData.List.length<10){
                 _this.loaddata = "没有更多数据"
              }else{
                _this.loaddata = "加载更多数据"
              }

              if(!_this.datamoer){
              setTimeout(function(){
                 _this.datamoer = true;
                 _this.myScroll.refresh()
               },300)

              }
            }
        })
      },

  },
  created:function(){
    let _this =this
    _this.getdata()
    let query = this.$route.query
    _this.title=query.item
     _this.isapp=_this.$lg.isapp()
  _this.isapp=query.isapp

    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }


  },
  components:{
    heads,
  }
}
</script>
<style lang="scss" scoped>
.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;}
.wihtebox{background:#fff;overflow:auto;margin:rem(10) 0 }
.whitetop{width:90%;margin:0 auto;padding:rem(10) 0;border-bottom: rem(1) dashed #ccc;overflow:auto;}
.whitetop .wtopleft{width:70%;float:left;}
.whitetop .wtopright{width:30%;float:right;}
.whitetop .wtopleft .toptitle{font-size:rem(18);color:#333333;}
.whitetop .wtopleft .botdetail{font-size:rem(14);color:#666666;line-height: rem(30)}

.whitelist{width:90%;margin:0 auto;border-bottom:rem(1) solid #ccc;overflow:auto;padding:rem(5) 0 rem(10)}
.whitelist ul{}
.whitelist ul li{line-height:rem(30)}
.whitelist ul li .listleft{width:55%;float:left;color:#666666;}
.whitelist ul li .listright{width:45%;float:right;color:#333333;text-align:right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitelist ul li .listright span{color:#666666;font-weight:normal;}
.howmoney{width:90%;margin:0 auto;color:#de3031;font-size:rem(20);line-height:rem(35);padding:rem(5) 0;}
.howmoney span{color:#999999;font-size:rem(12);}
.overclass{height:rem(90);overflow:hidden;}


.listdetail{padding:rem(0) 0 0;box-sizing:border-box;margin-top:rem(10);position: absolute;z-index: 1;top: 1rem;bottom: 0;overflow: hidden;width: 100%;touch-action: none;}
.inapp{top:rem(0);}
</style>

