<template>
<div class="container">
 <heads :title="title"></heads>

<div class="lodhouse_anv_box">
  <p><a href="javascript:" :class="{active:showonenav}" @click="showonediv()">售价</a></p>
  <p><a href="javascript:" :class="{active:showtownav}" @click="showtowdiv()">面积</a></p>
  <p><a href="javascript:" :class="{active:showthreenav}" @click="showthreediv()">更多</a></p>
</div>

<div class="nav_box">
  <div class="navone_box" v-if="showonenav">
    <ul class="flexbox">
      <li v-for="(item,index) in houseprice"  @click="oneradio(index)" :class="{active:item.checke}">
        <div class="list">
          <input type="radio" name="radio" :checked="item.checke" />
          <span class="text">{{item.text}}</span>
        </div>
      </li>
    </ul>
    <div class="customMoney">
      <p class="title">自定义售价</p>
      <div class="input_flex">
        <div class="inputbox"><input placeholder="" type="text" v-model="houseMinMoneys"><span>万</span></div>
        <div class="line"><span></span></div>
        <div class="inputbox"><input placeholder="" type="text" v-model="houseMaxMoneys"><span>万</span></div>
      </div>
      <div class="btn"><a href="javascript:" @click="gethouselist(1)">确定</a></div>
    </div>
  </div>

  <div class="navtow_box" v-if="showtownav">
    <ul class="flexbox">
      <li v-for="(item,index) in housesize"  @click="towradio(index)" :class="{active:item.checke}">
        <div class="list">
          <input type="radio" name="radio" :checked="item.checke" />
          <span class="text">{{item.text}}</span>
        </div>

      </li>
    </ul>
    <div class="customMoney">
      <div class="btn"><a href="javascript:" @click="gethouselist(2)">确定</a></div>
    </div>
  </div>

<div class="navthree_box" v-if="showthreenav">
    <p class="title">卧室数</p>
    <ul class="flexbox">
      <li v-for="(item,index) in houseroom"  @click="threeradio(index)" :class="{active:item.checke}">
        <div class="list">
          <input type="radio" name="radio" :checked="item.checke" />
          <span class="text">{{item.text}}</span>
        </div>
      </li>
    </ul>
    <p class="title">客厅数</p>
    <ul class="flexbox">
      <li v-for="(item,index) in houselivingroom"  @click="fourradio(index)" :class="{active:item.checke}">
        <div class="list">
          <input type="radio" name="radio" :checked="item.checke" />
          <span class="text">{{item.text}}</span>
        </div>
      </li>
    </ul>
    <p class="title">装修</p>
    <ul class="flexbox">
      <li v-for="(item,index) in housedecorate"  @click="fiveradio(index)" :class="{active:item.checke}">
        <div class="list">
          <input type="radio" name="radio" :checked="item.checke" />
          <span class="text">{{item.text}}</span>
        </div>
      </li>
    </ul>
    <div class="customMoney">
      <div class="btn"><a href="javascript:" @click="gethouselist(3)">确定</a></div>
    </div>
  </div>

</div>
<div class="masks" v-if="showonenav||showtownav||showthreenav"></div>
<div class="hothouse_box" id="iscroll" :style="styletop">
  <ul>
    <li v-for="item in houselist" @click="detail(item.HouseId)">
        <div class="img"><img :src="item.HouseShowPictures"></div>
        <div class="main">
          <p class="title">{{item.HouseName}}</p>
          <p class="add">{{item.HouseType}}·{{item.HouseCoveredArea}}·{{item.HouseOrientation}}<span>{{item.HouseSalePrice}}</span></p>
          <p class="add">地址：{{item.HouseLocation}}</p>
          <p class="tig"><span class="blue" v-if="item.PromotionalLabels.length>0">{{item.PromotionalLabels[0]}}</span><span class="green" v-if="item.PromotionalLabels.length>=2">{{item.PromotionalLabels[1]}}</span><span class="orange" v-if="item.PromotionalLabels.length>=3">{{item.PromotionalLabels[2]}}</span></p>
        </div>
    </li>
    <li style="text-align:center;border:none" v-if="showmoer">{{loaddata}}</li>
  </ul>
  <div class="nodata" v-if="houselist.length==0">
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
      title:"二手房",
      state:this.$store.state,
      houselist:[],
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,

      },
      styletop:"",
      bannerList:"",
      houseprice:[ //售价
        {"text":"不限","checke":true,"minMoney":null,"maxMoney":null},
        {"text":"100万以下","checke":false,"minMoney":null,"maxMoney":100},
        {"text":"100-150万","checke":false,"minMoney":100,"maxMoney":150},
        {"text":"150-200万","checke":false,"minMoney":150,"maxMoney":200},
        {"text":"200-250万","checke":false,"minMoney":200,"maxMoney":250},
        {"text":"250-300万","checke":false,"minMoney":250,"maxMoney":300},
        {"text":"300-400万","checke":false,"minMoney":300,"maxMoney":400},
        {"text":"400-500万","checke":false,"minMoney":400,"maxMoney":500},
        {"text":"500万以上","checke":false,"minMoney":500,"maxMoney":null},
      ],
      housesize:[ //面积
        {"text":"不限","checke":true,"minSize":null,"maxSize":null},
        {"text":"50㎡以下","checke":false,"minSize":null,"maxSize":50},
        {"text":"50-70㎡","checke":false,"minSize":50,"maxSize":70},
        {"text":"70-90㎡","checke":false,"minSize":70,"maxSize":90},
        {"text":"90-110㎡","checke":false,"minSize":90,"maxSize":110},
        {"text":"110-130㎡","checke":false,"minSize":110,"maxSize":130},
        {"text":"130-150㎡","checke":false,"minSize":130,"maxSize":150},
        {"text":"150-200㎡","checke":false,"minSize":150,"maxSize":200},
        {"text":"200㎡以上","checke":false,"minSize":200,"maxSize":null},
      ],
      houseroom:[ //房间数
        {"text":"不限","checke":true,"number":null},
        {"text":"一室","checke":false,"number":1},
        {"text":"二室","checke":false,"number":2},
        {"text":"三室","checke":false,"number":3},
        {"text":"四室","checke":false,"number":4},
        {"text":"五室及以上","checke":false,"number":5},
      ],
      houselivingroom:[ //客厅数
        {"text":"不限","checke":true,"number":null},
        {"text":"一厅","checke":false,"number":1},
        {"text":"二厅","checke":false,"number":2},
        {"text":"三厅","checke":false,"number":3},
        {"text":"四厅","checke":false,"number":4},
        {"text":"五厅及以上","checke":false,"number":5},
      ],
      housedecorate:[ //装修
        {"text":"不限","checke":true,"number":null},
        {"text":"简单装修","checke":false,"number":0},
        {"text":"精装修","checke":false,"number":1},
        {"text":"豪华装修","checke":false,"number":2},
        {"text":"毛坯","checke":false,"number":3},
      ],
      houseMinMoney:null,
      houseMaxMoney:null,
      houseMinSize:null,
      houseMaxSize:null,
      houseroomnumber:null,
      houselivingroomnumber:null,
      housedecoratenumber:null,
      showonenav:false,
      showtownav:false,
      showthreenav:false,
      WithElevator:false,
      FineDecoration:false,
      FineDecorationTwo:false,
      FalseNewHouse:false,
      SmallThreeHouse:false,
      LittleHouse:false,
      houseMinMoneys:"",
      houseMaxMoneys:"",
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
            _this.gethouselist();

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
      this.$router.push("/oldhousedetail?id="+id)
    },
    gethouselist(type){
      let _this = this
      this.showonenav = false
      this.showtownav = false
      this.showthreenav = false
      if(type){
        this.init();
      }
      if(this.houselist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
      if(type == 1){
        if(this.houseMinMoneys==""||this.houseMaxMoneys==""){
          this.houseprice.forEach(function(val,i){
            if(val.checke){
              _this.houseMinMoney = val.minMoney
              _this.houseMaxMoney = val.maxMoney
            }
          });
        }else{
          _this.houseMinMoney = _this.houseMinMoneys
          _this.houseMaxMoney = _this.houseMaxMoneys
        }
      }
      if(type == 2){
        this.housesize.forEach(function(val,i){
        if(val.checke){
          _this.houseMinSize = val.minSize
          _this.houseMaxSize = val.maxSize
        }
      });
      }
      if(type == 3){
          this.houseroom.forEach(function(val,i){
            if(val.checke){
              _this.houseroomnumber = val.number
            }
          });
          this.houselivingroom.forEach(function(val,i){
            if(val.checke){
              _this.houselivingroomnumber = val.number
            }
          });
          this.housedecorate.forEach(function(val,i){
            if(val.checke){
              _this.housedecoratenumber = val.number
            }
          });
      }

      this.$http(this.$api.GetHouses({"Page":this.page,"PageSize":10,"SalesPriceStart":this.houseMinMoney,"SalesPriceEnd":this.houseMaxMoney,"CoveredAreaStart":this.houseMinSize,"CoveredAreaEnd":this.houseMaxSize,"HouseHalls":this.houselivingroomnumber,"HouseRooms":this.houseroomnumber,"HouseDecoration":this.housedecoratenumber,"HouseSaleStatus":null,"WithElevator":this.WithElevator,"FineDecoration":this.FineDecoration,"FineDecorationTwo":this.FineDecorationTwo,"FalseNewHouse":this.FalseNewHouse,"SmallThreeHouse":this.SmallThreeHouse,"LittleHouse":this.LittleHouse}))
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
    showonediv(){
      let _this = this
      this.showonenav = true
      this.showtownav = false
      this.showthreenav = false

      // this.houseMinMoney = null
      // this.houseMaxMoney = null
      this.houseprice.forEach(function(val,i){
        val.checke=false;
        if(_this.houseMinMoney==val.minMoney&&_this.houseMaxMoney==val.maxMoney){
          val.checke=true;
        }
      });
    },
    showtowdiv(){
      let _this = this
      this.showonenav = false
      this.showtownav = true
      this.showthreenav = false

      this.housesize.forEach(function(val,i){
        val.checke=false;
        if(_this.houseMinSize==val.minSize&&_this.houseMaxSize==val.maxSize){
          val.checke=true;
        }
      });
    },
    showthreediv(){
      let _this = this
      this.showonenav = false
      this.showtownav = false
      this.showthreenav = true

      this.houseroom.forEach(function(val,i){
        val.checke=false;
        if(_this.houseroomnumber == val.number){
            val.checke=true;
        }
      });
      this.houselivingroom.forEach(function(val,i){
        val.checke=false;
        if(_this.houselivingroomnumber == val.number){
          val.checke=true;
        }
      });
      this.housedecorate.forEach(function(val,i){
        val.checke=false;
        if(_this.housedecoratenumber == val.number){
          val.checke=true;
        }
      });
    },
    oneradio(index){
      let _this = this
      this.houseprice.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
          _this.houseMinMoneys = ""
          _this.houseMaxMoneys = ""

        }
      });
    },
    towradio(index){
      let _this = this
      this.housesize.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;

        }
      });
    },
    threeradio(index){
      let _this = this
      this.houseroom.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
          //_this.houseroomnumber = val.number
        }
      });
    },
    fourradio(index){
      let _this = this
      this.houselivingroom.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
          //_this.houselivingroomnumber = val.number
        }
      });
    },
    fiveradio(index){
      let _this = this
      this.housedecorate.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
          //_this.housedecoratenumber = val.number
        }
      });
    },
  },
  created :function(){
    let _this=this
    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.styletop = "top:1.05rem"
    }
    let q = this.$route.query
    if(q.WithElevator){
      this.WithElevator = true
      this.title = "带电梯-二手房"
    }
    if(q.FineDecoration){
      this.FineDecoration = true
      this.title = "精装修-二手房"
    }
    if(q.FineDecorationTwo){
      this.FineDecorationTwo = true
      this.title = "精装两居-二手房"
    }
    if(q.FalseNewHouse){
      this.FalseNewHouse = true
      this.title = "准新房-二手房"
    }
    if(q.SmallThreeHouse){
      this.SmallThreeHouse = true
      this.title = "小三居-二手房"
    }
    if(q.LittleHouse){
      this.LittleHouse = true
      this.title = "小户型-二手房"
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
.hothouse_box{background:#fff;padding:rem(15);box-sizing:border-box;margin-top:rem(10);position: absolute;z-index: 1;top: 2.15rem;bottom: 0;overflow: hidden;width: 100%;touch-action: none;}
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
.nav_box{background:#fff; position:absolute; height:auto; z-index:5;}
.masks{ width:100%; height:100%; background:rgba(0,0,0,0.5); position:absolute; left:0; top: 3rem; z-index:4;}
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
.nodata {position:absolute;left:0; right:0; top:0; bottom:0;z-index:10;background:#fff;}
.nodata .img{width:rem(100); height:rem(100); @include bg("/static/img/my/invite/smile.png");background-size:100%;margin:auto;margin-top:rem(15)}
.nodata p{margin-top:rem(20);text-align:center;font-size:0.4rem;}
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