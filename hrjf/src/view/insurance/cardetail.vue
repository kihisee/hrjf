<template>
   <div id="frame">
    <heads :title="title"   v-if="isapp"></heads>
    <div id="con">

<div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
          <img :src="slide" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
  <div class="selectbox" :class="{isappbox:!isapp}">
    <div class="selectcont">
      <ul>
        <li class="row" @click="getCity">
            <p class="rectgray"><img src="../../../static/img/insurance/cityicon.png"  /></p>
            <span class="left_one">投保城市：</span>
            <span class="right_one">{{selectProv}} {{selectCity}}</span>
        </li>
        <li>
            <p class="rectgray"><img src="../../../static/img/insurance/cariconred.png"  /></p>
            <span class="left_one">车牌号码</span>
            <input type="text"  class="right_one" v-model="chepai"/>
        </li>
      </ul>

      <p class="bottonselect" @click="gototen()">去投保</p>
    </div>
  </div>


    </div>
  <div class="whitebox marginwhitebox">
    <div class="toplist">
          <span class="hualeft"></span>
          <p class="midlleword">投保流程</p>
          <span class="huaright"></span>
      </div>

      <div class="rectfen">
          <div class="toprect">
            <div class="rectgraylist"></div>
            <div class="line"></div>
            <div class="rectgraylist"></div>
            <div class="line"></div>
            <div class="rectgraylist"></div>
            <div class="line"></div>
            <div class="rectgraylist"></div>
          </div>

          <ul>
            <li>填写车辆信息</li>
            <li>人工优惠估价</li>
            <li>线下支付保费</li>
            <li>查收保单</li>
          </ul>
      </div>
  </div>

    <div class="whitebox">
      <div class="content">
<!--         <div class="toptitle">保险详情</div> -->

        <div class="conwhite" v-html="InsureDescription"></div>
      </div>
    </div>

    <div class="dialog" v-if="diolog">
        <p class="close" @click="closedio()"> </p>
        <div class="dialogcont">
          <p class="toptitle">填写车主信息</p>
          <ul>
            <li><input type="text"  :placeholder="oldername" v-model="username" /></li>
            <li><input type="text" v-model="userphone" :placeholder="olderphone"/></li>
          </ul>
          <p class="queren" @click="nowbuy()">确认预约投保</p>
        </div>
    </div>



    <div class="dialog dialogright" v-if="diologcom">
        <p class="close"  @click="closedio()"> </p>
        <div class="dialogcont">
          <p class="toptitle">投保预约成功！</p>
          <p class="middle">请保持您的电话通畅<br />
工作人员会在24小时内与您联系！</p>
          <p class="queren" @click="closecom()">我知道了</p>
        </div>
    </div>


    <div class="allgray"  v-if="diolog || diologcom"></div>

 </div>




</template>

<script>
import globlenav from '../../components/nav';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heads from '../../components/head'
import '../../plugins/iosSelect'
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title: '保险',
      state:this.$store.state,
      allData:[],
      listnowdata:[],
      activeindex:0,

      explian:[],
      indeed:true,
      check:true,
      telphone:"",

      diolog:false,
      diologcom:false,

      chepai:'',
      username:'',
      userphone:'',

      oldername:'请输入您的姓名',
      olderphone:'请输入您的手机号',
      InsureDescription:[],

      bannerList:'',
      swiperOption: {
        autoplay: 0,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true,

      },

       isapp:true,


      selectCity: '请选择您所在的城市',
      selectProv:"",
      Providdata:[{"id":"0011","value":"北京"},{"id":"0012","value":"天津"},{"id":"0013","value":"河北"},{"id":"0014","value":"山西"},{"id":"0015","value":"内蒙古"},{"id":"0021","value":"辽宁"},{"id":"0022","value":"吉林"},{"id":"0023","value":"黑龙江"},{"id":"0031","value":"上海"},{"id":"0032","value":"江苏"},{"id":"0033","value":"浙江"},{"id":"0034","value":"安徽"},{"id":"0035","value":"福建"},{"id":"0036","value":"江西"},{"id":"0037","value":"山东"},{"id":"0041","value":"河南"},{"id":"0042","value":"湖北"},{"id":"0043","value":"湖南"},{"id":"0044","value":"广东"},{"id":"0045","value":"广西"},{"id":"0046","value":"海南"},{"id":"0050","value":"重庆"},{"id":"0051","value":"四川"},{"id":"0052","value":"贵州"},{"id":"0053","value":"云南"},{"id":"0054","value":"西藏"},{"id":"0061","value":"陕西"},{"id":"0062","value":"甘肃"},{"id":"0063","value":"青海"},{"id":"0064","value":"宁夏"},{"id":"0065","value":"新疆"},{"id":"2001","value":"香港"},{"id":"2002","value":"澳门"},{"id":"2003","value":"台湾"}],
      allCity:[{"parentId":"0011","id":"1100","value":"北京"},{"parentId":"0012","id":"1200","value":"天津"},{"parentId":"0013","id":"1301","value":"石家庄"},{"parentId":"0013","id":"1302","value":"保定"},{"parentId":"0013","id":"1303","value":"沧州"},{"parentId":"0013","id":"1304","value":"承德"},{"parentId":"0013","id":"1305","value":"邯郸"},{"parentId":"0013","id":"1306","value":"衡水"},{"parentId":"0013","id":"1307","value":"廊坊"},{"parentId":"0013","id":"1308","value":"秦皇岛"},{"parentId":"0013","id":"1309","value":"唐山"},{"parentId":"0013","id":"1310","value":"邢台"},{"parentId":"0013","id":"1311","value":"张家口"},{"parentId":"0014","id":"1401","value":"太原"},{"parentId":"0014","id":"1402","value":"长治"},{"parentId":"0014","id":"1403","value":"大同"},{"parentId":"0014","id":"1404","value":"晋城"},{"parentId":"0014","id":"1405","value":"离石"},{"parentId":"0014","id":"1406","value":"临汾"},{"parentId":"0014","id":"1407","value":"朔州"},{"parentId":"0014","id":"1408","value":"忻州"},{"parentId":"0014","id":"1409","value":"阳泉"},{"parentId":"0014","id":"1410","value":"榆次"},{"parentId":"0014","id":"1411","value":"运城"},{"parentId":"0014","id":"1412","value":"晋中"},{"parentId":"0014","id":"1413","value":"吕梁"},{"parentId":"0015","id":"1501","value":"呼和浩特"},{"parentId":"0015","id":"1502","value":"包头"},{"parentId":"0015","id":"1503","value":"阿拉善"},{"parentId":"0015","id":"1504","value":"巴彦淖尔"},{"parentId":"0015","id":"1505","value":"赤峰"},{"parentId":"0015","id":"1506","value":"呼伦贝尔"},{"parentId":"0015","id":"1507","value":"乌海"},{"parentId":"0015","id":"1508","value":"乌兰察布"},{"parentId":"0015","id":"1509","value":"锡林郭勒"},{"parentId":"0015","id":"1510","value":"兴安"},{"parentId":"0015","id":"1511","value":"鄂尔多斯"},{"parentId":"0015","id":"1512","value":"通辽"},{"parentId":"0021","id":"2101","value":"沈阳"},{"parentId":"0021","id":"2102","value":"大连"},{"parentId":"0021","id":"2103","value":"鞍山"},{"parentId":"0021","id":"2104","value":"本溪"},{"parentId":"0021","id":"2105","value":"朝阳"},{"parentId":"0021","id":"2106","value":"丹东"},{"parentId":"0021","id":"2107","value":"抚顺"},{"parentId":"0021","id":"2108","value":"阜新"},{"parentId":"0021","id":"2109","value":"葫芦岛"},{"parentId":"0021","id":"2110","value":"锦州"},{"parentId":"0021","id":"2111","value":"辽阳"},{"parentId":"0021","id":"2112","value":"盘锦"},{"parentId":"0021","id":"2113","value":"铁岭"},{"parentId":"0021","id":"2114","value":"营口"},{"parentId":"0022","id":"2201","value":"长春"},{"parentId":"0022","id":"2202","value":"白城"},{"parentId":"0022","id":"2203","value":"白山"},{"parentId":"0022","id":"2204","value":"吉林"},{"parentId":"0022","id":"2205","value":"辽源"},{"parentId":"0022","id":"2206","value":"四平"},{"parentId":"0022","id":"2207","value":"松原"},{"parentId":"0022","id":"2208","value":"通化"},{"parentId":"0022","id":"2209","value":"延边"},{"parentId":"0023","id":"2301","value":"哈尔滨"},{"parentId":"0023","id":"2302","value":"大庆"},{"parentId":"0023","id":"2303","value":"大兴安岭"},{"parentId":"0023","id":"2304","value":"鹤岗"},{"parentId":"0023","id":"2305","value":"黑河"},{"parentId":"0023","id":"2306","value":"鸡西"},{"parentId":"0023","id":"2307","value":"佳木斯"},{"parentId":"0023","id":"2308","value":"牡丹江"},{"parentId":"0023","id":"2309","value":"七台河"},{"parentId":"0023","id":"2310","value":"齐齐哈尔"},{"parentId":"0023","id":"2311","value":"双鸭山"},{"parentId":"0023","id":"2312","value":"绥化"},{"parentId":"0023","id":"2313","value":"伊春"},{"parentId":"0031","id":"3100","value":"上海"},{"parentId":"0032","id":"3201","value":"南京"},{"parentId":"0032","id":"3202","value":"常州"},{"parentId":"0032","id":"3203","value":"淮安"},{"parentId":"0032","id":"3204","value":"连云港"},{"parentId":"0032","id":"3205","value":"南通"},{"parentId":"0032","id":"3206","value":"苏州"},{"parentId":"0032","id":"3207","value":"宿迁"},{"parentId":"0032","id":"3208","value":"泰州"},{"parentId":"0032","id":"3209","value":"无锡"},{"parentId":"0032","id":"3210","value":"徐州"},{"parentId":"0032","id":"3211","value":"盐城"},{"parentId":"0032","id":"3212","value":"扬州"},{"parentId":"0032","id":"3213","value":"镇江"},{"parentId":"0032","id":"3214","value":"胥浦"},{"parentId":"0033","id":"3301","value":"杭州"},{"parentId":"0033","id":"3302","value":"宁波"},{"parentId":"0033","id":"3303","value":"湖州"},{"parentId":"0033","id":"3304","value":"嘉兴"},{"parentId":"0033","id":"3305","value":"金华"},{"parentId":"0033","id":"3306","value":"绍兴"},{"parentId":"0033","id":"3307","value":"台州"},{"parentId":"0033","id":"3308","value":"温州"},{"parentId":"0033","id":"3309","value":"舟山"},{"parentId":"0033","id":"3310","value":"衢州"},{"parentId":"0033","id":"3311","value":"丽水"},{"parentId":"0034","id":"3401","value":"合肥"},{"parentId":"0034","id":"3402","value":"安庆"},{"parentId":"0034","id":"3403","value":"蚌埠"},{"parentId":"0034","id":"3404","value":"巢湖"},{"parentId":"0034","id":"3405","value":"池州"},{"parentId":"0034","id":"3406","value":"滁州"},{"parentId":"0034","id":"3407","value":"阜阳"},{"parentId":"0034","id":"3408","value":"淮北"},{"parentId":"0034","id":"3409","value":"淮南"},{"parentId":"0034","id":"3410","value":"黄山"},{"parentId":"0034","id":"3411","value":"六安"},{"parentId":"0034","id":"3412","value":"马鞍山"},{"parentId":"0034","id":"3414","value":"铜陵"},{"parentId":"0034","id":"3415","value":"芜湖"},{"parentId":"0034","id":"3416","value":"宣城"},{"parentId":"0034","id":"3417","value":"亳州"},{"parentId":"0034","id":"3418","value":"宿州"},{"parentId":"0035","id":"3501","value":"福州"},{"parentId":"0035","id":"3502","value":"厦门"},{"parentId":"0035","id":"3503","value":"龙岩"},{"parentId":"0035","id":"3504","value":"南平"},{"parentId":"0035","id":"3505","value":"宁德"},{"parentId":"0035","id":"3506","value":"莆田"},{"parentId":"0035","id":"3507","value":"泉州"},{"parentId":"0035","id":"3508","value":"三明"},{"parentId":"0035","id":"3509","value":"漳州"},{"parentId":"0036","id":"3601","value":"南昌"},{"parentId":"0036","id":"3602","value":"抚州"},{"parentId":"0036","id":"3603","value":"赣州"},{"parentId":"0036","id":"3604","value":"吉安"},{"parentId":"0036","id":"3605","value":"景德镇"},{"parentId":"0036","id":"3606","value":"九江"},{"parentId":"0036","id":"3607","value":"萍乡"},{"parentId":"0036","id":"3608","value":"上饶"},{"parentId":"0036","id":"3609","value":"新余"},{"parentId":"0036","id":"3610","value":"宜春"},{"parentId":"0036","id":"3611","value":"鹰潭"},{"parentId":"0037","id":"3701","value":"济南"},{"parentId":"0037","id":"3702","value":"青岛"},{"parentId":"0037","id":"3703","value":"滨州"},{"parentId":"0037","id":"3704","value":"德州"},{"parentId":"0037","id":"3705","value":"东营"},{"parentId":"0037","id":"3706","value":"菏泽"},{"parentId":"0037","id":"3707","value":"济宁"},{"parentId":"0037","id":"3708","value":"莱芜"},{"parentId":"0037","id":"3709","value":"聊城"},{"parentId":"0037","id":"3710","value":"临沂"},{"parentId":"0037","id":"3711","value":"日照"},{"parentId":"0037","id":"3712","value":"泰安"},{"parentId":"0037","id":"3713","value":"威海"},{"parentId":"0037","id":"3714","value":"潍坊"},{"parentId":"0037","id":"3715","value":"烟台"},{"parentId":"0037","id":"3716","value":"枣庄"},{"parentId":"0037","id":"3717","value":"淄博"},{"parentId":"0041","id":"4101","value":"郑州"},{"parentId":"0041","id":"4102","value":"安阳"},{"parentId":"0041","id":"4103","value":"焦作"},{"parentId":"0041","id":"4104","value":"鹤壁"},{"parentId":"0041","id":"4105","value":"开封"},{"parentId":"0041","id":"4106","value":"洛阳"},{"parentId":"0041","id":"4107","value":"南阳"},{"parentId":"0041","id":"4108","value":"平顶山"},{"parentId":"0041","id":"4109","value":"三门峡"},{"parentId":"0041","id":"4110","value":"商丘"},{"parentId":"0041","id":"4111","value":"新乡"},{"parentId":"0041","id":"4112","value":"信阳"},{"parentId":"0041","id":"4113","value":"许昌"},{"parentId":"0041","id":"4114","value":"周口"},{"parentId":"0041","id":"4115","value":"驻马店"},{"parentId":"0041","id":"4116","value":"漯河"},{"parentId":"0041","id":"4117","value":"濮阳"},{"parentId":"0041","id":"4118","value":"济源"},{"parentId":"0042","id":"4201","value":"武汉"},{"parentId":"0042","id":"4202","value":"鄂州"},{"parentId":"0042","id":"4203","value":"恩施"},{"parentId":"0042","id":"4204","value":"黄冈"},{"parentId":"0042","id":"4205","value":"黄石"},{"parentId":"0042","id":"4206","value":"荆门"},{"parentId":"0042","id":"4207","value":"荆州"},{"parentId":"0042","id":"4208","value":"十堰"},{"parentId":"0042","id":"4209","value":"随州"},{"parentId":"0042","id":"4210","value":"咸宁"},{"parentId":"0042","id":"4211","value":"襄樊"},{"parentId":"0042","id":"4212","value":"孝感"},{"parentId":"0042","id":"4213","value":"神农架"},{"parentId":"0042","id":"4214","value":"天门"},{"parentId":"0042","id":"4215","value":"宜昌"},{"parentId":"0042","id":"4216","value":"三峡"},{"parentId":"0043","id":"4301","value":"长沙"},{"parentId":"0043","id":"4302","value":"常德"},{"parentId":"0043","id":"4303","value":"郴州"},{"parentId":"0043","id":"4304","value":"衡阳"},{"parentId":"0043","id":"4305","value":"怀化"},{"parentId":"0043","id":"4306","value":"娄底"},{"parentId":"0043","id":"4307","value":"邵阳"},{"parentId":"0043","id":"4308","value":"湘潭"},{"parentId":"0043","id":"4309","value":"湘西"},{"parentId":"0043","id":"4310","value":"益阳"},{"parentId":"0043","id":"4311","value":"永州"},{"parentId":"0043","id":"4312","value":"岳阳"},{"parentId":"0043","id":"4313","value":"张家界"},{"parentId":"0043","id":"4314","value":"株洲"},{"parentId":"0044","id":"4401","value":"广州"},{"parentId":"0044","id":"4402","value":"深圳"},{"parentId":"0044","id":"4403","value":"潮州"},{"parentId":"0044","id":"4404","value":"东莞"},{"parentId":"0044","id":"4405","value":"佛山"},{"parentId":"0044","id":"4406","value":"惠州"},{"parentId":"0044","id":"4407","value":"江门"},{"parentId":"0044","id":"4408","value":"揭阳"},{"parentId":"0044","id":"4409","value":"茂名"},{"parentId":"0044","id":"4410","value":"梅州"},{"parentId":"0044","id":"4411","value":"清远"},{"parentId":"0044","id":"4412","value":"汕头"},{"parentId":"0044","id":"4413","value":"汕尾"},{"parentId":"0044","id":"4414","value":"韶关"},{"parentId":"0044","id":"4415","value":"阳江"},{"parentId":"0044","id":"4416","value":"云浮"},{"parentId":"0044","id":"4417","value":"湛江"},{"parentId":"0044","id":"4418","value":"肇庆"},{"parentId":"0044","id":"4419","value":"中山"},{"parentId":"0044","id":"4420","value":"河源"},{"parentId":"0044","id":"4421","value":"珠海"},{"parentId":"0045","id":"4501","value":"南宁"},{"parentId":"0045","id":"4502","value":"百色"},{"parentId":"0045","id":"4503","value":"北海"},{"parentId":"0045","id":"4504","value":"桂林"},{"parentId":"0045","id":"4505","value":"河池"},{"parentId":"0045","id":"4506","value":"柳州"},{"parentId":"0045","id":"4507","value":"梧州"},{"parentId":"0045","id":"4508","value":"玉林"},{"parentId":"0045","id":"4509","value":"崇左"},{"parentId":"0045","id":"4510","value":"防城港"},{"parentId":"0045","id":"4511","value":"贵港"},{"parentId":"0045","id":"4512","value":"贺州"},{"parentId":"0045","id":"4513","value":"来宾"},{"parentId":"0045","id":"4514","value":"钦州"},{"parentId":"0046","id":"4601","value":"海口"},{"parentId":"0046","id":"4602","value":"三亚"},{"parentId":"0046","id":"4603","value":"白沙"},{"parentId":"0046","id":"4604","value":"保亭"},{"parentId":"0046","id":"4605","value":"昌江"},{"parentId":"0046","id":"4606","value":"澄迈"},{"parentId":"0046","id":"4607","value":"儋州"},{"parentId":"0046","id":"4608","value":"定安"},{"parentId":"0046","id":"4609","value":"东方"},{"parentId":"0046","id":"4610","value":"乐东"},{"parentId":"0046","id":"4611","value":"临高"},{"parentId":"0046","id":"4612","value":"陵水"},{"parentId":"0046","id":"4613","value":"琼海"},{"parentId":"0046","id":"4614","value":"琼中"},{"parentId":"0046","id":"4615","value":"屯昌"},{"parentId":"0046","id":"4616","value":"万宁"},{"parentId":"0046","id":"4617","value":"文昌"},{"parentId":"0046","id":"4618","value":"五指山"},{"parentId":"0046","id":"4619","value":"洋浦"},{"parentId":"0050","id":"5000","value":"重庆"},{"parentId":"0051","id":"5101","value":"成都"},{"parentId":"0051","id":"5102","value":"巴中"},{"parentId":"0051","id":"5103","value":"达州"},{"parentId":"0051","id":"5104","value":"德阳"},{"parentId":"0051","id":"5105","value":"广安"},{"parentId":"0051","id":"5106","value":"广元"},{"parentId":"0051","id":"5107","value":"乐山"},{"parentId":"0051","id":"5108","value":"凉山"},{"parentId":"0051","id":"5109","value":"眉山"},{"parentId":"0051","id":"5110","value":"绵阳"},{"parentId":"0051","id":"5111","value":"南充"},{"parentId":"0051","id":"5112","value":"内江"},{"parentId":"0051","id":"5113","value":"攀枝花"},{"parentId":"0051","id":"5114","value":"遂宁"},{"parentId":"0051","id":"5115","value":"雅安"},{"parentId":"0051","id":"5116","value":"宜宾"},{"parentId":"0051","id":"5117","value":"自贡"},{"parentId":"0051","id":"5118","value":"泸州"},{"parentId":"0051","id":"5119","value":"阿坝"},{"parentId":"0051","id":"5120","value":"甘孜"},{"parentId":"0051","id":"5121","value":"资阳"},{"parentId":"0052","id":"5201","value":"贵阳"},{"parentId":"0052","id":"5202","value":"安顺"},{"parentId":"0052","id":"5203","value":"毕节"},{"parentId":"0052","id":"5204","value":"六盘水"},{"parentId":"0052","id":"5205","value":"铜仁"},{"parentId":"0052","id":"5206","value":"遵义"},{"parentId":"0052","id":"5207","value":"黔东南"},{"parentId":"0052","id":"5208","value":"黔南"},{"parentId":"0052","id":"5209","value":"黔西南"},{"parentId":"0053","id":"5301","value":"昆明"},{"parentId":"0053","id":"5302","value":"西双版纳"},{"parentId":"0053","id":"5303","value":"保山"},{"parentId":"0053","id":"5304","value":"楚雄"},{"parentId":"0053","id":"5305","value":"大理"},{"parentId":"0053","id":"5306","value":"德宏"},{"parentId":"0053","id":"5307","value":"红河"},{"parentId":"0053","id":"5308","value":"丽江"},{"parentId":"0053","id":"5309","value":"临沧"},{"parentId":"0053","id":"5310","value":"怒江"},{"parentId":"0053","id":"5311","value":"曲靖"},{"parentId":"0053","id":"5312","value":"思茅"},{"parentId":"0053","id":"5313","value":"文山"},{"parentId":"0053","id":"5314","value":"玉溪"},{"parentId":"0053","id":"5315","value":"昭通"},{"parentId":"0053","id":"5316","value":"中甸"},{"parentId":"0053","id":"5317","value":"迪庆州"},{"parentId":"0054","id":"5401","value":"拉萨"},{"parentId":"0054","id":"5402","value":"阿里"},{"parentId":"0054","id":"5403","value":"昌都"},{"parentId":"0054","id":"5404","value":"林芝"},{"parentId":"0054","id":"5405","value":"那曲"},{"parentId":"0054","id":"5406","value":"日喀则"},{"parentId":"0054","id":"5407","value":"山南"},{"parentId":"0061","id":"6101","value":"西安"},{"parentId":"0061","id":"6102","value":"安康"},{"parentId":"0061","id":"6103","value":"宝鸡"},{"parentId":"0061","id":"6104","value":"汉中"},{"parentId":"0061","id":"6105","value":"商洛"},{"parentId":"0061","id":"6106","value":"铜川"},{"parentId":"0061","id":"6107","value":"渭南"},{"parentId":"0061","id":"6108","value":"咸阳"},{"parentId":"0061","id":"6109","value":"延安"},{"parentId":"0061","id":"6110","value":"榆林"},{"parentId":"0062","id":"6201","value":"兰州"},{"parentId":"0062","id":"6202","value":"白银"},{"parentId":"0062","id":"6203","value":"定西"},{"parentId":"0062","id":"6204","value":"东风"},{"parentId":"0062","id":"6205","value":"合作"},{"parentId":"0062","id":"6206","value":"嘉峪关"},{"parentId":"0062","id":"6207","value":"金昌"},{"parentId":"0062","id":"6208","value":"酒泉"},{"parentId":"0062","id":"6209","value":"矿区"},{"parentId":"0062","id":"6210","value":"临夏"},{"parentId":"0062","id":"6211","value":"陇南"},{"parentId":"0062","id":"6212","value":"平凉"},{"parentId":"0062","id":"6213","value":"庆阳"},{"parentId":"0062","id":"6214","value":"天水"},{"parentId":"0062","id":"6215","value":"武威"},{"parentId":"0062","id":"6216","value":"张掖"},{"parentId":"0062","id":"6217","value":"甘南州"},{"parentId":"0063","id":"6301","value":"西宁"},{"parentId":"0063","id":"6302","value":"海东"},{"parentId":"0064","id":"6401","value":"银川"},{"parentId":"0064","id":"6402","value":"中卫"},{"parentId":"0064","id":"6403","value":"固原"},{"parentId":"0064","id":"6404","value":"石嘴山"},{"parentId":"0064","id":"6405","value":"吴忠"},{"parentId":"0065","id":"6501","value":"乌鲁木齐"},{"parentId":"0065","id":"6502","value":"阿克苏"},{"parentId":"0065","id":"6503","value":"阿勒泰"},{"parentId":"0065","id":"6504","value":"巴州"},{"parentId":"0065","id":"6505","value":"博州"},{"parentId":"0065","id":"6506","value":"昌吉"},{"parentId":"0065","id":"6507","value":"哈密"},{"parentId":"0065","id":"6508","value":"和田"},{"parentId":"0065","id":"6509","value":"喀什"},{"parentId":"0065","id":"6510","value":"克拉玛依"},{"parentId":"0065","id":"6511","value":"马兰"},{"parentId":"0065","id":"6512","value":"石河子"},{"parentId":"0065","id":"6513","value":"塔城"},{"parentId":"0065","id":"6514","value":"吐鲁番"},{"parentId":"0065","id":"6515","value":"伊犁"},{"parentId":"0065","id":"6516","value":"克州"},{"parentId":"0065","id":"6517","value":"阿拉尔"},{"parentId":"0065","id":"6518","value":"五家渠"},{"parentId":"2001","id":"9901","value":"香港"},{"parentId":"2002","id":"9902","value":"澳门"},{"parentId":"2003","id":"9903","value":"台湾"}]

    }
  },
  methods:{
    getCity(){
                let _this = this
                let cityIosSelect = new IosSelect(2,[_this.Providdata, _this.allCity],{
                    title:"选择城市",
                    relation: [1,1],
                    callback: function (selectOneObj,selectTwoObj) {
                        _this.selectCity=selectTwoObj.value
                        _this.selectProv=selectOneObj.value

                    }
                })

        },

        gototen(){
          let _this=this
           if(this.selectCity=="请选择您所在的城市"){
                this.$msg.alert("请选择投保城市！")
                return false
            }
            if(this.chepai==""){
                this.$msg.alert("请填写车牌！")
                return false
            }
            _this.diolog=true;
        },

        clickphone(){
          let _this=this;
          if(_this.userphone!=""){
            if(_this.$store.state.user == null){
                _this.userphone=""
            }
          }
        },
        clickname(){
          let _this=this;
          if(_this.username!=""){
             if(_this.$store.state.user == null){
                _this.username=""

            }else{
              if(_this.$store.state.user.RealName == null){
                _this.username=""

              }
            }
          }
        },

        closedio(){
           let _this=this
          _this.diolog=false;
          _this.diologcom=false;
        },
        nowbuy(){
          let _this=this
           let query = this.$route.query
          let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
          let rephone = /^1[3456789]\d{9}$/; //手机号码
            if(this.username==""){
                this.$msg.alert("请输入真实姓名！")
                return false
            }
            if(rename.test(this.username).length >20){
                this.$msg.alert("真实姓名不能大于20个中文字符")
                return false
            }
             if(this.userphone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }
            if(!rephone.test(this.userphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
         this.$http(this.$api.ApplyInsurance({"InsuranceId":query.Id,"UserRealName":_this.username,"UserMoible":_this.userphone,"ApplyCarCode":_this.chepai,"ApplyCity":_this.selectProv+"_"+_this.selectCity}))
        .then((data) => {
             console.log(data)
             _this.diolog=false;
             if(data.data.ResultCode==100000){
              _this.diologcom=true;
             }


         })

        },
        closecom(){
           let _this=this
          _this.diologcom=false;
        }

  },
  created:function(){
    let _this =this




    let query = this.$route.query

    _this.isapp=_this.$lg.isapp()
    _this.isapp=query.isapp
    if(_this.isapp=="false"){
      _this.isapp=false
    }else{
      _this.isapp=true
    }


    if(this.$store.state.isapp=='ios'||this.$store.state.isapp=='android'){
      this.isapp = false
    }

    this.$http(this.$api.GetInsuranceDetail({"InsuranceId":query.Id}))
     .then((data) => {
       console.log(data)
       _this.InsureDescription=data.data.ResultData.InsureDescription
       _this.title=data.data.ResultData.InsuranceName
        _this.bannerList=data.data.ResultData.ShowPictures

     })



        // if(typeof query.ver=="undefined"){//微信打开
        //     if(typeof this.state.user=="undefined"){//微信未登录
        //         _this.oldername="请输入您的姓名";
        //         _this.olderphone="请输入您的手机号";
        //     }else{//微信已登录
        //       _this.userphone=this.$store.state.user.MobilePhone
        //       console.log(this.$store.state.user)
        //       if(this.$store.state.RealName){
        //         _this.username=this.$store.state.RealName
        //       }
        //     }
        // }else{
        //     if(query.token){//APP打开  APP已登录


        //       }else{//APP未登录

        //       }
        // }


         if(this.$store.state.isapp!='ios' && this.$store.state.isapp!='android'){//微信打开
             if(typeof this.state.user=="undefined"){//微信未登录
                 _this.oldername="请输入您的姓名";
                _this.olderphone="请输入您的手机号";
            }else{//微信已登录
              _this.userphone=this.$store.state.user.MobilePhone
              console.log(this.$store.state.user)
              if(this.$store.state.user.RealName){
                  console.log(this.$store.state.user.RealName)
                _this.username=this.$store.state.RealName
              }
            }
             console.log("boAPP")
        }else{//APP打开

          console.log("APP")
            if(typeof this.state.user!="undefined"){ //APP已登录
              console.log("APPin")
               _this.userphone=this.$store.state.user.MobilePhone
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus == 3){
                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                console.log(data)
                                 if(data.data.ResultCode ==100000){
                                           _this.username = data.data.ResultData.UserName
                                           _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });
                    }else{

                              _this.$http(_this.$api.GetUserInfo({}))
                              .then((data) => {
                                 if(data.data.ResultCode ==100000){
                                    console.log(data.data.ResultData)
                                      _this.userphone = data.data.ResultData.MobilePhone
                                  }
                              });
                    }
                })
              }else{//APP未登录
                  console.log("APPout")
                 _this.oldername="请输入您的姓名";
                _this.olderphone="请输入您的手机号";
              }
        }


  },
  components:{
    globlenav,
    heads,
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="scss" scoped>
.topbanner img{width:100%;}
.whitebox{background:#fff;margin:rem(10) 0;}
.whitebox .content{width:90%;margin:0 auto;overflow:hidden;}
.whitebox .content .toptitle{line-height:rem(40);color:#333333;font-weight:bold;font-size:rem(18);text-align:left;border-bottom:rem(1) solid #ddd;}


.conwhite{height:auto;}

.selectbox{width:rem(350);position:absolute;top:rem(150);left:50%;background:#fff;border-radius:rem(10);z-index:9;height:rem(160);margin:0 0 0 rem(-175)}
.isappbox{margin:rem(-40) 0 0 rem(-175)}
.selectbox .selectcont{width:90%;margin:0 auto;padding:rem(10) 0;}
.selectbox .selectcont ul{}
.selectbox .selectcont ul li{padding-bottom: rem(0);border-bottom:rem(1) solid #dcdcdc;overflow:auto;line-height:rem(22);}
.selectbox .selectcont ul li .rectgray{width:rem(22);height:rem(22);margin:rem(8) rem(5) rem(8) rem(5);float:left;background:none;}
.selectbox .selectcont ul li .left_one{width:rem(75);display:block;float:left;line-height:rem(38);font-size:rem(14);color:#333;}
.selectbox .selectcont ul li .right_one{width:rem(150);display:block;float:left;line-height:rem(18);font-size:rem(14);color:#333;border:none;padding:rem(10) 0;}
.selectbox .selectcont ul li.row{position: relative;}
.selectbox .selectcont ul li.row:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10); color:#d8d8d8}
.bottonselect{width:90%;line-height:rem(40);text-align:center;color:#fff;border-radius:rem(20);background:#de3031;margin:rem(10) auto;font-size:rem(18);}

.dialog{width:rem(300);height:rem(250);position:fixed;top:50%;left:50%;margin:rem(-125) 0 0 rem(-150);background:#fff;border-radius:rem(10);text-align:center;z-index: 999;}
.dialogright{height:rem(200);margin:rem(-100) 0 0 rem(-150);}
.dialog .close{float:right;width:rem(30);height:rem(30);text-align:center;font-size:rem(18);color:#eee;background:url(../../../static/img/insurance/close.png) no-repeat center center;background-size:100%;}
.dialog .dialogcont{width:90%;margin:rem(30) auto;}
.dialog .toptitle{line-height:rem(35);color:#333;font-size:rem(16)}
.dialog ul{}
.dialog ul li{}
.dialog ul li input{line-height:rem(23);padding:rem(10) 0;border:rem(1) solid #eee;width:100%;margin:0 0 rem(10);text-indent:rem(10);background:#fff;}
.dialog .queren{width:100%;line-height:rem(50);border-radius:rem(10);background:#de3031;margin:rem(10) auto 0;color:#fff;font-size:rem(16)}
.allgray{z-index:997;background:#000;opacity: 0.7;height:100%;width:100%;position:fixed;top:0;left:0;}
.dialog .middle{width:100%;line-height:rem(25);color:#999;}


.toplist{width:rem(105);margin:0 auto rem(10);height:rem(30);text-align:center;padding:rem(10) 0;}
.toplist .hualeft{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianleft.png) no-repeat center center;}
.toplist .midlleword{width:rem(65);float:left;font-size:rem(16);line-height:rem(30);}
.toplist .huaright{display:block;float:left;width:rem(20);height:rem(30);background:url(../../../static/img/insurance/dianright.png) no-repeat center center;}

.rectfen{overflow:auto;padding:0 0 rem(20)}
.rectfen .toprect{width:83%;margin:0 auto;}
.rectfen .toprect .rectgraylist{width:rem(40);height:rem(50);float:left;background:#fff;margin-right:rem(5)}
.rectfen .toprect div:nth-child(1){background:url(../../../static/img/insurance/cardetail01.png) no-repeat center center;background-size:100%;}
.rectfen .toprect div:nth-child(3){background:url(../../../static/img/insurance/cardetail02.png) no-repeat center center;background-size:100%;}
.rectfen .toprect div:nth-child(5){background:url(../../../static/img/insurance/cardetail03.png) no-repeat center center;background-size:100%;}
.rectfen .toprect div:nth-child(7){background:url(../../../static/img/insurance/cardetail04.png) no-repeat center center;background-size:100%;}
.rectfen .toprect .rectgraylist:last-child{margin-right:rem(0);}
.rectfen .toprect .line{width:rem(40);height:rem(2);background:#fe6c3a;float:left;margin:rem(24) rem(7) 0 0;position:relative;border-radius:rem(0) rem(2) rem(2) 0;}
.rectfen .toprect .line:after {font-size: 0;line-height: 0;border-width: rem(7);border-color: red;border-right-width: 0;border-style: dashed;border-left-style: solid;border-top-color: transparent;border-bottom-color: transparent;content:'';position:absolute;top:rem(-6);right:rem(-1);}
.rectfen ul{clear:both;width:95%;margin:0 auto;}
.rectfen ul li{float:left;width:24%;text-align:center;color:#666666;line-height:rem(30);}
.marginwhitebox{margin-top:rem(130)}
</style>

