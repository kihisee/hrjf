<template>
<div class="container">
 <heads :title="title"></heads>
 <div class="box_bg">
    <div class="main_box">
        <div class="box">
          <div class="topmoney">
            <router-link to="/myinviteindex">
              <p>可提现奖励（元）</p>
              <p><span>{{basset.rewardBalance}}</span></p>
            </router-link>
          </div>
          <div class="flex">
            <div>
              <router-link to="/myinviteindex">
                <p>我的奖励（元）</p>
                <p><span>{{basset.totalReward}}</span></p>
              </router-link>
            </div>
            <div>
             <router-link to="/myinvitelist">
                <p>我的好友（人）</p>
                <p><span>{{basset.inviteRegisterCount}}</span></p>
              </router-link>
            </div>
          </div>
        </div>
    </div>
 </div>
<div class="yellow_bg">
  <router-link to="/inviteincome" class="invite_help">如何赚钱</router-link>
  <div class="invitecode_box">
    <p><span class="invitecode">{{basset.inviteToken}}</span></p>
    <p><span class="codebg">您的专属邀请码</span></p>
    <p class="text">您已邀请<span>{{basset.inviteRegisterCount}}</span>个好友注册，有<span>{{basset.inviteIsInvestCount}}</span>人进行投资</p>
  </div>
  <div class="top_invite_user_box">
      <p class="title">赚钱达人</p>
      <div class="flexone">
        <p><a href="javascript:" :class="{active:ranking==1}" @click="tab(1)">上周奖励排行榜</a></p>
        <p><a href="javascript:" :class="{active:ranking==2}" @click="tab(2)">总奖励排行榜</a></p>
      </div>
      <div class="topinvite_bg">
        <div class="flextwo">
           <div class="top1">
              <i></i>
              <div class="photo_bg"><span :style="topinviteUser[0].backgrounds">头像1</span></div>
              <p class="name">{{topinviteUser[0].name}}</p>
              <div class="money">{{(topinviteUser[0].money).toFixed(2)}}</div>
           </div>
           <div class="top2">
              <i></i>
              <div class="photo_bg"><span :style="topinviteUser[1].backgrounds">头像2</span></div>
              <p class="name">{{topinviteUser[1].name}}</p>
              <div class="money">{{(topinviteUser[1].money).toFixed(2)}}</div>
           </div>
           <div class="top3">
              <i></i>
              <div class="photo_bg"><span :style="topinviteUser[2].backgrounds">头像3</span></div>
              <p class="name">{{topinviteUser[2].name}}</p>
              <div class="money">{{(topinviteUser[2].money).toFixed(2)}}</div>
           </div>
        </div>
        <div class="invite_list">
            <ul>
              <li v-for="item in topinviteUser" v-if="item.rank>3">
                <p class="inivte_id">{{item.rank}}</p>
                <p class="inivte_photo"><span :style="item.backgrounds"></span></p>
                <p class="inivte_name">{{item.name}}</p>
                <p class="inivte_money">赚￥<span>{{(item.money).toFixed(2)}}</span></p>
              </li>
            </ul>
        </div>
      </div>
  </div>
</div>
 <a herf="javascript:" class="sharpbtn" @click="nowSharp">邀请好友赚现金</a>
</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
    title:"邀请奖励",
    basset:"",
    ranking:1,
    topinviteUser:[
      {backgrounds:"",money:0,name:"",portrait:"",rank:-1,userid:0},
      {backgrounds:"",money:0,name:"",portrait:"",rank:-1,userid:0},
      {backgrounds:"",money:0,name:"",portrait:"",rank:-1,userid:0}
    ]
    }
  },
    methods:{
    nowSharp(){
      this.$share({"title":"8888元投资立白，更有百万体验金等你拿","href":"/invitelink?i="+this.basset.InviteCode})
    },
    tab(index){
      if(this.ranking==index){return}
        this.ranking = index;
        this.gettopinfo()
    },
    gettopinfo(){
      let _this=this
          _this.$http(_this.$api.QueryRewardMoneyRanking({"Type":_this.ranking}))
          .then(function(data){
            _this.topinviteUser = data.data.ResultData.List
            _this.topinviteUser.forEach(function(v,i){
              if(v.portrait!=""){
                _this.topinviteUser[i].backgrounds= 'background:url('+v.portrait+') no-repeat;background-size:100%;'
              }else{
                _this.topinviteUser[i].backgrounds= ''
              }
            })
            console.log(_this.topinviteUser)
         });
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
          _this.gettopinfo()
       });


  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.box_bg{height:7rem;@include bg("/static/img/my/invite/banner.jpg"); overflow:hidden;background-size:100%; position:relative;}
.box_bg .main_box{position:absolute; bottom:0; height:3.5rem;}
.box_bg .main_box .box{width:90%; margin:auto; background-color:#fff;height:3.5rem;border-top-left-radius:rem(8);border-top-right-radius:rem(8);overflow:hidden;}
.box_bg .main_box .box .topmoney{margin-top:rem(10);text-align:center;}
.box_bg .main_box .box .topmoney a{color:#666;}
.box_bg .main_box .box .topmoney span{font-size:0.8rem; color:#de3132;}
.box_bg .main_box .box .flex{display:flex;text-align:center; margin-top:rem(10);}
.box_bg .main_box .box .flex div:nth-child(1){border-right:1px solid #d8d8d8;}
.box_bg .main_box .box .flex a{color:#666;}
.box_bg .main_box .box .flex span{font-size:0.6rem; color:#de3132;}
.yellow_bg{background-color:#ffe7bb; padding:rem(20); box-sizing:border-box; overflow:hidden;}
.yellow_bg .invite_help{ height:rem(50); line-height:rem(50); width:rem(200); text-align:center; color:#fff; background-color:#fe6b3a; display:block; margin:auto; border-radius:rem(30); font-size:0.45rem;}
.yellow_bg .invitecode_box{margin-top:rem(20);}
.yellow_bg .invitecode_box p{ text-align:center;}
.yellow_bg .invitecode_box span.invitecode{ color:#de3132; font-size:0.55rem;}
.yellow_bg .invitecode_box span.codebg{height:rem(30); line-height:rem(30); width:rem(180); text-align:center; color:#fff; background-color:#fe8a5e; display:block; margin:auto; border-radius:rem(30); font-size:0.35rem;}
.yellow_bg .invitecode_box p.text{margin-top:rem(20);color:#666;}
.yellow_bg .invitecode_box p.text span{color:#de3132;}
.top_invite_user_box{border-radius:rem(8);background-color:#ff5b35;padding:rem(10);box-sizing:border-box; margin-top:rem(20);}
.top_invite_user_box .title{color:#fff;font-size:0.5rem;text-align:center;}
.top_invite_user_box .flexone{display:flex;text-align:center; margin-top:rem(10); height:rem(45);line-height:rem(45);background-color:#ffe7bb;border-top-left-radius:rem(8);border-top-right-radius:rem(8);}
.top_invite_user_box .flexone p{height:rem(30); margin-top:rem(8);}
.top_invite_user_box .flexone p a{color:#666;font-size:0.4rem;height:rem(30); display:block;line-height:rem(30)}
.top_invite_user_box .flexone p:nth-child(1){border-right:1px solid #fba484;}
.top_invite_user_box .flexone p a.active{color:#de3132;}
.topinvite_bg{background-color:#fff;padding:rem(10);box-sizing:border-box; overflow:hidden;}
.topinvite_bg .flextwo{display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e1e1e1;padding-bottom:rem(20)}
.topinvite_bg .flextwo .top1{position:relative;}
.topinvite_bg .flextwo .top2{position:relative; margin:0 rem(10);}
.topinvite_bg .flextwo .top3{position:relative;}
.topinvite_bg .flextwo i{width:rem(36);height:rem(24); display:block; margin:auto;}
.topinvite_bg .flextwo .top1 i{@include bg("/static/img/my/invite/nemberone.png");background-size:100%;}
.topinvite_bg .flextwo .top2 i{@include bg("/static/img/my/invite/nembertwo.png");background-size:100%;}
.topinvite_bg .flextwo .top3 i{@include bg("/static/img/my/invite/nemberthree.png");background-size:100%;}
.topinvite_bg .flextwo .photo_bg{position:absolute; top:rem(20);overflow:hidden;}
.topinvite_bg .flextwo .photo_bg span{width:rem(50);height:rem(50);display:block;@include bg("/static/img/my/invite/defaulthead.png");background-size:100%;margin:auto; text-indent:-999rem; border-radius:50%;}
.topinvite_bg .flextwo .name{margin-top:rem(60);text-align:center;font-size:0.4rem;}
.topinvite_bg .flextwo .money{height:rem(30);line-height:rem(30);background-color:#ff5b35;color:#fff;font-size:0.35rem;text-align:center;margin-top:rem(10);border-radius:rem(20);}
.invite_list{height:8rem; overflow-y:auto;}
.invite_list li{border-bottom:1px solid #e1e1e1;display:flex;align-items:center;justify-content:center; padding:rem(5) 0;}
.invite_list li .inivte_id{width:rem(20);text-align:center;height:rem(40); line-height:rem(40); font-size:0.4rem; padding-left:rem(5)}
.invite_list li .inivte_photo{margin:0 rem(20); width:rem(40);}
.invite_list li .inivte_photo span{width:rem(40);height:rem(40);@include bg("/static/img/my/invite/defaulthead.png");background-size:100%;display:block;border-radius:50%;}
.invite_list li .inivte_money{text-align:right;color:#de3132;font-size:0.4rem;}
.sharpbtn{@include widthHeight(100%,rem(50)); display:block; overflow: hidden; background-color:#de3031; color:#fff; font-size:0.45rem;text-align:center;line-height:rem(50);}


</style>
