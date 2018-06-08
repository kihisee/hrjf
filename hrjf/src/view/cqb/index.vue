<template>
<div class="containerNav">
 <heads :title="title" lefticon="static/img/cqb/icon_wenhao.png" imgstyle="width:0.5rem" showicon="true" righticon="static/img/cqb/icon_clock.png" href="/cqbhelp" textlink="/hqbtradelist"></heads>

<div class="per_top">
    <div class="per_money">
        <div class="nhl_box">
          <div class="main">
            预期年化（%）
            <p>{{(basset.FeeRate).toFixed(2)}}</p>
          </div>
          <div class="main">
            昨日收益（元）
            <p v-if="shwologin">{{basset.YesterdayProfit}}</p>
            <p v-else><router-link :to="'/login?back=/cqb'">登录可见</router-link></p>
          </div>
        </div>
        <div class="subtext">预期年化8%起，每天利率上涨0.2%，最高10%</div>
    </div>
    <ul class="per_topb">
        <li class="tips_fir">
            <p>总资产(元)</p>
            <span>{{(basset.Moeny).toFixed(2)}}</span>
        </li>
        <li>
            <p>累计收益(元)</p>
            <span>{{(basset.TotalProfit).toFixed(2)}}</span>
        </li>
    </ul>
</div>
<div class="chongz">
    <a href="javascript:"><p class="chongzhi accz"  @click="checkbindbank('/rollout')">转出<span>随存随取</span></p></a>
    <a href="javascript:"> <p class="chongzhi accz" @click="checkbindbank('/rollin')">转入<span>100元起投</span></p></a>
</div>

<div class="draggable_box">
  <p class="sub_title">投资<span>{{incom.incommoney}}</span>元，30天最多可赚<span>{{incom.hrbmoeny}}</span>元</p>

              <div class="investday_box">
              <p class="line"></p>
              <ul id="draglist">
                <li><a href="javascript:"><i></i></a></li>
                <li><a href="javascript:"><i></i></a></li>
                <li><a href="javascript:"><i></i></a></li>
                <li><a href="javascript:"><i></i></a></li>
                <li><a href="javascript:"><i></i></a></li>
              </ul>
              <div id="drag"></div>
            </div>
  <div class="imabg">
    <span class="one">{{incom.bankmoeny}}</span>
    <span class="two">{{incom.baobaomoeny}}</span>
    <span class="three">{{incom.hrbmoeny}}</span>
  </div>
  <div class="imgtext">
    <span class="one">银行</span>
    <span class="two">宝宝类</span>
    <span class="three">活期宝</span>
  </div>
</div>

<globlenav></globlenav>


</div>


</template>

<script>

import globlenav from '../../components/nav'
import heads from '../../components/head'
export default {
  data () {
    return {
      title:"活期宝",
      state:this.$store.state,
      basset:{
        FeeRate:0,
        MillionProfit:0,
        Moeny:0,
        TotalProfit:0,
        YesterdayProfit:0,
      },
      shwologin:false,
      incom:{ //默认显示
        init:4,//金币位置
        incommoney:'200,000.00',
        bankmoeny:58.33,
        baobaomoeny:446.67,
        hrbmoeny:1467.17
      }
    }
  },
  mounted : function() {
    this.imgdrag()
  },
  methods:{
    checkbindbank(url){
      this.$router.push(url)
    },
    imgdrag(){
      let drag=document.getElementById("drag");
      let objwidth = document.getElementById("draglist").offsetWidth
      let divwidth = document.getElementById("drag").offsetWidth
      console.log(divwidth)
      let startX, moveEndX, X;
      let _this = this;


      let startFunc= function(e){
        startX = e.touches[0].pageX ;

      }
      let moveFunc = function (e){
        moveEndX = e.touches[0].pageX;
        X = moveEndX
        if(moveEndX>=objwidth){
          drag.style.left = (objwidth - 30)+'px'
          X = (objwidth - 30)
        }else if(moveEndX<0){
          drag.style.left = 0
          X = 0
        }else{
          drag.style.left = moveEndX+'px'
        }

      }
      let initfunc = function(){
        let arr=[]
        let spaceWidth = (objwidth-(4*divwidth)) / (4-1)//计算水平段宽度
        for(let i=0;i<5;i++){
          let itemPointX  = i * spaceWidth
          arr.push(itemPointX)
        }
        return arr[_this.incom.init]
      }
      drag.style.left = initfunc()+'px'
      let sortNumber = function (a,b) //排序
      {
        return a - b
      }
      let compare = function (property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
      }
      let endFunc = function(e){
        let arr=[]
        let spaceWidth = (objwidth-(4*divwidth)) / (4-1)//计算水平段宽度
        for(let i=0;i<5;i++){
          let itemPointX  = i * spaceWidth
          arr.push(itemPointX)
        }
        let arr2 = arr.slice()
        arr.push(moveEndX);
        arr.sort(sortNumber);
        console.log(arr)
        arr2.sort(sortNumber);
        arr.forEach(function(v,i){
          if(moveEndX == v){
            let mini = arr[i-1]
            let maxi = arr[i+1]
            if(typeof mini =="undefined") mini = arr[i]
            if(typeof maxi =="undefined") maxi = arr[i]
             let newarr = [{id:mini,data:Math.abs(X-mini)},{id:maxi,data:Math.abs(X-maxi)}]
             newarr.sort(compare('data'));
             drag.style.left = (newarr[0].id)+'px'
             arr2.forEach(function(n,k){
                if(newarr[0].id == n){
                  if (k == 0) {
                    _this.incom.incommoney = '1,000.00'
                    _this.incom.bankmoeny = 0.29
                    _this.incom.baobaomoeny = 2.23
                    _this.incom.hrbmoeny = 7.36
                }else if (k == 1){
                    _this.incom.incommoney = '10,000.00'
                    _this.incom.bankmoeny = 2.92
                    _this.incom.baobaomoeny = 22.33
                    _this.incom.hrbmoeny = 73.31
                }else if(k == 2){
                    _this.incom.incommoney = '50,000.00'
                    _this.incom.bankmoeny = 14.58
                    _this.incom.baobaomoeny = 111.67
                    _this.incom.hrbmoeny = 366.78
                }else if (k == 3){
                    _this.incom.incommoney = '100,000.00'
                    _this.incom.bankmoeny = 29.17
                    _this.incom.baobaomoeny = 223.33
                    _this.incom.hrbmoeny = 733.62
                }else if (k == 4){
                    _this.incom.incommoney = '200,000.00'
                    _this.incom.bankmoeny = 58.33
                    _this.incom.baobaomoeny = 446.67
                    _this.incom.hrbmoeny = 1467.17
                }
                }
             })
            //console.log(i)

          }
        })


      }

      drag.addEventListener('touchstart', startFunc, false);
      drag.addEventListener('touchmove', moveFunc, false);
      drag.addEventListener('touchend', endFunc, false);
    }
  },
  created :function(){
    let _this=this
    if(typeof this.state.user=="undefined"){
        return
      }
      this.shwologin = true
    this.$http(this.$api.HQBqueryhrbasset({}))
          .then((data) => {
            _this.basset = data.data.ResultData;

          })

  },
  components:{
    globlenav,
    heads
  }
}
</script>
<style lang="scss" scoped>
.containerNav{background:#fff;height:100%;margin-bottom:-1.25rem;}
.per_top{height: 4.75rem;overflow: hidden;}
.ipsregRemarks{ width: 90%;margin: 0px auto; margin-top:0.25rem; border-bottom: 1px solid #d4d4d4; font-size: 0.35rem;color:#f00; padding-bottom: 0.25rem;}
.per_money{text-align: left;color: #fff; background-size: 100%; position:relative; padding-top: 0.25rem;height:3rem; background:-webkit-linear-gradient(#de3132, #f87055);}
.money_top{font-size: 0.5rem;line-height: 0.625rem;}
.p_money{font-size: 0.75rem;line-height: 0.875rem;}

.per_money a.hxbtn{ position:absolute; right:10%; top:35%; width:2.0rem; height:0.875rem; line-height: 0.875rem; text-align:center; background-color: #fff; border-radius: 0.125rem; font-size: 0.35rem; color:#333;}
.per_topb{background-color: #f3f3f3;height: 1.5rem; color: #555;text-align: center; display:flex;}
.per_topb li{height: 1.5rem;line-height: 0.625rem;padding:0.015625rem 0;font-size: 0.4rem;}
.per_topb li .yello{color:#fff241;}
.per_topb li.tips_fir{background:none;}
.per_topb li p{margin-top:rem(5);}
.per_topb li span{color:#de3132;font-size:0.45rem; font-weight:bold;}
.chongz{height: 1.5rem;background: #fff;font-size: 0.45rem;display:flex; }
.chongz a{display:block; height:1.5rem; border-bottom:1px solid #ccc;}
.chongz p{color:#949494;height: 1.0rem;line-height: 0.75rem;margin:0.125rem 0; text-align:center;}
.chongz p span{display:block;line-height: 0.35rem; font-size:0.3rem; color:#555}
.chongz a:nth-child(1){border-right:1px solid #ccc; }
.chongz .chongzhi{color:#de3132;}
.nhl_box{display:flex;}
.nhl_box .main{text-align:center;}
.nhl_box .main p{font-size:0.8rem; margin-top:(5);}
.nhl_box .main p a{border:2px solid #fff; font-size:0.35rem; color:#fff; padding:rem(3) rem(10); border-radius:rem(5);}
.subtext{text-align:center; margin-top:rem(20);}
.draggable_box{background:#fff;box-sizing: border-box; padding:rem(20);}
.draggable_box .sub_title{text-align:center;}
.draggable_box .sub_title span{color:#f87055}
.draggable_box .imabg{ height:rem(150);@include bg("/static/img/cqb/icon_income.png");margin-top:rem(20);position:relative;box-sizing: border-box;}
.draggable_box .imabg span,.draggable_box .imgtext span{width:auto;}
.draggable_box .imabg .one{position:absolute;top:rem(50);left:rem(55);}
.draggable_box .imabg .two{position:absolute;top:rem(30);left:rem(165);}
.draggable_box .imabg .three{position:absolute;top:rem(0);left:rem(275);}
.draggable_box .imgtext{margin-top:rem(5);position:relative;padding-bottom:rem(30);box-sizing: border-box;}
.draggable_box .imgtext .one{position:absolute;top:rem(0);left:rem(55);}
.draggable_box .imgtext .two{position:absolute;top:rem(0);left:rem(160);}
.draggable_box .imgtext .three{position:absolute;top:rem(0);left:rem(270);}

.investday_box{margin-top:rem(20);overflow:hidden; position: relative; height:rem(40);}
.investday_box p{background:#ffbf5b; height:rem(2); margin-top:rem(15);border-radius:rem(5);}
.investday_box ul{display:flex;position: absolute; top:0;left:0;justify-content:space-between;}
.investday_box ul li{width:rem(30);}
.investday_box ul li a i{ width:rem(10); height:rem(10); display:block;text-align:justify;border-radius:50%; background:#ffbf5b;margin:auto;margin-top:rem(11);}
.investday_box ul li a{display:block;}
// .investday_box ul li a.active i{@include bg("/static/img/cqb/icon_hengruibao.png");width:rem(30); height:rem(30); margin-top:rem(0);}
.investday_box #drag{position: absolute; top:0;left:0;@include bg("/static/img/cqb/icon_hengruibao.png");width:rem(30); height:rem(30); margin-top:rem(0);}
</style>