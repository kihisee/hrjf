<template>
<div class="container">
  <heads :title="title"></heads>
    <div class="housenews_box"  id="iscroll" :style="styletop">
      <div class="news">
        <div v-for="item in news" class="line">
          <div class="day">{{item.Time}}</div>
          <div class="cont">{{item.Content}}</div>
        </div>
        <p style="text-align:center;border:none;padding:0.375rem 0;" v-if="showmoer">{{loaddata}}</p>
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
      title:"楼盘动态",
      state:this.$store.state,
      news:[],
      dataid:"",
      styletop:"",
      page:1,
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
      let _this = this
      if(this.news.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
          this.$http(this.$api.HousesNewsList({"Page":this.page,"PageSize":10,"ID":this.dataid}))
      .then((data) => {
              if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
          for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.news.push(data.data.ResultData.List[i])
             }
          if(_this.news.length>=this.total){
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
          console.log()
          _this.showmoer = true;

        }
      });
    }

  },
  created :function(){
    let _this=this
    let q = this.$route.query
    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.styletop = "top:0px"
    }
    this.dataid = q.id
    this.getdata()

  },
  components:{
    heads,
  }
}
</script>
<style lang="scss" scoped>
.housenews_box{position: absolute;z-index: 1;top: 1.1rem;bottom: 0;overflow: hidden;width: 100%;touch-action: none;}
.news{padding:rem(15);background:#fff; box-sizing:border-box;}
.news .line{border-bottom:1px solid #d8d8d8;padding-bottom:rem(15);}
.news .day{font-size:0.4rem;margin-top::rem(10);}
.news .cont{color:#888;margin-top::rem(10);}

</style>