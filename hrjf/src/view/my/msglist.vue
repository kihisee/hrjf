<template>
<div class="container">
  <heads :title="title"></heads>
        <div class="tab_bot" id="iscroll">
          <div>
             <div class="tab_divdgx" v-for="(item,index) in datalist" :class="{tab_divdgxs:item.MessageStatus==3}" @click="msgfun(index)">
                <a href="javascript:" class="a_lianjie">
                    <dl class="tab_dlgx f16">
                        <dt>
                            <p class="tab_leftp">
                                <i></i>{{item.MessageName}}
                            </p>
                            <span class="dlSpangx">{{item.SendTime.substr(0,10)}}</span>
                        </dt>
                        <dd>
                        <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis; width:95%;display:block">{{item.MessageContent}}</span>

                        </dd>
                    </dl>
                </a>
            </div>
            <div style="text-align:center;padding:0.25rem 0; height:auto; border:none;background:none" v-if="showmoer">{{loaddata}}</div>
          </div>
        </div>
</div>
</template>

<script>

import heads from '../../components/head';
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:"消息中心",
      tradetype:1,
      datalist:[],
      page:1,
      state:this.$store.state,
      loaddata:"加载更多数据",
      total:2,
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
    msgfun(index){
      this.state.msg=this.datalist[index]
      this.$http(this.$api.updatamessage({"id":this.state.msg.Id}))
      .then((data) => {
        console.log("消息已读")
        this.$router.push('/msgdetail')
      });
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
    scroll(){
         let _this=this;
         console.log(window.screen.height)
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
            console.log(document.body.scrollHeight)
           this.page++
           this.getdata()
          }

      },
    getdata(){
        let _this=this;
        if(this.datalist.length>=this.total){
        _this.loaddata = "已加载全部数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(this.$api.getmsglist({"MessageContentType":this.tradetype,"Page":this.page,"PageSize":10}))
      .then((data) => {
        console.log(data.data.ResultData)
        if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
            for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.datalist.push(data.data.ResultData.List[i])
             }
          _this.loaddata = "加载更多数据"
          if(!_this.datamoer){
          setTimeout(function(){
             _this.datamoer = true;
             _this.myScroll.refresh()
           },300)

          }
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
  },
}
</script>

<style lang="scss" scoped>
.tab_bot{position: absolute;z-index: 1;top: 1.1rem;bottom: 0rem;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none;}
.tab_bot .tab_divdgx{line-height: 1.0rem;background: #fff;padding:0.25rem;margin-bottom:0.25rem;border-bottom: 1px solid #c8c8c8;width:100%;box-sizing:border-box;}
.tab_bot .tab_divdgxdd{line-height: 1.0rem;background: #fff;padding:0.25rem;margin-bottom: 0px;border-bottom:none;width:100%;}
.tab_divdgx .tab_leftp{text-align: left;float:left;width:75%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap; }
.tab_divdgx .f16{font-size:0.4rem;}
.tab_divdgx .tab_leftp i{width:0.2rem;height:0.2rem;border-radius: 0.2rem;background: #de3132;display: inline-block;margin-right: 0.25rem;}
.tab_divdgx .tab_leftp:visited {background:#999;}
.tab_divdgx .tab_dlgx .dlSpangx{color: #d2d2d2;font-size: 0.35rem;}
.tab_bot .tab_divdgx dd{text-align: left;color: #ababab;font-size: 0.4rem;background: url(/static/img/my/li_you.png) no-repeat right center;background-size:0.3rem;}
.tab_bot .tab_divdgx dd.nobac{text-align: left;color: #ababab;font-size: 0.4rem;background:none;line-height:0.625rem;}

.tab_divdgx .tab_leftps{text-align: left;width:75%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap;color: #5c5c5c; }
.tab_divdgxdd .tab_leftps{text-align: left;width:100%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap;color: #5c5c5c; }
.tab_divdgx .tab_leftps i{width:0.2rem;height:0.2rem;border-radius: 0.2rem;background: #de3132;display: inline-block;margin-right: 0.25rem;}
.tab_divdgx .tab_dlgx .dlSpangxs{color: #d2d2d2;font-size: 0.35rem;text-align: left;display: block;}
.tab_divdgx .a_lianjie .tab_dlgx .tab_leftp i {background: #de3132;}
.tab_divdgxs .a_lianjie .tab_dlgx .tab_leftp i {background:#999;}
.tab_top{margin-bottom: 10px;}
#tabUlT{height: 40px;line-height: 40px;background: #fff;}
#tabUlT li{color: #b2b2b2;float: left;width: 33%;}
#tabUlT li.myL_active{color: #ff9227;border-bottom:5px solid #ff9227;line-height: 40px;height: 35px;}

.tab_divd{border-bottom: 1px solid #aaaaaa;line-height: 25px;background: #fff;margin-bottom: 10px;}
.tab_dl{width: 90%;margin:0 auto;height: 86px;padding-top: 13px;}
.tab_dl dt{text-align: left;position:relative;width: 100%;height: 25px;font-size: 14px;}
.tab_leftp{color: #333;}


</style>
