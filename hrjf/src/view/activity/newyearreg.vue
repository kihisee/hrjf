<template>
   <div class="container">
    <div class="kmh">
      <div class="banner"><img src="/static/img/activity/kmh/kmh_banner.jpg"></div>
      <div class="nyrule">
            <p> 1、2018年3月1日前注册的用户，将收到平台赠送的6个红包，每个红包金额不同，投资相应金额后可激活并领取红包，领取后可在账户余额中查看。</p>
            <p> 2、每次投资只能激活一个红包，每个红包只能激活一次，并在一个月内领取。</p>
            <p>3、红包激活条件</p>
            <p style="text-indent:1.5em">注：红包详情页面信息可能有误，红包激活条件以该表格为准</p>
            <p>
              <table>
                <tbody>
                  <tr>
                    <td>红包金额</td>
                    <td>需投资金额</td>
                    <td>投资期限</td>
                  </tr>
                  <tr>
                    <td>50</td>
                    <td>10000-49999</td>
                    <td>6个月</td>
                  </tr>
                  <tr>
                    <td>250</td>
                    <td>50000-99999</td>
                    <td>6个月</td>
                  </tr>
                  <tr>
                    <td>500</td>
                    <td>100000及以上</td>
                    <td>6个月</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>10000-49999</td>
                    <td>12个月</td>
                  </tr>
                  <tr>
                    <td>500</td>
                    <td>50000-99999</td>
                    <td>12个月</td>
                  </tr>
                  <tr>
                    <td>1000</td>
                    <td>100000及以上</td>
                    <td>12个月</td>
                  </tr>
                </tbody>
              </table>
            </p>
            <p>4、红包的激活时间为本活动有效期，过期则激活失效。</p>
            <p>5、红包领取的最晚时间为激活后的一个月内；激活但未领取的，视作自动放弃，红包失效。</p>
            <p>6、本次活动最终解释权归恒瑞金服所有。</p>
        </div>
    </div>

  </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
      title:'开年红',

    }
  },
  methods:{

  },


created:function(){


},


  beforeDestory() {

  },
}
</script>


<style lang="scss" scoped>
.container{min-height:100%;}
.kmh{height:100%;background: url(/static/img/activity/kmh/kmh_bg.jpg) repeat-y center; width:100%;background-size: 100%;}

.kmh .nyrule{width:80%;margin:auto;color:#fff8ce;font-size:0.4rem;text-align: left; padding-bottom:rem(30)}
.kmh .nyrule p{margin-top:rem(10)}
table{border:1px solid #fff8ce;width:100%;border-collapse: collapse}
table td{border:1px solid #fff8ce;text-align:center;}
</style>