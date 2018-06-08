<template>
<div class="container">
  <heads :title="title" href="/my"></heads>
        <div class="per_topzh">
                <div class="leftimg" @click="showfileFn" :style="Portrait"></div>
                <div class="per_moneyzh">
                    <p class="money_topzh">*{{user.UserName.substr(1,user.UserName.lenght)}}</p>
                    <p class="p_moneyzh">{{user.MobilePhone.substr(0,3)}}****{{user.MobilePhone.substr(7,11)}}</p>

                </div>
        </div>
        <div class="accont_conzh">
          <ul>
              <li>
              <router-link :to="'/setphone'"  class="my_telphone">
                    <i></i>
                    绑定手机
                    <span>重新绑定</span>
                </router-link>
              </li>
          </ul>
          <ul>
            <li>
            <router-link :to="'/updatapsw'"  class="my_pass">
                  <i></i>
                  登录密码
                  <span>修改密码</span>
              </router-link>
            </li>
            <li>
            <router-link :to="'/setpaypsw'"  class="my_pay">
                  <i></i>
                  交易密码
                  <span>{{ispaypassword}}</span>
              </router-link>
            </li>
       <li class="bind_weixin" v-if="!isweixin">
                <a href="javascript:" class="my_weixin" style="background:none;" @click="bindweixin()">
                    <i></i>
                    绑定微信
                    <span :class="{active:isweixin}"></span>

                </a>
            </li>
            <li class="bind_weixin" v-else>
            <router-link :to="'/unweixinbind'"  class="my_weixin">
                  <i></i>
                  解绑微信
                  <span :class="{active:isweixin}"></span>
              </router-link>
            </li>
          </ul>
          <ul>
<!--               <li>
              <router-link :to="'/company'"  class="my_help">
                      <i></i>
                      关于我们
                 </router-link>
              </li> -->
              <!--
              <li>
                  <a href="/my/custom" class="my_guwen">
                      <i></i>
                      理财顾问
                  </a>
              </li>
                  -->
              <li>
                  <a href="JavaScript:" class=" my_aboutus" @click="outuser()">
                      <i></i>
                      退出
                  </a>
              </li>
          </ul>
      </div>
<div v-if="showfile">
    <div class="mask"  @click="cancel"></div>
    <div class="user_photo">
        <div class="btn fileinput"><a href="javascript:">选择图片</a><input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)"></div>
        <div class="btn"><a href="javascript:" @click="cancel">取消</a></div>
    </div>
</div>
<div class="showimg_box" v-show="showimg">
  <div class="canvasbox">
    <vueCropper ref="cropper" :img="example.img" :autoCrop="example.autoCrop" :autoCropWidth="example.autoCropWidth" :autoCropHeight="example.autoCropHeight" :fixedBox="example.fixedBox" :canScale="example.canScale"
  ></vueCropper>
  </div>
  <div class="subbtn">
    <button @click="changeScale(1)" class="btn">放大</button>
    <button @click="changeScale(-1)" class="btn">缩小</button>
    <button @click="rotateLeft" class="btn">向左旋转</button>
    <button @click="rotateRight" class="btn">向右旋转</button>
  </div>
  <div class="canvas_btn"><a href="javascript:" @click="cancel2">取消</a><a href="javascript:" @click="submitphoto">上传头像</a></div>
</div>


</div>
</template>

<script>
import heads from '../../components/head';
  import ls from '../../store/lStorage.js'
  import config from '../../api/ajax.js'
  import vueCropper from 'vue-cropper'
export default {

  data () {
    return {
      title:"个人设置",
      state:this.$store.state,
      ispaypassword:"未设置",
      user:{
        UserName:"",
        MobilePhone:""
      },
      Portrait:"",
      isweixin:false,
      showimg:false,
      showfile:false,
      example: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true,
        canScale:true,
      },
    }
  },
  methods:{
    cancel(){
      this.showfile = false;
    },
    showfileFn(){
      this.showfile = true;
    },
    cancel2(){
      this.showimg=false;
    },
    submitphoto(){
       let _this =this
       this.$refs.cropper.getCropData((data) => {
          let base64 = data.replace(/\+/g, '_').split("data:image/jpeg;base64,")[1]; //替换+号
          _this.$http(_this.$api.UploadPortrait({"PicBytes":base64,"ExtendName":".jpg"}))
          .then((data) => {
              if(data.data.ResultCode==100000){
                _this.Portrait = 'background:url('+data.data.ResultData.Portrait+') 0% 0% / 100% no-repeat;'
                _this.showimg=false;
              }else{
                _this.$msg.alert(data.data.ResultMessage)
              }

            });
        })

    },
    changeScale(num){
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft(){
      this.$refs.cropper.rotateLeft()
    },
    rotateRight(){
      this.$refs.cropper.rotateRight()
    },
    dealImage(path, obj, callback){ //压缩图片
       let img = new Image();
       img.src = path;
       img.onload = function(){
       let _this = this;
        // 默认按比例压缩
        let w = _this.width,
         h = _this.height,
         scale = w / h;
         w = obj.width || w;
         h = obj.height || (w / scale);
        let quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let anw = document.createAttribute("width");
        anw.nodeValue = w;
        let anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(_this, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
         quality = obj.quality;
        }
        // quality值越小图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality );
        // 返回base64的值
        callback(base64);
      }
    },
    uploadImg (e) {
      let file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
         this.$msg.alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
         return false
       }

      let reader = new FileReader()
      let _this = this
      reader.readAsDataURL(file)
      reader.onload = (e) => {
      _this.dealImage(e.target.result,{
        width:800, //最大宽度
        },function(data){
          _this.showimg = true ;
          _this.showfile = false;
          _this.example.img = data
        })
      }

    },

    outuser(){
      let _this =this
      _this.$msg.confirm("确认退出当前账号？",function(){
        _this.$http(_this.$api.userloginout({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            ls.clear()
            _this.$store.commit("userinfo")
            _this.$store.commit("xjhinfo")
            _this.$msg.alert("退出成功",function(){
              _this.$router.push('/index')
            })
          }

        });
      })

    },
    getuserphoto(){
      let _this =this
     _this.$http(_this.$api.GetPortrait({}))
    .then((data) => {
       if(data.data.ResultData.Portrait!=""){
        _this.Portrait = 'background:url('+data.data.ResultData.Portrait+') 0% 0% / 100% no-repeat;'
       }
      });
    },
    bindweixin(){
      let _this =this
       _this.$msg.confirm("绑定微信，需重新登录！",function(){
        _this.$http(_this.$api.userloginout({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            ls.clear()
            _this.$store.commit("userinfo")
            _this.$store.commit("xjhinfo")
            window.location.href=config.baseUrl+"/api/Wx/login?state=/login&isorigionLogin=true"
          }

        });
      })
    },
           userinfo(){
              let _this = this
                this.$http(this.$api.QueryRealNameInfo({}))
                 .then((data) => {
                    _this.user.UserName = data.data.ResultData.RealName

                    _this.user.MobilePhone = _this.state.user.MobilePhone
                })
            },
            userRealNameStatus(){
                let _this = this
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus==3){
                        _this.userinfo()
                    }else{
                      _this.user.UserName = _this.state.user.UserName
                      _this.user.MobilePhone = _this.state.user.MobilePhone
                    }

                })
            }
  },
  created :function(){
    let _this =this
    this.$http(this.$api.isPayPassword({}))
      .then((data) => {
        if(data.data.ResultData=="true"){
          _this.ispaypassword="修改/设置"
        }
      });
      if(typeof this.state.isweixin !="undefined"){
        this.$http(this.$api.GetUserInfo({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
              let user = ls.getItem("_user")
              let usertoken = user.Token
              let obj = data.data.ResultData
              obj.Token = usertoken
              ls.setItem("_user",obj)
              _this.$store.commit("userinfo")
              _this.user.UserName = _this.state.user.UserName
              _this.user.MobilePhone = _this.state.user.MobilePhone
          }
        });
      }else{
              _this.userRealNameStatus()
          }
      this.getuserphoto();

    _this.$http(_this.$api.iswxbind({}))
    .then((data) => {
       if(data.data.ResultData){
        _this.isweixin = true;
       }
      });

  },
  beforeDestory() {
    // window.removeEventListener('popstate',this.popstatechange,false)
  },
  components:{
    heads,
    vueCropper
  }
}
</script>
<style lang="scss" scoped>

.per_topzh{height: 3.875rem;background: #de3132;}
.per_topzh .leftimg{width:2.125rem;height: 2.125rem;float: left;margin:0.75rem 0.375rem 0.625rem 0.625rem;border:0.05rem solid #fddf96;border-radius: 2.125rem;@include bg("/static/img/my/person_head.png");background-size:100%;}
.per_moneyzh{padding:1.0rem 0 1.0rem 0px;text-align: left;color: #fff;/*background: url(../img/icon_ri.png) no-repeat 7.875rem center;background-size:0.25rem;<img src="static/img/my/person_head.png" class="leftimg">*/}
.money_topzh{font-size: 0.5rem;line-height: 0.875rem;}
.p_moneyzh{font-size: 0.45rem;line-height: 0.875rem;}

.accont_conzh{background:#f3f3f3;padding-bottom: 1.5rem;}
.accont_conzh ul{background:#fff;margin-top:0.25rem;}
.accont_conzh ul li{width:auto;padding:0 0.375rem;line-height: 1.25rem;height: 1.25rem;border-bottom:1px solid #eee;}
.accont_conzh ul li:last-child{border-bottom: none;}
.accont_conzh ul li a{display: block;margin:0 auto;width: auto;padding-right:0.4rem;height: 1.25rem;line-height: 1.25rem;color: #626262;text-align: left;background: url(/static/img/my/li_you.png) no-repeat right center;background-size:0.2rem ; font-size:0.4rem}
.accont_conzh ul li a span {display:inline;float:right;width:2rem; color:#ccc;text-align:right;}
.accont_conzh ul li a i{width: 0.575rem;height: 0.55rem;float: left;background-size:0.575rem 3.95rem;margin:0.35rem 0.125rem 0 0; }
.accont_conzh ul li a .fir_span{float: right;color: #bcbcbc;width: 45%;font-size: 0.35rem;text-align: right;padding-right: 0.125rem;}
.accont_conzh ul li a .fir_spand{float: right;color: #bcbcbc;width: 45%;font-size: 0.35rem;text-align: right;padding-right: 0.125rem;font-weight: bold;}
.accont_conzh ul li a .yel_span{color: #fda530;}
.accont_conzh ul li .my_shiming i{background-position:0 0.075rem;height: 0.475rem;margin:0.4rem 0.125rem 0 0;}
.accont_conzh ul li .my_telphone i{@include bg("/static/img/my/icon_security_mobie.png")}
.accont_conzh ul li .my_pass i{@include bg("/static/img/my/icon_security_login.png")}
.accont_conzh ul li .my_pay i{@include bg("/static/img/my/icon_security_trade.png")}
.accont_conzh ul li .my_help i{background-position:0 -2.25rem;}
.accont_conzh ul li .my_guwen i{background-position:0 -2.8rem;height: 0.575rem;}
.accont_conzh ul li .my_aboutus i{@include bg("/static/img/my/icon_security_ablout.png")}
.accont_conzh ul li .my_weixin i{@include bg("/static/img/my/icon_security_weixin.png")}
.accont_conzh ul li.bind_weixin a{ padding-right:0;}
.accont_conzh ul li.bind_weixin span{background:url(/static/img/my/switch_black.png) no-repeat; background-size:100% 100%; width:1.4rem; height:0.7rem; margin-top:0.25rem;}
.accont_conzh ul li.bind_weixin span.active{background:url(/static/img/my/switch_yellow.png) no-repeat; background-size:100% 100%; width:1.4rem; height:0.7rem; margin-top:0.25rem;}
.showimg_box{position:fixed;top:0;left:0;bottom:0;right:0;background:#fff;}
.showimg_box .canvasbox{width:90%;margin:auto;height:8rem;margin-top:rem(20);}



.user_photo{position:fixed; bottom:0; z-index:1001; width:100%; margin:auto;}
.user_photo .icon_box{background:#fff; width:95%; margin:auto; border-radius:0.125rem; padding:0.25rem; box-sizing:border-box;}
.user_photo .btn{background:#fff; width:95%; margin:auto; border-radius:0.125rem; margin-top:0.25rem;margin-bottom:0.25rem;}
.user_photo .btn a{line-height:1.25rem; text-align:center; display:block; font-size:0.4rem; color:#555;}
.fileinput{position: relative;overflow: hidden;}
.fileinput input{ position: absolute;left: 0px;top: 0px;opacity: 0;-ms-filter: 'alpha(opacity=0)'; width:100%; height:1.25rem;}
.canvas_btn{margin-top:rem(20); text-align:center;}
.canvas_btn a{display:inline-block;width:rem(150);height:rem(45); line-height:rem(40);text-align:center; background:#d8d8d8;border-radius:rem(5); font-size:0.45rem; color:#fff;}
.canvas_btn a:last-child{margin-left:rem(10);background:#de3132;}
.subbtn{margin-top:rem(10);text-align:center;}
.subbtn .btn{border:none;background:#de3132;color:#fff; display:inline-block; height:rem(30);line-height:rem(30); margin-left:rem(10);border-radius:rem(5)}
</style>