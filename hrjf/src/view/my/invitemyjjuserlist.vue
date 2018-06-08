<template>
<div class="container">
        <heads :title="title"></heads>

    <div class="list_box">
    <div class="jjuserbox">
      <div>{{InviteTopTotal.InviteTopTenderCorpusMoney}}<p>固定理财待收总金额（元）</p></div>
      <div>{{InviteTopTotal.InviteTopHrbMoney}}<p>活期宝待收总金额（元）</p></div>
    </div>
    <div class="top"><div>姓名/电话</div><div class="textright"><span class="red">待收固定理财</span>+<span class="orange">活期宝</span></div></div>
            <div class="invitelist" id="iscroll">

            <ul id="content">
                <li v-for="(item,index) in datalist">
                  <router-link :to="'/invitestaffdetal?userid='+item.user_id+'&mobile='+item.mobile+'&jjuser=1'">
                      <div v-if="item.real_name!=null">{{item.real_name}}<p>{{item.mobile}}</p></div>
                      <div v-else>{{item.user_name}}<p>{{item.mobile}}</p></div>
                      <div class="i_box">{{(item.tender_money).toFixed(2)}}<p>{{(item.hqb_money).toFixed(2)}}</p><i></i></div>
                    </router-link>
                </li>
                <li style="text-align:center;padding:0.25rem 0; height:auto; border:none;background:none" v-if="showmoer">{{loaddata}}</li>
            </ul>

        </div>
    </div>

</div>
</template>

<script>

import heads from '../../components/head'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:"我的间接邀请人",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      classlist:-1,
      total:2,
      loaddata:"加载更多数据",
      datamoer:true,
      showmoer:false,
            obj:{
          mouseWheel: true,
          click:this.iScrollClick() ,
          preventDefault: true,
          tap: true,
          bounce: false  ,
          scrollbars : false,
          momentum: true,//惯性滑动
          scrollX : false,
          scrollY : true,
      },
    InviteTopTotal:""
    }
  },
    mounted : function() {
      let _this = this;
      setTimeout(function(){
        _this.myScroll = new IScroll(document.getElementById('iscroll'),_this.obj);
        _this.myScroll.on('scrollEnd',function(){
          if(this.y<=(this.wrapperHeight-this.scrollerHeight)&&_this.datamoer){
            _this.datamoer = false;
            _this.loaddata = "加载中"
            _this.getdata();

          }
        })
      },300)


  },
  methods:{

    iScrollClick(){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
           var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
           return parseFloat(s[0]+s[3]) < 44 ? false : true
          }
    },


    getdata(type){
        let _this=this;

      if(this.datalist.length>=this.total){
        _this.loaddata = "已加载全部数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
       this.$http(this.$api.QueryInviteUserList({"Page":this.page,"PageSize":10,"IsTopInvitedUser":true}))
      .then((data) => {
        console.log(data.data)
        if(data.data.ResultData.InviteUserList.length!=0){
          _this.total = data.data.ResultData.Total
          _this.page ++
            for(var i=0;i<data.data.ResultData.InviteUserList.length;i++){
                _this.datalist.push(data.data.ResultData.InviteUserList[i])

             }
             if(data.data.ResultData.InviteUserList.length<10){
               _this.loaddata = "已加载全部数据"
             }else{
               _this.loaddata = "加载更多数据"
             }

          if(!_this.datamoer){
          setTimeout(function(){
             _this.datamoer = true;
             _this.myScroll.refresh()
           },300)

          }
          _this.showmoer = true;
        }
      });
    }
  },
  created :function(){

 this.$http(this.$api.QueryInviteTopTotal({}))
      .then((data) => {
        this.InviteTopTotal = data.data.ResultData

      });
    this.getdata()
  },
  destroyed() {
  },
  components:{
    heads
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list_box .jjuserbox{height:1.6rem; display:flex; background:#fff; border-bottom:1px solid #ccc; text-align:center; padding:rem(10); box-sizing:border-box;}
.list_box .jjuserbox div:nth-child(1){border-right:1px solid #ccc;}
.list_box .jjuserbox div{ font-weight:bold; font-size:0.4rem;color:#555}
.list_box .jjuserbox div p{ font-weight:normal;font-size:0.3rem;color:#555}
.list_box .top{display:flex; padding:rem(5) rem(10); box-sizing:border-box; height:0.8rem;}
.list_box .top .textright{text-align:right}
.list_box .top .textright span.orange{color:$orange}
.list_box .top .textright span.red{color:#de3132;}
.invitelist{position: absolute;z-index: 1;top: 3.5rem;bottom: 0rem;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none; }
.invitelist li{color: #808080;padding: 0.25rem 0;margin:0 auto;border-bottom:1px solid #ccc; background:#fff; padding:rem(10); overflow:hidden;box-sizing:border-box;}
.invitelist li a{display:flex; color:#555;}
.invitelist .i_box{overflow:hidden;box-sizing:border-box; position:relative; text-align:right; padding-right:rem(30);color:#de3132; font-size:0.4rem}
.invitelist .i_box p{width:auto;color:$orange ;}
.invitelist .i_box p span{width:auto; }
.invitelist .i_box i{display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  position:absolute; color:#d1d1d1; top: rem(10); right:rem(5)}
.invitetotol{position:fixed; bottom:0; height:1.1rem; background:#fff; line-height:1.1rem;display:flex;box-sizing:border-box;padding:0 rem(10); font-size:0.45rem;}
.invitetotol .title{text-align:left; color:#555;}
.invitetotol .money{text-align:right; color:$orange;}
</style>
