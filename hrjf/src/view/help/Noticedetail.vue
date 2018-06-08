<template>
  <div class="container">
    <heads :title="title" ></heads>
    <div class="newsdatil_box">
      <div class="title">{{Noticelist.Title}}</div>
      <div class="newsinfo"><p><span class="day">{{Noticelist.PublishTime}}</span></p></div>
      <div class="newscontent" v-html="Noticelist.Content"></div>
    </div>

</div>
</template>

<script>
import heads from '../../components/head';

export default {
  data () {
    return {
      title:'公告详情',
      newsdetail:"",
      showborder:false,
      Noticelist:{},
    }
  },
  methods:{
    getdata(){
      let _this = this
      let q = this.$route.query
      console.log(q)
      this.$http(this.$api.NoticeAndActivity({}))
      .then((data) => {
        console.log(data)

        _this.Noticelist=data.data.ResultData.Notice[q.id]
        console.log(_this.Noticelist)
      });
    }
  },
  mounted : function() {
      let _this = this;


  },
  created:function(){
      this.getdata()
  },
  components:{
    heads
  }
}
</script>
<style>
  .newscontent p{font-size:0.4rem!important;margin-top:0.25rem!important;}
  .newscontent img{width:100%!important;height:auto!important;}
</style>
<style lang="scss" scoped>
.newsdatil_box{
    padding:rem(20);
    box-sizing:border-box;
    background:$white;
    overflow:hidden;
    .title{
      font-size:0.45rem;
      font-weight:bold;
    }
    .newsinfo{
        p{
          margin-top:rem(20);
          .type{
            color:#f00;
            border-radius:rem(3);
            border:1px solid #f00;
            padding:0 rem(5);
          }
          .day{
            color:#b6b4b5;
            display:inline-block;
            width:auto;
            font-size:0.4rem;
          }
        }
    }
    .newscontent{
      margin-top:rem(20);
    }
}

</style>

