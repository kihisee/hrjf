<template>
<div class="containerNav">
  <heads :title="title"  textlink="/introduction" showtext="true"  text="积分规则"></heads>


  <div class="icenter">
      <div class="pertop">
        <div class="toppic" :style="Portrait"></div>
        <p class="name">{{persontitle}}</p>
        <p class="nowin">当前积分 :<span>{{logindata.Gold}}</span></p>
      </div>

      <div class="redul">
        <ul>
          <li   v-for="(item,index) in datali" :class="{activeli: activeindex== index}" @click="gototabli(index)">
              {{item}}
            <span></span>
          </li>
        </ul>
      </div>


      <div class="intercontent">
          <ul class="icontentul" ref="icontentul">
            <li>
              <div class="xunzhang">
                <ul class="xunzul">
                  <li v-for="item in xunzhangli" :class="item">
                  </li>
                </ul>

                <div class="xunzp">
                    <p>说明：</p>
                    <p>1、用户在平台通过各种形式获得的积分累积，同时可以参与消耗积分获得对应的福利或者商品；</p>
                    <p>2、积分等级实时更新，根据用户获得积分-消耗积分=最终积分。</p>
                </div>
              </div>
            </li>

            <li>
                <div class="xinshou">
                  <ul>
                    <p class="toprenwu">新手任务 </p>
                    <li v-for="item in xinshourw">
                        <div class="lileft">
                          <span>{{item.Title}}</span>
                          <span>+{{item.Point}}</span>
                        </div>
                        <div class="licenter">{{item.Detail}}</div>
                        <div class="liright"><router-link class="huise" to="" v-if="item.IsGet==2">已完成</router-link><router-link class="redrouter" :to="item.url" v-else>去完成</router-link></div>
                    </li>
                  </ul>
                  <ul>
                    <p class="toprenwu">日常任务 </p>
                    <li v-for="item in ricrw">
                        <div class="lileft">
                          <span>{{item.Title}}</span>
                          <span>{{item.PointDetail}}</span>
                        </div>
                        <div class="licenter">{{item.Detail}}</div>
                        <div class="liright"><router-link class="huise" to="" v-if="item.IsGet==2">已完成</router-link><router-link class="redrouter" :to="item.url" v-else>去完成</router-link></div>
                    </li>
                  </ul>
                </div>
            </li>
            <li>
              <div class="jifenjl">
                <ul>
                  <li v-for="item in jifendata">
                    <div class="jifenleft">
                      <p class="jflefttop">{{item.Title}}</p>
                      <p class="jfleftbot">{{item.CreateTime}}</p>
                    </div>
                    <div class="jifenright" :class="{green:item.Gold<0}">
                          <span v-if="item.Gold>0">+</span><span v-if="item.Gold<0"></span>{{item.Gold}}
                    </div>
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
export default {
  data () {
    return {
      title: '积分中心',
      state:this.$store.state,
      Portrait:"",
      datali:['我的勋章','赚积分','积分记录'],
      activeindex:0,

      logindata:[],

      xunzhang:[],

      Level:0,

      xunzhangli:["","","",""],

      xinshourw:[],
      ricrw:[],

      jifendata:[],

      persontitle:'',
    }
  },
  methods:{
     gototabli(index){
      let _this =this
      let query = this.$route.query
      _this.activeindex=index
       for(let i=0;i<_this.$refs.icontentul.children.length;i++){
          _this.$refs.icontentul.children[i].className=""
        }
      _this.$refs.icontentul.children[index].className="activexz"
    },
    getuserphoto(){
      let _this =this
     _this.$http(_this.$api.GetPortrait({}))
    .then((data) => {
       if(data.data.ResultData.Portrait!=""){
        _this.Portrait = 'background:url('+data.data.ResultData.Portrait+') center center / 100% no-repeat;'
       }
      });
    },
  },
  created:function(){
    let _this =this

    let query = this.$route.query

    this.getuserphoto();

      if(typeof this.state.user!="undefined"){
         this.$http(this.$api.DiscoverLoginInfo({}))
            .then((data) => {
              _this.logindata=data.data.ResultData

                if(_this.logindata.Name="未实名"){
                _this.persontitle = _this.logindata.Mobile
                }else{
                _this.persontitle=_this.logindata.Name
                }
            });


            this.$http(this.$api.MyPointMedal({}))
            .then((data) => {
              _this.Level=data.data.ResultData.Level
               //_this.gototabli(0)
               let newli=[];

               console.log(data)
               for(let i=0;i<_this.Level;i++){
                  newli[i]="weidao"
               }

               _this.xunzhangli=newli

               if(_this.xunzhangli.length<4){
                  _this.xunzhangli.length=4;
               }
               //console.log(_this.xunzhangli);
              //console.log(_this.Level);
            });

          this.$http(this.$api.MyPointRecord({}))
          .then((data) => {
            console.log(data)

              _this.jifendata=data.data.ResultData.List;
          });

      }else{
        _this.logindata.Gold="未登录"
      }




      this.$http(this.$api.TaskList({}))
      .then((data) => {

        console.log(data)

           for(let j=0;j<data.data.ResultData.length;j++){
            if(data.data.ResultData[j].Task_type==1){
              _this.xinshourw.push(data.data.ResultData[j])
            }else if(data.data.ResultData[j].Task_type==2){
              _this.ricrw.push(data.data.ResultData[j])
            }


           }
           console.log(_this.xinshourw)
           console.log(_this.ricrw)

          for(let k=0;k<_this.xinshourw.length;k++){
              if(_this.xinshourw[k].Action_type==1){
                _this.xinshourw[k].url="login"
              }else if(_this.xinshourw[k].Action_type==7){
                   _this.xinshourw[k].url="mybank"
              }
          }

          for(let g=0;g<_this.ricrw.length;g++){

              if(_this.ricrw[g].Action_type==2){
                _this.ricrw[g].url="myinvite"
              }else if(_this.ricrw[g].Action_type==3){
                   _this.ricrw[g].url="tender"
              }else if(_this.ricrw[g].Action_type==4){
                   _this.ricrw[g].url="myinvite"
              }else if(_this.ricrw[g].Action_type==6){
                   _this.ricrw[g].url="myinvite"
              }
          }


      });



  },

  mounted:function(){
       let _this =this

    let query = this.$route.query
    _this.gototabli(query.center)

  },
  components:{
    globlenav,
    heads
  }
}
</script>
<style lang="scss" scoped>
.icenter{}
.icenter .pertop{background:#de3031;min-height: rem(90);overflow:auto;}
.icenter .pertop .toppic{background:url(../../../static/img/pointstore/pertou.png) no-repeat center center;background-size:10%;height:rem(45);margin:rem(10) 0 0; width:rem(45);border-radius:50%;margin:auto;}
.icenter .pertop p{font-size:rem(14)}
.icenter .pertop .name{text-align: center;color:#fff;line-height: rem(30);}
.icenter .pertop .nowin{text-align: center;color:#fff;line-height: rem(30);padding-bottom:rem(10)}
.icenter .pertop .nowin span{color:#ecbd4c;}


.redul{}
.redul ul{display:flex;background:#ca2425;}
.redul ul li{justify-content:center;text-align:center;line-height:rem(50);color:#fff;font-size:rem(15);position:relative;}
.redul ul li span{ display:none;width: 0;height: 0; border-left:rem(8) solid transparent; border-bottom: rem(8) solid #fff; border-right: rem(8) solid transparent;position:absolute;bottom:0;left:50%;margin:0 0 0 rem(-4);}
.redul ul li.activeli{color:#ffd161;}
.redul ul li.activeli span{display:block;}
.redul{}

.intercontent{min-height:rem(350);}
.intercontent .icontentul{width:100%;margin:0 auto;min-height:rem(300)}
.intercontent .icontentul>li{display:none;}
.intercontent .icontentul>li:first-child{background:#fff;}
.intercontent .icontentul>li.activexz{display:block;}
.intercontent .icontentul li .xunzhang{}
.intercontent .icontentul li .xunzhang .xunzul{padding:rem(20) 0;}
.intercontent .icontentul li .xunzhang .xunzul li{height:rem(150);width:50%;float:left;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(1){background:url(../../../static/img/pointstore/chuchuh.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(2){background:url(../../../static/img/pointstore/xiaoshih.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(3){background:url(../../../static/img/pointstore/xunzhanh.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(4){background:url(../../../static/img/pointstore/zhanluh.png) no-repeat center center;background-size:70%;}

.intercontent .icontentul li .xunzhang .xunzul li:nth-child(1).weidao{background:url(../../../static/img/pointstore/chuchu.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(2).weidao{background:url(../../../static/img/pointstore/xiaoshi.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(3).weidao{background:url(../../../static/img/pointstore/lueyou.png) no-repeat center center;background-size:70%;}
.intercontent .icontentul li .xunzhang .xunzul li:nth-child(4).weidao{background:url(../../../static/img/pointstore/zhanlu.png) no-repeat center center;background-size:70%;}

.intercontent .icontentul li .xunzhang .xunzp{color:#73879c;font-size:rem(14);line-height:rem(25);clear:both;padding:rem(10) 0;}

.intercontent .icontentul li .xunzhang .xunzp p{width:90%;margin:0 auto;}

.xinshou .toprenwu{background:url(../../../static/img/pointstore/pxingsbx.png) no-repeat left center;background-size:100%;width:30%;height:rem(35);line-height:rem(35);text-align:center;color:#fff;font-size:rem(16);position:absolute;top:rem(-8);left:0;margin-left:rem(15)}
.xinshou ul{background:#fff;margin:rem(10) 0;position:relative;padding-top: rem(40)}
.xinshou ul li{width:90%;margin:0 auto;border-bottom:rem(1) solid #dcdcdc;overflow:auto;}
.xinshou ul li span{display:block;font-size:rem(15)}
.xinshou ul li span:first-child{color:#334455;}
.xinshou ul li span:last-child{color:#ecbd4c;}
.xinshou ul li:last-child{border-bottom:none;}
.xinshou ul li .lileft{float:left;width:20%;padding:rem(10) 0;}
.xinshou ul li .licenter{float:left;width:60%;padding:rem(10) 0;font-size:rem(15);color:#73879c;}
.xinshou ul li .liright{float:left;width:20%;padding:rem(5) 0;}
.xinshou ul li .liright .huise{width:95%;border-radius: rem(5);height:rem(30);line-height:rem(30);text-align:center;display:block;background:#bebebe;color:#fff;margin:rem(10) auto;  }
.xinshou ul li .liright .redrouter{width:95%;border-radius: rem(5);height:rem(30);line-height:rem(30);text-align:center;display:block;background:#de3031;color:#fff;margin:rem(10) auto;  }
.jifenjl{}
.jifenjl ul{background:#fff;}
.jifenjl ul li{border-bottom:rem(1) solid #dcdcdc;overflow:auto;}
.jifenjl ul li:last-child{border-bottom:none;}
.jifenjl ul li .jifenleft{width:70%;float:left;padding:rem(10) 0 rem(10) rem(15);}
.jifenjl ul li .jifenleft p{line-height:rem(20);color:#73879c;}
.jifenjl ul li .jifenleft .jflefttop{font-size:rem(14);}
.jifenjl ul li .jifenleft .jfleftbot{font-size:rem(14);}
.jifenjl ul li .jifenright{width:20%;float:right;padding:rem(10) rem(15) rem(10) rem(0);line-height:rem(40);color:#de3031;font-size:rem(16);text-align:right;}
.jifenjl ul li  .green{color:#34995f;}
</style>

