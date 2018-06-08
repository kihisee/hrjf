<template>
<div class="container">
        <heads :title="title"></heads>
        <div class="tradelistnav">
            <ul>
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>交易明细</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>充值记录</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>提现记录</span></li>
            </ul>
        </div>
        <div class="jilv" id="iscroll">
            <ul id="content">
                <li v-for="(item,index) in datalist" :class="{li_act:index==classlist}" @click="addClassFun(index,item)">
                    <dl>
                        <dt>{{item.CreateTime.substring(10,16)}}<span></span></dt>
                        <dd>
                            <router-link :to="'/tradedetail'">
                                <p class="dp_left">
                                    <span class="tx_bank" v-if="classIndex==0">{{item.TradeType}}</span>
                                    <span class="tx_bank" v-if="classIndex==1">{{item.BankName}}充值</span>
                                    <span class="tx_bank" v-if="classIndex==2">提现到{{item.BankName}}</span>
                                    <span class="tx_date">{{item.CreateTime.substr(0,10)}}</span>
                                </p>
                                <p class="dp_ri" v-if="classIndex==0">￥{{Math.abs(item.Variable).toFixed(2)}}</p>
                                <p class="dp_ri" v-if="classIndex==1">￥{{item.Variable}}</p>
                                <p class="dp_ri" v-if="classIndex==2">￥{{item.Amount}}</p>
                            </router-link>
                        </dd>
                    </dl>
                </li>
                <li style="text-align:center;padding:0.25rem 0; height:auto;" v-if="showmoer">{{loaddata}}</li>
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
      title:"交易明细",
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
            this.tradetype=-1
        }else{
            this.tradetype=type
        }

        this.classIndex=type;
        this.init();
        this.getdata();
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
    addClassFun(index,data){
        let obj = this.datalist[index];
        let title = ["交易详情","充值详细","提现详细"]
        let name = ["交易金额","充值金额","提现金额"]
        this.classlist = index;
        obj.title=title[this.classIndex]
        obj.name=name[this.classIndex]
        obj.typeindex = this.classIndex
        if(obj.TradeType=="充值存入"||obj.TradeType=="提现取出"){
          obj.subtext = obj.BankName+obj.TradeType
        }else if(this.classIndex==1||this.classIndex==2){
          obj.subtext = obj.BankName+name[this.classIndex]
        }else{
          obj.subtext = obj.TradeType
        }

        if(this.classIndex==2){
            obj.Variable=obj.Amount;
            obj.Reference = obj.TradeCode
            obj.TradeType = obj.TradeStatus
        }
        this.$store.commit("tradedetail",obj)
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
    getdata(){
        let _this=this;
        let api
        if(_this.tradetype==0||_this.tradetype==-1){
            api=this.$api.queryAccountTradeLog;
        }
        if(_this.tradetype==1){
            api=this.$api.queryrechargelog;
        }
        if(_this.tradetype==2){
            api=this.$api.queryfetchmoneyLog;
        }
      if(this.datalist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(api({"Day":-1,"TradeType":this.tradetype,"Page":this.page,"PageSize":10}))
      .then((data) => {
        console.log(data.data)
        if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
            for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.datalist.push(data.data.ResultData.List[i])
             }
          if(_this.datalist.length>=this.total){
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
          _this.showmoer = true;
        }
      });
    }
  },
  created :function(){
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
.jilv{position: absolute;z-index: 1;top: 2.0rem;bottom: 0;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none;}
.jilv li{color: #808080;padding: 0.25rem 0;margin:0 auto;height: 1.5rem;width:95%;}
.jilv dl{}
.jilv dl dt{line-height: 1.5rem;height:1.5rem;float: left;width: 25%;text-align: left;text-indent: 0.2rem;position: relative; font-size:0.4rem;}
.jilv dl dt::before{content: "";border-radius: 50%;width:0.35rem;height:0.35rem;border:1px solid #b5b5b5;display: block;position: absolute;right:0.25rem;top:0.575rem;}
.jilv li:nth-child(1) dl dt::after{display:none}
.jilv dl dt::after{content: "";width:1px;height:1.375rem;background:#b5b5b5;display: block;position: absolute;right:0.425rem;top:-0.925rem;}
.jilv dl dd{height: 1.5rem;float: right;width: 75%;background: #fff;border-radius: 0.125rem;}
.dp_left{width: 47%;float: left;padding: 0.125rem 0;text-align: left;text-indent:0.375rem;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
.dp_ri{width: 52%;float: right;line-height: 1.5rem;font-size: 0.45rem; color: #de3132;text-align:right; box-sizing:border-box; padding-right:rem(20)}
.dp_left span{display: block;line-height: 0.625rem;color:#808080;}
.dp_left .tx_bank{overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
.dp_left .tx_date{color: #c9c9c9;}

.jilv .li_act dl dt::after{}
.jilv .li_act dl dt::before{border:1px solid #de3132;background: #de3132;}
.jilv .li_act dl dt{color: #de3132;}
.jilv .li_act dl dd{background: #de3132;}
.jilv .li_act .dp_left .tx_date{color: #fff;}
.jilv .li_act .dp_left span{color: #fff;}
.li_act .dp_ri{color: #fff;}
</style>
