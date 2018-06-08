<template>
<div class="container">
  <heads :title="title"></heads>
        <div class="tab_bot">
          <div class="tab_divdgx tab_divdgxdd">
            <a href="javascript:" class="a_lianjie">
                <dl class="tab_dlgx">
                    <dt>
                        <p class="tab_leftps f16"><i></i>{{state.msg.MessageName}}</p>
                        <span class="dlSpangxs">{{state.msg.SendTime.substr(0,10)}}</span>
                    </dt>
                    <dd class="nobac">
                        {{state.msg.MessageContent}}
                    </dd>
                </dl>
            </a>
        </div>
      </div>
</div>
</template>

<script>


import heads from '../../components/head';
export default {
  data () {
    return {
      title:"消息详细",
      state:this.$store.state,
    }
  },
  methods:{


  },
  created :function(){
  },
     components:{
    heads
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tab_bot .tab_divdgx{line-height: 1.0rem;background: #fff;padding:0.25rem;margin-bottom:0.25rem;border-bottom: 1px solid #c8c8c8;width:100%;box-sizing:border-box;}
.tab_bot .tab_divdgxdd{line-height: 1.0rem;background: #fff;padding:0.25rem;margin-bottom: 0px;border-bottom:none;width:100%;}
.tab_divdgx .tab_leftp{text-align: left;float:left;width:75%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap; }
.tab_divdgx .f16{font-size:0.4rem;}
.tab_divdgx .tab_leftp i{width:0.2rem;height:0.2rem;border-radius: 0.2rem;background: #de3132;display: inline-block;margin-right: 0.25rem;}
.tab_divdgx .tab_leftp:visited {background:#999;}
.tab_divdgx .tab_dlgx .dlSpangx{color: #d2d2d2;font-size: 0.35rem;}
.tab_bot .tab_divdgx dd{text-align: left;color: #ababab;font-size: 0.4rem;background: url(/static/img/my/li_you.png) no-repeat right center;background-size:0.3rem;}
.tab_bot .tab_divdgx dd.nobac{text-align: left;color: #ababab;font-size: 0.4rem;background:none;line-height:0.625rem;}

.tab_divdgx .tab_leftps{text-align: left;width:75%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap;color: #5c5c5c; }
.tab_divdgxdd .tab_leftps{text-align: left;width:100%;text-overflow:ellipsis;overflow: hidden; white-space: nowrap;color: #5c5c5c; }
.tab_divdgx .tab_leftps i{width:0.2rem;height:0.2rem;border-radius: 0.2rem;background: #de3132;display: inline-block;margin-right: 0.25rem;}
.tab_divdgx .tab_dlgx .dlSpangxs{color: #d2d2d2;font-size: 0.35rem;text-align: left;display: block;}
.tab_divdgx .a_lianjie .tab_dlgx .tab_leftp i {background: #de3132;}
.tab_divdgxs .a_lianjie .tab_dlgx .tab_leftp i {background:#999;}
</style>
