<template>
<div id="frame">
  <div class="link_head">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>

  <div class="contentdiv">
      <ul class="contul" v-if="!isZero">
        <li v-for="item in detaillist">
          <div class="linei" >
            <p class="date">{{item.CreateTime}}</p>
            <p class="cont">{{item.Name}}</p>
          </div>
        </li>
      </ul>
      <div class="zero" v-else>
            您没有任何获得礼包
      </div>
  </div>

</div>
</template>

<script>
export default {
  data () {
    return {
      title: '领取记录',
      state:this.$store.state,
      detaillist:[],

      isZero:false,
    }
  },
  methods:{

  },
  components:{

  },
  created:function(){
     let _this =this

    let query = this.$route.query


  this.$http(this.$api.GiftBagRecord({Page:1,PageSize:100}))
      .then((data) => {

         _this.detaillist=data.data.ResultData.List

         if(_this.detaillist.length==0){
          _this.isZero=true
          }else{
           _this.isZero=false
          }
  });




  },
}
</script>

<style lang="scss" scoped>
body{background:#fff;}
.contentdiv{}
.contentdiv .contul{}
.contentdiv .contul li{height:rem(40);line-height:rem(40);}
.contentdiv .contul li:nth-child(2n){background:#fff;}
.contentdiv .contul li:nth-child(2n+1){background:#fff2f2;}
.contentdiv .contul li .linei{width:90%;margin:0 auto;text-align: left;color:#334455;font-size:rem(14)}
.contentdiv .contul li .linei .date{width:25%;float:left;}
.contentdiv .contul li .linei .cont{width:75%;float:left;}
.contentdiv .zero{font-size:rem(16);color:#aaa;text-align:center;padding-top:rem(300);background:url(../../../static/img/pointstore/box.png) no-repeat center center;background-size:55%;}

</style>
