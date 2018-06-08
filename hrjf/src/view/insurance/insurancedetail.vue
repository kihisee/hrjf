<template>
   <div id="frame">
    <heads :title="title"   v-if="isapp"></heads>
    <div id="con">

<div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
          <img :src="slide" alt="">
        </swiper-slide>
      </swiper>
  </div>

    <div class="whitebox nowhite">
      <div class="whitetop">
        <div class="wtopleft">
          <p class="toptitle">{{allData.InsuranceName}}</p>
          <div class="botdetail">
            承保年龄：{{allData.InsuredAgePeriod}} | 保障期限：{{allData.InsuredPeriod}}
          </div>
        </div>
        <div class="wtopright">
          <img class="wherepic"  :src="allData.InsurerLogo" />
        </div>
      </div>
    </div>

    <div class="whitebox">
      <div class="content">
        <div class="toptitle">保障方案</div>
        <div class="tablist" v-if="reallength">
          <ul>
            <li v-for="(item,index) in allData.InsurancePlanTypeList"    :class="{actred: activeindex== index}" @click="tab(index)">{{item.PlanTypeName}}</li>
          </ul>
        </div>

        <div class="listul">
          <ul :class="{longul:check}" class="realul">
            <li v-for="item in listnowdata.PlanTypeItemList" @click="gotolidetail(item.Id)">
              <p class="listleft">{{item.InsurancePlanItemName}}</p>
              <p class="listright">{{item.InsurancePayment}}</p>
            </li>
          </ul>

          <p class="shouqi" @click="lookmore()" :class="{checkmore:check}" v-html="scheck" v-if="checklist"></p>
        </div>
      </div>

    </div>
    <div class="agreement">
        <p class="agreementtop">更多详情阅读</p>
        <p class="agreementbot"><!-- <a>《投保须知》、</a><a>《保险条款》、</a><a>《客户告知书》</a> -->
          <a v-for="item in explian" @click="gotoneed(item.Id)"> 《{{item.InsuranceFileName}}》 </a>
        </p>
      </div>
    </div>

    <div class="whitebox">
      <div class="content">
        <div class="toptitle">保险详情</div>

        <div class="conwhite" v-html="allData.InsureDescription"></div>
      </div>
    </div>


  <div class="collection">
    <!-- <div class="collleft">
      <div class="collpic"></div>
      <p>已收藏</p>
    </div>
 -->
  <div class="collmiddle"><a href="javascript:" @click="callnow()">咨询客服</a></div>
    <div class="collright" @click="gototen()">预约投保</div>
  </div>

    <div class="dialog" v-if="diolog">
        <p class="close" @click="closedio()"> </p>
        <div class="dialogcont">
          <p class="toptitle">填写信息</p>
          <ul>
           <li><input type="text"  :placeholder="oldername" v-model="username" /></li>
            <li><input type="text" v-model="userphone" :placeholder="olderphone"/></li>
          </ul>
          <p class="queren" @click="nowbuy()">确认预约投保</p>
        </div>
    </div>



    <div class="dialog dialogright" v-if="diologcom">
        <p class="close"  @click="closedio()"> </p>
        <div class="dialogcont">
          <p class="toptitle">投保预约成功！</p>
          <p class="middle">请保持您的电话通畅<br />
工作人员会在24小时内与您联系！</p>
          <p class="queren" @click="closecom()">我知道了</p>
        </div>
    </div>


<div v-if="showcall">
  <div class="masks"  @click="cancel()"></div>
    <div class="alert_box">
        <div class="submit_box">
          <a href="javascript:" class="cancel" @click="cancel()"></a>
          <p class="sub">是否拨打咨询热线？</p>
          <h1>{{allData.ContactPhone}}</h1>

          <a :href="telphone" class="submit_btn2"  @click="appcall">确认拨打</a>
        </div>
    </div>
</div>


    <div class="allgray"  v-if="diolog || diologcom"></div>


  </div>



 </div>




</template>

<script>
import globlenav from '../../components/nav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heads from '../../components/head'
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title: '保险',
      allData:[],
      listnowdata:[],
      activeindex:0,

      state:this.$store.state,

      explian:[],
      indeed:true,
      check:true,
      telphone:"javascript:",

      showcall:false,

      checklist:true,

      scheck:"查看更多",

      bannerList:'',
      swiperOption: {
        autoplay: 0,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: false,

      },

      diolog:false,
      diologcom:false,
     username:'',
      userphone:'',

      oldername:'请输入您的姓名',
      olderphone:'请输入您的手机号',
       isapp:true,

       reallength:true,
    }
  },
  methods:{
    tab(index){
      let _this=this
      _this.activeindex=index
      _this.listnowdata=_this.allData.InsurancePlanTypeList[index]
      //console.log(_this.listnowdata.PlanTypeItemList.length)
      if( _this.listnowdata.PlanTypeItemList.length>3){
        _this.check=true;
      }else{
        _this.check=false;
        console.log("out")
      }

    },
    gotoneed(Id){
      let _this=this
      let query = this.$route.query
      _this.$router.push('/needknow?Id='+Id+'&InsuranceId='+query.Id+"&isapp="+_this.isapp)
    },
    lookmore(){
       let _this =this
       if(_this.check){
        _this.check=false;
        _this.scheck="收起";
        _this.listnowdata=_this.allData.InsurancePlanTypeList[_this.activeindex]
       _this.listnowdata.PlanTypeItemList.length=_this.allData.InsurancePlanTypeList[_this.activeindex].PlanTypeItemList.length
       }else{
        _this.check=true;
        _this.scheck="查看更多"

       }


      console.log(_this.allData.InsurancePlanTypeList[_this.activeindex].PlanTypeItemList)
    },
    gotolidetail(Id){
      let _this=this
      let query = this.$route.query
      console.log(Id)
      _this.$router.push('/guarantee?Id='+Id+'&InsuranceId='+query.Id+"&activeindex="+_this.activeindex+"&isapp="+_this.isapp)
    },

     closedio(){
           let _this=this
          _this.diolog=false;
          _this.diologcom=false;
        },

        callnow(){
          this.showcall = true;
        },

        cancel(){
          this.showcall = false
        },

        appcall(){
          let _this=this
          if(this.$store.state.isapp=='android'){
            console.log("android")
            _this.telphone = "javascript:"
            android.callPhone(_this.allData.ContactPhone);
          }else if(this.$store.state.isapp=='ios'){
            console.log("ios")
            _this.telphone = "javascript:"
            window.webkit.messageHandlers.Method.postMessage({ "type": "callPhone","phone":_this.allData.ContactPhone});
          }else{
            console.log("ubwx")
            _this.telphone="tel:"+_this.allData.ContactPhone
          }
        },


        clickphone(){
          let _this=this;
           if(_this.userphone!=""){
            if(_this.$store.state.user == null){
                _this.userphone=""
            }
          }

        },
        clickname(){
          let _this=this;
          if(_this.username!=""){
             if(_this.$store.state.user == null){
                _this.username=""

            }else{
              if(_this.$store.state.user.RealName == null){
                _this.username=""

              }
            }
          }
        },

       gototen(){
          let _this=this
            _this.diolog=true;
        },
         nowbuy(){
          let _this=this
           let query = this.$route.query
          let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
          let rephone = /^1[3456789]\d{9}$/; //手机号码

          // if(typeof this.$store.state.user === 'undefined'){
          //     _this.oldername="请输入您的姓名";
          //     _this.olderphone="请输入您的手机号";
          //   }else{//微信已登录
          //       _this.userphone=this.$store.state.user.MobilePhone
          //       console.log(this.$store.state.user)

          //       if(this.$store.state.user.RealName){
          //         _this.username=this.$store.state.user.RealName
          //         console.log("come")
          //       }else{
          //         _this.oldername="请输入您的姓名";
          //       }
          //   }






            if(this.username==""){
                this.$msg.alert("请输入真实姓名！")
                return false
            }
            if(rename.test(this.username).length >20){
                this.$msg.alert("真实姓名不能大于20个中文字符")
                return false
            }
             if(this.userphone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }

            console.log(this.userphone)

            if(!rephone.test(this.userphone)){
                console.log(this.userphone)
                this.$msg.alert("请输入正确的手机号码！")

                return false
              }


         this.$http(this.$api.ApplyInsurance({"InsuranceId":query.Id,"UserRealName":_this.username,"UserMoible":_this.userphone}))
        .then((data) => {
             console.log(data)
             _this.diolog=false;
             if(data.data.ResultCode==100000){
              _this.diologcom=true;
             }

         })

        },
        closecom(){
           let _this=this
          _this.diologcom=false;
        },

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    _this.isapp=_this.$lg.isapp()
    _this.isapp=query.isapp

    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }


    this.$http(this.$api.GetInsuranceDetail({"InsuranceId":query.Id}))
    .then((data) => {

         _this.allData=data.data.ResultData
         console.log(_this.allData.InsurancePlanTypeList.length)
         if(_this.allData.InsurancePlanTypeList.length !=1){
            _this.reallength=true
         }else{
          _this.reallength=false
         }
         _this.bannerList=data.data.ResultData.ShowPictures

            _this.listnowdata=_this.allData.InsurancePlanTypeList[_this.activeindex]
            _this.explian=_this.allData.InsurancePlanFileList
            //_this.listnowdata.PlanTypeItemList.length=3;
          if( _this.listnowdata.PlanTypeItemList.length>3){

            _this.check=true;
            _this.checklist=true;
            //_this.listnowdata.PlanTypeItemList.length=3;
          }else{
            _this.check=false;
            _this.checklist=false;
          }
    })

    this.$http(this.$api.GetInsuranceAds({}))
    .then((data) => {

    })

    if(this.$store.state.isapp!='ios' && this.$store.state.isapp!='android'){//微信打开
             if(typeof this.state.user=="undefined"){//微信未登录
                 _this.oldername="请输入您的姓名";
                _this.olderphone="请输入您的手机号";
            }else{//微信已登录
              _this.userphone=this.$store.state.user.MobilePhone
              console.log(this.$store.state.user)
              if(this.$store.state.user.RealName){
                _this.username=this.$store.state.user.RealName
              }
            }
        }else{//APP打开
            if(typeof this.state.user!="undefined"){ //APP已登录
              console.log("APP")
               _this.userphone=this.$store.state.user.MobilePhone
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus==3){
                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                console.log(data)
                                 if(data.data.ResultCode==100000){
                                    console.log(data.data.ResultData)
                                           _this.username = data.data.ResultData.UserName
                                           _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });
                    }else{
                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                console.log(data)
                                 if(data.data.ResultCode==100000){
                                    console.log(data.data.ResultData)
                                      _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });
                    }
                })
              }else{//APP未登录
                 _this.oldername="请输入您的姓名";
                _this.olderphone="请输入您的手机号";
              }
        }


  },
  components:{
    globlenav,
    heads,
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="scss" scoped>
.topbanner img{width:100%;}
.ulicon{width:100%;background: #fff;overflow: auto;}
.ulicon ul{width:90%;margin:rem(10) auto 0;}
.ulicon ul li{float:left;width:33%;text-align: center;}
.ulicon ul li p:first-child{width:rem(60);height:rem(60);background:#ccc;margin:0 auto;border-radius: rem(60);}
.ulicon ul li p:last-child{color:#666;line-height: rem(30)}
.fireicon{margin:rem(5) auto;width:90%;}
.fireicon p:first-child{width:10%;float:left;height:rem(30);background:url(../../../static/img/insurance/hot.png) no-repeat left center;background-size: 70%;}
.fireicon p:last-child{line-height: rem(30);color:#333333;font-size: rem(16)}
.whitebox{background:#fff;overflow:auto;margin:rem(10) 0 }
.nowhite{}
.whitebox .content{width:90%;margin:0 auto;overflow:hidden;}
.whitebox .content .toptitle{line-height:rem(40);color:#333333;font-weight:bold;font-size:rem(18);text-align:left;border-bottom:rem(1) solid #ddd;}
.whitebox .content .tablist{border-bottom:rem(1) solid #ddd;overflow:auto;}
.whitebox .content .tablist ul{}
.whitebox .content .tablist ul li{float:left;margin:rem(10) rem(10);line-height:rem(35);height:rem(35);width:rem(90);text-align:center;border:rem(1) solid #999999;border-radius:rem(25);}


.whitebox .content .tablist ul li.actred{color:#ff0000;border:rem(1) solid #ff0000;}

.whitebox .content .listul{}
.whitebox .content .listul ul{}
.whitebox .content .listul ul li{position:relative;height:rem(50);line-height:rem(50);border-bottom:rem(1) dashed #ccc;}
.whitebox .content .listul ul.longul{height:rem(153);overflow:hidden;}
.whitebox .content .listul ul.realul li:after{
  border: rem(10) solid transparent;
  border-left: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(15);
  right: rem(-7);
  content: ' ';
}
.whitebox .content .listul ul.realul li:before{
  border: rem(10) solid transparent;
  border-left: rem(10) solid #999999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(15);
  content: ' ';
  border-left-color: #999999;
  right: rem(-8);
}

.whitebox .content .listul ul li .listleft{color:#666666;float:left;width:48%;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitebox .content .listul ul li .listright{color:#333333;float:right;width:45%;text-align:right;padding-right:rem(15);display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.whitebox .content .listul ul li:last-child{border-bottom:rem(1) solid #ccc;}

.checkmore{line-height:rem(50);color:#3ea4f3;position:relative;text-align:center;}
.shouqi{line-height:rem(50);color:#3ea4f3;position:relative;text-align:center;}
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
.agreement{width:90%;margin:0 auto;}
.agreement .agreementtop{line-height:rem(30);}
.agreement .agreementbot{line-height:rem(30);}
.agreement .agreementbot a{color:#3ea4f3;}
.conwhite{height:auto;margin-bottom: rem(30)}

.collection{text-align:center;height:rem(50);line-height:rem(50);color:#fff;position:fixed;bottom:rem(-1);}
.collection .collleft{width:30%;float:left;background:#fff;color:#999999;height:rem(50)}
.collection .collleft .collpic{height:rem(20);width:rem(20);background:url(../../../static/img/insurance/redstart.png) no-repeat center top;background-size:100%;margin:rem(7) auto 0;}
.collection .collleft p{line-height:rem(20)}
.collection .collmiddle{width:50%;float:left;background:#fdb721;}
.collection .collmiddle a{color:#fff;}
.collection .collright{width:50%;float:left;background:#de3031;}

.whitetop{width:90%;margin:0 auto;padding:rem(10) 0;overflow:auto;}
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

.botlink{background:#fff;padding:rem(10) 0;}
.botlink p{width:70%;margin:0 auto;text-align:center;color:#999999;line-height:rem(20)}
.botlink p a{color:#3ea4f3;}

.dialog{width:rem(300);height:rem(250);position:fixed;top:50%;left:50%;margin:rem(-125) 0 0 rem(-150);background:#fff;border-radius:rem(10);text-align:center;z-index: 999;}
.dialogright{height:rem(200);margin:rem(-100) 0 0 rem(-150);}
.dialog .close{float:right;width:rem(30);height:rem(30);text-align:center;font-size:rem(18);color:#eee;background:url(../../../static/img/insurance/close.png) no-repeat center center;background-size:100%}
.dialog .dialogcont{width:90%;margin:rem(30) auto;}
.dialog .toptitle{line-height:rem(35);color:#333;font-size:rem(16)}
.dialog ul{}
.dialog ul li{}
.dialog ul li input{line-height:rem(23);border:rem(1) solid #eee;width:100%;padding:rem(10) 0;margin:0 0 rem(10);text-indent:rem(10)}
.dialog .queren{width:100%;line-height:rem(50);border-radius:rem(10);background:#de3031;margin:rem(10) auto 0;color:#fff;font-size:rem(16)}
.allgray{z-index:997;background:#000;opacity: 0.7;height:100%;width:100%;position:fixed;top:0;left:0;}
.dialog .middle{width:100%;line-height:rem(25);color:#999;}

.masks{ width:100%; height:100%; background:rgba(0,0,0,0.5); position:fixed; left:0; top:0; z-index:1000;}
.alert_box{width:100%;height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center; position:fixed;top: 0;left:0;z-index: 1001;}
.alert_box .submit_box{width:70%; margin:auto; background-color:#fff;padding:rem(15);border-radius:rem(8);position:relative;}
.alert_box .submit_box a.cancel{position:absolute;width:rem(15);height:rem(15);display:block; @include bg("/static/img/my/cancel.png");right:rem(10); top:rem(10);}
.alert_box .submit_box h1{text-align:center; font-size:0.6rem; font-weight:normal; margin-top:rem(10);}
.alert_box .submit_box input{height:rem(45); border-radius:0.125rem; outline: none; border:1px solid #d8d8d8; margin-top:rem(10); padding:0 rem(15); box-sizing:border-box; width:100%;}
.alert_box .submit_box .submit_btn2{height:rem(45);line-height:rem(45);font-size:0.4rem; color:#fff; text-align:center;background-color:#de3031;display:block; margin-top:rem(10);border-radius:rem(5);}
.alert_box .submit_box p.subred{color:#de3031;text-align:center; margin-top:rem(5)}
.alert_box .submit_box p.sub{color:#888;text-align:center; margin-top:rem(10)}
</style>

