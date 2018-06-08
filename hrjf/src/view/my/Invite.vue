<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="box_bg">
     <router-link :to="'/myinvitelist'" class="mysharp"></router-link>
     <div class="invitetext" v-if="basset.totalReward<=0">好友投资<span>10万元</span>,最高可得<span>1200奖励</span></div>
     <div class="invitetext" v-else>您已获得<span>{{basset.totalReward}}</span>元奖励</div>
     <router-link :to="'/myinviteindex'" class="myinvit"></router-link>
     <router-link :to="'/inviteincome'" class="invitehelp"></router-link>
     <div class="myinvitenumber">
         <p class="textbtn">您的专属邀请码:<span>{{basset.inviteToken}}</span></p>
         <p class="subtext">您已邀请<span>{{basset.inviteRegisterCount}}</span>个好友注册，有<span>{{basset.inviteIsInvestCount}}</span>人进行投资</p>
     </div>

 </div>
 <a herf="javascript:" class="sharpbtn" @click="nowSharp"></a>
</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
    title:"邀请奖励",
      basset:""
    }
  },
    methods:{
    nowSharp(){
      this.$share({"title":"8888元投资立白，更有百万体验金等你拿","href":"/invitelink?i="+this.basset.InviteCode})
    }
  },
  created :function(){
    let _this=this
    let q = this.$route.query
    if(q.ver=='ios'){
        window.webkit.messageHandlers.Method.postMessage({ type: "linkInvite" });
        return
    }else if(q.ver=='android'){
        android.linkInvite();
        return
    }
      this.$http(this.$api.getqueryinviterewardasset({}))
        .then(function(data){
          if(data.data.ResultData.IsEmployee){
            _this.$router.push('/invitestaff')
            return
          }
          _this.$http(_this.$api.QueryInviteRewadIndex({}))
          .then(function(data){
            _this.basset=data.data.ResultData
            console.log(_this.basset)
            _this.$share({"title":"8888元投资立白，更有百万体验金等你拿","href":"/invitelink?i="+_this.basset.InviteCode,"img":"/activity/sharePhoto/titleicon.jpg"},false)
         });

       });


  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.container{height:100%;overflow: hidden;position: relative;left: 0px;top:0;z-index: 0; bottom:0}
.box_bg{height:100%;@include bg("/static/img/my/myinvite_bg.jpg"); position:absolute; overflow:hidden;top:1.1rem;left:0;bottom:1.25rem;background-size:100%;}
.box_bg .mysharp{@include widthHeight(rem(65),rem(65));@include bg("/static/img/my/myinvite_btn1.png"); position:absolute; top:rem(5);right:rem(5); }
.box_bg .invitetext{@include widthHeight(70%,rem(50)); background:#fff3ca; border-radius:rem(30); line-height:rem(50); text-align:center; margin:auto;margin-top:rem(230); font-size:0.35rem;}
.box_bg .invitetext span{color:#de3132; font-weight:bold;}
.box_bg .myinvit{@include widthHeight(70%,rem(50));margin:auto; margin-top:rem(8);@include bg("/static/img/my/myinvite_btn3.png"); display:block;}
.box_bg .invitehelp{@include widthHeight(70%,rem(50));margin:auto; margin-top:rem(10);@include bg("/static/img/my/myinvite_btn2.png"); display:block;}
.myinvitenumber{text-align:center; margin-top:rem(40)}
.myinvitenumber .number{color:#fff; font-size:0.6rem;margin-top:rem(10);}
.myinvitenumber .textbtn{@include widthHeight(90%,rem(30)); border-radius:rem(30);background:#fbda66; color:#555;line-height:rem(30);margin:auto;margin-top:rem(5);}
.myinvitenumber .textbtn span{color:#f73a27;}
.myinvitenumber .subtext{color:#fff;margin-top:rem(15);}
.sharpbtn{@include widthHeight(100%,rem(50));@include bg("/static/img/my/sharpbtn.png"); display:block; position:absolute;left:0; bottom:0;overflow: hidden;}
.myinvitenumber .subtext span{color:#ffbb2a}


</style>
