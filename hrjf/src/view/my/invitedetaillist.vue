<template>
<div class="container">
        <heads :title="title"></heads>

        <div class="invitelist" id="iscroll">
            <ul id="content">
                <li v-for="(item,index) in datalist">
                    <dl>
                        <dt><p v-if="item.title.length>17">{{(item.title).substr(0,17)}}...</p><p v-else>{{item.title}}</p><span v-if="item.Tip!=''">直接</span></dt>
                        <dd>
                          {{item.remark}}
                        </dd>
                    </dl>
                    <div class="money_day">
                      <span>+{{item.variable}}元</span>
                      <p>{{item.create_time}}</p>
                    </div>
                </li>
                <li style="text-align:center;padding:0.25rem 0; height:auto; border:none;background:none" v-if="showmoer">{{loaddata}}</li>
            </ul>

        </div>
        <div class="invitetotol"><span class="title">总计奖励</span><span class="money">{{totalmoney}}元</span></div>
</div>
</template>

<script>

import heads from '../../components/head'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:"奖励明细",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      classlist:-1,
      total:2,
      loaddata:"加载更多数据",
      datamoer:true,
      showmoer:false,
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
      totalmoney:0,
      inviteuserid:0,
      now:0,
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
    tabClick(type){
        if(type==0){
            this.tradetype=-1
        }else{
            this.tradetype=type
        }
        this.classIndex=type;
        this.init();
        this.getdata(type);
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

    init(){
      let _this= this
        this.page=1;
        this.datalist=[];
        this.classlist=-1
        this.myScroll.scrollTo(0, 0);
        setTimeout(function(){
             _this.myScroll.refresh()
           },300)
    },
    getdata(type){
        let _this=this;

      if(this.datalist.length>=this.total){
        _this.loaddata = "已加载全部数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(this.$api.QueryMonthReportDetail({"InvestUserId":this.inviteuserid,"Page":this.page,"PageSize":10}))
      .then((data) => {

        if(data.data.ResultData.LogList.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
            for(var i=0;i<data.data.ResultData.LogList.length;i++){
                _this.datalist.push(data.data.ResultData.LogList[i])
                if (data.data.ResultData.LogList[i].log_type == 17) {
                    _this.datalist[_this.now].title = data.data.ResultData.LogList[i].real_name+"投资固定理财奖励"
                }else if (data.data.ResultData.LogList[i].log_type == 18) {
                    _this.datalist[_this.now].title = "所有用户投资活期宝奖励";
                }else if (data.data.ResultData.LogList[i].log_type == 19) {
                    _this.datalist[_this.now].title = "员工自己理财奖励";
                }else if (data.data.ResultData.LogList[i].log_type == 20) {
                    _this.datalist[_this.now].title = "员工自己活期宝奖励";
                }else if (data.data.ResultData.LogList[i].log_type == 23) {
                    _this.datalist[_this.now].title = "间接被邀用户"+data.data.ResultData.LogList[i].real_name+"投资固定理财奖励";
                }else if (data.data.ResultData.LogList[i].log_type == 24) {
                    _this.datalist[_this.now].title = "间接被邀用户投资活期宝奖励";
                }
                _this.now ++;
             }
            // _this.totalmoney = data.data.ResultData.TotalMoney
             console.log(_this.datalist)
             if(data.data.ResultData.LogList.length<10){
               _this.loaddata = "已加载全部数据"
             }else{
               _this.loaddata = "加载更多数据"
             }

          if(!_this.datamoer){
          setTimeout(function(){
             _this.datamoer = true;
             _this.myScroll.refresh()
           },300)

          }
          _this.showmoer = true;
        }
      });
    }
  },
  created :function(){
    let q = this.$route.query
    if(q.inviteuserid){
      this.inviteuserid = q.inviteuserid
    }
    if(q.money){
      this.totalmoney = q.money
    }
    this.getdata()
  },
  destroyed() {
  },
  components:{
    heads
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tradelistnav ul{display:flex;align-items:center;justify-content:center; height:1rem; border-bottom:1px solid #ccc;background:#fff;text-align:center;}
.tradelistnav ul span{font-size:0.4rem}
.tradelistnav ul li.active span{border-bottom:0.05rem solid #FF3533;color:#FF3533;padding-bottom:0.20rem}
.invitelist{position: absolute;z-index: 1;top: 1.1rem;bottom: 1.1rem;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none; }
.invitelist li{color: #808080;padding: 0.25rem 0;margin:0 auto;border-bottom:1px solid #ccc; background:#fff; padding:rem(10); overflow:hidden;box-sizing:border-box;}
.invitelist dl{width:65%; float:left;}
.invitelist dl dt{color:#000;}
.invitelist dl dt p{display:inline-block; width:auto;}
.invitelist dl dt span{background:#de3132; font-size:0.3rem; color:#fff; width:rem(40); height:rem(18); display:inline-block; vertical-align:middle;text-align:center; border-radius:rem(5); font-weight:normal; margin-left:rem(10)}

.invitelist dl dd{margin-top:rem(10)}
.invitelist .money_day{float:right; width:35%;}
.invitelist .money_day span{font-size:0.4rem; color:$orange;text-align:right; display:block;}
.invitelist .money_day p{text-align:right; }

.invitetotol{position:fixed; bottom:0; height:1.1rem; background:#fff; line-height:1.1rem;display:flex;box-sizing:border-box;padding:0 rem(10); font-size:0.45rem;}
.invitetotol .title{text-align:left; color:#555;}
.invitetotol .money{text-align:right; color:$orange;}
</style>
