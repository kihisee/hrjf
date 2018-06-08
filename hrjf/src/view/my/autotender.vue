<template>
<div class="container">

        <heads :title="title" showtext="true" text="规则" textlink="/automationregular"></heads>
  <div class="xjh" style="margin-bottom:0;">

    <div class="box autotender_box"  style="margin-bottom:0;">
        <ul class="sublist">
          <li>
            <span>自动投标</span>
            <section class="model-5">
              <div class="checkbox">
                <input type="checkbox" v-model="checkbox"  @click="ischeckbox()">
                <label></label>
              </div>
            </section>
          </li>
        </ul>
    </div>
  </div>

  <div class="xjh" style="padding-top:0.25rem;margin-bottom:0.125rem" v-if="checkbox">
    <div class="autotender_box2">
      <ul  class="sublist">
        <li v-for="(item,index) in tenderlist"  @click="isradio(index)" :class="{active:item.checke}"><div class="list"><input type="radio" name="radio" :checked="item.checke" /><span class="title">{{item.title}}</span><span class="text">{{item.text}}</span></div></li>
      </ul>
    </div>

    <div class="box autotender_box3"  v-if="checkbox">
      <div class="sublist">
        <ul>
          <li>
            <span class="title">每次投标金额</span>
            <input type="input" class="input" :placeholder="'可用余额'+state.basset.Balance"  v-model="money"/>
            <span class="text">元</span>
          </li>
          <li>
            <span class="title">余额保留金额</span>
            <input type="input" class="input" placeholder="请输入保留金额"  v-model="spmoney"/>
            <span class="text">元</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <div class="autotendersub" v-if="checkbox">
    <p><span>自动投标：</span>根据您设置的条件进行匹配投资(不支持新手标，APP专属标，微信专属标等)</p>
    <p class="xy"><input type="checkbox" :checked="xieyi" @click="isxieyi()" /><router-link to="/automationtender" class="yl">《自动投标协议》</router-link></p>
    <p class="btn"><a href="JavaScript:" class="btn" @click="checkxieyi()">保存设置</a></p>
  </div>

</div>

</template>

<script>
import heads from '../../components/head'
export default {
  name: 'home',
  data () {
    return {
      title: '自动投标',
      state:this.$store.state,
      money:"",
      spmoney:"",
      isautomatic:false,
      checkbox:false,
      ridaoindex:1,
      xieyi:true,
      tenderlist:[
        {text:"年化利率：10%",checke:true,title:"月月安1个月标的"},
        {text:"年化利率：12%",checke:false,title:"季度丰3个月标的"},
        {text:"年化利率：13.5%",checke:false,title:"半年满6个月标的"},
        {text:"年化利率：15%",checke:false,title:"年年盈12个月标的"},
        {text:"年化利率：12.0%~13.5%",checke:false,title:"3~6个月标的"},
        {text:"年化利率：12.0%~14.5%",checke:false,title:"3~12个月标的"},
        {text:"年化利率：13.5%~14.5%",checke:false,title:"6~12个月标的"},
        {text:"年化利率：9.0%~14.5%",checke:false,title:"全部标的"},
      ]
    }
  },
  methods:{
    ischeckbox(){
      let _this = this
        if(this.checkbox){
              if(_this.isautomatic){
                  _this.$msg.confirm("是否关闭自动投标？",function(){
                      _this.checkxieyi()
                  },function(){
                    _this.checkbox = true;
                  })
              }

        }

    },
    checkxieyi(){
      let _this = this
      if(this.ridaoindex==0&&this.checkbox){
         _this.$msg.alert("请选择自动投标年化率！")
        return
      }
      if(this.money==""&&this.checkbox){
        _this.$msg.alert("请输入每次投标金额")
        return
      }
      if(this.money<100&&this.checkbox){
        _this.$msg.alert("投标金额至少100元")
        return
      }
      if(this.spmoney==""&&this.checkbox){
        _this.$msg.alert("请输入保留金额")
        return
      }
      if(this.spmoney<0&&this.checkbox){
        _this.$msg.alert("请输入正确的保留金额")
        return
      }
      if(!this.xieyi&&this.checkbox){
        _this.$msg.confirm("同意自动投标协议",function(){
          _this.isxieyi();
          _this.AutoMatic();
        })
      }else{
        _this.AutoMatic();
      }
    },
    AutoMatic(){
      let number =null
      let obj;
      let _this = this
      if(this.checkbox){
        number = 1
        obj = {"IsAutoMatic":number,"tenderType":this.ridaoindex,"money":this.money,"retainMoney":this.spmoney}
      }else{
        number = 0
        obj = {"IsAutoMatic":number}
      }
      this.$http(this.$api.setTenderAutoMatic(obj))
      .then((data) => {
        if(data.data.ResultCode==100000){
          if(_this.checkbox == false){
            _this.$msg.alert("关闭自动投标成功！",function(){
              _this.isautomatic = false;
            })
          }else{
            _this.$msg.alert("保存成功！",function(){
              _this.isautomatic = true;
            })
          }
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });
    },
    isradio(index){
      this.ridaoindex =index+1
      this.tenderlist.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
        }
      });
    },
    isxieyi(){
      this.xieyi=!this.xieyi
    }
  },
  created:function(){
       let _this = this
       this.$http(this.$api.getQueryAutoMaticList({}))
       .then((data) => {
         if(data.data.ResultData.IsAutoMatic==1){
          _this.money=data.data.ResultData.money
          _this.spmoney=data.data.ResultData.retainMoney
          _this.checkbox=true
          _this.isautomatic=true;
          _this.ridaoindex = data.data.ResultData.tenderType
          _this.tenderlist.forEach(function(val,i){val.checke=false});
          _this.tenderlist[data.data.ResultData.tenderType-1].checke=true
          console.log(_this.tenderlist)
          console.log(data.data.ResultData)
         }
       });

  },
  components:{
     heads
  }
}
</script>

<style lang="scss" scoped>
.xjh{box-sizing:border-box;padding:0.25rem 0.25rem 0px 0.25rem;overflow:hidden;position: relative;left: 0px;z-index: 0;margin-bottom: 1.25rem;text-align:center;}
.xjh .box{background-color: #fff;border-radius: 0.125rem; margin-bottom: 0.25rem; color:#555}
.xjh .box .sublist{padding:0rem 0.5rem 0.25rem 0.5rem;box-sizing: border-box;}
.xjh .box .sublist li{ padding-top:0.25rem; height:0.875rem; line-height: 0.875rem;text-align: left; position:relative; display:flex;}
.xjh .box .sublist li:nth-child(1){border-bottom: 1px solid #ccc; padding-bottom: 0.25rem;}
.xjh .box .sublist li a{font-size: 0.4rem;color:#555; text-align:left;}
.xjh .box .sublist li span{text-align:right;padding-right:0.725rem;font-size:0.35rem}
.xjh .box .sublist li a i{width:0.85rem; height:0.85rem;display:inline-block; vertical-align: middle; }
.xjh .box p.text{padding:0rem 0.5rem 0.25rem 0.5rem;box-sizing: border-box;line-height:0.75rem;text-align:left; font-size:0.35rem;}

.xjh .autotender_box .sublist{padding:0.275rem; box-sizing:border-box;}
.xjh .box .sublist li{ padding-top:0.25rem; height:0.875rem; line-height: 0.875rem;text-align: left; position:relative; display:flex;}
.xjh .autotender_box .sublist li:nth-child(1){padding:0;border:0}
.xjh .autotender_box .sublist li span{text-align:left; font-size:0.4rem}
.xjh .autotender_box .model-5 .checkbox label { background: #bbb; height: 0.6rem; width: 1.375rem; }
.xjh .autotender_box .model-5 .checkbox label:after { background: #fff; top: -0.05rem; width: 0.7rem; height:0.7rem; }
.xjh .autotender_box .model-5 .checkbox input:checked + label { background: #de3132;}
.xjh .autotender_box .model-5 .checkbox input:checked + label:after { background: #fff; left: 0.7rem; }
.xjh .autotender_box .checkbox { position: relative; display: inline-block;  margin-top:rem(5);}
.xjh .autotender_box .checkbox:after, .checkbox:before { font-family: FontAwesome; -webkit-font-feature-settings: normal; -moz-font-feature-settings: normal; font-feature-settings: normal; -webkit-font-kerning: auto; -moz-font-kerning: auto; font-kerning: auto; -webkit-font-language-override: normal; -moz-font-language-override: normal; font-language-override: normal; font-stretch: normal; font-style: normal; font-synthesis: weight style; font-variant: normal; font-weight: normal; text-rendering: auto; }
.xjh .autotender_box .checkbox label { width: 2.25rem; height: 1.05rem; background: #ccc; position: relative; display: inline-block; border-radius: 1.15rem; -webkit-transition: 0.4s; transition: 0.4s; }
.xjh .autotender_box .checkbox label:after { content: ''; position: absolute; width:1.25rem; height: 1.25rem; border-radius: 100%; left: 0; top: -5px; z-index: 2; background: #fff; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); -webkit-transition: 0.4s; transition: 0.4s; }
.xjh .autotender_box .checkbox input { position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 5; opacity: 0; cursor: pointer; }

.xjh .autotender_box .checkbox input:checked + label:after { left: 1.0rem; }

.xjh .autotender_box2{background:#fff;margin-bottom:rem(10);}
.xjh .autotender_box2 ul.sublist{display:flex;flex-wrap:wrap;}
.xjh .autotender_box2 ul.sublist li{ width:50%; text-align:left;  box-sizing:border-box; overflow:hidden;}
.xjh .autotender_box2 ul.sublist li .list{position:relative;height:1.8rem;background-size: 20%; border:1px solid #f3f3f3;box-sizing:border-box; overflow:hidden;}

.xjh .autotender_box2 ul.sublist li.active .list{position:relative;background:url(/static/img/my/autotender_icon_active.jpg) no-repeat top right;height:1.8rem;background-size: 20%; border:1px solid #de3132;}
.xjh .autotender_box2 ul.sublist li span{width:auto;}
.xjh .autotender_box2 ul.sublist li span.title{display:block; margin-top:rem(8);margin-left:rem(10);font-size:0.40rem;}
.xjh .autotender_box2 ul.sublist li span.text{display:block; margin-top:rem(8);margin-left:rem(5);font-size:0.35rem;color:#999;}
.xjh .autotender_box2 ul.sublist li {padding-top:0;height:1.8rem;}

.xjh .autotender_box2 li input[type="radio"]{ margin-top:0.21rem;margin-right:0.375rem;opacity: 0;position: absolute; left: 0; top: 0;}

.xjh .autotender_box3 .sublist li:nth-child(1){border-bottom:1px solid #e1e1e1}

.xjh .autotender_box3 .sublist li .title{width:30%;padding-right: 0.125rem;text-align:left;font-size:0.35rem;}
.xjh .autotender_box3 .sublist li .input{width:60%; border:none; font-size:0.45rem; color:#de3132;}
.xjh .autotender_box3 .sublist li .input::-webkit-input-placeholder{font-size:0.35rem;}
.xjh .autotender_box3 .sublist li .text{width:10%;text-align:right;padding-right:0rem;}
.autotendersub{ padding:0 0.5rem; box-sizing:border-box;font-size:0.35rem;color:#555}
.autotendersub span,.autotendersub a.yl{color:#de3132;}
.autotendersub p.xy,.autotendersub p.btn{margin-top:0.25rem}
.autotendersub a.btn{background: #de3132;color: #fff;display: inline-block;width: 100%;height:1.2rem; line-height:1.2rem; text-align:center;border-radius:0.125rem; font-size:0.45rem;}


</style>