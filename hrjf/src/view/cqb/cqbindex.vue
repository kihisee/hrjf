<template>
<div class="container">
 <heads :title="title"></heads>

<div v-if="!islogin">
    <div class="hqbtop">
      <p class="feetitle">年化收益率（%）</p>
      <p class="fee">8.00%</p>
      <p class="subtext">预计年化收益8%起，每天利率上涨0.2%，最高10%</p>
    </div>
    <div class="basset">
      <div class="bg">
        总资产（元）<p>0.00</p>
        <i class="top"></i><i class="bottom"></i>
      </div>
      <div>
        累计收益（元）<p>0.00</p>
      </div>
    </div>
    <div class="gray_box">
      <p class="text">以存入<span>10000</span>元30天举例，活期宝最高可转<span>73.4</span>元</p>
      <div class="photo_bg">
        <span class="bank">银行活期<br>赚2.91</span>
        <span class="bb">宝宝类<br>赚22.3</span>
        <span class="hqb">活期宝<br>赚73.4</span>
      </div>
      <div class="sublist">
        <ul>
          <li><router-link to="/hqbtradelist" class=""><i class="jyjl"></i>交易记录<i class="grayright"></i></router-link></li>
          <li><router-link to="/cqbhelp" class=""><i class="help"></i>常见问题<i class="grayright"></i></router-link></li>
        </ul>
    </div>
    </div>
    <div class="btn_box">
      <p><router-link to="/rollout" class="rollout">转出</router-link></p>
      <p><router-link to="/rollin" class="rollin">转入</router-link></p>
    </div>
</div>

<div v-else>
    <div class="hqbtop" v-if="basset.YesterdayProfit>0">
      <p class="feetitle">昨日收益（元）</p>
      <p class="fee">{{(basset.YesterdayProfit).toFixed(2)}}</p>
      <p class="oldfee">昨日收益年化：{{(basset.FeeRate).toFixed(2)}}%</p>
      <p class="subtext">预计年化收益8%起，每天利率上涨0.2%，最高10%</p>
    </div>
    <div class="hqbtop" v-else>
      <p class="feetitle">年化收益率（%）</p>
      <p class="fee">8.00%</p>
      <p class="subtext">预计年化收益8%起，每天利率上涨0.2%，最高10%</p>
    </div>
    <div class="basset">
      <div class="bg">
        总资产（元）<p>{{(basset.Moeny).toFixed(2)}}</p>
        <i class="top"></i><i class="bottom"></i>
      </div>
      <div>
        累计收益（元）<p>{{(basset.TotalProfit).toFixed(2)}}</p>
      </div>
    </div>
    <div class="gray_box">

      <div class="svg" v-if="showbox">
        <h1>收益走势图</h1>
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref="svg">
            <defs>
             <linearGradient id="gradient-sline" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#de3132" stop-opacity="0.3"></stop>
              <stop offset="100%" stop-color="#fff" stop-opacity="0.1"></stop>
             </linearGradient>
           </defs>
          <g>
            <line :x1="30*dpr" :y1="item.liney*dpr" :x2="svgwidth" :y2="item.liney*dpr" :stroke-width="item.stroke"  v-for="item in horizon"/>
          </g>
          <g>
            <line :x1="item.linex*dpr" y1="0" :x2="item.linex*dpr" :y2="item.liney" :stroke-width="item.stroke" v-for="item in vertical"/>
          </g>
          <g>
            <text x="0" :y="40*dpr" style="text-anchor:start;font: 0.3rem arial; color: #ccc;text-anchor:start;" fill="#ccc">{{hig}}</text>
            <text x="0" :y="middlepx" style="text-anchor:start;font: 0.3rem arial; color: #ccc;text-anchor:start;" fill="#ccc">{{middle}}</text>
            <text x="0" :y="lowpx" style="text-anchor:start;font: 0.3rem arial; color: #ccc;text-anchor:start;" fill="#ccc">{{low}}</text>

            <path fill="url(#gradient-sline)" :d="syPathZ"></path>
            <path stroke="#fc3a51" fill="none" :d="syPath"></path>
            <circle :cx="item.x" :cy="item.y" :r="3*dpr" stroke="red" :stroke-width="1*dpr" fill="#fff" v-for="item in circle"/>
             <image xlink:href="static/img/cqb/svg_t_bg.png" :x="imgx" :y="imgy" :height="25*dpr" :width="60*dpr" v-if="showimg"/>
             <image xlink:href="static/img/cqb/svg_t_bg2.png" :x="imgx" :y="imgy" :height="25*dpr" :width="60*dpr" v-if="!showimg"/>
             <text :x="textx" :y="texty" style="text-anchor:start;font: 0.3rem arial;text-anchor:start;" fill="#fff">赚{{sy}}</text>
            <!-- <text :x="item.x" :y="item.y" style="text-anchor:start;font: 0.3rem arial;text-anchor:start;" fill="#ccc" v-for="item in day">{{item.day}}</text> -->
          </g>
        </svg>
        <div class="textday_box">
          <span :style="{left:item.x+'px'}" v-for="item in day">{{item.day}}</span>
        </div>
      </div>
      <div style="overflow:hidden" v-else>
      <p class="text">以存入<span>10000</span>元30天举例，活期宝最高可转<span>73.4</span>元</p>
      <div>
      <div class="photo_bg">
        <span class="bank">银行活期<br>赚2.91</span>
        <span class="bb">宝宝类<br>赚22.3</span>
        <span class="hqb">活期宝<br>赚73.4</span>
      </div>
      </div>
    </div>
      <div class="sublist">
        <ul>
          <li><router-link to="/hqbtradelist" class=""><i class="jyjl"></i>交易记录<i class="grayright"></i></router-link></li>
          <li><router-link to="/cqbhelp" class=""><i class="help"></i>常见问题<i class="grayright"></i></router-link></li>
        </ul>
    </div>
    </div>
    <div class="btn_box">
      <p><router-link to="/rollout" class="rollout">转出</router-link></p>
      <p><router-link to="/rollin" class="rollin">转入</router-link></p>
    </div>
</div>

</div>
</template>

<script>

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
      islogin:false,
      showimg:true,
      showbox:true,
      svgdata:"",
      lowpx:0,
      middlepx:0,
      horizon:[],
      vertical:[],
      circle:[],
      day:[],
      token:false,
      login:true,
      listshow:false,
      dpr:dpr,
      svgwidth:0,
      svgheight:0,
      hig:0,
      middle:0.00,
      low:0,
      max:0,
      min:0,
      imgx:-1000,
      imgy:0,
      textx:0,
      texty:0,
      sy:0,
      syPath:'',
      syPathZ:'',
    //   svgdata:[
    // {Day: "04.29-05.05", Interest: 2.75},
    //  {Day: "04.29-05.05", Interest: 2.75},
    // {Day: "04.29-05.05", Interest: 43.76},
    // {Day: "04.29-05.05", Interest: 12.76},
    // {Day: "04.29-05.05", Interest: 24.76},
    // ]
    }
  },
mounted : function() {
          if(typeof this.state.user=="undefined"){
        return
    }
          this.svgwidth = this.$refs.svg.clientWidth
          this.svgheight = this.$refs.svg.clientHeight
          this.lineBg();
  },
  methods:{
    getsvgdata(){
        let _this=this
        // setTimeout(function(){
        //   _this.getdata(_this.svgdata);
        // },1000)

        this.$http(this.$api.hqbsevendays({"Type":1,"Page":1,"PageSize":10}))
        .then((data) => {
          if(data.data.ResultData.List!=""){
            let arr=[]
            data.data.ResultData.List.forEach(function(v){
              if(v.Interest==0){
                arr.push(v.Interest)
              }
            })
            if(arr.length!=data.data.ResultData.List.length){
              _this.svgdata = data.data.ResultData.List;
              _this.getdata(data.data.ResultData.List);
            }else{
              _this.showbox = false;
            }
          }
       });
    },
    lineBg(){
      var horizon=0,vertical=0;
      var twidth = (this.svgwidth-30*dpr)/5
      var lineheight = this.svgheight/5/dpr
      for(var i=0;i<4;i++){
        if(i==3){
          this.horizon.push({liney:horizon+=lineheight,stroke:2*dpr})
        }else{
          this.horizon.push({liney:horizon+=lineheight,stroke:1*dpr})
        }

      }
      this.lowpx = this.horizon[3].liney
      this.middlepx = this.horizon[1].liney+lineheight/2
      for(var i=0;i<7;i++){
        if(i==0){
          //this.vertical.push({linex:vertical+=30,stroke:2*dpr,liney:lineheight*4*dpr})
        }else{
          //this.vertical.push({linex:vertical+=twidth/dpr,stroke:1*dpr,liney:lineheight*4*dpr})
        }

      }
    },
    maxOrmin(data){
      var ht=[];
      for(var i=0;i<data.length;i++){
          ht.push(parseFloat(data[i].Interest));
       }
       this.max=Math.max.apply(null, ht).toFixed(2);
       this.min = Math.min.apply(null,ht).toFixed(2);
       var max = parseFloat(this.max);
       var min = parseFloat(this.min);
       if(max-min==0){
          this.max=parseFloat(this.max)+0.01
          this.min=parseFloat(this.min-0.02)

       }
       if((max-min).toFixed(2)==0.01){
          this.min=parseFloat(this.min-0.02)
       }else if((max-min).toFixed(2)==0.02){
          this.min=parseFloat(this.min-0.01)
       }
    },
    getdata(data){
      this.maxOrmin(data)
      this.draw(data)
    },
    draw(data){
      var lineheight = this.svgheight/5/dpr
       var onepx=(this.max-this.min)/(lineheight*3);
       var twidth = (this.svgwidth-40*dpr)/4-5
       var mark = 30+twidth/dpr;
       this.hig=this.max
       this.middle=(this.max-(this.max-this.min)/2).toFixed(2)
       this.low=this.min

      for(var i=0;i<data.length;i++){
          var len = data.length;
          var vul = parseFloat((this.max-data[i].Interest)/onepx+lineheight);
          //if(i%2==0){
            if(i==0){
              this.day.push({day:data[i].Day,x:5*dpr,y:lineheight*5*dpr-lineheight/2+10})
            }else if(i==len-1){
              this.day.push({day:data[i].Day,x:mark*dpr-40*dpr,y:lineheight*5*dpr-lineheight/2+10,transform:''})
            }else{
              this.day.push({day:data[i].Day,x:mark*dpr-30*dpr,y:lineheight*5*dpr-lineheight/2+10})
            }

          //}
          if(i==0){
            this.syPath +="M"+30*dpr+","+vul*dpr;
            this.circle.push({x:+30,y:vul*dpr});
          }else{
            this.syPath +="L"+mark*dpr+","+vul*dpr;
            this.circle.push({x:mark*dpr,y:vul*dpr});
            mark+=twidth/dpr
          }
          if(len==i+1&&len>2){
            this.imgx = mark*dpr-twidth/dpr-55;
            this.imgy =vul*dpr-30*dpr;
            if(data[i].Interest>10&&data[i].Interest<100){
              this.textx=mark*dpr-twidth/dpr*dpr-45;
            }else if(data[i].Interest>=100){
              this.textx=mark*dpr-twidth/dpr*dpr-45;
            }else{
              this.textx=mark*dpr-twidth/dpr*dpr-50;
            }
            this.texty=vul*dpr-16*dpr;
            this.sy = data[i].Interest.toFixed(2)
          }
          if(len<=2){
            this.showimg = false;
            this.imgx = mark*dpr-twidth/dpr-5;
            this.imgy =vul*dpr-30*dpr;
            if(data[i].Interest>10&&data[i].Interest<100){
              this.textx=mark*dpr-twidth/dpr*dpr+5;
            }else if(data[i].Interest>=100){
              this.textx=mark*dpr-twidth/dpr*dpr+2;
            }else{
              this.textx=mark*dpr-twidth/dpr*dpr+10;
            }
            this.texty=vul*dpr-16*dpr;
            this.sy = data[i].Interest.toFixed(2)
          }
       }
       this.syPathZ = this.syPath+"L"+(mark*dpr-twidth)+","+lineheight*4*dpr+"L30,"+lineheight*4*dpr+" Z";
    }
  },
  created :function(){
    let _this=this
    if(typeof this.state.user=="undefined"){
        return
    }

    this.getsvgdata();
    this.islogin = true;
    this.$http(this.$api.HQBqueryhrbasset({}))
          .then((data) => {
            _this.basset = data.data.ResultData;
            if(data.data.ResultData.Moeny==0){
              _this.islogin = false;
            }
          })

  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>

.hqbtop{min-height: 4rem;overflow: hidden; background:-webkit-linear-gradient(#de3132, #f87055);}
.feetitle{font-size:0.4rem; color:#fff;text-align:center; margin-top:rem(10);}
.fee{font-size:0.8rem; text-align:center;color:#fff; margin-top:rem(10)}
.oldfee{width:50%;margin:auto;height:rem(30);line-height:rem(30);text-align:center; background:#f58e82;color:#fd1c1a; border-radius:rem(30);margin-top:rem(10);}
.subtext{font-size:0.35rem; text-align:center;color:#fff; margin-top:rem(10)}
.basset{display:flex;text-align:center;color:#fff;background:#fea48f;height:1.5rem;align-items:center;justify-content:center;font-size:0.35rem}
.basset .bg{ position:relative;}
.basset .bg i.top{height:50%;position:absolute;top: 0;right:0; display:block;background: -webkit-linear-gradient(top, rgba(255,255,255,0), rgba(255,255,255,1)); width:1px;}
.basset .bg i.bottom{height:50%;position:absolute;top: 50%;right:0; display:block;background: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0)); width:1px;}
.basset p{font-size:0.5rem;}

.gray_box{box-sizing:border-box;padding:0.25rem 0.25rem 0px 0.25rem;overflow:hidden;position: relative;z-index: 0;padding-bottom: 1.75rem;text-align:center;}
.gray_box .text{color:#999;}
.gray_box .text span{color:#de3132;}
.gray_box .photo_bg{ height:4.5rem;position:relative;background:url(/static/img/cqb/icon_income_bg.png) no-repeat bottom; background-size:80% 60%; background-color:#fff; margin-top:rem(10);}
.gray_box .photo_bg .bank{position:absolute; top: rem(100); left:rem(60);width:auto; color:#999;}
.gray_box .photo_bg .bb{position:absolute; top: rem(70); left:rem(170);width:auto; color:#999;}
.gray_box .photo_bg .hqb{position:absolute; top: rem(20); left:rem(275);width:auto; color:#de3132;}

.gray_box .sublist{padding:0rem 0.5rem 0.25rem 0.5rem;box-sizing: border-box; margin-top:rem(10);background:#fff; border-radius:rem(5);}
.gray_box .sublist li{ padding-top:0.25rem; height:0.875rem; line-height: 0.875rem;text-align: left; position:relative; display:flex;}
.gray_box .sublist li:nth-child(1){border-bottom: 1px solid #e1e1e1; padding-bottom: 0.25rem;}
.gray_box .sublist li a{font-size: 0.4rem;color:#555; text-align:left;}
.gray_box .sublist li span{text-align:right;padding-right:0.725rem;font-size:0.35rem}
.gray_box .sublist li a i{width:0.85rem; height:0.85rem;display:inline-block; vertical-align: middle; }
.gray_box .sublist li a i.jyjl{background:url(/static/img/cqb/icon_clock_2.png) no-repeat 0.05rem 0.1rem ;background-size: 50%;}
.gray_box .sublist li a i.help{background:url(/static/img/cqb/icon_wenhao_2.png) no-repeat 0.05rem 0.1rem ;background-size: 60%;}

.btn_box{display:flex; position:fixed;bottom:0;left:0;}
.btn_box p{height:1.5rem; line-height:1.5rem;text-align:center;}
.btn_box p a{display:block; height:1.5rem; font-size:0.45rem;}
.btn_box p a.rollout{background:#fff;color:#de3132;}
.btn_box p a.rollin{background:#de3132;color:#fff;}

.svg{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555;padding:0 0.25rem;box-sizing:border-box;height:6.25rem; position:relative;}
.svg h1{text-align:left;height:rem(35);line-height:rem(35);border-bottom:1px dashed #de3132;color:#999; font-weight:normal;}
.svg svg{width:100%;box-sizing:border-box; height:5rem; margin-top:rem(5)}
.svg svg g{width:100%; height:100%;}
.svg svg line{shape-rendering: crispEdges;stroke:#e1e1e1;}
.svg svg path{stroke-width:2; }
.svg .textday_box{position: absolute;height:rem(30);bottom:rem(-5);left: 0;width:100%;}
.svg .textday_box span{color: #d1d1d1;bottom:rem(20);position: absolute;left: 0;width: auto;transform:rotate(-25deg) scale(.733);}
</style>