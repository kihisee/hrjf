<template>
<div id="frame">
 <heads :title="title"  textlink="/myaddress" showtext="true"  text="收货地址"></heads>

  <div class="contentdiv">
      <div class="contul">
          <ul>
            <li v-for="item in detaillist" @click="gotohit(item)">
                <div class="listop">
                  <p class="number">订单号：{{item.OrderID}}</p>
                  <p class="color" :class="{ red:item.OrderStaute==1,red:item.OrderStaute==2,blue:item.OrderStaute==3,gray:item.OrderStaute==4}">{{item.orderstautename}}</p>
                </div>
                <div class="listbot">
                  <div class="listbotleft">
                    <img :src="item.Icon" />
                  </div>
                  <div class="listbotright">
                      <p class="name">{{item.Name}}</p>
                      <div class="finalfloat">
                          <div class="finalleft">
                            <p class="form">来源：{{item.Source}}</p>
                            <p class="date">{{item.Date}}</p>
                          </div>
                          <div class="finalright"><span class="bigword">{{item.Point}}</span>积分</div>
                      </div>
                  </div>
                </div>
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
      title: '兑换记录',
      state:this.$store.state,
      detaillist:[],

    }
  },
  methods:{
    gotohit(item){
      let _this=this
      console.log(item)
      if(item.IsDetails){
        _this.$router.push('/recorddetail?item='+item.OrderID)
      }

    }
  },
  components:{

  },
  created:function(){
     let _this =this

    let query = this.$route.query

     if(typeof this.state.user!="undefined"){
      this.$http(this.$api.MyChange({}))
        .then((data) => {
          console.log(data)
              _this.detaillist=data.data.ResultData.list
              console.log(_this.detaillist)
              for(let i=0;i<_this.detaillist.length;i++){
                console.log(_this.detaillist[i].OrderStaute)
                if(_this.detaillist[i].OrderStaute==1){
                  if(_this.detaillist[i].IsDetails){
                    _this.detaillist[i].orderstautename="待处理>"
                  }else{
                    _this.detaillist[i].orderstautename="待处理"
                  }
                }else if(_this.detaillist[i].OrderStaute==2){
                  if(_this.detaillist[i].IsDetails){
                    _this.detaillist[i].orderstautename="配送中>"
                  }else{
                    _this.detaillist[i].orderstautename="配送中"
                  }
                }else if(_this.detaillist[i].OrderStaute==3){
                  if(_this.detaillist[i].IsDetails){
                    _this.detaillist[i].orderstautename="交易完成>"
                  }else{
                    _this.detaillist[i].orderstautename="交易完成"
                  }
                }else if(_this.detaillist[i].OrderStaute==4){
                    if(_this.detaillist[i].IsDetails){
                    _this.detaillist[i].orderstautename="交易关闭>"
                  }else{
                    _this.detaillist[i].orderstautename="交易关闭"
                  }

                }
              }

      })
      }



  },
    components:{
    heads,
  }
}
</script>

<style lang="scss" scoped>
.contentdiv{background:#f3f3f3;}
.contentdiv .contul{width:95%;margin: rem(10) auto;}
.contentdiv .contul ul{}
.contentdiv .contul li{margin:rem(10) 0;background:#fff;box-shadow: rem(2) rem(2) rem(2) #ccc;padding-bottom:rem(5)}
.contentdiv .contul li .listop{width:90%;margin:0 auto;line-height: rem(35);border-bottom:rem(1) solid #c9c9c9;height:rem(35);padding-top:rem(5);font-size:rem(16)}
.contentdiv .contul li .listop .number{float:left;width:70%;color:#73879c;}
.contentdiv .contul li .listop .color{float:right;width:30%;text-align: right;color:#de3031;}
.contentdiv .contul li .listbot{width:95%;margin: 0 auto;height:rem(110)}
.contentdiv .contul li .listbot .listbotleft{width:28%;float:left;margin:rem(10) rem(5) 0 0;}
.contentdiv .contul li .listbot .listbotleft img{width:100%;}
.contentdiv .contul li .listbot .listbotright{width:70%;float:left;}
.contentdiv .contul li .listbot .listbotright .name{margin-top:rem(10);line-height:rem(50);font-size:rem(18);color:#5a5554;width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.contentdiv .contul li .finalfloat{}
.contentdiv .contul li .finalfloat .finalleft{float:left;width:64%;}
.contentdiv .contul li .finalfloat .finalleft p{color:#5e6c7b;font-size:rem(12)}
.contentdiv .contul li .finalfloat .finalright{float:left;width:36%;text-align:right;font-size:rem(12);line-height:rem(40)}
.contentdiv .contul li .finalfloat .finalright span{font-size:rem(18);color:#de3031;}
.contentdiv .contul li .listop .green{color:green;}

.contentdiv .contul li .listop .red{color:#de3031;}
.contentdiv .contul li .listop .blue{color:#1b99c8;}
.contentdiv .contul li .listop .gray{color:#9b9b9b;}
</style>
