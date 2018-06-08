<template>
  <div class="container">
    <heads :title="title" ></heads>
    <div class="newsdatil_box">
      <div class="newscontent"  v-for="(item,index) in Noticelist" @click="hitcontent(index)">
          <div class="listtop">
            <p class="listtitle">{{item.Title}}</p>
            <p class="listdate">{{item.PublishTime}}</p>
          </div>
          <div class="listbot">
              查看详情
              <span> > </span>
          </div>
      </div>
    </div>

</div>
</template>

<script>
import heads from '../../components/head';

export default {
  data () {
    return {
      title:'公告',
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

        _this.Noticelist=data.data.ResultData.Notice
        console.log(_this.Noticelist)
      });
    },
    hitcontent(index){
      this.$router.push('Noticedetail?id='+index)
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
</style>
<style lang="scss" scoped>
.newsdatil_box{
    box-sizing:border-box;
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
            margin-left:rem(20);
            font-size:0.4rem;
          }
        }
    }
    .newscontent{
      margin:rem(10) auto;
      background:#fff;
      .listtop{
        width:95%;
        margin:0 auto;
        border-bottom:rem(1) solid #eee;
        padding:rem(5) 0;
        .listtitle{color:#000;font-size:rem(16);line-height: rem(30)}
        .listdate{color:#999;font-size:rem(12);}
      }
      .listbot{
        width:95%;
        margin:0 auto;
        line-height: rem(30);
        color:#aaa;
        p{float:left;width:60%;}
        span{
          display:inline-block;float:right;font-size:rem(22);width:10%;text-align:right;color:#ccc;
        }
      }
    }
}

</style>

