<template>
<div class="container">
        <heads :title="title"></heads>
        <div class="tradelistnav">
            <ul>
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>持有中</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>投资中</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>已结束</span></li>
            </ul>
        </div>
        <div class="mytenderlist" id="iscroll">
            <ul>
                <li v-for="(item,index) in datalist"  @click="addClassFun(index)">
                      <div class="title_box">
                        <div class="title">{{item.TenderName}}</div>
                        <div class="time"  v-if="classIndex==0"><i></i>还剩余{{item.Day}}天</div>
                        <div class="time"  v-if="classIndex==2"><i></i></div>
                      </div>
                      <div class="mytender_main">
                        <dl>
                          <dt>投资金额</dt>
                          <dd>{{item.PrepayMoney}}元</dd>
                        </dl>
                        <dl>
                          <dt v-if="classIndex==1">待收收益</dt>
                          <dt v-else>收益</dt>
                          <dd>{{(item.Money*item.IsDouble).toFixed(2)}}元</dd>
                        </dl>
                        <dl>
                          <dt>投资时间</dt>
                          <dd>{{item.PrepayDateTime}}</dd>
                        </dl>
                      </div>
                </li>
                <li style="text-align:center;background:#fff;padding:0.25rem 0; height:auto;" v-if="showmoer">{{loaddata}}</li>
            </ul>
        </div>
</div>
</template>

<script>
import heads from '../../components/head'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:"我的理财",
      classIndex:0,
      tradetype:1,
      datalist:[],
      page:1,
      type:0,
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
      }
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
            this.tradetype=1
        }else{
            this.tradetype=type
        }
        this.classIndex=type
        this.type=type;
        this.init();
        this.getdata();
    },
    addClassFun(index){
        if(this.classIndex==0||this.classIndex==2){
          this.$router.push('/mytenderdetail?ordercode='+this.datalist[index].OrderCode)
        }
    },
    init(){
      let _this= this
        this.page=1;
        this.datalist=[];
        this.myScroll.scrollTo(0, 0);
        setTimeout(function(){
             _this.myScroll.refresh()
           },300)
    },
    scroll(e){
         let _this=this;
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
           this.page++
           this.getdata()
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
        let api
        if(this.type==0||"undefined"){
            api=this.$api.getquerymytenderinthislist;
            this.tradetype==1
        }
        if(this.type==1){
            api=this.$api.getquerymytenderprepaylist;
        }
        if(this.type==2){
            api=this.$api.getquerymytenderinthislist;
            this.tradetype==2
        }
       if(this.datalist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(api({"TenderStatus":this.tradetype,"Page":this.page,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
            for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.datalist.push(data.data.ResultData.List[i])
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
    if(this.$route.query.index){
      this.type=1
      this.classIndex=1
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
/*我的理财*/
.tradelistnav ul{display:flex;align-items:center;justify-content:center; height:1rem; border-bottom:1px solid #ccc;background:#fff;text-align:center;}
.tradelistnav ul span{font-size:0.4rem}
.tradelistnav ul li.active span{border-bottom:0.05rem solid #FF3533;color:#FF3533;padding-bottom:0.20rem}
.mytenderlist{position: absolute;z-index: 1;top: 2.3rem;bottom: 0;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none;}
.mytenderlist li{padding: 0rem 0.375rem;box-sizing:border-box;background:#fff;border-bottom:1px solid #ccc; margin-bottom:0.375rem;position:relative}
.mytenderlist li {display:block;color:#555;}
.mytenderlist li .title_box{display:flex;align-items:center; height:1rem;}
.mytenderlist li .title_box .title{ width:65%; line-height:1.0rem; font-size:0.4rem; color:#555; text-align:left;}
.mytenderlist li .title_box .time{width:35%;text-align:right;font-size:0.35rem}
.mytenderlist li .mytender_main{width:90%;display:flex;align-items:center;justify-content:center;margin-bottom:0.25rem}
.mytenderlist li .mytender_main dl{text-align:left;font-size:0.35rem}
.mytenderlist li .mytender_main dl dd{font-size:0.4rem;color:#de3132}
.mytenderlist li i{width:0.45rem; height:0.5rem;display:block;background:url(/static/img/my/right_grd.png) no-repeat 0 0.05rem ;background-size: 50%; position:absolute; bottom:0.4rem;right:0.175rem;}
</style>
