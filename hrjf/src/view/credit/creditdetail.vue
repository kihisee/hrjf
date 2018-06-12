<template>
   <div id="frame">
    <heads :title="title"  v-if="isapp"></heads>
    <div id="con">


      <div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
         <img :src="slide" alt="">
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
  </div>

    <div class="whitebox">
          <p class="topbold">{{GetCreditcard.CardName}}</p>
          <p class="middlelight">{{GetCreditcard.Description}}</p>
          <div class="floatspan">
<!--             <span></span>
            <span v-if="GetCreditcard.Currency">{{GetCreditcard.Currency.replace(/;$/gi,"").replace(/;+/g, "+")}}</span>
            <span>{{GetCreditcard.AnnualFeeTypeStr}}</span> -->

             <dl>
                <dt>{{GetCreditcard.Grade}}</dt>
                <dd  v-if="GetCreditcard.Currency">{{GetCreditcard.Currency.replace(/;$/gi,"").replace(/;+/g, "+")}}</dd>
                <dd>{{GetCreditcard.AnnualFeeTypeStr}}</dd>
              </dl>
          </div>
    </div>

    <div class="whitebox" v-if="Privilege.length">
        <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">专享特权</p>
          <span class="huaright"></span>
        </div>

        <ul class="bigrect">
          <li v-for="item in Privilege">
            <p class="rectleft"><img src="../../../static/img/insurance/qiantou.png" /></p>
            <p class="pright">{{item.name}}</p>
          </li>
        </ul>

        <p class="ckmore" @click="gotoprivilige()">查看特权详情>></p>
    </div>

  <div class="whitebox">
        <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">基本信息</p>
          <span class="huaright"></span>
        </div>
        <ul class="bigrect bigrecttwo">
          <li>
            <p class="wordleft">等      级</p>
            <p class="wordright">{{GetCreditcard.Grade}}</p>
          </li>
          <li>
            <p class="wordleft">币      种</p>
            <p class="wordright" v-if="GetCreditcard.Currency">{{GetCreditcard.Currency.replace(/;$/gi,"").replace(/;+/g, "+")}}</p>
          </li>
          <li>
            <p class="wordleft">发卡组织</p>
            <p class="wordright">银联+MasterCard</p>
          </li>
          <li>
            <p class="wordleft">免息期限</p>
            <p class="wordright">{{GetCreditcard.FreePeriod}}</p>
          </li>
        </ul>
    </div>

      <div class="whitebox">
        <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">费用</p>
          <span class="huaright"></span>
        </div>
        <ul class="bigrect bigrecttwo">
          <li>
            <p class="wordleft">年      费</p>
            <p class="wordright">{{GetCreditcard.AnnualFeeExplain}}</p>
          </li>
          <li>
            <p class="wordleft">取现费用</p>
            <p class="wordright">{{GetCreditcard.WithdrawalCash}}</p>
          </li>
          <li>
            <p class="wordleft">最短还款</p>
            <p class="wordright">{{GetCreditcard.MinimumRepayment}}%</p>
          </li>

        </ul>

        <p class="ckmore ckmored" @click="gotocost()">查看费用详情>></p>
    </div>

    <div class="whitebox">
       <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">办卡流程</p>
          <span class="huaright"></span>
      </div>
      <div class="rectgray">
        <ul>
          <li>
            <p class="gray"></p>
            <p class="grayp">申请办卡</p>
          </li>
          <li>
            <p class="gray"></p>
            <p class="grayp">官网填写资料</p>
          </li>
          <li>
            <p class="gray"></p>
            <p class="grayp">查看进度</p>
          </li>
          <li>
            <p class="gray"></p>
            <p class="grayp">申请完成</p>
          </li>
        </ul>
      </div>
    </div>

    <p class="rightnow" @click="goaway()">立即申请</p>

    </div>

    <div class="dialog" v-if="diolog">
        <p class="close" @click="closedio()"> </p>
        <div class="dialogcont">
          <p class="toptitle">填写确认您的信息</p>
          <ul>
            <li><input type="text"  :placeholder="oldername"  v-model="username"/></li>
            <li><input type="text"  :placeholder="idcard"  v-model="usercard" /></li>
            <li><input type="text"  :placeholder="olderphone"  v-model="userphone"/></li>
          </ul>
          <p class="queren" @click="nowbuy()">确定提交</p>
        </div>
    </div>

    <div class="allgray"  v-if="diolog"></div>
  </div>
 </div>

</template>

<script>
import globlenav from '../../components/nav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heads from '../../components/head'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      title: '信用卡',
      bannerList:[],
    swiperOption: {
        autoplay: 0,
        setWrapperSize: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: false,
      },
      GetCreditcard:[],
      Privilege:[],
      basset:"",

      isapp:false,

      state:this.$store.state,

      diolog:false,
      oldername:"请输入您的姓名",
      idcard:"请输入您的身份证号码",
      olderphone:"请输入您的手机号码",
      username:'',
      usercard:'',
      userphone:'',
    }
  },
  methods:{
    gotoprivilige(){
       let _this =this
      let query = this.$route.query
       _this.$router.push('/privilege?Id='+query.Id+"&isapp="+_this.isapp)
    },
    gotocost(){
       let _this =this
      let query = this.$route.query
       _this.$router.push('/cost?Id='+query.Id+"&isapp="+_this.isapp)
    },
    closedio(){
       let _this=this
      _this.diolog=false;
    },
    goaway(){
      let _this =this
      let query = this.$route.query
      console.log(query)


        if(this.$store.state.isapp!='ios' && this.$store.state.isapp!='android'){//微信打开
            if(typeof this.state.user=="undefined"){
                 if(query.i=="undefined" || !query.i){
                  let firurl=encodeURIComponent("creditdetail?Id="+query.Id+"&isapp="+_this.isapp)
                  _this.$router.push("login?back="+firurl)
                  console.log(333)
                }else{
                  let allurl=encodeURIComponent("creditdetail?Id="+query.Id+"&i="+query.i+"&isapp="+_this.isapp)
                  console.log(allurl)
                  _this.$router.push("login?back="+allurl)
                    console.log(444)
                }
                 //window.location.href=_this.GetCreditcard.ApplicationLink
            }else{
              //window.location.href=_this.GetCreditcard.ApplicationLink
              _this.diolog=true
            }
        }else{//APP打开

            if(typeof this.state.user!="undefined"){ //APP已登录
              console.log("APP")
              //window.location.href=_this.GetCreditcard.ApplicationLinkAPP
              _this.diolog=true
              }else{//APP未登录
                console.log("APPNOT")
                this.$lg.applogin()

              }
        }

    },

    nowbuy(){
          let _this=this
          let query = this.$route.query
          let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
          let rephone = /^1[3456789]\d{9}$/; //手机号码
          let card=  /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$///身份证号
            if(this.username==""){
                this.$msg.alert("请输入真实姓名！")
                return false
            }
            if(rename.test(this.username).length >20){
                this.$msg.alert("真实姓名不能大于20个中文字符")
                return false
            }
             if(!card.test(this.usercard)){
              console.log(this.usercard)
              this.$msg.alert("请输入正确的身份证号！")
              return false
            }
             if(this.userphone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }
            if(!rephone.test(this.userphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }

              _this.$http(_this.$api.SaveCreditcardApplication({"CardId":query.Id,"Name":_this.username,"Mobile":_this.userphone,"IdCard":_this.usercard}))
                .then((data) => {
                   if(data.data.ResultCode ==100000){
                      console.log(data.data.ResultData)
                      if(this.$store.state.isapp!='ios' && this.$store.state.isapp!='android'){//微信打开
                          console.log("wx")
                          _this.diolog=false;
                            window.location.href=_this.GetCreditcard.ApplicationLink
                        }else{//APP打开
                          console.log("APP")
                          _this.diolog=false;
                            window.location.href=_this.GetCreditcard.ApplicationLinkAPP
                        }
                    }
                });




    },

    getInviteCode(){
          let _this = this
          let query = this.$route.query
         //  if(typeof this.$store.state.user ==="undefined"||!this.$lg.isapp()||typeof query.type==="undefined"){
         //      _this.$share({},false)
         //      return
         //  }
         //  this.$http(this.$api.getQueryInviteTotal({}))
         //  .then(function(data){
         //    _this.share(data.data.ResultData.InviteCode)
         // });
          _this.share()
      },


      share(InviteCode){
        let _this = this
        let query = this.$route.query
         var url = window.location.href;
        if(_this.$store.state.user  != undefined){
            _this.$http(_this.$api.QueryInviteRewadIndex({}))
              .then(function(data){
                _this.basset=data.data.ResultData
                url=url+"&i="+_this.basset.inviteToken
                var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);
                _this.$share({"href":relUrl},false)
                 _this.$share({"title":"邀约您办理申请"+_this.GetCreditcard.CardName+"，享受优质信用生活","href":relUrl,"desc":"一信一意快卡，一心一意办卡，玩转信用卡，躺着赚佣金","img":"insurance/sharepic.png"},false)
             });
          }else{
            var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);
             _this.$share({"title":"邀约您办理申请"+_this.GetCreditcard.CardName+" ，享受优质信用生活","href":relUrl,"desc":"一信一意快卡，一心一意办卡，玩转信用卡，躺着赚佣金","img":"insurance/sharepic.png"},false)
          }
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
    if(query.i=="undefined" || !query.i){
       _this.$http(_this.$api.GetCreditcard({"CardId": parseFloat(query.Id)}))
      .then((data) => {
        _this.GetCreditcard=data.data.ResultData.card
        _this.bannerList.push(data.data.ResultData.card.CardImg)
        let ss=new Array();
        ss =JSON.parse(data.data.ResultData.card.Privilege)
       _this.Privilege=ss
        this.getInviteCode();
      })
    }else{
        console.log(query)
        _this.$http(_this.$api.GetCreditcard({"CardId":parseFloat(query.Id),"IUserId":parseFloat(query.i)}))
          .then((data) => {
            _this.GetCreditcard=data.data.ResultData.card
            _this.bannerList.push(data.data.ResultData.card.CardImg)
            let ss=new Array();
            ss =JSON.parse(data.data.ResultData.card.Privilege)
           _this.Privilege=ss
           this.getInviteCode();
          })

    }






     if(this.$store.state.isapp!='ios' && this.$store.state.isapp!='android'){//微信打开
             if(typeof this.state.user=="undefined"){//微信未登录
                 _this.oldername="请输入您的姓名";
                _this.olderphone="请输入您的手机号";
            }else{//微信已登录
              _this.userphone=this.$store.state.user.MobilePhone
              console.log(this.$store.state.user)
              if(this.$store.state.user.RealName){
                 console.log(this.$store.state.user.RealName)
                _this.username=this.$store.state.user.RealName
              }
                _this.$http(_this.$api.QueryRealNameInfo({}))
                .then((data) => {
                  if(data.data.ResultData.IDCardNo){
                    _this.usercard=data.data.ResultData.IDCardNo
                  }


                });
            }

             console.log("boAPP")
        }else{//APP打开

          console.log("APP")
            if(typeof this.state.user!="undefined"){ //APP已登录
              console.log("APPin")
               _this.userphone=this.$store.state.user.MobilePhone
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus == 3){
                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                console.log(data)
                                 if(data.data.ResultCode ==100000){
                                           _this.username = data.data.ResultData.UserName
                                           _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });

                              _this.$http(_this.$api.QueryRealNameInfo({}))
                              .then((data) => {
                                console.log(data)
                                _this.usercard=data.data.ResultData.IDCardNo
                                console.log(_this.usercard)
                              });
                    }else{

                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                 if(data.data.ResultCode ==100000){
                                    console.log(data.data.ResultData)
                                      _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });
                    }
                })
              }else{//APP未登录
                  console.log("APPout")
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
    loadapp,
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
.whitebox{background:#fff;overflow:auto;margin:0 0 rem(10);padding:rem(10) 0;}

.whitebox .topbold{font-weight:bold;font-size:rem(18);line-height:rem(30);color:#333;text-indent:rem(15)}
.whitebox .middlelight{color:#666666;font-size:rem(16);text-indent:rem(0);width:93%;margin:0 auto;}
.whitebox .floatspan{margin: rem(5) 0;overflow:auto;}
.whitebox .floatspan span{display:block;float:left;width:auto;text-align:center;border:rem(1) solid #de3031;color:#de3031;text-indent:rem(0);padding:0 rem(3);border-radius:rem(3);margin:0 rem(5)}
.whitebox .floatspan span:first-child{margin-left:rem(15)}

.toplist{width:rem(115);margin:0 auto rem(10);height:rem(30);text-align:center;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;background-size:40%}
.toplist .midlleword{width:rem(75);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;background-size:40%}

.bigrect{width:90%;margin:0 auto;border-bottom:rem(1) solid #ddd;}
.bigrect li{height:auto;line-height:rem(40);color:#666666;font-size:rem(16);margin-bottom: rem(5)}
.bigrect li .rectleft{width:rem(20);height:rem(20);background:none;float:left;margin: rem(3) rem(5) 0 0;}
.whitebox .ckmore{text-align:center;line-height:rem(45);color:#3ea4f3;}
.bigrect li .wordleft{width:25%;float:left;text-align:center;color:#999999;}
.bigrect li .wordright{width:75%;float:left;color:#666666;}
.bigrecttwo li{line-height:rem(30);}
.bigrecttwo{border-bottom:none;overflow:auto;display:block;}
.ckmored{border-top:rem(1) solid #ddd;width:90%;margin:0 auto;}
.rectgray{width:90%;margin:0 auto rem(40);overflow:auto;}
.rectgray ul{}
.rectgray ul li{float:left;width:25%;text-align:center;}
.rectgray ul li:nth-child(1) .gray{width:rem(40);height:rem(50);margin:0 auto;background:url(../../../static/img/insurance/qianbao.png) no-repeat center center;background-size:100%;}
.rectgray ul li:nth-child(2) .gray{width:rem(40);height:rem(50);margin:0 auto;background:url(../../../static/img/insurance/qianbi.png) no-repeat center center;background-size:100%;}
.rectgray ul li:nth-child(3) .gray{width:rem(40);height:rem(50);margin:0 auto;background:url(../../../static/img/insurance/fangda.png) no-repeat center center;background-size:100%;}
.rectgray ul li:nth-child(4) .gray{width:rem(40);height:rem(50);margin:0 auto;background:url(../../../static/img/insurance/dagou.png) no-repeat center center;background-size:100%;}
.rectgray ul li .grayp{line-height:rem(25);color:#666666;}
.rightnow{width:100%;line-height:rem(45);color:#fff;background:#de3031;text-align:center;margin:rem(10) auto 0;font-size:rem(16);position: fixed;bottom:0;}
.slideWarp{width:80%;margin:0 auto;}
.slideWarp img{height:auto;width:100%;}

.dialog{width:rem(300);height:rem(300);position:fixed;top:50%;left:50%;margin:rem(-150) 0 0 rem(-150);background:#fff;border-radius:rem(10);text-align:center;z-index: 999;}
.dialogright{height:rem(200);margin:rem(-100) 0 0 rem(-150);}
.dialog .close{float:right;width:rem(30);height:rem(30);text-align:center;font-size:rem(26);color:#000;background:url(../../../static/img/insurance/close.png) no-repeat center center;background-size:100%;}
.dialog .dialogcont{width:90%;margin:rem(30) auto;}
.dialog .toptitle{line-height:rem(35);color:#333;font-size:rem(16)}
.dialog ul{}
.dialog ul li{}
.dialog ul li:nth-child(1) input{background:url(../../../static/img/insurance/xming.png) no-repeat  rem(9) center;background-size:8%;}
.dialog ul li:nth-child(2) input{background:url(../../../static/img/insurance/idcard.png) no-repeat rem(8) center;background-size:10%;}
.dialog ul li:nth-child(3) input{background:url(../../../static/img/insurance/iphone.png) no-repeat rem(10) center;background-size:7%;}
.dialog ul li input{line-height:rem(23);padding:rem(10) 0;border:rem(1) solid #eee;width:100%;margin:0 0 rem(10);text-indent:rem(10);background:#fff;text-indent:rem(45)}
.dialog .queren{width:100%;line-height:rem(50);border-radius:rem(10);background:#de3031;margin:rem(10) auto 0;color:#fff;font-size:rem(16)}
.allgray{z-index:997;background:#000;opacity: 0.7;height:100%;width:100%;position:fixed;top:0;left:0;}
.dialog .middle{width:100%;line-height:rem(25);color:#999;}


.whitebox .floatspan dl{height:rem(25);line-height:rem(25);text-align:center;}
.whitebox .floatspan dl dt{width:auto;float:left;border-radius:rem(3);background:#dcf7ff;color:#19b9e7;padding:rem(0) rem(5);margin-left:rem(15)}
.whitebox .floatspan dl dd{width:auto;padding:rem(0) rem(5);float:left;margin:0 rem(5);border-radius:rem(3);}
.whitebox .floatspan dl dd:nth-child(2){background:#e1fbf2;color:#57c89f;}
.whitebox .floatspan dl dd:nth-child(3){background:#fff3eb;color:#ff7843;overflow:hidden;height:rem(25);white-space: nowrap;text-overflow: ellipsis;margin:0 rem(5) 0 rem(0);}
</style>

