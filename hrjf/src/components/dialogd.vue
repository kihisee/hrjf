<template>

<div class="tanword" style="background:#fff;position:fixed;top:45%;left:50%;margin:-3.75rem 0 0 -4.5rem;width:9rem;z-index:10;border-radius: 0.125rem;" >

      <div class="risktop">

          <p style="text-indent:0em;">尊敬的用户:</p>

          <p>为确保您全面知晓自己的风险承受能力，进一步增加恒瑞金服对您投资需求的了解，提升您的投资体验，请您抽出宝贵的时间完成以下测评问卷的填写。</p>

          <p>恒瑞金服在此承诺:对于您在本问卷中提供的一切信息，本公司将严格按照法律法规要求承担保密义务。</p>

      </div>

      <div class="adiv">
        <a class="xtop" @click="guanx()" style="width:45%">继续投资</a>
        <a class="inright" v-on:click="intrued()" style="display:inline-block;float:right;margin:0;width:45%;">开始评测</a>
      </div>

      <p style=" ine-height:0.75rem;color:#999;font-size:0.35rem;margin:0.25rem auto;width:95%;"><input type="checkbox" id="tongyi" v-model="tongyi" /><label for="tongyi">同意平台收集并使用您的信息用于风险评测</label></p>
       <!-- <p style="line-height:0.75rem;color:#999;font-size:0.35rem;margin:0.25rem auto;width:95%;"><input type="checkbox" id="buzai" v-model="checkedin" /><label for="buzai">不再提示，您也可以通过" 我的账户 "完成评测</label></p> -->
</div>

</template>

<script>
  export default {
  data () {
    return {
      checkbox:'checked',
      getfin:false,
      checkedin:false,
      tongyi:true
    }
  },
    props: {
       /*投资详情页投资详情*/
      CouponMoney:0,
      GoodsStatus:0,
      TenderCouponId:0,
      id:0,
      money:0,
      tenderid:0,
    },
    methods:{
       intrued(){
        let _this=this;

        if(_this.tongyi){
          _this.title="调查问卷"
          _this.$router.push('/risk?from=tender&'+'&CouponMoney='+_this.CouponMoney+'&GoodsStatus='+_this.GoodsStatus+'&TenderCouponId='+_this.TenderCouponId+'&id='+_this.id+'&money='+_this.money+'&tenderid='+_this.tenderid)
        }else{
           _this.$msg.alert("请先同意平台收集并使用您的信息用于风险评测")
        }


      },
      guanx(){
        let _this=this
        this.$emit("getfin",_this.getfin)
        if(_this.checkedin){
                 this.$http(this.$api.riskfinal({"preference_type":0}))
                  .then((data)=>{
                   console.log(data);
                    console.log(1)
                  })
        }else{
            console.log(2)
        }
      }
    },

}
</script>

<style lang="scss" scoped>
.tanword{text-align: left;}
.tanword .risktop{width:95%;margin:0.25rem auto 0;background:#fff;border-radius: 0.125rem;font-size: 0.4rem;padding: 0.25rem 0 0;}
.tanword .risktop p{width:95%;margin:0 auto;color:#333;padding:0.1rem 0;font-size: 0.35rem;text-align: left;text-indent: 2em;}
.tanword .inright{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#de3132;border-radius: 5px;margin:0.25rem auto;display:block;color:#fff;font-size: 0.4rem;}
.tanword .xtop{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#de3132;border-radius: 5px;color:#fff;font-size: 0.4rem;display:inline-block;float:left;}
.tanword .che{width:95%;margin:0.25rem auto;font-size: 0.36rem;padding-bottom: 0.25rem;color:#999;}
.adiv{width:80%;margin:0 auto;height:1rem;}
</style>