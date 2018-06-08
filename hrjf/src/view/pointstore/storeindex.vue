<template>
   <div id="frame">
    <div id="con" style="text-align:left">
      <div class="link_head">
      <h1>
        <span>
         <!--  <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a> -->
        </span>
          {{title}}
       </h1>
    </div>


        <div class="huiyuan">
          <div class="jfcontent">

            <div class="contentli" v-if="islogin" @click="gotopointstore()">
                <div class="topspan">
                    <p class="member"><img :src="Portrait" /><span class="name">{{persontitle}} </span class=""><span class="huiyuand">{{ levelnow }}</span></p>
                    <router-link class="detail" to="/pointstore" v-if="logindata.GiftBagCount"><b class="redpoint" >{{logindata.GiftBagCount}}</b><span>领取礼包</span></router-link>
                </div>

                <div class="botdetails">
                  <p class="botdleft">{{logindata.CardNo}}</p>
                  <p class="botdright">使用金服的第{{logindata.UseDay}}天<span></span></p>
                </div>
            </div>

            <div class="contentli" v-if="!islogin">
                <div class="topspan topspans">
                    <router-link class="member members" to="/login?back=storeindex">
                      <img src="static/img/pointstore/rentou.png" />
                      <div class="imgleft">
                          <span class="name">点击登录/注册 </span>
                          <p class="botdright">登录享受会员权益<span></span></p>
                      </div>
                    </router-link>
                </div>
            </div>
          </div>


          <div class="menu">
            <ul class="menuul">
              <li v-for="item in DiscoverPostersAndMenu.Menu">
              <a :href="item.Link ">
                <img v-bind:src="item.Url" />
                <p>{{item.Title}}</p>
              </a>
              </li>
            </ul>
          </div>

          <div class="midimg">
            <img v-bind:src="Activity.Url">
          </div>

          <div class="geleiul">
            <ul>
              <li @click="gotointeqral()">
                <img src="static/img/pointstore/jfscheng.png" />
                <div class="detailright">
                    <p class="topfen">当前积分: <span>{{nowsco}}</span></p>
                    <p class="botfen">积分商城</p>
                </div>
              </li>

              <li @click="gotointeqralcenter()">
                <img src="static/img/pointstore/tubiao2.png" />
                <div class="detailright" >
                    <p class="topfen">积分任务</p>
                    <p class="botfen">马上赚积分</p>
                </div>
              </li>
            </ul>
          </div>



        <div class="sping">
         <div class="bgtitle Hot"></div>
            <ul>
              <li v-for="item in Hot" @click="gotodetail(item.ID)">
                <img v-bind:src="item.Icon_max_url" />
                <p class="graytop">{{item.Name}}</p>
                <p class="red">{{item.Need_point}}积分</p>
              </li>
            </ul>
        </div>


        <div class="sping">
            <div class="bgtitle Coupons"></div>
            <ul>
                <li v-for="item in Coupons" @click="gotodetail(item.ID)">
                <img v-bind:src="item.Icon_max_url" />
                <p class="graytop">{{item.Name}}</p>
                <p class="red">{{item.Need_point}}积分</p>
              </li>
            </ul>

            <router-link to="/Integral?which=0" class="botrouter">查看更多</router-link>
        </div>

        <div class="sping">
              <div class="bgtitle Goods"></div>
              <ul>
                <li v-for="item in Goods" @click="gotodetail(item.ID)">
                  <img v-bind:src="item.Icon_max_url" />
                  <p class="graytop">{{item.Name}}</p>
                  <p class="red">{{item.Need_point}}积分</p>
                </li>
              </ul>
            <router-link to="/Integral?which=0" class="botrouter">查看更多</router-link>
        </div>

      </div>


      </div>
      <globlenav></globlenav>
      </div>

    </div>

  </div>
</template>

<script>
import globlenav from '../../components/nav';
export default {
  data () {
    return {
      title: '发现',
      state:this.$store.state,

      islogin:false,
      Portrait:"static/img/pointstore/rentou.png",
      logindata:[],
      DiscoverPostersAndMenu:[],
      Activity:[],
      Hot:[],
      Coupons:[],
      Goods:[],

      nowsco:'',

      persontitle:'',

      levellist:["","普通会员","白银会员","黄金会员","铂金会员","白钻会员","黑钻会员"],
      levelnow:'',
    }
  },
  methods:{
    gotointeqral(){
      console.log("111")
       this.$router.push('/Integral?which=0')
    },
    getuserphoto(){
      let _this =this
      if(typeof this.$store.state.user=="undefined"){
        return
    }

     _this.$http(_this.$api.GetPortrait({}))
    .then((data) => {
       if(data.data.ResultData.Portrait!=""){
        _this.Portrait = data.data.ResultData.Portrait

       }
      });
    },
    gotointeqralcenter(){
       this.$router.push('/Integralcenter?center=0')
    },

     gotodetail(ID){
       let _this=this
     _this.$router.push("/storedetail?id="+ID)
    },

    gotopointstore(){
      let _this=this
      _this.$router.push("pointstore")
    }

  },
  created:function(){
    let _this =this
this.getuserphoto();

    console.log(_this.nowsco)
     if(typeof _this.state.user=="undefined"){
          _this.islogin=false;
          _this.nowsco='未登录'
      }else{
        _this.islogin=true;
         this.$http(this.$api.DiscoverLoginInfo({}))
          .then((data) => {
             _this.logindata=data.data.ResultData
             console.log(_this.logindata)


             _this.levelnow=_this.levellist[_this.logindata.Level]

             _this.nowsco=_this.logindata.Gold;



             if(_this.logindata.Name == "未实名"){
                _this.persontitle = _this.logindata.Mobile

               }else{
                _this.persontitle=_this.logindata.Name
               }
          });
      }


       this.$http(this.$api.DiscoverPostersAndMenu({}))
      .then((data) => {

         _this.DiscoverPostersAndMenu=data.data.ResultData
         _this.Activity=data.data.ResultData.Posters[0]
      });

       this.$http(this.$api.DiscoverCouponList({}))
      .then((data) => {

         _this.Hot=data.data.ResultData.Hot
           console.log(data)
         _this.Coupons=data.data.ResultData.Coupons
         _this.Goods=data.data.ResultData.Goods
      });


  },
  components:{
    globlenav,
  }
}
</script>
<style lang="scss" scoped>
.huiyuan{}
.huiyuan .jfcontent{width:90%;margin:rem(10) auto 0;background:url(../../../static/img/pointstore/indexbg.png) no-repeat center top;background-size:100%;padding-top:rem(15)}
.huiyuan .contentli{height:rem(150);width:90%;margin:rem(15) auto 0;}
.huiyuan .contentli .topspan{height:rem(55);width:100%;overflow:hidden;}
.huiyuan .contentli .topspan .detail{float:right;height:rem(25);line-height:rem(20);padding-top:rem(35);background:url(../../../static/img/pointstore/mgift.png) no-repeat center top;background-size:35%;width:30%;color:#fff;position:relative;text-align:center;display:block;}
.huiyuan .contentli .topspan .detail .redpoint{width:rem(15);height:rem(15);background:#de3132;position:absolute;top:rem(2);right:rem(20);border-radius:rem(15);line-height:rem(15)}
.huiyuan .contentli .member{font-size:rem(12);color:#fff;font-weight:bold;clear: both;width:70%;float:left;line-height:rem(40);height:rem(40);display:block}
.huiyuan .contentli .members{font-size:rem(12);color:#fff;font-weight:bold;clear: both;width:90%;float:left;line-height:rem(30);height:rem(60);}
.huiyuan .contentli .member img{float:left;display:block;width:16%;margin-right:rem(5);border-radius:50%;}
.huiyuan .contentli .member .name{font-size:rem(14);}
.huiyuan .contentli .member .huiyuand{height:rem(15);line-height:rem(15);background:#fff;color:#798ba3;text-align:center;border-radius:rem(10);padding:0 rem(10);margin:0 auto;}
.huiyuan .contentli .member .sir{font-size:rem(12);}
.huiyuan .contentli .member .imgleft .name{font-size:rem(16);}
.huiyuan .contentli .member .imgleft{float:left;width:80%;padding-top:rem(10);}
.huiyuan .contentli .member .imgleft .sir{font-size:rem(16);}
.huiyuan .contentli .arrive{font-size:rem(12);color:#fff;padding-top:rem(3)}
.huiyuan .contentli .botdetails{padding-top:rem(55);color:#fff;height:rem(40)}
.huiyuan .contentli .botdetails .botdleft{float:left;font-size:rem(16);width:40%;}
.huiyuan .contentli .botdetails .botdleft span{font-size:rem(14)}
.huiyuan .contentli .botdetails .botdright{float:right;width:60%;text-align:right;font-size:rem(14);}
.huiyuan .contentli .botdetails .botdright span{ width: 0;height: 0; border-top:5px solid transparent; border-left: 10px solid #fff; border-bottom: 5px solid transparent;display:block;float:right;margin:rem(5) 0 0 rem(5);}
.huiyuan .contentli .topspans{height:rem(70);width:100%;overflow:hidden;}
.topspan .botdright{color:#ececee;height:rem(30);width:65%;font-size:rem(14);}
.topspan .botdright{float:left;width:60%;text-align:right;font-size:rem(14);}
.topspan .botdright span{ width: 0;height: 0; border-top:5px solid transparent; border-left: 10px solid #ececee; border-bottom: 5px solid transparent;display:block;float:right;margin:rem(10) 0 0 rem(5);}
.menu{background:#fff;box-shadow: rem(0) rem(0) rem(5) #ccc;}
.menu .menuul{display:flex;width:90%;margin:0 auto;}
.menu .menuul li{ justify-content:center;text-align:center;padding:rem(10) 0;}
.menu .menuul li img{ width:40%;}
.menu .menuul li p{color:#5e6c7b;}

.geleiul{width:95%;margin:0 auto;background:#fff;border-radius:rem(5);box-shadow:0 0 rem(5) #eee;padding:rem(10) 0;}
.geleiul ul{display:flex;}
.geleiul ul li{justify-content:center;}
.geleiul ul li:first-child{border-right:rem(1) solid #dbdbdb;}
.geleiul ul li img{display:block;float:left;width:30%;margin:rem(10) rem(5) rem(10) rem(10) }
.geleiul ul li .detailright{width:60%;float:right;margin:rem(10) 0 0;}
.geleiul ul li .topfen{color:#5e6c7b;font-size:rem(12);line-height:rem(25);padding-bottom:rem(5);text-indent:rem(5)}
.geleiul ul li .topfen span{color:#ff3b66;}
.geleiul ul li .botfen{width:80%;text-align:center;font-size:rem(14);color:#fff;background:#ecbd4c;line-height:rem(25);height:rem(25);border-radius:rem(15);}
.huiyuan .sping{width:95%;background:#fff;margin:rem(10) auto ;overflow:auto;border-radius:rem(5);box-shadow:rem(0) rem(0) rem(5) #ccc;padding-bottom:rem(5)}
.huiyuan .bgtitle{height:rem(35);border-bottom:rem(1) dashed #bbbbbb;}
.huiyuan .bgtitle.Hot{background:url(../../../static/img/pointstore/dhuan.png) no-repeat left center;background-size:20%;width:90%;margin: rem(10) auto 0;}
.huiyuan .bgtitle.Coupons{background:url(../../../static/img/pointstore/yhj.png) no-repeat left center;background-size:15%;width:90%;margin: rem(10) auto 0;}
.huiyuan .bgtitle.Goods{background:url(../../../static/img/pointstore/swsp.png) no-repeat left center;background-size:20%;width:90%;margin: rem(10) auto 0;}
.huiyuan .sping ul{width:90%;margin: 0 auto 0;}
.huiyuan .sping ul li{text-align:center;box-shadow:rem(1) rem(1) rem(5) #ccc;margin:rem(10) rem(2)}
.huiyuan .sping ul li img{width:90%;padding:rem(15) 0;height:rem(100);overflow:hidden;}
.huiyuan .sping ul li:nth-child(2n+1){width:47%;float:left;}
.huiyuan .sping ul li:nth-child(2n){width:47%;float:right;}
.huiyuan .sping ul li p{line-height:rem(25);}
.huiyuan .sping ul li .graytop{color:#5e6c7b;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.huiyuan .sping ul li .red{color:#ff3b66;}

.midimg{width:95%;margin:rem(10) auto;border-radius:rem(10)}
.midimg img{width:100%;display:block;border-radius:rem(8)}

.botrouter{width:30%;height:rem(20);line-height:rem(20);text-align:center;background:#ecbd4c;border-radius:rem(8);display:block;margin:rem(10) auto;clear:both;color:#fff;}
</style>

