<template>
<div v-if="sharpshow">
  <div class="mask"  @click="cancel"></div>
  <div class="bttom_bg" v-if="iconshow">
      <div class="icon_box">
        <div class="wxhy"><a href="javascript:" @click="sharp('wxhy')"><i></i><p>微信好友</p></a></div>
        <div class="wxpyq"><a href="javascript:" @click="sharp('wxpyq')"><i></i><p>微信朋友圈</p></a></div>
        <div class="sina"><a href="javascript:" @click="sharp('sina')"><i></i><p>新浪微博</p></a></div>
        <div class="erweima"><a href="javascript:" @click="sharp('erweima')"><i></i><p>二维码</p></a></div>
      </div>
      <div class="btn"><a href="javascript:" @click="cancel">取消</a></div>
  </div>
  <div class="sharpicon" v-if="sharpNow"  @click="cancel">
    <div class="iconpc"></div>
  </div>
</div>
</template>

<script>
import router from '../router'
export default {

  data () {
    return {
      sharpshow:true,
      isweix:false,
      iconshow:true,
      sharpNow:false,
      inviteCode:""
    }
  },
    methods:{
      isweixfn(){
        this.isweix = true
        // var ua = window.navigator.userAgent.toLowerCase();
        // if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        //   this.isweix = true
        // }else{
        //   this.isweix = false
        // }
      },
      sharp(type){
        if(type=="wxhy"||type=="wxpyq"){
            if(this.isweix == true){
              this.iconshow = false
              this.sharpNow = true
            }else{
              this.$msg.alert("请在微信中打开")
            }
        }

        if(type=="sina"){
           window.location.href = 'http://v.t.sina.com.cn/share/share.php?title=国内领先互联网理财平台，躺着也能赚钱的平台'+this.inviteCode
        }
        if(type=="erweima"){
          this.sharpshow = false
          router.push('/myerweima')
        }
      },
      cancel(){
        this.sharpshow = false
        this.isweixfn()
        this.iconshow =true
        this.sharpNow =false
      }
    },
    created :function(){
      let _this = this
    this.isweixfn()
    this.$http(this.$api.getqueryinviterewardasset({}))
        .then((data) => {
          console.log(data.data.ResultData)
          _this.inviteCode = data.data.ResultData.InviteAddress
        })
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
