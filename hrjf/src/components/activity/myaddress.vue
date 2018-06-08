<template>
   <div id="frame">
    <div id="con">
          <!-- <div class="link_head">
            <h1>
              <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
              {{title}}
            </h1>
          </div> -->

        <div id="loginForm">
            <div class="forget_box">
                    <ul>
                        <li class="reg_cont reg_conts">
                            <div class="form-group top-group">
                                <span class="left_one">姓名</span>
                                <input class="newinnput" name="Mobile" placeholder="收货人姓名" type="text" v-model="name">

                            </div>
                        </li>
                        <li class="reg_cont reg_conts">
                            <div class="form-group">
                                <span class="left_one">手机号</span>
                                <input class="duihuang_tex newinnput" type="text" placeholder="收货人手机" v-model="mobile">
                            </div>
                        </li>
                         <li style="position:relative;" class="row  reg_cont reg_conts"  @click="getprovince()">
                            <div class="form-group" >
                                <span class="left_one add_card">省</span>
                                <span>{{selectProvince.value}}</span>
                             </div>
                        </li>
                        <li style="position:relative;" class="row  reg_cont reg_conts"    @click="getcity()">
                            <div class="form-group">
                                <span class="left_one add_card">市</span>

                                <span>{{selectCity.value}}</span>
                             </div>
                        </li>
                        <li style="position:relative;" class="row  reg_cont reg_conts"  @click="getarea()">
                            <div class="form-group">
                                <span class="left_one add_card">区/县</span>

                                <span>{{selectArea.value}}</span>
                             </div>
                        </li>
                        <li style="position:relative;" class="row  reg_cont reg_conts"  @click="gettown()">
                            <div class="form-group">
                                <span class="left_one add_card">镇/乡</span>

                                <span>{{selectTown.value}}</span>
                             </div>
                        </li>
                        <li class="reg_cont reg_conts">
                            <div class="form-group">
                                <span class="left_one">收货地址</span>
                                <input class="duihuang_tex newinnput" type="text" placeholder="收货地址" v-model="address">
                            </div>
                        </li>
                        <li class="reg_conts">  <div class="form-group">温馨提示:我们会对你的地址进行核对，请保持手机畅通</div></li>
                        <li><a href="javascript:" class="btn" @click="send()">{{submitaddress}}</a></li>
                    </ul>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import '../../plugins/iosSelect'
export default {
  data () {
    return {
      title: '收货地址',
      name:"",
      mobile:"",
      address:"",
      submitaddress:"确认",

      province:[],
      city:[],
      area:[],
      town:[],

      selectProvince:{value:'请选择省份',id:0},
      selectCity:{value:'请选择城市',id:0},
      selectArea:{value:'请选择区/县',id:0},
      selectTown:{value:'请选择乡/镇',id:0},


      tender_plan_id:0,
      investCount:0,
      tender:0,

      postop:false,
    }
  },

  props:{
    allcomdata:Object,
  },
  methods:{
    send(){
        let _this =this
        let query = _this.$route.query

        _this.tender_plan_id=_this.allcomdata.tender_plan_id
        _this.tender=_this.allcomdata.tender
        _this.investCount=_this.allcomdata.investCount







        let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
       if(this.name==""){
              this.$msg.alert("请输入真实姓名！")
              return false
          }
          if(rename.test(this.name).length >20){
              this.$msg.alert("真实姓名不能大于20个中文字符")
              return false
          }
       if(!(/^1[34578]\d{9}$/.test(_this.mobile))){
              this.$msg.alert("手机号码有误，请重填")
              return false;
        }

         if(_this.selectProvince.id!=0){
            _this.province=_this.selectProvince.value
          }else{
             _this.province=[]
             this.$msg.alert("请选择省份")
             return false
          }

          if(_this.selectCity.id!=0){
            _this.city=_this.selectCity.value
          }else{
            _this.city=[]
             this.$msg.alert("请选择城市")
             return false
          }
           if(_this.selectArea.id!=0){
            _this.area=_this.selectArea.value
          }else{
            _this.area=[]
             this.$msg.alert("请选择区/县")
             return false
          }

           if(_this.selectTown.id!=0){
            _this.town=_this.selectTown.value
          }else{
            _this.town=[]
          }

          if(_this.address){
          }else{
             this.$msg.alert("请填写收货地址")
             return false
          }




       this.$msg.confirm("<div style='text-align:left'>商品："+_this.allcomdata.name+"<br />投资金额：<span style='color:#f00'>"+_this.allcomdata.pay+"元</span><br />期限：<span style='color:#f00'>"+_this.allcomdata.day+'天</span><br />收件人：'+_this.name+'<br />联系电话：'+_this.mobile+'<br />地址：'+_this.province+_this.city+_this.area+_this.town+_this.address+"</div>",function(){

          this.$http(this.$api.SetJDAddress({"ProvinceId":_this.selectProvince.id,"CityId":_this.selectCity.id,"CountyId":_this.selectArea.id,"TownId":_this.selectTown.id,"JDAddress":_this.province+'/'+_this.city+'/'+_this.area+'/'+_this.town,"Name":_this.name,"MobilePhone":_this.mobile,"AddressDetail":_this.address}))
          .then((data) => {

              if(data.data.ResultCode=100000){
                  this.$http(this.$api.GoodsTenderPay({tender_plan_id:_this.tender_plan_id,investCount:_this.investCount}))
                  .then((data) => {
                    console.log(data)
                    if(data.data.ResultCode=100000){
                      //this.$msg.alert(data.data.ResultMessage)
                      _this.$emit('gopostop', _this.postop);
                      setTimeout(function(){
                        //_this.$router.push('/zerotenderdetail?tender='+_this.tender+'&investCount='+_this.investCount+'&day='+query.day+'&message='+data.data.ResultMessage)
                        _this.$msg.alert(data.data.ResultMessage)
                        console.log(1111)
                      },0)

                    }
                  })
              }
            });
      },function(){
        //console.log(_this.province)
      },"取消","确认")
    },
    getprovince(){
      let _this=this

      _this.selectCity={value:'请选择城市',id:0}
      _this.selectArea={value:'请选择区/县',id:0}
      _this.selectTown={value:'请选择乡/镇',id:0}


       this.$http(this.$api.JDArea({"type":1,"id":0} ))
      .then((data) => {
        let newarr=[];
        newarr=data.data.ResultData
        _this.province=[]
        for(var x in newarr){
         _this.province[x]=newarr[x]
          _this.province[x].value=_this.province[x].name
        }


        let provinceIosSelect = new IosSelect(1,[_this.province],{
                title:"选择省份",
                relation: [1,0],
                callback: function (selectOneObj,selectTwoObj) {
                    _this.selectProvince.value=selectOneObj.value
                    _this.selectProvince.id=selectOneObj.id
                }
            })
        });
    },

    getcity(){
      let _this=this
      _this.selectArea={value:'请选择区/县',id:0}
      _this.selectTown={value:'请选择乡/镇',id:0}
      _this.city=[]
      if(_this.selectProvince.id==0){
        this.$msg.alert("请先选择省份")
        return false
      }
       this.$http(this.$api.JDArea({"type":2,"id":_this.selectProvince.id} ))
      .then((data) => {
        let newarr=[];
        newarr=data.data.ResultData
        for(var x in newarr){
          _this.city[x]=newarr[x]
          _this.city[x].value=_this.city[x].name
        }

        let cityIosSelect = new IosSelect(1,[_this.city],{
                title:"选择城市",
                relation: [1,0],
                callback: function (selectOneObj) {
                    _this.selectCity.value=selectOneObj.value
                    _this.selectCity.id=selectOneObj.id
                }
            })
        });
    },
    getarea(){
      let _this=this
      _this.selectTown={value:'请选择乡/镇',id:0}
       _this.area=[]
      if(_this.selectCity.id==0){
        this.$msg.alert("请先选择城市")
        return false
      }
       this.$http(this.$api.JDArea({"type":3,"id":_this.selectCity.id} ))
      .then((data) => {
        let newarr=[];
        newarr=data.data.ResultData
        for(var x in newarr){
         _this.area[x]=newarr[x]
          _this.area[x].value=_this.area[x].name
        }

        let cityIosSelect = new IosSelect(1,[_this.area],{
                title:"选择区/县",
                relation: [1,0],
                callback: function (selectOneObj) {
                    _this.selectArea.value=selectOneObj.value
                    _this.selectArea.id=selectOneObj.id
                }
            })
        });
    },
    gettown(){
      let _this=this
      if(_this.selectArea.id==0){
        this.$msg.alert("请先选择城市")
        return false
      }

      _this.town=[]
       this.$http(this.$api.JDArea({"type":4,"id":_this.selectArea.id} ))
      .then((data) => {

        if(!data.data.ResultData[0]){

            this.$msg.alert("无可选择项",function(){
               _this.selectTown.value='';
            _this.town='';

            })
            //_this.town='',

            return

        }
        let newarr=[];
        newarr=data.data.ResultData
        for(var x in newarr){
         _this.town[x]=newarr[x]
          _this.town[x].value=_this.town[x].name
        }

        let cityIosSelect = new IosSelect(1,[_this.town],{
                title:"选择区/县",
                relation: [1,0],
                callback: function (selectOneObj) {
                    _this.selectTown.value=selectOneObj.value
                    _this.selectTown.id=selectOneObj.id
                }
            })
        });
    },
  },
  created:function(){
    let _this =this

    this.$http(this.$api.myAddress({}))

    .then((data) => {

          if(data.data.ResultData.isTrue){
            _this.name=data.data.ResultData.list.name
            _this.mobile=data.data.ResultData.list.mobile_phone
            _this.address=data.data.ResultData.list.address_detail
            _this.submitaddress="确认"

            _this.selectProvince.value=data.data.ResultData.list.province
            _this.selectCity.value=data.data.ResultData.list.city
            _this.selectArea.value=data.data.ResultData.list.county
            _this.selectTown.value=data.data.ResultData.list.town

            _this.selectProvince.id=data.data.ResultData.list.provinceID
            _this.selectCity.id=data.data.ResultData.list.cityID
            _this.selectArea.id=data.data.ResultData.list.countyID
            _this.selectTown.id=data.data.ResultData.list.townID
          }
      });

  },
  components:{

  }
}
</script>

<style lang="scss" scoped>
#con{height:100%;width:100%;background:#fff;padding-bottom:rem(280)}
.forget_box{ font-size:0.35rem; min-height:0.75rem; line-height:0.75rem;}

.forget_box h1{ text-align:center; background-color:#FFF; border-bottom:1px solid #f4f4f4;}
.forget_box h1 span{ color:#FF3533;}
.forget_box li{min-height:1.0rem; line-height:1.0rem; padding:0.2rem; width:auto; overflow:hidden;}
.forget_box li a.btn{height:1.0rem; width:90%; text-align:center; line-height:1.0rem; display:block; background-color:#de3132; color:#FFF;border-radius:0.125rem; margin:auto;}
.forget_box .yzmwz{width: 30% !important; margin: 0.25rem 0; line-height: 0.75rem;height:0.75rem;padding:0;text-indent:0;float:none;display:inline-block;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.top-group {border-top:none;}
.form-group input {width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;outline: 0;float: left;font-size:0.35rem;}
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
.reg_cont {background:#fff;padding-top:0.025rem;}

.forget_box .reg_conts {padding:0px;}

.forget_box ul li.row .form-group:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10); color:#d8d8d8}

.window_common01 .content{text-align:left;}
</style>


