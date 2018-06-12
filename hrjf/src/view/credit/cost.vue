<template>


    <div id="con" class="container">
    <heads :title="title" v-if="isapp"></heads>

<div class="whitebox">
        <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">费用</p>
          <span class="huaright"></span>
        </div>

        <ul class="detailul">
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">年费</div>
              </div>
              <div class="pidetail">{{GetCreditcard.AnnualFeeTypeStr}}</div>
            </li>
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">取现费用</div>
              </div>
              <div class="pidetail">{{GetCreditcard.WithdrawalCash}}</div>
            </li>
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">最低还款</div>
              </div>
              <div class="pidetail">{{GetCreditcard.MinimumRepayment}}</div>
            </li>
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">违约金</div>
              </div>
              <div class="pidetail">{{GetCreditcard.LiquidatedDamages}}</div>
            </li><li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">超限费</div>
              </div>
              <div class="pidetail">{{GetCreditcard.OverperiodFee}}</div>
            </li>
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">溢缴费</div>
              </div>
              <div class="pidetail">{{GetCreditcard.OverflowPayment}}</div>
            </li>
            <li>
              <div class="ullitop">
                <div class="leftpic"></div>
                <div class="titleright">分期费用</div>
              </div>
              <div class="pidetail">
                <ul class="fenqi">
                  <li>
                    <p>3期</p>
                    <p>6期</p>
                    <p>9期</p>
                  </li>
                  <li>
                    <p>{{GetCreditcard.Installment3}}</p>
                    <p>{{GetCreditcard.Installment6}}</p>
                    <p>{{GetCreditcard.Installment9}}</p>
                  </li>
                  <li>
                    <p>12期</p>
                    <p>18期</p>
                    <p>24期</p>
                  </li>
                  <li>
                    <p>{{GetCreditcard.Installment12}}</p>
                    <p>{{GetCreditcard.Installment18}}</p>
                    <p>{{GetCreditcard.Installment24}}</p>
                  </li>
                </ul>
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
      title: '费用详情',
      GetCreditcard:[],
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

      },

  },
  created:function(){
    let _this =this

    let query = this.$route.query
    _this.isapp=_this.$lg.isapp()
    this.getInviteCode();
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
.whitebox{background:#fff;overflow:auto;margin:0 0 rem(10);padding:rem(10) 0 rem(0);}
.toplist{width:rem(105);margin:0 auto rem(10);height:rem(30);text-align:center;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;background-size:40%;}
.toplist .midlleword{width:rem(65);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;background-size:40%;}

.detailul{width:90%;margin:0 auto;}
.detailul li{margin:0 0 rem(20);}
.detailul li .ullitop{line-height:rem(30);overflow:auto;}
.detailul li .ullitop .leftpic{width:rem(30);height:rem(30);float:left;background:#eee;margin-right:rem(10)}
.detailul li:nth-child(1) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc01.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(2) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc02.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(3) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc03.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(4) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc04.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(5) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc05.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(6) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc06.png) no-repeat center center;background-size:60%;}
.detailul li:nth-child(7) .ullitop .leftpic{background:url(../../../static/img/insurance/iconc07.png) no-repeat center center;background-size:60%;}
.detailul li .ullitop .titleright{float:left;width:rem(300);font-size:rem(16);}
.detailul li .pidetail{line-height: rem(25);font-size:rem(14);color:#999999;margin:rem(5) 0;}

.fenqi{border-top:rem(1) solid #ddd;border-left:rem(1) solid #ddd;overflow:auto;}
.fenqi li p{width:33%;border-right:rem(1) solid #ddd;border-bottom:rem(1) solid #ddd;float:left;text-align:center;}
.fenqi li:nth-child(2n+1) p{color:#666666;}
.container{height:100%;background:#fff;}
</style>

