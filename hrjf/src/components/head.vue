<template>
<!-- <heads :title="title" showtext="true" text="我的成绩" :textlink="'/clock?page=3&ver='+this.ver" bgcolor="#7d00e7" windolink="true"></heads> -->
<div class="link_head" v-if="isapp" :style="'background:'+data.bgcolor">
    <h1>
        <span>
          <a href="javascript:" @click="goback()"><img :src="data.lefticon" :style="imgstyle"></a>
        </span>
        {{data.title}}
        <p class="hrcf_topr" v-if="data.showicon">
            <a href="javascript:" class="text"  @click="golink()">
              <i v-if="data.msgicon"></i>
               <img :src="data.righticon">
            </a>
        </p>
        <p class="hrcf_topr" v-if="data.showtext">
            <a href="javascript:" class="text" @click="golink()">{{data.text}}</a>
        </p>
    </h1>
</div>
</template>
<script>
export default {
  data () {
    return {
      isapp:true,
    }
  },
  props: {
    title:"",
    href:"",
    showicon:false,
    showtext:false,
    text:'',
    textlink:'',
    bgcolor:'',
    windolink:false,
    msgicon:false,
    lefticon:{
      default:'static/img/head/icon_left.png'
    },
    imgstyle:{
      default:'width:0.25rem'
    },
    righticon:{
      default:'static/img/head/icon_jia.png'
    }
  },
methods:{
    goback(){
      if(typeof this.data.href==="undefined"){
          window.history.go(-1)
      }else{
        this.$router.push(this.data.href)
      }
    },
    golink(){
      if(this.data.windolink){
          window.location.href= this.data.textlink
      }else{
          this.$router.push(this.data.textlink)
      }

    }
  },
  created:function(){
    let q = this.$route.query

    // if(q.ver=='ios'||q.ver=='android'){
    //   this.isapp = false
    // }
    console.log(this.$store.state.isapp)
    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.isapp = false
    }
  },
  computed:{
    data:function(){
      let _this=this;
      let d = {
        title:_this.title,
        href:_this.href,
        showicon:_this.showicon,
        showtext:_this.showtext,
        text:_this.text,
        textlink:_this.textlink,
        bgcolor:_this.bgcolor,
        windolink:_this.windolink,
        lefticon:_this.lefticon,
        righticon:_this.righticon,
        msgicon:_this.msgicon,
      }
      return d
    }
 },
}
</script>