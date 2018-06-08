<template>
<div class="container">
 <heads :title="title" href="/my"></heads>
 <div class="xxiacon">
    <div class="xxtain">
        <div class="xxtainnei">
            <dl>
                <dt></dt>
                <dd>第一步：</dd>
                <dd>用户自行线下转账</dd>
            </dl>

            <div class="conbot">
                <div class="topbig">线下收款账号信息如下：</div>
                <p>收款账户名称： 湖南金洋信息技术有限公司</p>
                <p>银行卡号：1910213309100021775</p>
                <p>开户银行：中国工商银行</p>
                <p>所属支行：永州电力支行</p>
            </div>
        </div>
    </div>
    <div class="xxtain">
        <div class="xxtainnei">
            <dl>
                <dt></dt>
                <dd>第二步：</dd>
                <dd>打款后保留转账凭条联系客服</dd>
            </dl>
            <div class="conmid">
                <p>客服电话</p>
                <p><a tel="4008760616">400-876-0616</a></p>
            </div>

            <p class="botpxx" style="text-align: center; color: #de3031; line-height: 40px; ">客服服务时间:9:00-17:30</p>
        </div>
    </div>
    <div class="xxtain">
        <div class="xxtainnei">
            <dl>
                <dt></dt>
                <dd>第三步：</dd>
                <dd>核对完成后，客服往用户账号充值</dd>
            </dl>
        </div>
    </div>
    <!-- <p style="text-align:center;color:#ff0000;margin-top:150px; font-size:14px;">线下转账通道暂时关闭，开放时间敬请留意！</p> -->
</div>
</div>
</template>

<script>
import heads from '../../components/head'

export default {
  data () {
    return {
    title:"线下转账",

    }
  },
    methods:{

  },
  created :function(){
    let _this=this
    let q = this.$route.query

  },
  components:{
    heads
  }
}
</script>

<style lang="scss" scoped>
.xxiacon .xxtain {background: #fff;margin: 10px auto;}
.xxiacon .xxtain:last-child{margin-bottom:50px;}
.xxiacon .xxtain .xxtainnei{width:85%;margin:0 auto;padding:40px 0;}
.xxiacon .xxtain .xxtainnei dl{height:90px;}
.xxiacon .xxtain .xxtainnei dl dt {width: 60px;height: 90px;background: url(/static/img/my/firstone.png) no-repeat left top;background-size:100%;float:left;}
.xxiacon .xxtain:nth-child(2) .xxtainnei dl dt {background: url(/static/img/my/scotwo.png) no-repeat left top;background-size:100%;float:left;}
.xxiacon .xxtain:nth-child(3) .xxtainnei dl dt {background: url(/static/img/my/thirth.png) no-repeat left top;background-size:100%;float:left;}
.xxiacon .xxtain .xxtainnei dl dd:nth-child(2){padding-top:10px;}
.xxiacon .xxtain .xxtainnei dl dd {color:#de3031;font-size:16px;line-height:38px;text-indent:15px;font-weight:bold;}
.xxiacon .xxtain .xxtainnei dl dd:nth-child(3) {text-indent:-15px;}
.xxiacon .xxtain .xxtainnei .conbot{border:2px solid #de3031;border-radius:10px;font-size:12px;padding-bottom:15px;margin-top:15px;}
.xxiacon .xxtain .xxtainnei .conbot div,.xxiacon .xxtain .xxtainnei .conbot p{width:90%;margin:0 auto;}
.xxiacon .xxtain .xxtainnei .conbot .topbig{height:40px;line-height:40px;background:url(/static/img/my/koukuang.png) no-repeat left center;text-indent:40px;background-size:12%;padding:10px 0;color:#de3031;font-size:16px;}
.xxiacon .xxtain .xxtainnei .conbot p{line-height:25px;height:25px;color:#666;}

.xxiacon .xxtain .xxtainnei .conmid{border-top:2px solid #de3031;border-bottom:2px solid #de3031;padding:5px 0;}
.xxiacon .xxtain .xxtainnei .conmid p{text-align:center;line-height:35px;font-size:16px;color:#666;}
.xxiacon .xxtain .xxtainnei .conmid p:nth-child(1){background:url(/static/img/my/phoned.png) no-repeat left center;width:100px;margin:0 auto;background-size:18%;text-align:left;text-indent:25px;}



</style>
