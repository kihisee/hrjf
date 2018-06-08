<template>
<div class="container">
        <heads :title="title"></heads>

        <div class="invitelist" id="iscroll">
            <div class="list_box"  v-for="(item,index) in datalist">
              <div class="top"><span>{{item.year}}</span><span class="textright">您的奖励（元）</span></div>
              <ul id="content">
                <li v-for="(items,index) in item.reports" @click="golink(items)">
                    <div class="left"><span class="month">{{items.month}}</span><span :class="{'yellow':items.award_status==1}">{{items.text}}</span><i v-if="items.award_status==3" @click.stop="alertmsg(items.remark)"></i></div>
                    <div class="right"><span class="orange" v-if="items.award_status!=3">+{{items.money}}</span><span v-else>{{items.money}}</span></div>
                </li>

            </ul>
            </div>
            <div style="text-align:center;padding:0.25rem 0; height:auto; border:none;background:none" v-if="showmoer">{{loaddata}}</div>
        </div>
</div>
</template>

<script>

import heads from '../../components/head'
export default {
  data () {
    return {
      title:"邀请奖励记录",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      classlist:-1,
      total:2,
      loaddata:"已加载全部数据",
      datamoer:true,
      showmoer:false,

      totalmoney:0,
      inviteuserid:0
    }
  },
    mounted : function() {
      let _this = this;


  },
  methods:{
    golink(items){
       this.$router.push('/invitedetaillist?inviteuserid='+items.id+'&money='+items.money)
    },
    alertmsg(msg){
      this.$msg.alert(msg);
      return false
    },
    getdata(type){
        let _this=this;

       this.$http(this.$api.QueryMonthReportList({"Page":this.page,"PageSize":100}))
      .then((data) => {

        if(data.data.ResultData.MonthReportList.length!=0){
            _this.datalist = data.data.ResultData.MonthReportList
             for(var i=0;i<_this.datalist.length;i++){
                _this.datalist[i].reports.forEach(function(v,index){
                    if(_this.datalist[i].reports[index].award_status==3){
                      _this.datalist[i].reports[index].text = "已失效"
                    }else if(_this.datalist[i].reports[index].award_status==2){
                      _this.datalist[i].reports[index].text = "已发放"
                    }else if(_this.datalist[i].reports[index].award_status==1){
                      _this.datalist[i].reports[index].text = "待发放"
                    }
                })

             }
             console.log(data.data.ResultData)
             console.log(_this.datalist)

          _this.showmoer = true;
        }
      });
    }
  },
  created :function(){
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
/*
.invitelist{position: absolute;z-index: 1;top: 1.1rem;bottom: 0;overflow: hidden;background-color: #F7F7F7;width: 100%;touch-action: none; }
*/
.invitelist .top{display:flex; padding:rem(5) rem(10); box-sizing:border-box;}
.invitelist .top span{display:block;}
.invitelist .top .textright{text-align:right}
.invitelist li{background:#fff; border-bottom:1px solid #ccc; overflow:hidden;padding:rem(10); box-sizing:border-box;}
.invitelist li{color:#555; display:block;box-sizing: border-box;}
.invitelist li:before{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10); margin-left:rem(10);color:#d1d1d1;}
.invitelist li span.month{width:rem(40); height:rem(40); display:inline-block; vertical-align:middle; background:#fe752f; border-radius:50%; line-height:rem(40); text-align:center; color:#fff; margin-right:rem(10);}
.invitelist li span.yellow{color:#ffbb2a;}
.invitelist li .right{margin-top:rem(8)}
.invitelist li .right span{font-size:0.5rem;}
.invitelist li span.orange{color:#fe752f}
.invitelist li .left{position::relative;}
.invitelist li .left i{height:rem(20); width:rem(20); display:inline-block; margin-left:rem(10); vertical-align:middle;@include bg("/static/img/my/question_icon.png");top:rem(8);left:rem(100);position:absolute;}

</style>
