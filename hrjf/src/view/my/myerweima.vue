<template>
<div class="container">
 <heads :title="title"></heads>
 <div id="qrcode" class="qrcode"></div>
<div class="erweima_text">分享二维码，邀请好友投资赚取奖励</div>
<div class="erweima_btn"><a href="javascript:">长按二维码保存到相册</a></div>
</div>
</template>

<script>
import heads from '../../components/head'
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
    title:"我的二维码",
    inviteCode:""
    }
  },
  methods:{
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200,
        text: this.inviteCode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
    }
  },
  created :function(){
    let _this=this
    this.$http(this.$api.getqueryinviterewardasset({}))
        .then((data) => {
          console.log(data.data)
          _this.inviteCode = data.data.ResultData.InviteAddress
          _this.qrcode()
        })
  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.qrcode{width:50%; margin:auto; margin-top:rem(50);}
.erweima_text {text-align:center; margin-top:rem(30);}
.erweima_btn{width:90%;margin:auto; margin-top:rem(30)}
  .erweima_btn a{display:block; background:#de3132;border-radius:rem(5);color:#fff; text-align:center; height:rem(35);line-height:rem(35)}
</style>
