<template>
<div class="container">
 <heads :title="title"></heads>



<div class="hothouse_box">
  <div class="listmain" v-for="item in houselist" @click="detail(item.ID)">
            <div class="img"><img :src="item.Img"></div>
            <div class="main">
              <p class="titile">{{item.Specification}}<span>{{item.SaleState}}</span></p>
              <p class="sub">建面{{item.Area}} 朝向{{item.Orientation}}</p>
              <p class="money">约{{item.Price}}</p>
              <p class="tag"><span v-for="items in item.Tag">{{items}}</span></p>
            </div>
       </div>
</div>
<div class="submit_btn">
  <div class="collect" @click="collectFn"><i :class="{active:iscollect}"></i><p>收藏</p></div>
  <div class="submit"><a href="javascript:" @click="callnow">咨询经纪人</a></div>
</div>
<div v-if="showcall">
  <div class="masks"  @click="cancel()"></div>
    <div class="alert_box">
        <div class="submit_box">
          <a href="javascript:" class="cancel" @click="cancel()"></a>
          <p class="sub">是否拨打咨询热线？</p>
          <h1>{{textphone}}</h1>

          <a :href="phone" class="submit_btn2" @click="appcall">确认拨打</a>
        </div>
    </div>
</div>
</div>


</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"户型",
      state:this.$store.state,
      houselist:[],
      iscollect:false,
      showcall:false,
      phone:"javascript:",
      textphone:""
    }
  },
  mounted : function() {

  },
  methods:{
    callnow(){
      this.showcall = true;
    },
    cancel(){
      this.showcall = false
    },
    collectFn(){
      let obj
      let _this = this
      let q = this.$route.query

      if(typeof this.state.user=="undefined"){
        // this.$router.push("/login?back=newhousedetail?id="+q.id)
        this.$lg.applogin("newhousedetail?id="+q.id)
        return
      }
      if(this.iscollect){
        obj= this.$api.HouseCancelStoreup({"ReferenceId":q.id})

      }else{
        obj= this.$api.HousesStoreup({"ReferenceId":q.id})
      }
      this.$http(obj)
      .then((data) => {
        if(data.data.ResultCode==100000){
          let msg
          if(_this.iscollect){
            msg = "取消收藏成功"
            _this.iscollect = false
          }else{
            msg = "收藏成功"
            _this.iscollect = true
          }
          _this.$msg.alert(msg)
        }
      });
    },
    detail(id){
      let q = this.$route.query
      this.$router.push("/newhousetypedetail?id="+id+"&phone="+q.phone+"&houseid="+q.id)
    },
    gethouselist(type){
      let _this = this
      let q = this.$route.query
      this.$http(this.$api.HousesTypeList({"Page":1,"PageSize":100,"ID":q.id}))
      .then((data) => {
         this.houselist = data.data.ResultData.List
         if(data.data.ResultData.StoreUpID>0){
          _this.iscollect = true;
        }
         console.log(data.data.ResultData)
      });
    },
    appcall(){
      if(this.$store.state.isapp=='android'){
        this.phone = "javascript:"
        android.callPhone(this.textphone);
      }else if(this.$store.state.isapp=='ios'){
        this.phone = "javascript:"
        window.webkit.messageHandlers.Method.postMessage({ "type": "callPhone","phone":this.textphone});
      }else{
        this.phone = "tel:"+this.textphone
      }
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    this.textphone = q.phone
    //this.phone = "tel:"+q.phone
    this.gethouselist();


  },
  components:{
    heads,

  }
}
</script>
<style lang="scss" scoped>
.hothouse_box{padding:rem(15);box-sizing:border-box;background:#fff;margin-bottom:1.25rem;}
.listmain{ border:1px solid #d8d8d8; margin-bottom:rem(10);}
.listmain{overflow:hidden;}
.img{float:left;width:rem(180);height:rem(130);}
.img img{display:block; width:rem(180);height:rem(130);}
.main{padding:rem(10); width:rem(150);margin-right:rem(15); overflow:hidden;}
.main .titile{font-size:0.4rem;}
.main .titile span{background:#dcf7ff; color:#19b9e7; display:inline-block; width:rem(50);text-align:center;margin-left:rem(20);border-radius:rem(5);font-size:0.35rem;}
.main .sub{color:#888;margin-top:rem(5);}
.main .money{margin-top:rem(5);font-size:0.4rem;color:#de3031;}
.main .tag{display:flex;margin-top:rem(5);}
.main .tag span{width:rem(80);height:rem(30);line-height:rem(30);text-align:center; border:1px solid #d8d8d8;margin-right:rem(10);border-radius:rem(5); color:#888;}

.submit_btn{overflow:hidden;display:flex;height:1.25rem; margin-top:rem(10); position:fixed;bottom: 0;left:0;}
.submit_btn .collect{width:40%; background:#fff;text-align:center;}
.submit_btn .collect i{width:rem(20);height:rem(20);@include bg("/static/img/house/xx.png");margin:auto;display:block;margin-top:rem(5);}
.submit_btn .collect i.active{@include bg("/static/img/house/xx2.png")}
.submit_btn .collect p{color:#888;margin-top::rem(3)}
.submit_btn .submit{background:#de3031;}
.submit_btn .submit a{display:block; line-height:1.25rem;color:#fff; font-size:0.45rem;text-align:center;}

.slideWarp2 img{height:auto;}
.swiper-pagination-fraction{color:#fff;}
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