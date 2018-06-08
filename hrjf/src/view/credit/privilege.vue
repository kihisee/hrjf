<template>
   <div id="frame">
    <heads :title="title" v-if="isapp"></heads>
    <div id="con">


<div class="whitebox">
        <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">专享特权</p>
          <span class="huaright"></span>
        </div>

        <ul class="detailul">
            <li v-for="item in Privilege">
              <div class="ullitop">
                <div class="leftpic"><img src="../../../static/img/insurance/qiantou.png" /></div>
                <div class="titleright">{{item.name}}</div>
              </div>
              <div class="pidetail">{{item.desc}}</div>
            </li>
        </ul>
    </div>


    </div>
  </div>
 </div>

</template>

<script>
import globlenav from '../../components/nav';
import heads from '../../components/head';
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      title: '特权详情',
      GetCreditcard:[],
      Privilege:[],
       isapp:false,
    }
  },
  methods:{
    getInviteCode(){
          let _this = this
          let query = this.$route.query
          if(typeof this.$store.state.user ==="undefined"||!this.$lg.isapp()||typeof query.type==="undefined"){
              _this.$share({},false)
              return
          }
          this.$http(this.$api.getQueryInviteTotal({}))
          .then(function(data){
            _this.share(data.data.ResultData.InviteCode)
         });
      },


      share(InviteCode){
        let _this = this
        let query = this.$route.query
        let obj,subobj
        if(query.type==1){
          obj = this.$api.getbanner({})
          subobj = 1
        }else if(query.type==2){
          obj = this.$api.NoticeAndActivity({})
          subobj = 2
        }else{
          return
        }
        this.$http(obj)
        .then((data) => {
          let dataobj
          if(subobj==1){
              dataobj = data.data.ResultData.List
          }else if(subobj==2){
              dataobj = data.data.ResultData.Activity
          }
           dataobj.forEach(function(v){
              if(query.inviteTitle==v.Title){
                var url = v.InviteUrl;
        　　　　var arrUrl = url.split("//");
        　　　　var start = arrUrl[1].indexOf("/");
        　　　　var relUrl = arrUrl[1].substring(start);
                _this.$share({"title":v.InviteTitle,"href":relUrl+'?i='+InviteCode},false)
              }
           })
        });

      }

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    _this.isapp=_this.$lg.isapp()
     _this.isapp=query.isapp
    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }

    this.$http(this.$api.GetCreditcardAds({}))
    .then((data) => {
         _this.bannerList=data.data.ResultData
    })

    this.$http(this.$api.GetCreditcard({"CardId":query.Id}))
    .then((data) => {
      console.log(data)
      _this.GetCreditcard=data.data.ResultData.card
      let ss=new Array();
      ss =JSON.parse(data.data.ResultData.card.Privilege)

     _this.Privilege=ss

     console.log(_this.Privilege)

     this.getInviteCode();

    })

  },
  components:{
    globlenav,
    heads,
    loadapp,
  }
}
</script>
<style lang="scss" scoped>
.whitebox{background:#fff;overflow:auto;margin:0 0 rem(10);padding:rem(10) 0;}
.toplist{width:rem(115);margin:0 auto rem(10);height:rem(30);text-align:center;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;background-size:40%;}
.toplist .midlleword{width:rem(75);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;background-size:40%;}

.detailul{width:90%;margin:0 auto;}
.detailul li .ullitop{line-height:rem(30);overflow:auto;}
.detailul li .ullitop .leftpic{width:rem(20);height:rem(20);float:left;background:none;margin-right:rem(10);margin-top:rem(5)}
.detailul li .ullitop .titleright{float:left;width:rem(300);font-size:rem(16);}
.detailul li .pidetail{line-height: rem(25);font-size:rem(14);color:#999999;margin:rem(5) 0;}
</style>

