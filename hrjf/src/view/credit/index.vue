<template>
  <div class="container">
    <heads :title="title" v-if="isapp"></heads>
    <div id="con">
        <!-- <div class="toplist">
          <ul>
            <li v-for="item in toplist" @click="gotolist(item.Id)">
              <div class="toplistleft">
                <p class="titleword">{{item.Name}}</p>
                <p class="spword">{{item.Description}}</p>
              </div>
              <div class="toplistright">
                <p><img :src="item.Img" /></p>
              </div>
            </li>
          </ul>
        </div> -->

  <div class="listdetail"  id="iscroll" :class="{inapp:!isapp}">
  <div>
  <div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
          <a :href="slide.Link+'?inviteTitle='+slide.Title+'&type=1'">
            <img :src="slide.Url" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>

  <!-- <div class="banklist">
    <p class="bankhot">热门银行</p>
    <ul :class="{ulall:!check}">
      <li v-for="item in banklist" @click="gotobanklist(item.Id)">
        <p><img :src="item.Img"/></p>
        <p class="boldp">{{item.Name}}</p>
        <p class="normalp">{{item.Description}}</p>
      </li>
    </ul>
    <div class="shouqi" :class="{checkmore:check}"  @click="lookmore()"  v-html="scheck">查看更多</div>
  </div> -->



      <ul>
          <li v-for="item in GetCreditcardList" @click="gotodetail(item.Id)">
            <div class="grayleft"><img :src="item.CardImg" v-if="item.CardImg"/><img src="../../../static/img/insurance/noneimg.png" v-else></div>
            <div class="grayleftright">
              <p class="topbold">{{item.CardName}}</p>
              <p class="botlight">{{item.Description}}</p>
              <dl>
                <dt>{{item.Grade}}</dt>
                <dd>{{item.AnnualFeeTypeStr}}</dd>
                <dd v-if="item.Currency">{{item.Currency.replace(/;$/gi,"").replace(/;+/g, "+")}}</dd>
              </dl>
            </div>
          </li>
            <li style="text-align:center;height:1rem; border:none;background:none;line-height:1rem;padding:0rem 0 0.25rem"  v-if="showmoer">{{loaddata}}</li>
      </ul>
</div>

  </div>
  </div>
 </div>

</template>

<script>
import heads from '../../components/head'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ls from '../../store/lStorage.js'
import loadapp from '../../components/loadapp';
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title: '信用卡',

      bannerList:'',
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,

      },

      state:this.$store.state,

      basset:[],

      toplist:[],

      banklist:[],

      checknot:false,
      check:true,
      scheck:"查看更多",

      GetCreditcardList:[],

      isapp:false,
      IUserId:'',


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
            if(this.GetCreditcardList.length>=this.total){
            _this.loaddata = "没有更多数据"
            _this.datamoer = 0
            _this.myScroll.refresh()
            return
          }

         this.$http(this.$api.GetCreditcardList({"IsRecommend":1,"Page":_this.page ,"PageSize":10}))
        .then((data) => {
             console.log(data)
             //_this.GetCreditcardList=data.data.ResultData.List
               if(data.data.ResultData.List.length!=0){
              _this.total = data.data.ResultData.Total
              console.log(_this.total)
              _this.page ++
                for(var i=0;i<data.data.ResultData.List.length;i++){
                    _this.GetCreditcardList.push(data.data.ResultData.List[i])
                 }
                 console.log(_this.GetCreditcardList)
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
    lookmore(){
       let _this =this
       if(_this.check){
        _this.check=false;
        _this.scheck="收起"
       }else{
        _this.check=true;

        _this.scheck="查看更多"

       }
    },
    gotodetail(Id){
      let _this=this
      _this.$router.push('/creditdetail?Id='+Id+"&i="+_this.IUserId+"&isapp="+_this.isapp)
    },

    gotolist(index){
       let _this=this
      _this.$router.push('/banklist?ClassificationId='+index+"&isapp="+_this.isapp+"&i="+_this.IUserId)
    },

    gotobanklist(index){
       let _this=this
      _this.$router.push('/banklist?BankId='+index+"&isapp="+_this.isapp+"&i="+_this.IUserId)
    },

    getInviteCode(){
          let _this = this
          let query = this.$route.query
          if(typeof this.$store.state.user ==="undefined"||!this.$lg.isapp()||typeof query.type==="undefined"){
             //  this.$http(this.$api.getQueryInviteTotal({}))
             //  .then(function(data){
             //    _this.share(data.data.ResultData.InviteCode)
             // });
          }else{


          }
          _this.share()
      },


      share(InviteCode){
        let _this = this
        let query = this.$route.query

        var url = window.location.href;
        console.log(typeof (_this.$store.state.user))
            if(_this.$store.state.user != undefined){
              console.log(2222)
            _this.$http(_this.$api.QueryInviteRewadIndex({}))
              .then(function(data){
                _this.basset=data.data.ResultData
                console.log( _this.basset.inviteToken)
                url=url+"&i="+_this.basset.inviteToken
                 console.log(url)
                var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);
                console.log("ddd")
                _this.$share({"href":relUrl},false)
                 _this.$share({"title":"邀约您办理申请信用卡 ，享受优质信用生活","href":relUrl,"desc":"一信一意快卡，一心一意办卡，玩转信用卡，躺着赚佣金","img":"insurance/sharepic.png"},false)
             });
          }else{
            var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);
                console.log("eee")
             _this.$share({"title":"邀约您办理申请信用卡 ，享受优质信用生活","href":relUrl,"desc":"一信一意快卡，一心一意办卡，玩转信用卡，躺着赚佣金","img":"insurance/sharepic.png"},false)
          }




　　　　

      },

  },
  created:function(){
    let _this =this

    _this.getdata()

    let query = this.$route.query
    _this.isapp=_this.$lg.isapp()
    console.log(_this.isapp)

    if(query.i != "underfine"){
      _this.IUserId=query.i
    }


    this.$http(this.$api.GetCreditcardAds({}))
    .then((data) => {
         _this.bannerList=data.data.ResultData
    })

     this.$http(this.$api.GetClassificationList({}))
    .then((data) => {
         _this.toplist=data.data.ResultData.List
    })

    this.$http(this.$api.GetBankList({}))
    .then((data) => {
          console.log(data)
         _this.banklist=data.data.ResultData.List
    })



    if(_this.$store.state.user != null){
        _this.$http(_this.$api.QueryInviteRewadIndex({}))
          .then(function(data){
            console.log(data)
            _this.basset=data.data.ResultData
            _this.IUserId=_this.basset.inviteToken
         });
      }


      this.getInviteCode();


  },
  components:{
    heads,
    swiper,
    swiperSlide,
    loadapp
  }
}
</script>
<style lang="scss" scoped>

.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;}
.toplist{}
.toplist ul{width:95%;margin:rem(15) auto 0;}
.toplist ul li{float:left;width:48%;background:#fff;margin:rem(5) 0;border-radius:rem(5)}
.toplist ul li:nth-child(2n){float:right;}
.toplist ul li .toplistleft{float:left;width:70%;padding:rem(10) 0;line-height: rem(30);text-indent:rem(5)}
.toplist ul li .toplistleft .titleword{font-size:rem(16);color:#333333;}
.toplist ul li:nth-child(1) .toplistleft .spword{color:#ff7e7f}
.toplist ul li:nth-child(2) .toplistleft .spword{color:#fdc736}
.toplist ul li:nth-child(3) .toplistleft .spword{color:#4fbfff}
.toplist ul li:nth-child(4) .toplistleft .spword{color:#fe9df2}
.toplist ul li:nth-child(5) .toplistleft .spword{color:#fe9df2}
.toplist ul li .toplistright{float:right;width:30%;padding-top: rem(15)}
.toplist ul li .toplistright p{width:rem(45);height:rem(45);border-radius:rem(45);background:#ccc;}
.toplist ul li .toplistright p img{width:100%;}
.banklist{background:#fff;margin:rem(5) 0;overflow:auto;}
.banklist .bankhot{width:95%;margin:0 auto;line-height: rem(40);color:#333333;font-size:rem(16);border-bottom:rem(1) solid #dcdcdc;text-indent:rem(35);background:url(../../../static/img/insurance/hotr.png) no-repeat left center;background-size:8%;}
.banklist ul{height:rem(105);overflow:hidden;}
.banklist ul.ulall{height:auto;overflow:auto;}
.banklist ul li{float:left;width:33%;text-align: center;}
.banklist ul li p:first-child{width:rem(45);height:rem(45);background:#e3e3e3;border-radius:rem(45);margin:rem(10) auto 0;}
.banklist ul li p.boldp{color:#333;line-height:rem(25)}
.banklist ul li p.normalp{color:#999999;line-height:rem(25);display: block;width:80%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align:center;margin:0 auto;}


.listdetail{width:100%;position:absolute;top:rem(40);bottom:0;overflow:hidden;touch-action:none}
.inapp{top:rem(0);}
.listdetail ul{}
.listdetail ul li{background:#fff;height:rem(85);margin:rem(10) 0;}
.listdetail ul li .grayleft{margin:rem(10) 0 rem(10) rem(10) ;float:left;border-radius:rem(5);width:25%;height:rem(70);background:none;}
.listdetail ul li .grayleftright{margin:rem(10) 0;width:71%;float:right;line-height:rem(25);height:rem(70)}
.listdetail ul li .grayleftright .topbold{color:#333333;font-size:rem(16);padding-top:rem(0);margin-top:rem(-3)}
.listdetail ul li .grayleftright .botlight{color:#999;font-size:rem(14);line-height:rem(20);height:rem(20);white-space: nowrap;text-overflow: ellipsis;overflow:hidden;}
.listdetail ul li .grayleftright dl{height:rem(25);line-height:rem(25);text-align:center;overflow:hidden;}
.listdetail ul li .grayleftright dl dt{width:auto;float:left;border-radius:rem(3);background:#dcf7ff;color:#19b9e7;padding:rem(0) rem(5);}
.listdetail ul li .grayleftright dl dd{width:auto;padding:rem(0) rem(5);float:left;margin:0 rem(5);border-radius:rem(3);}
.listdetail ul li .grayleftright dl dd:nth-child(2){background:#e1fbf2;color:#57c89f;}
.listdetail ul li .grayleftright dl dd:nth-child(3){background:#fff3eb;color:#ff7843;overflow:hidden;height:rem(25);white-space: nowrap;text-overflow: ellipsis;margin:0 rem(5) 0 rem(0);}

.checkmore{color:#3ea4f3;position: relative;clear:both;line-height:rem(50);text-align:center;font-size:rem(16)}
.shouqi{color:#3ea4f3;position: relative;clear:both;line-height:rem(50);text-align:center;font-size:rem(16)}
.shouqi:after{
  border: rem(10) solid transparent;
  border-bottom: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(12);
  right: rem(130);
  content: ' ';
}
.shouqi:before{
  border: rem(10) solid transparent;
  border-bottom: rem(10) solid #999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(11);
  content: ' ';
  border-bottom-color: #999999;
  right: rem(130);
}

.checkmore:after{
  border: rem(10) solid transparent;
  border-top: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(20);
  right: rem(130);
  content: ' ';
}
.checkmore:before{
  border: rem(10) solid transparent;
  border-top: rem(10) solid #999999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(21);
  content: ' ';
  border-top-color: #999999;
  right: rem(130);
}
</style>

