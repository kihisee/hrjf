<template>
<div class="container">
    <heads :title="title"></heads>
    <div class="success_box">
      <div class="icon"></div>
      <div class="successtext">提交成功，等待审核</div>
      <router-link :to="'/tradelist'">查看充值状态</router-link>
      <router-link :to="'/tender'">去投资</router-link>
      <router-link :to="'/my'">关闭</router-link>
    </div>

</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"充值成功",

    }
  },
   methods:{

  },
  created:function(){
    let _this = this

  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.success_box{padding:rem(20); box-sizing:border-box; overflow:hidden;}
.success_box .icon{width:rem(80);height:rem(80);@include bg("/static/img/my/icon_complected.png");  margin:auto;}
.successtext{font-size:0.4rem; text-align:center; margin:rem(20) 0;}
.success_box a{width:90%; margin:auto; margin-top:rem(20); display:block; height:rem(40); line-height:rem(40); text-align:center; color:#fff; background-color:#de3132;}
// .invite_box_bg{background:-webkit-linear-gradient(#ffab5b, #d43223); overflow:hidden; padding-bottom:rem(30); border-bottom:rem(10) solid #b32012;}
// .lizi{margin-top:rem(10);margin-left:rem(20); width:rem(130);height:rem(30); line-height:rem(30);background:#fbda66; text-align:center; color:#de3031;font-size:0.4rem; border-radius:rem(5);}
// .hongbao_bg{@include bg("/static/img/my/invite_hb_bg.png"); width:90%; margin:auto; height:rem(420); margin-top:rem(20);overflow:hidden;}
// .hongbao_bg .text{ text-align:center;width:rem(305);margin-top:rem(50); font-size:0.4rem;margin-left:rem(25);}
// .hongbao_bg .text:nth-child(2){margin-top:rem(20);}
// .hongbao_bg .text span{color:#f00;}
// .hongbao_bg .f45{font-size:0.45rem; font-weight:bold;}
// .hongbao_bg .inputbox{margin-top:rem(150);width:rem(330);margin-left:rem(10);}
// .hongbao_bg .inputbox .w80{width:80%; margin:auto; overflow:hidden; position:relative;}
// .hongbao_bg .inputbox .w80 .yuan{position:absolute;top:rem(10);right:rem(10);width:auto; font-size:0.4rem;}
// .hongbao_bg .inputbox input{ width:100%; height:rem(30); padding:rem(20); box-sizing:border-box; border:0; border-radius:rem(5); font-size:0.4rem;}

// .investday_box{margin-top:rem(20);overflow:hidden; position: relative; height:rem(80);}
// .investday_box p{background:#ffbf5b; height:rem(10); margin-top:rem(10);border-radius:rem(5);}
// .investday_box ul{display:flex;position: absolute; top:0;left:0;justify-content:space-between;}
// .investday_box ul li{width:rem(30);}
// .investday_box ul li a i{@include bg("/static/img/my/invite_btn_sl.png"); width:rem(30); height:rem(30); display:block;text-align:justify}
// .investday_box ul li a{display:block;}
// .investday_box ul li a.active i{@include bg("/static/img/my/invite_btn_sl_ac.png"); }
// .investday_box .textday{margin-top:rem(20);display:flex;justify-content:space-between;text-align:center;}
// .investday_box .textday span{text-align:left;width:1.1rem;color:#fff;}
// .investday_box .textday span:nth-child(3),.investday_box .textday span:nth-child(4){text-align:right;}
// .textbox{ width:85%; margin:auto; margin-top:rem(20); font-size:0.4rem; color:#fff;}
// .textbox p{margin-top:rem(10);}
// .subimg{background:#d43223;overflow:hidden; padding-bottom:rem(30);border-top:rem(3) solid #f45243;}
// .subimg .imgbox{background:#b32d21;border-radius:rem(10);  width:90%;margin:auto;margin-top:rem(20); overflow:hidden; padding:0 rem(20);box-sizing:border-box;}
// .subimg .imgbox .title{font-size:0.6rem; margin-top:rem(10); color:#fff; padding-left:rem(10);}
// .subimg .imgbox .title i{font-size:1.2rem; color:#d53223; font-weight:bold; padding-right:rem(15); vertical-align:middle;}
// .subimg .imgbox .imgtext{color:#fff; font-size:0.4;}
// .subimg .imgbox .img{margin-top:rem(20);margin-bottom:rem(20);}
// .share_box{background:-webkit-linear-gradient(#fceb80, #f6cd46); height:rem(50);width:90%;margin:auto;margin-top:rem(20); overflow:hidden;}
// .share_box a{display:block; line-height:rem(50); text-align:center; color:#f61515; font-size:0.45rem;}
// .logo{text-align:center; margin-top:rem(20);}
// .logo img{width:4.5rem;}
</style>