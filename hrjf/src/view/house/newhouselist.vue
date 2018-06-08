<template>
<div class="container">
 <heads :title="title"></heads>



<div class="hothouse_box"  id="iscroll"  :style="styletop">
  <ul id="content">
    <li v-for="item in houselist" @click="detail(item.ID)">
        <div class="img"><img :src="item.Img"></div>
        <div class="main">
          <p class="title">{{item.Name}}</p>
          <p class="add">地址：{{item.HousesAddress}}</p>
          <p class="tig"><span class="blue" v-if="item.Tag.length>0">{{item.Tag[0]}}</span><span class="green" v-if="item.Tag.length>=2">{{item.Tag[1]}}</span><span class="orange" v-if="item.Tag.length>=3">{{item.Tag[2]}}</span></p>
          <p class="money"><span class="red">{{item.Price}}</span> {{item.BuildingSpace}}</p>
        </div>
    </li>
    <li style="text-align:center;border:none" v-if="showmoer">{{loaddata}}</li>
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
      title:"新房楼盘",
      state:this.$store.state,
      houselist:[],
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
            _this.gethouselist(this.index);

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
        this.houselist=[];
        this.total=2
        this.myScroll.scrollTo(0, 0);
        setTimeout(function(){
             _this.myScroll.refresh()
           },300)
    },
    detail(id){
      this.$router.push("/newhousedetail?id="+id)
    },
    gethouselist(type){
      let _this = this
            if(this.houselist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
      this.$http(this.$api.HousesList({"Page":this.page,"PageSize":10}))
      .then((data) => {
      if(data.data.ResultData.List.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
          for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.houselist.push(data.data.ResultData.List[i])
             }
          if(_this.houselist.length>=this.total){
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
          console.log(_this.houselist)
          _this.showmoer = true;

        }
      });
    },

  },
  created :function(){
    let _this=this
    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.styletop = "top:0px"
    }
    this.gethouselist();


  },
  components:{
    heads,

  }
}
</script>
<style lang="scss" scoped>

.lodhouse_anv_box{border-bottom:1px solid #d8d8d8; padding:rem(15) 0;background:#fff;display:flex;text-align:center;}
.lodhouse_anv_box a{color:#666;font-size:0.4rem;overflow:hidden;}

.lodhouse_anv_box a:after{content:"";display:inline-block; width: 0;height: 0;border-width:rem(5);border-style: solid;border-color: #d1d1d1 transparent transparent transparent; margin-left:rem(10); vertical-align:middle;}
.lodhouse_anv_box a.active:after{border-color: #de3031 transparent transparent transparent;}
.hothouse_box{background:#fff;padding:rem(15);box-sizing:border-box;position: absolute;z-index: 1;top: 1.1rem;bottom: 0;overflow: hidden;width: 100%;touch-action: none;}
.hothouse_box h1{padding-bottom:rem(10);border-bottom:1px solid #d8d8d8;}
.hothouse_box h1 span{ padding-left:rem(5);border-left:rem(5) solid #fe6839; font-size:0.45rem;font-weight:normal;}

.hothouse_box ul{overflow:hidden;padding-bottom:rem(15);}
.hothouse_box li{overflow:hidden;padding:rem(15) 0;box-sizing:border-box;border-bottom:1px solid #d8d8d8;}
.hothouse_box li .img{width:rem(120);height:rem(100); float:left;}
.hothouse_box li .img img{border-radius:rem(5);width:100%;height:100%;}
.hothouse_box li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.hothouse_box li .main p.title{font-size:0.4rem;}
.hothouse_box li .main p.add{color:#666; font-size:0.3rem;margin-top:rem(5);overflow:hidden;font-size:0.35rem;}
.hothouse_box li .main p.add span{float:right;color:#de3031;width:auto;}
.hothouse_box li .main p.tig{overflow:hidden;margin-top:rem(5);}
.hothouse_box li .main p.tig span{float:left;margin-right:rem(5); width:auto; padding:rem(2) rem(5);border-radius:rem(5);}
.hothouse_box li .main p.tig span.blue{background:#dcf7ff; color:#19b9e7;}
.hothouse_box li .main p.tig span.green{background:#e1fbf2; color:#35bf90;}
.hothouse_box li .main p.tig span.orange{background:#fff3eb; color:#ff7843;}
.hothouse_box li .main p.money{margin-top::rem(5);color:#666;}
.hothouse_box li .main p.money span{font-size:0.4rem;color:#de3031;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto; color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;}
.nav_box{background:#fff;}
.nav_box .flexbox{display:flex;box-sizing:border-box; padding-bottom:rem(15);flex-wrap:wrap;}
.nav_box li{width:33%; margin-top:rem(10);}
.nav_box li .list{height:rem(35); position:relative;text-align:center; width:90%; margin:auto;}
.nav_box li input[type="radio"]{ margin-top:0.21rem;margin-right:0.375rem;opacity: 0;position: absolute; left: 0; top: 0;}
.nav_box li .list span{display:block; line-height:rem(35); border:1px solid #d8d8d8; text-align:center;width:100%; border-radius:rem(30);}
.nav_box li.active .list span{color:#de3031;border:1px solid #de3031;}
.customMoney{border-top:1px solid #d8d8d8; padding:0 rem(15); box-sizing:border-box;}
.customMoney .title{margin-top:rem(10);font-size:0.45rem;}
.customMoney .input_flex{overflow:hidden;display:flex;box-sizing:border-box; margin-top::rem(15);}
.customMoney .input_flex .inputbox{width:45%;height:rem(35); position:relative;}
.customMoney .input_flex .inputbox input{width:100%;height:rem(35);border:1px solid #d8d8d8; padding-left:rem(10);padding-right:rem(30);box-sizing:border-box;}
.customMoney .input_flex .inputbox span{position:absolute;right:rem(10);top:rem(8);width:auto;}
.customMoney .input_flex .line{display:flex;align-items:center;justify-content:center; height:rem(35);width:5%;margin:0 rem(10)}
.customMoney .input_flex .line span{height:rem(1);background:#ccc;}
.customMoney .btn{ width:rem(150); margin:auto;margin-top:rem(20); padding-bottom:rem(20);}
.customMoney .btn a{display:block;line-height:rem(35); border:1px solid #de3031; text-align:center;width:rem(150); border-radius:rem(30); font-size:0.4rem; color:#de3031;}
.navthree_box .title{ padding:rem(15) rem(15) 0 rem(15); box-sizing:border-box; font-size:0.4rem;}
/* .typebox{background-color:#fff; padding:rem(15); box-sizing:border-box; overflow:hidden; margin-top:rem(20);}
.nomargin div:nth-child(1){margin-top:0;}
.typebox .title{ padding-bottom:rem(15);border-bottom:1px solid #d8d8d8}
.typebox .title span{border-left:rem(5) solid #fd6f3b; font-size:0.45rem; padding-left:rem(15);}
.list{overflow:hidden;padding-bottom:rem(15);border-bottom:1px solid #d8d8d8;}
.list li{overflow:hidden; border:1px solid #d8d8d8;padding:rem(15);box-sizing:border-box; margin-top:rem(15);}
.list li .img{width:rem(60);height:rem(60);  border-radius:50%;float:left;}
.list li .img img{border-radius:50%;}
.list li .main{overflow:hidden; width:auto; padding-left:rem(15)}
.list li .main p{margin-bottom:rem(5);}
.list li .main p.subtitle{font-size:0.4rem;}
.list li .main p.red{color:#de3132;}
.list li .main p.sub{color:#888;}
.moer{text-align:center; display:block; font-size:0.4rem; width:rem(100);margin:auto;margin-top:rem(20); color:#71bcf6;}
.moer:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(8); height: rem(8); transform: rotate(-45deg);  float:right; margin-top:rem(6); color:#9a9a9a;} */

</style>