<template>
<div class="container">
 <heads :title="title"></heads>
<div class="typebox"  id="iscroll" :style="styletop">
  <div class="list">
    <ul>
      <li v-for="item in loanarr" @click="detail(item.ID)">
        <div class="img"><img :src="item.Icon"></div>
        <div class="main">
          <p class="subtitle">{{item.Name}}</p>
          <p class="red">最高额度：{{item.MaxMoney}}</p>
          <p class="sub">{{item.Intro}}</p>
        </div>
      </li>
      <li style="text-align:center;border:none;padding:0;padding-bottom:0.375rem;" v-if="showmoer">{{loaddata}}</li>
    </ul>

  </div>

</div>
<div class="nodata" v-if="loanarr.length==0">
  <div class="img"></div>
    <p>暂无数据！</p>
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
      title:"贷款列表",
      state:this.$store.state,
      loanarr:[],
      styletop:"",
      Type:null,
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
            _this.getdatalist(this.index);

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
    init(){
      let _this= this
        this.page=1;
        this.loanarr=[];
        this.total=2
        this.myScroll.scrollTo(0, 0);
        setTimeout(function(){
             _this.myScroll.refresh()
           },300)
    },
     detail(id){
      this.$router.push("/loandetail?id="+id)
    },
    getdatalist(){
      let _this = this
        if(this.loanarr.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
      this.$http(this.$api.LoansList({"Type":this.Type,"Page":this.page,"PageSize":10}))
      .then((data) => {
               if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
          for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.loanarr.push(data.data.ResultData.List[i])
             }
          if(_this.loanarr.length>=this.total){
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
          console.log(_this.loanarr)
          _this.showmoer = true;

        }
      });
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.Type = q.type
    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.styletop = "top:0px"
    }
    if(q.type==1){
      this.title="消费信用贷列表"
    }else if(q.type==2){
      this.title="车贷列表"
    }else if(q.type==3){
      this.title="房贷列表"
    }
    this.getdatalist()

  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.typebox{background-color:#fff; padding:rem(15); box-sizing:border-box; overflow:hidden;position: absolute;z-index: 1;top: 1.1rem;bottom: 0;overflow: hidden;width: 100%;touch-action: none;}
.list{overflow:hidden;}
.list li{overflow:hidden; border:1px solid #d8d8d8;padding:rem(15);box-sizing:border-box; margin-bottom:rem(15);}
.list li .img{width:rem(60);height:rem(60);  border-radius:50%;float:left;}
.list li .img img{border-radius:50%;width:rem(60);height:rem(60);}
.list li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.list li .main p{margin-bottom:rem(5);}
.list li .main p.subtitle{font-size:0.4rem;}
.list li .main p.red{color:#de3132;}
.list li .main p.sub{color:#888;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto;margin-top:rem(20); color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;}
.nodata {margin:auto;margin-top:rem(50); width:rem(200);}
.nodata .img{width:rem(100); height:rem(100); @include bg("/static/img/my/invite/smile.png");background-size:100%;margin:auto;}
.nodata p{margin-top:rem(20);text-align:center;font-size:0.4rem;}
</style>