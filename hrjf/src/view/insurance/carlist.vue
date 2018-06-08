<template>
  <div class="container">
    <heads :title="title"   v-if="isapp"></heads>
   <div id="con">
  <div id="iscroll" class="listdetail"  :class="{inapp:!isapp}">
    <div>
       <div class="wihtebox" v-for="(item,index) in allData"  @click="gotodetail(item.Id,item.InsuranceType)">
          <div class="whitetop">
              <img class="wherepic"  :src="item.CarInsurancePicture" />
          </div>
        </div>
      <div style="text-align:center;height:1rem; border:none;background:none;line-height:1rem;padding:0rem 0 0.25rem"  v-if="showmoer">{{loaddata}}</div>
    </div>
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
      title: '车险',

      allData:[],
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
        console.log(_this.myScroll)
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
     _this.$router.push('/cardetail?Id='+index+"&isapp="+_this.isapp)

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
          if(_this.allData.length>=_this.total){
          _this.loaddata = "没有更多数据"
          _this.datamoer = 0
          _this.myScroll.refresh()
          return
        }

        this.$http(this.$api.GetInsurances({"InsuranceType":1,"IsHot ":null,"Page":_this.page,"PageSize":10}))
        .then((data) => {
          console.log(data)
          //_this.allData=data.data.ResultData.List

           if(data.data.ResultData.List.length!=0){
              console.log("in")
              _this.total = data.data.ResultData.Total
              _this.page ++
                for(var i=0;i<data.data.ResultData.List.length;i++){
                    _this.allData.push(data.data.ResultData.List[i])
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
      //_this.isapp=_this.$lg.isapp()
    _this.isapp=query.isapp
    //console.log(typeof (_this.isapp) )
    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }

    _this.title=query.item

  // this.$http(this.$api.GetInsurances({"InsuranceType":1,"IsHot ":null}))
  // .then((data) => {
  //   console.log(data)
  //   _this.allData=data.data.ResultData.List
  // })

  },
  components:{
    heads,
  }
}
</script>
<style lang="scss" scoped>
.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;}
.wihtebox{background:#fff;overflow:auto;margin:rem(10) 0; }
.whitetop{width:100%;margin:0 auto;overflow:auto;}
.whitetop .wtopleft{width:70%;float:left;}
.whitetop .wtopright{width:30%;float:right;}
.whitetop .wtopleft .toptitle{font-size:rem(18);color:#333333;}
.whitetop .wtopleft .botdetail{font-size:rem(14);color:#666666;line-height: rem(30)}

.whitelist{width:90%;margin:0 auto;border-bottom:rem(1) solid #ccc;overflow:auto;padding:rem(5) 0 rem(10)}
.whitelist ul{}
.whitelist ul li{line-height:rem(30)}
.whitelist ul li .listleft{width:55%;float:left;color:#666666;}
.whitelist ul li .listright{width:45%;float:right;color:#333333;text-align:right;font-weight: bold;}
.whitelist ul li .listright span{color:#666666;font-weight:normal;}
.howmoney{width:90%;margin:0 auto;color:#de3031;font-size:rem(20);line-height:rem(35);padding:rem(5) 0;}
.howmoney span{color:#999999;font-size:rem(12);}

.listdetail{width:100%;position:absolute;top:rem(40);bottom:0;left:0;right:0;overflow:hidden;touch-action:none;-webkit-overflow-scrolling: touch;}
.inapp{top:rem(0);}
</style>

