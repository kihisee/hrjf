<template>
<div id="frame">
 <heads :title="title"></heads>

  <div class="contentdiv">

    <div class="contentdetail">
      <p class="detailleft"></p>
      <ul class="detailright">
        <li v-for="item in listdata">
          <p class="circle"></p>
          <div class="word">{{item.Content}}<p class="day">{{item.MsgTime}}</p></div>
        </li>
      </ul>
    </div>



  </div>

</div>
</template>

<script>
import heads from '../../components/head'
export default {
  data () {
    return {
      title: '订单跟踪',
      state:this.$store.state,
      listdata:[],
    }
  },
  methods:{

  },
  components:{

  },
  created:function(){
     let _this =this
    let query = this.$route.query
    let id=query.id

    this.$http(this.$api.OrderTrack({"id":id}))
    .then((data) => {
          console.log(data)
          _this.listdata=data.data.ResultData
          _this.listdata=_this.listdata.reverse()
    })
  },
    components:{
    heads,
  }
}
</script>

<style lang="scss" scoped>
.contentdiv{width:95%;margin:rem(0) auto;overflow:auto;}
.contentdiv .contentdetail{overflow:auto;position: relative;}
.contentdiv .detailleft{width:rem(1);height:100%;background:#ccc;position: absolute;top:rem(20);left:rem(15)}
.contentdiv .detailright{float:right;width:90%;margin:rem(10) 0}
.contentdiv .detailright li{position: relative;color:#999;margin:rem(10) 0;}
.contentdiv .detailright li .circle{width:rem(20);height:rem(20);position:absolute;top:0;left:rem(-33);border-radius: rem(20);background:#ccc;}
.contentdiv .detailright li .word{font-size:rem(16)}
.contentdiv .detailright li .word p{font-size:rem(12)}
.contentdiv .detailright li:first-child .word{color:#333;font-size:rem(16)}
.contentdiv .detailright li:first-child .word p{color:#333;font-size:rem(12)}
.contentdiv .detailright li:first-child .circle{background:url(../../../static/img/pointstore/wuliu.png) no-repeat center top;background-size:100%;}
</style>
