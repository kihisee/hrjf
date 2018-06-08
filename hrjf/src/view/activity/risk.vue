<template>
   <div id="frame">
    <div id="con">
          <div class="link_head" v-if="Imapp">
            <h1>
              <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
              {{title}}

            </h1>
          </div>

          <div class="riskcont">
              <div class="toprisk">
              请在下列各题中选择最适合的选项，我们将根据您的选择来评估您对投资风险的适应度，并提供适合您投资的产品和服务建议，我司承诺对您的个人资料严格保密。
              </div>

              <ul class="riskul">
                <li v-for="(item,indexd) in radiodata">
                    <template  v-for="(items,indexc) in item">
                        <p v-if="items.val==0">{{items.text}}</p>
                         <p class="pradio" v-if="items.val!=0">
                            <input type="radio" :value="items.val" :name="items.name" @click="isradio(indexd,indexc)" :id="items.id"><label  :for="items.id">{{items.text}}</label>
                        </p>
                        </template>
                </li>
              </ul>
               <a href="javascript:;" v-on:click="suan()">提交测评</a>
          </div>


    </div>
  </div>
</template>

<script>
import ls from '../../store/lStorage.js'

export default {
  data () {
    return {
      title: '风险评估',
      intrue:false,
      activitys:[],
      point:0,
      radiolength:0,
      dijicarr:[],
      Imapp:true,
      thetrue:false,
      checkbox:'checked',
      state:this.$store.state,
      basset:{},
      form:'',
      tenderid:'',
      radiodata:[
        [
          {"val":0,"text":"1、您的年龄:"},
          {"val":1,"text":"20岁以下或65岁以上","name":"one","id":"one1" ,checked:false},
          {"val":2,"text":"51岁至65岁","name":"one", "id":"one2" ,checked:false},
          {"val":3,"text":"21岁至30岁","name":"one","id":"one3" , checked:false},
          {"val":4,"text":"31岁至50岁","name":"one","id":"one4" , checked:false},
        ],
          [
          {"val":0,"text":"2、您的教育程度:"},
          {"val":1,"text":"高中以下","name":"two","id":"two1" ,checked:false},
          {"val":2,"text":"专科","name":"two","id":"two2" ,checked:false},
          {"val":3,"text":"本科","name":"two","id":"two3" ,checked:false},
          {"val":4,"text":"研究生或研究生以上","name":"two","id":"two4" ,checked:false},
        ],
        [
          {"val":0,"text":"3、您目前的职业状况:"},
          {"val":1,"text":"待业或退休","name":"three","id":"three1" ,checked:false},
          {"val":2,"text":"无固定工作","name":"three","id":"three2" ,checked:false},
          {"val":3,"text":"企事业单位固定工作","name":"three","id":"three3" ,checked:false},
          {"val":4,"text":"私营业主","name":"three","id":"three4" ,checked:false},
        ],
        [
          {"val":0,"text":"4、您目前的年收入状况:"},
          {"val":1,"text":"5万以下","name":"four","id":"four1" ,checked:false},
          {"val":2,"text":"5-10万","name":"four","id":"four2" ,checked:false},
          {"val":3,"text":"10-25万","name":"four","id":"four3" ,checked:false},
          {"val":4,"text":"25万以上","name":"four","id":"four4" ,checked:false},
        ],

        [
          {"val":0,"text":"5、您进行投资的主要目的是:"},
          {"val":1,"text":"确保资产的安全性，同时获得固定收益","name":"five","id":"five1" ,checked:false},
          {"val":2,"text":"希望投资能获得一定的增值，同时获得波动适度的年回报","name":"five","id":"five2" ,checked:false},
          {"val":3,"text":"倾向于长期的成长，较少关心短期的回报和波动","name":"five","id":"five3" ,checked:false},
          {"val":4,"text":"只关心长期的高回报，能够接受短期的资产价值波动","name":"five","id":"five4" ,checked:false},
        ],

        [
          {"val":0,"text":"6、您的投资知识:"},
          {"val":1,"text":"缺乏投资基本常识","name":"six","id":"six1" ,checked:false},
          {"val":2,"text":"略有了解，但不懂投资技巧","name":"six","id":"six2" ,checked:false},
          {"val":3,"text":"有一定了解，懂一些的投资技巧","name":"six","id":"six3" ,checked:false},
          {"val":4,"text":"认识充分，并懂得投资技巧  ","name":"six","id":"six4" ,checked:false},
        ],

        [
          {"val":0,"text":"7、您的投资经验:"},
          {"val":1,"text":"无证券投资经验","name":"seven","id":"seven1" ,checked:false},
          {"val":2,"text":"少于2年（不含2年）","name":"seven","id":"seven2" ,checked:false},
          {"val":3,"text":"2年至5年（不含5年）","name":"seven","id":"seven3" ,checked:false},
          {"val":4,"text":"5年以上","name":"seven","id":"seven4" ,checked:false},
        ],

        [
          {"val":0,"text":"8、在您的预算中，有多少资金计划用于投资？"},
          {"val":1,"text":"5万以下","name":"eight","id":"eight1" ,checked:false},
          {"val":2,"text":"5-15万","name":"eight","id":"eight2" ,checked:false},
          {"val":3,"text":"15-30万","name":"eight","id":"eight3" ,checked:false},
          {"val":4,"text":"30万以上","name":"eight","id":"eight4" ,checked:false},
        ],

        [
          {"val":0,"text":"9、您能接受的投资期限一般是:"},
          {"val":1,"text":"90天以内，我对流动性要求比较高","name":"nine","id":"nine1" ,checked:false},
          {"val":2,"text":"91-180天，我短期内不会动用投资资金，希望能获得较满意的收益","name":"nine","id":"nine2" ,checked:false},
          {"val":3,"text":"181-365天，我对流动性要求较低，为获得较高收益，我会较长时间来投资","name":"nine","id":"nine3" ,checked:false},
          {"val":4,"text":"1年以上，为了获得满意的收益，我会持续进行投资 ","name":"nine","id":"nine4" ,checked:false},
        ],

        [
          {"val":0,"text":"10、您进行投资时所能承受的最大亏损比例是:"},
          {"val":1,"text":"本金10%以内","name":"ten","id":"ten1" ,checked:false},
          {"val":2,"text":"本金10-30%","name":"ten","id":"ten2" ,checked:false},
          {"val":3,"text":"本金30-50%","name":"ten","id":"ten3" ,checked:false},
          {"val":4,"text":"本金50%以上 ","name":"ten","id":"ten4" ,checked:false},
        ],

        [
          {"val":0,"text":"11、您进行投资的方法:"},
          {"val":1,"text":"靠直觉和运气，跟着别人操作，没有认真分析","name":"eleven","id":"eleven1" ,checked:false},
          {"val":2,"text":"看图形操作，自己懂一点技术分析","name":"eleven","id":"eleven2" ,checked:false},
          {"val":3,"text":"技术分析和基本面分析相结合","name":"eleven","id":"eleven3" ,checked:false},
          {"val":4,"text":"在专家指导下操作","name":"eleven","id":"eleven4" ,checked:false},
        ],

        [
          {"val":0,"text":"12、您期望的投资年收益率:"},
          {"val":1,"text":"高于同期定期存款","name":"twelve","id":"twelve1" ,checked:false},
          {"val":2,"text":"10%左右，要求相对风险较低","name":"twelve","id":"twelve2" ,checked:false},
          {"val":3,"text":"10-20%，可承受中等风险","name":"twelve","id":"twelve3" ,checked:false},
          {"val":4,"text":"20%以上，可承担较高风险 ","name":"twelve","id":"twelve4" ,checked:false},
        ],
        [
          {"val":0,"text":"13、您如何看待投资亏损:"},
          {"val":1,"text":"很难接受，影响正常的生活","name":"thirteen","id":"thirteen1" ,checked:false},
          {"val":2,"text":"受到一定的影响，但不影响正常生活","name":"thirteen","id":"thirteen2" ,checked:false},
          {"val":3,"text":"平常心看待，对情绪没有明显的影响","name":"thirteen","id":"thirteen3" ,checked:false},
          {"val":4,"text":"很正常，投资有风险，没有人只赚不赔","name":"thirteen","id":"thirteen4" ,checked:false},
        ]
      ],
    }
  },
  methods:{
  isradio(indexd,indexc){
        this.radiodata.forEach(function(vat,t){
        if(t==indexd){
         vat.forEach(function(val,i){
                val.checked=false;
                  if(indexc==i){
                    val.checked=true;
                 }
             });
        }
    });
  },
  suan(){

  let _this=this;
  _this.dijicarr=[]
  _this.point=0
  _this.radiolength=0
      this.radiodata.forEach(function(item,parentIndex){
            let dijic=0;
            item.forEach(function(element,index){
              if(index ==0){
              } else{
                 if(element.checked){
                      _this.radiolength++;
                      _this.point +=element.val
                 }else{
                      dijic++;
                 }
              }

              if(dijic==4){
                  let pinx=0;
                  pinx =parentIndex+1;
                  _this.dijicarr.push(pinx);
              }

            });
      })
       console.log(_this.radiolength);
      if(_this.radiolength != 13 && _this.radiolength != 0){
          _this.$msg.alert("请先完成第"+_this.dijicarr+"题");
      }else if(_this.radiolength == 0){
          _this.$msg.alert("请先完成全部调查问卷!");
      }else{
          //
         let query = _this.$route.query

          if(query.token){    //地址参数带token   APP打开

                console.log(query.token);

                ls.setItem("_user",{"Token":query.token})

                _this.$store.commit("userinfo")

               _this.$http(_this.$api.riskfinal({"score":_this.point,"TokenUser":query.token}))//提交数据
                            .then((data) => {
                             //_this.$router.push('/riskfinal?number='+this.point)
                             if(query.ver == "ios"){//判断APP是IOS

                                    window.webkit.messageHandlers.Method.postMessage({ "type": "risk","score":_this.point });

                             }else if(query.ver == "android"){ //判断APP是android
                                      android.openAndroid()


                             }

               });




            }else{//地址参数不带token    正常打开

                console.log("正常打开");
                //console.log(_this.state.user.Token);
                //debugger

                //console.log(userId)

                _this.$http(_this.$api.riskfinal({"score":_this.point,"TokenUser":_this.state.user.Token}))
                          .then((data) => {
                          _this.$router.push('/riskfinal?number='+this.point+'&from='+_this.from+'&tenderid='+_this.tenderid)
                          console.log(data)
                          console.log(_this.point)
              });

            }



      }

  },


  intrued(){
    let _this=this;
    console.log(_this.checkbox)
    if(_this.checkbox){
      _this.intrue=true
      _this.title="调查问卷"
    }else{
       _this.$msg.alert("请先同意平台收集并使用您的信息用于风险评测")
    }

  },
  },
  created :function(){
    let _this=this
    console.log(this.state.user)
    let query = _this.$route.query

    if(query.tenderid){
      _this.tenderid=query.tenderid
    }



        if(!query.ver){
            _this.Imapp=true
        }else{
            _this.Imapp=false
        }

        console.log(_this.Imapp)
        if(query.from=="tender"){
          _this.from=query.from
        }

  },
  components:{

  }
}
</script>

<style lang="scss" scoped>

.riskcont{width:95%;margin:0.25rem auto;background:#fff;border-radius: 0.125rem;}
.riskcont{width:95%;margin:0.25rem auto;background:#fff;border-radius: 0.125rem;text-align: left;font-size: 16px;padding-bottom: 50px;;}
.riskcont .toprisk{width:95%;padding:0.125rem ;}
.riskcont .riskul{width:95%;margin:0 auto;line-height: 35px;}
.riskcont  a{ display:block; width:85%; height:50px; line-height:50px; text-align:center; border-radius:10px; font-size:16px; color:#fff; background:#de3132; margin-top:50px;margin:20px auto;}
.riskcont .jietitle{padding:0.375rem 0;width:95%;margin:0 auto;font-size:0.5rem;font-weight: bold;}
.riskcont .jiecont{width:95%;margin:0 auto;}
.botlist{width:95%;margin:0 auto;background:#fff;border-radius: 0.075rem;}
.botlist .listin{padding:0.6rem 0.5rem;width:85%;margin:0 auto;height:2rem}
.botlist .listin a{height:0.75rem;line-height: 0.75rem;color:#fff;background:#ff5256;display:block;float:left;width:45%;text-align: center;border-radius: 0.125rem;margin-right:0.125rem;}
.botlist .listin a:first-child{float:left;background:#ffbb2a;display:block;width:100%;height:35px;line-height: 35px;}
.botlist .listin a:last-child{display:inline-block;width:100%;color:#ffbb2a;background:none;}
.tanword{text-align: left;}
.tanword .risktop{width:95%;margin:0.25rem auto 0;background:#fff;border-radius: 0.125rem;font-size: 0.4rem;padding: 0.25rem 0 0;}
.tanword .risktop p{width:95%;margin:0 auto;color:#333;padding:0.1rem 0;font-size: 0.35rem;text-align: left;text-indent: 2em;}
.tanword .inright{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#ffbb2a;border-radius: 5px;margin:0.25rem auto;display:block;color:#fff;font-size: 0.4rem;}
.tanword .xtop{width:40%;height:1rem;line-height: 1rem;text-align: center;background:#ffbb2a;border-radius: 5px;color:#fff;font-size: 0.4rem;display:inline-block;float:left}
.tanword .che{width:95%;margin:0.25rem auto;font-size: 0.36rem;padding-bottom: 0.25rem;color:#999;}
.adiv{width:80%;margin:0 auto;height:1rem;}
</style>