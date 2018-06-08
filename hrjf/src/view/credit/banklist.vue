<template>
   <div id="frame">
    <heads :title="title" v-if="isapp"></heads>
    <div id="con">





  <div class="listdetail">
      <ul>
          <li v-for="item in GetCreditcardList" @click="gotodetail(item.Id)">
            <div class="grayleft"><img :src="item.CardImg" v-if="item.CardImg"/><img src="../../../static/img/insurance/noneimg.png" v-else></div>
            <div class="grayleftright">
              <p class="topbold">{{item.CardName}}</p>
              <p class="botlight">{{item.Description}}</p>
               <dl>
                <dt>{{item.Grade}}</dt>
                <dd>{{item.AnnualFeeTypeStr}}</dd>
                <!-- <dd>{{item.Currency.replace(/;$/gi,"").replace(/;+/g, "+")}}</dd> -->
              </dl>
            </div>

          </li>
      </ul>
  </div>
  </div>
 </div>

</template>

<script>
import globlenav from '../../components/nav';
import heads from '../../components/head'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      title: '银行卡列表',


      toplist:[],

      check:false,
      check:true,
      scheck:"查看更多",

       banklist:[],

      GetCreditcardList:[],
      basset:"",
      isapp:true,
      IUserId:'',
    }
  },
  methods:{
    gotodetail(Id){
      let _this=this
      _this.$router.push('/creditdetail?Id='+Id+"&i="+_this.IUserId+"&isapp="+_this.isapp)
    },

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

        var url = window.location.href;

        if(_this.$store.state.user != null){
        _this.$http(_this.$api.QueryInviteRewadIndex({}))
          .then(function(data){
            _this.basset=data.data.ResultData
            url=url+"&i="+_this.basset.inviteToken
         });
      }


　　　　var arrUrl = url.split("//");
　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);
                _this.$share({"title":v.InviteTitle,"href":relUrl},false)

      },

  },
  created:function(){
    let _this =this

    let query = this.$route.query

    if(query.i != "underfine"){
      _this.IUserId=query.i
    }

    _this.isapp=query.isapp
    if(_this.isapp=="false"){
        _this.isapp=false
      }else{
        _this.isapp=true
      }

    if(_this.$store.state.user != null){
      _this.$http(_this.$api.QueryInviteRewadIndex({}))
          .then(function(data){
            console.log(data)
            _this.basset=data.data.ResultData
            _this.IUserId=_this.basset.inviteToken
         });

    }


     this.$http(this.$api.GetCreditcardList({"IsRecommend":query.IsRecommend,"ClassificationId":query.ClassificationId,"BankId":query.BankId}))
    .then((data) => {
         console.log(data)
         _this.GetCreditcardList=data.data.ResultData.List
    })
     this.getInviteCode();

  },
  components:{
    globlenav,
    heads,
    loadapp,
  }
}
</script>
<style lang="scss" scoped>
.content{width:90%;margin: rem(15) auto;font-size:rem(16);color:#666;}
.listdetail{width:100%;}
.listdetail ul{}
.listdetail ul li{background:#fff;overflow:auto;margin:rem(10) 0;}
.listdetail ul li .grayleft{margin:rem(10) 0 rem(10) rem(10) ;float:left;border-radius:rem(5);width:25%;height:rem(70);background:none;}
.listdetail ul li .grayleftright{margin:rem(10) 0;width:71%;float:right;line-height:rem(25);height:rem(80)}
.listdetail ul li .grayleftright .topbold{color:#333333;font-size:rem(16);padding-top:rem(5)}
.listdetail ul li .grayleftright .botlight{color:#999;font-size:rem(14);line-height:rem(20);height:rem(20);overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
.listdetail ul li .grayleftright dl{height:rem(25);line-height:rem(25);text-align:center;}
.listdetail ul li .grayleftright dl dt{width:auto;float:left;border-radius:rem(3);background:#dcf7ff;color:#19b9e7;padding:rem(0) rem(1);}
.listdetail ul li .grayleftright dl dd{width:auto;padding:rem(0) rem(1);float:left;margin:0 rem(2);border-radius:rem(3);}
.listdetail ul li .grayleftright dl dd:nth-child(2){background:#e1fbf2;color:#57c89f;}
.listdetail ul li .grayleftright dl dd:nth-child(3){background:#fff3eb;color:#ff7843;}

.checkmore{color:#3ea4f3;position: relative;clear:both;line-height:rem(50);text-align:center;font-size:rem(16)}
.shouqi{color:#3ea4f3;position: relative;clear:both;line-height:rem(50);text-align:center;font-size:rem(16)}
.shouqi:after{
  border: rem(10) solid transparent;
  border-bottom: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(12);
  right: rem(130);
  content: ' ';
}
.shouqi:before{
  border: rem(10) solid transparent;
  border-bottom: rem(10) solid #999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(11);
  content: ' ';
  border-bottom-color: #999999;
  right: rem(130);
}

.checkmore:after{
  border: rem(10) solid transparent;
  border-top: rem(10) solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(20);
  right: rem(130);
  content: ' ';
}
.checkmore:before{
  border: rem(10) solid transparent;
  border-top: rem(10) solid #999999;
  width: 0;
  height: 0;
  position: absolute;
  top: rem(21);
  content: ' ';
  border-top-color: #999999;
  right: rem(130);
}
</style>

