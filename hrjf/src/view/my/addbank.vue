<template>
<div class="container">
    <heads :title="title" href="/mybank"></heads>
    <p class="toptext">您的身份信息</p>
    <div class="new_bank cz_cont">

        <ul>
            <li>
                    <span class="left_one add_card">真实姓名：</span>
                    <input class="bank" id="UserName" placeholder="请输入您的姓名" type="text" v-model="username" v-if="!isRealName">
                    <span v-else>*{{username.substr(1,username.lenght)}}</span>
            </li>
            <li>
                <span class="left_one add_card">身份证号：</span>
                <input class="bank" id="IdCard" placeholder="请输入您的身份证号" type="text" v-model="usercard" v-if="!isRealName">
                <span v-else>{{usercard.substr(0,4)}}**********{{usercard.substr(usercard.length-4,usercard.length)}}</span>
            </li>
        </ul>
    </div>
     <p class="toptext">您的银行卡信息</p>
<div class="new_bank cz_cont">


        <ul>
            <li style="position:relative;" class="row"  @click="getbanklist">
                <span class="left_one add_card">所属银行：</span>
                <!-- <select class="bankname valid BankName"  v-model="selected">
                    <option :value="item.BankName" v-for="item in banklist">{{item.BankName}}</option>
                </select> -->
                <span><img :src="bankicon" v-if="bankicon!=''"/>{{bankname}}</span>
            </li>
            <li style="position:relative;" class="row"  @click="getCity">
                <span class="left_one add_card">开户省市：</span>
                <span>{{selectProv}} {{selectCity}}</span>
                <!-- <select v-model="selectCity"  placeholder="请选择城市"  v-on:change="getCity($event)" class="bankname valid BankName">
                    <option v-for="item in citys" :label="item.label" :value="item.value">{{item.value}}</option>
                </select> -->
            </li>
            <li style="position:relative;">
                <span class="left_one add_card">银行卡号：</span>
                <input class="bank" id="CardNo" placeholder="银行卡号" type="text" v-model="bankcode">
                <div style="clear:both;"></div>
            </li>


            <li>
                <span class="left_one add_card">手机号码：</span>
                <input class="bank" id="MobilePhone" placeholder="请选择银行预留手机号" type="text" v-model="phone">
            </li>

        </ul>

    </div>

    <a href="javascript:" id="submitBtn" class="next" @click="oneNext()">下一步</a>
    <p style="width:90%;color:#888;margin:auto">未确保交易及资金安全，请务必填写真实信息！（实名认证后无法再修改）</p>
    <div class="showbanklist" v-if="showbanklist">
        <div class="banklist_bg"></div>
        <div class="banklist_box">
            <div class="top"><span>请选择所属银行</span><a href="javascript:" class="cancel" @click="cancelbanklist"></a></div>
            <ul>
                <li v-for="(itme,index) in banklist" :class="{'active':itme.active==1}" @click="selectBank(index)"><div class="middle"><img :src="itme.icon"></div><div class="middle"><div><span class="main">{{itme.value}}</span><span v-if="itme.BankRemark!=null" class="sub">{{itme.BankRemark}}</span></div></div><i></i></li>
            </ul>
        </div>
    </div>
    <div v-if="showmsg">
        <div class="bg_box"></div>
        <div class="msg_box">
            <div class="msgmain">
                <a href="javascript:" class="cancel" @click="cancel"></a>
                <p class="title">验证码手机号</p>
                <p class="sub">已发送短信验证码到手机</p>
                <p class="phone">{{phones}}</p>
                <p class="input"><input class="text" placeholder="请输入验证码" type="tel" v-model="vcode"> <input type="button" :class="[vbtncolor,'btn']" :value="timerCodeMsg" v-bind:disabled="dis" @click="oneNext()"></p>
                <p class="submiBank"><a href="javascript:" @click="twoNext()">下一步</a></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import heads from '../../components/head'
import config from '../../api/ajax.js'
import ls from '../../store/lStorage.js'
import '../../plugins/iosSelect'

export default {
  data () {
    return {
        title:"绑定银行卡",
        username:"",
        usercard:"",
        phone:"",
        phones:"",
        bankcode:"",
        vcode:"",
        banklist:[],
        timerCodeMsg:"获取验证码",
        sendMsgDisabled :true,
        time:60,
        dis:false,
        vbtncolor:"yzmwz",
        showmsg:false,
        selectCity: '请选择开户城市',
        selectProv:"",
        bankname:"请选择开户银行",
        bankicon:'',
        cardCode:"",
        orderId:"",
        isRealName:false,
        showbanklist:false,
        Providdata:[{"id":"0011","value":"北京"},{"id":"0012","value":"天津"},{"id":"0013","value":"河北"},{"id":"0014","value":"山西"},{"id":"0015","value":"内蒙古"},{"id":"0021","value":"辽宁"},{"id":"0022","value":"吉林"},{"id":"0023","value":"黑龙江"},{"id":"0031","value":"上海"},{"id":"0032","value":"江苏"},{"id":"0033","value":"浙江"},{"id":"0034","value":"安徽"},{"id":"0035","value":"福建"},{"id":"0036","value":"江西"},{"id":"0037","value":"山东"},{"id":"0041","value":"河南"},{"id":"0042","value":"湖北"},{"id":"0043","value":"湖南"},{"id":"0044","value":"广东"},{"id":"0045","value":"广西"},{"id":"0046","value":"海南"},{"id":"0050","value":"重庆"},{"id":"0051","value":"四川"},{"id":"0052","value":"贵州"},{"id":"0053","value":"云南"},{"id":"0054","value":"西藏"},{"id":"0061","value":"陕西"},{"id":"0062","value":"甘肃"},{"id":"0063","value":"青海"},{"id":"0064","value":"宁夏"},{"id":"0065","value":"新疆"},{"id":"2001","value":"香港"},{"id":"2002","value":"澳门"},{"id":"2003","value":"台湾"}],
        allCity:[{"parentId":"0011","id":"1100","value":"北京"},{"parentId":"0012","id":"1200","value":"天津"},{"parentId":"0013","id":"1301","value":"石家庄"},{"parentId":"0013","id":"1302","value":"保定"},{"parentId":"0013","id":"1303","value":"沧州"},{"parentId":"0013","id":"1304","value":"承德"},{"parentId":"0013","id":"1305","value":"邯郸"},{"parentId":"0013","id":"1306","value":"衡水"},{"parentId":"0013","id":"1307","value":"廊坊"},{"parentId":"0013","id":"1308","value":"秦皇岛"},{"parentId":"0013","id":"1309","value":"唐山"},{"parentId":"0013","id":"1310","value":"邢台"},{"parentId":"0013","id":"1311","value":"张家口"},{"parentId":"0014","id":"1401","value":"太原"},{"parentId":"0014","id":"1402","value":"长治"},{"parentId":"0014","id":"1403","value":"大同"},{"parentId":"0014","id":"1404","value":"晋城"},{"parentId":"0014","id":"1405","value":"离石"},{"parentId":"0014","id":"1406","value":"临汾"},{"parentId":"0014","id":"1407","value":"朔州"},{"parentId":"0014","id":"1408","value":"忻州"},{"parentId":"0014","id":"1409","value":"阳泉"},{"parentId":"0014","id":"1410","value":"榆次"},{"parentId":"0014","id":"1411","value":"运城"},{"parentId":"0014","id":"1412","value":"晋中"},{"parentId":"0014","id":"1413","value":"吕梁"},{"parentId":"0015","id":"1501","value":"呼和浩特"},{"parentId":"0015","id":"1502","value":"包头"},{"parentId":"0015","id":"1503","value":"阿拉善"},{"parentId":"0015","id":"1504","value":"巴彦淖尔"},{"parentId":"0015","id":"1505","value":"赤峰"},{"parentId":"0015","id":"1506","value":"呼伦贝尔"},{"parentId":"0015","id":"1507","value":"乌海"},{"parentId":"0015","id":"1508","value":"乌兰察布"},{"parentId":"0015","id":"1509","value":"锡林郭勒"},{"parentId":"0015","id":"1510","value":"兴安"},{"parentId":"0015","id":"1511","value":"鄂尔多斯"},{"parentId":"0015","id":"1512","value":"通辽"},{"parentId":"0021","id":"2101","value":"沈阳"},{"parentId":"0021","id":"2102","value":"大连"},{"parentId":"0021","id":"2103","value":"鞍山"},{"parentId":"0021","id":"2104","value":"本溪"},{"parentId":"0021","id":"2105","value":"朝阳"},{"parentId":"0021","id":"2106","value":"丹东"},{"parentId":"0021","id":"2107","value":"抚顺"},{"parentId":"0021","id":"2108","value":"阜新"},{"parentId":"0021","id":"2109","value":"葫芦岛"},{"parentId":"0021","id":"2110","value":"锦州"},{"parentId":"0021","id":"2111","value":"辽阳"},{"parentId":"0021","id":"2112","value":"盘锦"},{"parentId":"0021","id":"2113","value":"铁岭"},{"parentId":"0021","id":"2114","value":"营口"},{"parentId":"0022","id":"2201","value":"长春"},{"parentId":"0022","id":"2202","value":"白城"},{"parentId":"0022","id":"2203","value":"白山"},{"parentId":"0022","id":"2204","value":"吉林"},{"parentId":"0022","id":"2205","value":"辽源"},{"parentId":"0022","id":"2206","value":"四平"},{"parentId":"0022","id":"2207","value":"松原"},{"parentId":"0022","id":"2208","value":"通化"},{"parentId":"0022","id":"2209","value":"延边"},{"parentId":"0023","id":"2301","value":"哈尔滨"},{"parentId":"0023","id":"2302","value":"大庆"},{"parentId":"0023","id":"2303","value":"大兴安岭"},{"parentId":"0023","id":"2304","value":"鹤岗"},{"parentId":"0023","id":"2305","value":"黑河"},{"parentId":"0023","id":"2306","value":"鸡西"},{"parentId":"0023","id":"2307","value":"佳木斯"},{"parentId":"0023","id":"2308","value":"牡丹江"},{"parentId":"0023","id":"2309","value":"七台河"},{"parentId":"0023","id":"2310","value":"齐齐哈尔"},{"parentId":"0023","id":"2311","value":"双鸭山"},{"parentId":"0023","id":"2312","value":"绥化"},{"parentId":"0023","id":"2313","value":"伊春"},{"parentId":"0031","id":"3100","value":"上海"},{"parentId":"0032","id":"3201","value":"南京"},{"parentId":"0032","id":"3202","value":"常州"},{"parentId":"0032","id":"3203","value":"淮安"},{"parentId":"0032","id":"3204","value":"连云港"},{"parentId":"0032","id":"3205","value":"南通"},{"parentId":"0032","id":"3206","value":"苏州"},{"parentId":"0032","id":"3207","value":"宿迁"},{"parentId":"0032","id":"3208","value":"泰州"},{"parentId":"0032","id":"3209","value":"无锡"},{"parentId":"0032","id":"3210","value":"徐州"},{"parentId":"0032","id":"3211","value":"盐城"},{"parentId":"0032","id":"3212","value":"扬州"},{"parentId":"0032","id":"3213","value":"镇江"},{"parentId":"0032","id":"3214","value":"胥浦"},{"parentId":"0033","id":"3301","value":"杭州"},{"parentId":"0033","id":"3302","value":"宁波"},{"parentId":"0033","id":"3303","value":"湖州"},{"parentId":"0033","id":"3304","value":"嘉兴"},{"parentId":"0033","id":"3305","value":"金华"},{"parentId":"0033","id":"3306","value":"绍兴"},{"parentId":"0033","id":"3307","value":"台州"},{"parentId":"0033","id":"3308","value":"温州"},{"parentId":"0033","id":"3309","value":"舟山"},{"parentId":"0033","id":"3310","value":"衢州"},{"parentId":"0033","id":"3311","value":"丽水"},{"parentId":"0034","id":"3401","value":"合肥"},{"parentId":"0034","id":"3402","value":"安庆"},{"parentId":"0034","id":"3403","value":"蚌埠"},{"parentId":"0034","id":"3404","value":"巢湖"},{"parentId":"0034","id":"3405","value":"池州"},{"parentId":"0034","id":"3406","value":"滁州"},{"parentId":"0034","id":"3407","value":"阜阳"},{"parentId":"0034","id":"3408","value":"淮北"},{"parentId":"0034","id":"3409","value":"淮南"},{"parentId":"0034","id":"3410","value":"黄山"},{"parentId":"0034","id":"3411","value":"六安"},{"parentId":"0034","id":"3412","value":"马鞍山"},{"parentId":"0034","id":"3414","value":"铜陵"},{"parentId":"0034","id":"3415","value":"芜湖"},{"parentId":"0034","id":"3416","value":"宣城"},{"parentId":"0034","id":"3417","value":"亳州"},{"parentId":"0034","id":"3418","value":"宿州"},{"parentId":"0035","id":"3501","value":"福州"},{"parentId":"0035","id":"3502","value":"厦门"},{"parentId":"0035","id":"3503","value":"龙岩"},{"parentId":"0035","id":"3504","value":"南平"},{"parentId":"0035","id":"3505","value":"宁德"},{"parentId":"0035","id":"3506","value":"莆田"},{"parentId":"0035","id":"3507","value":"泉州"},{"parentId":"0035","id":"3508","value":"三明"},{"parentId":"0035","id":"3509","value":"漳州"},{"parentId":"0036","id":"3601","value":"南昌"},{"parentId":"0036","id":"3602","value":"抚州"},{"parentId":"0036","id":"3603","value":"赣州"},{"parentId":"0036","id":"3604","value":"吉安"},{"parentId":"0036","id":"3605","value":"景德镇"},{"parentId":"0036","id":"3606","value":"九江"},{"parentId":"0036","id":"3607","value":"萍乡"},{"parentId":"0036","id":"3608","value":"上饶"},{"parentId":"0036","id":"3609","value":"新余"},{"parentId":"0036","id":"3610","value":"宜春"},{"parentId":"0036","id":"3611","value":"鹰潭"},{"parentId":"0037","id":"3701","value":"济南"},{"parentId":"0037","id":"3702","value":"青岛"},{"parentId":"0037","id":"3703","value":"滨州"},{"parentId":"0037","id":"3704","value":"德州"},{"parentId":"0037","id":"3705","value":"东营"},{"parentId":"0037","id":"3706","value":"菏泽"},{"parentId":"0037","id":"3707","value":"济宁"},{"parentId":"0037","id":"3708","value":"莱芜"},{"parentId":"0037","id":"3709","value":"聊城"},{"parentId":"0037","id":"3710","value":"临沂"},{"parentId":"0037","id":"3711","value":"日照"},{"parentId":"0037","id":"3712","value":"泰安"},{"parentId":"0037","id":"3713","value":"威海"},{"parentId":"0037","id":"3714","value":"潍坊"},{"parentId":"0037","id":"3715","value":"烟台"},{"parentId":"0037","id":"3716","value":"枣庄"},{"parentId":"0037","id":"3717","value":"淄博"},{"parentId":"0041","id":"4101","value":"郑州"},{"parentId":"0041","id":"4102","value":"安阳"},{"parentId":"0041","id":"4103","value":"焦作"},{"parentId":"0041","id":"4104","value":"鹤壁"},{"parentId":"0041","id":"4105","value":"开封"},{"parentId":"0041","id":"4106","value":"洛阳"},{"parentId":"0041","id":"4107","value":"南阳"},{"parentId":"0041","id":"4108","value":"平顶山"},{"parentId":"0041","id":"4109","value":"三门峡"},{"parentId":"0041","id":"4110","value":"商丘"},{"parentId":"0041","id":"4111","value":"新乡"},{"parentId":"0041","id":"4112","value":"信阳"},{"parentId":"0041","id":"4113","value":"许昌"},{"parentId":"0041","id":"4114","value":"周口"},{"parentId":"0041","id":"4115","value":"驻马店"},{"parentId":"0041","id":"4116","value":"漯河"},{"parentId":"0041","id":"4117","value":"濮阳"},{"parentId":"0041","id":"4118","value":"济源"},{"parentId":"0042","id":"4201","value":"武汉"},{"parentId":"0042","id":"4202","value":"鄂州"},{"parentId":"0042","id":"4203","value":"恩施"},{"parentId":"0042","id":"4204","value":"黄冈"},{"parentId":"0042","id":"4205","value":"黄石"},{"parentId":"0042","id":"4206","value":"荆门"},{"parentId":"0042","id":"4207","value":"荆州"},{"parentId":"0042","id":"4208","value":"十堰"},{"parentId":"0042","id":"4209","value":"随州"},{"parentId":"0042","id":"4210","value":"咸宁"},{"parentId":"0042","id":"4211","value":"襄樊"},{"parentId":"0042","id":"4212","value":"孝感"},{"parentId":"0042","id":"4213","value":"神农架"},{"parentId":"0042","id":"4214","value":"天门"},{"parentId":"0042","id":"4215","value":"宜昌"},{"parentId":"0042","id":"4216","value":"三峡"},{"parentId":"0043","id":"4301","value":"长沙"},{"parentId":"0043","id":"4302","value":"常德"},{"parentId":"0043","id":"4303","value":"郴州"},{"parentId":"0043","id":"4304","value":"衡阳"},{"parentId":"0043","id":"4305","value":"怀化"},{"parentId":"0043","id":"4306","value":"娄底"},{"parentId":"0043","id":"4307","value":"邵阳"},{"parentId":"0043","id":"4308","value":"湘潭"},{"parentId":"0043","id":"4309","value":"湘西"},{"parentId":"0043","id":"4310","value":"益阳"},{"parentId":"0043","id":"4311","value":"永州"},{"parentId":"0043","id":"4312","value":"岳阳"},{"parentId":"0043","id":"4313","value":"张家界"},{"parentId":"0043","id":"4314","value":"株洲"},{"parentId":"0044","id":"4401","value":"广州"},{"parentId":"0044","id":"4402","value":"深圳"},{"parentId":"0044","id":"4403","value":"潮州"},{"parentId":"0044","id":"4404","value":"东莞"},{"parentId":"0044","id":"4405","value":"佛山"},{"parentId":"0044","id":"4406","value":"惠州"},{"parentId":"0044","id":"4407","value":"江门"},{"parentId":"0044","id":"4408","value":"揭阳"},{"parentId":"0044","id":"4409","value":"茂名"},{"parentId":"0044","id":"4410","value":"梅州"},{"parentId":"0044","id":"4411","value":"清远"},{"parentId":"0044","id":"4412","value":"汕头"},{"parentId":"0044","id":"4413","value":"汕尾"},{"parentId":"0044","id":"4414","value":"韶关"},{"parentId":"0044","id":"4415","value":"阳江"},{"parentId":"0044","id":"4416","value":"云浮"},{"parentId":"0044","id":"4417","value":"湛江"},{"parentId":"0044","id":"4418","value":"肇庆"},{"parentId":"0044","id":"4419","value":"中山"},{"parentId":"0044","id":"4420","value":"河源"},{"parentId":"0044","id":"4421","value":"珠海"},{"parentId":"0045","id":"4501","value":"南宁"},{"parentId":"0045","id":"4502","value":"百色"},{"parentId":"0045","id":"4503","value":"北海"},{"parentId":"0045","id":"4504","value":"桂林"},{"parentId":"0045","id":"4505","value":"河池"},{"parentId":"0045","id":"4506","value":"柳州"},{"parentId":"0045","id":"4507","value":"梧州"},{"parentId":"0045","id":"4508","value":"玉林"},{"parentId":"0045","id":"4509","value":"崇左"},{"parentId":"0045","id":"4510","value":"防城港"},{"parentId":"0045","id":"4511","value":"贵港"},{"parentId":"0045","id":"4512","value":"贺州"},{"parentId":"0045","id":"4513","value":"来宾"},{"parentId":"0045","id":"4514","value":"钦州"},{"parentId":"0046","id":"4601","value":"海口"},{"parentId":"0046","id":"4602","value":"三亚"},{"parentId":"0046","id":"4603","value":"白沙"},{"parentId":"0046","id":"4604","value":"保亭"},{"parentId":"0046","id":"4605","value":"昌江"},{"parentId":"0046","id":"4606","value":"澄迈"},{"parentId":"0046","id":"4607","value":"儋州"},{"parentId":"0046","id":"4608","value":"定安"},{"parentId":"0046","id":"4609","value":"东方"},{"parentId":"0046","id":"4610","value":"乐东"},{"parentId":"0046","id":"4611","value":"临高"},{"parentId":"0046","id":"4612","value":"陵水"},{"parentId":"0046","id":"4613","value":"琼海"},{"parentId":"0046","id":"4614","value":"琼中"},{"parentId":"0046","id":"4615","value":"屯昌"},{"parentId":"0046","id":"4616","value":"万宁"},{"parentId":"0046","id":"4617","value":"文昌"},{"parentId":"0046","id":"4618","value":"五指山"},{"parentId":"0046","id":"4619","value":"洋浦"},{"parentId":"0050","id":"5000","value":"重庆"},{"parentId":"0051","id":"5101","value":"成都"},{"parentId":"0051","id":"5102","value":"巴中"},{"parentId":"0051","id":"5103","value":"达州"},{"parentId":"0051","id":"5104","value":"德阳"},{"parentId":"0051","id":"5105","value":"广安"},{"parentId":"0051","id":"5106","value":"广元"},{"parentId":"0051","id":"5107","value":"乐山"},{"parentId":"0051","id":"5108","value":"凉山"},{"parentId":"0051","id":"5109","value":"眉山"},{"parentId":"0051","id":"5110","value":"绵阳"},{"parentId":"0051","id":"5111","value":"南充"},{"parentId":"0051","id":"5112","value":"内江"},{"parentId":"0051","id":"5113","value":"攀枝花"},{"parentId":"0051","id":"5114","value":"遂宁"},{"parentId":"0051","id":"5115","value":"雅安"},{"parentId":"0051","id":"5116","value":"宜宾"},{"parentId":"0051","id":"5117","value":"自贡"},{"parentId":"0051","id":"5118","value":"泸州"},{"parentId":"0051","id":"5119","value":"阿坝"},{"parentId":"0051","id":"5120","value":"甘孜"},{"parentId":"0051","id":"5121","value":"资阳"},{"parentId":"0052","id":"5201","value":"贵阳"},{"parentId":"0052","id":"5202","value":"安顺"},{"parentId":"0052","id":"5203","value":"毕节"},{"parentId":"0052","id":"5204","value":"六盘水"},{"parentId":"0052","id":"5205","value":"铜仁"},{"parentId":"0052","id":"5206","value":"遵义"},{"parentId":"0052","id":"5207","value":"黔东南"},{"parentId":"0052","id":"5208","value":"黔南"},{"parentId":"0052","id":"5209","value":"黔西南"},{"parentId":"0053","id":"5301","value":"昆明"},{"parentId":"0053","id":"5302","value":"西双版纳"},{"parentId":"0053","id":"5303","value":"保山"},{"parentId":"0053","id":"5304","value":"楚雄"},{"parentId":"0053","id":"5305","value":"大理"},{"parentId":"0053","id":"5306","value":"德宏"},{"parentId":"0053","id":"5307","value":"红河"},{"parentId":"0053","id":"5308","value":"丽江"},{"parentId":"0053","id":"5309","value":"临沧"},{"parentId":"0053","id":"5310","value":"怒江"},{"parentId":"0053","id":"5311","value":"曲靖"},{"parentId":"0053","id":"5312","value":"思茅"},{"parentId":"0053","id":"5313","value":"文山"},{"parentId":"0053","id":"5314","value":"玉溪"},{"parentId":"0053","id":"5315","value":"昭通"},{"parentId":"0053","id":"5316","value":"中甸"},{"parentId":"0053","id":"5317","value":"迪庆州"},{"parentId":"0054","id":"5401","value":"拉萨"},{"parentId":"0054","id":"5402","value":"阿里"},{"parentId":"0054","id":"5403","value":"昌都"},{"parentId":"0054","id":"5404","value":"林芝"},{"parentId":"0054","id":"5405","value":"那曲"},{"parentId":"0054","id":"5406","value":"日喀则"},{"parentId":"0054","id":"5407","value":"山南"},{"parentId":"0061","id":"6101","value":"西安"},{"parentId":"0061","id":"6102","value":"安康"},{"parentId":"0061","id":"6103","value":"宝鸡"},{"parentId":"0061","id":"6104","value":"汉中"},{"parentId":"0061","id":"6105","value":"商洛"},{"parentId":"0061","id":"6106","value":"铜川"},{"parentId":"0061","id":"6107","value":"渭南"},{"parentId":"0061","id":"6108","value":"咸阳"},{"parentId":"0061","id":"6109","value":"延安"},{"parentId":"0061","id":"6110","value":"榆林"},{"parentId":"0062","id":"6201","value":"兰州"},{"parentId":"0062","id":"6202","value":"白银"},{"parentId":"0062","id":"6203","value":"定西"},{"parentId":"0062","id":"6204","value":"东风"},{"parentId":"0062","id":"6205","value":"合作"},{"parentId":"0062","id":"6206","value":"嘉峪关"},{"parentId":"0062","id":"6207","value":"金昌"},{"parentId":"0062","id":"6208","value":"酒泉"},{"parentId":"0062","id":"6209","value":"矿区"},{"parentId":"0062","id":"6210","value":"临夏"},{"parentId":"0062","id":"6211","value":"陇南"},{"parentId":"0062","id":"6212","value":"平凉"},{"parentId":"0062","id":"6213","value":"庆阳"},{"parentId":"0062","id":"6214","value":"天水"},{"parentId":"0062","id":"6215","value":"武威"},{"parentId":"0062","id":"6216","value":"张掖"},{"parentId":"0062","id":"6217","value":"甘南州"},{"parentId":"0063","id":"6301","value":"西宁"},{"parentId":"0063","id":"6302","value":"海东"},{"parentId":"0064","id":"6401","value":"银川"},{"parentId":"0064","id":"6402","value":"中卫"},{"parentId":"0064","id":"6403","value":"固原"},{"parentId":"0064","id":"6404","value":"石嘴山"},{"parentId":"0064","id":"6405","value":"吴忠"},{"parentId":"0065","id":"6501","value":"乌鲁木齐"},{"parentId":"0065","id":"6502","value":"阿克苏"},{"parentId":"0065","id":"6503","value":"阿勒泰"},{"parentId":"0065","id":"6504","value":"巴州"},{"parentId":"0065","id":"6505","value":"博州"},{"parentId":"0065","id":"6506","value":"昌吉"},{"parentId":"0065","id":"6507","value":"哈密"},{"parentId":"0065","id":"6508","value":"和田"},{"parentId":"0065","id":"6509","value":"喀什"},{"parentId":"0065","id":"6510","value":"克拉玛依"},{"parentId":"0065","id":"6511","value":"马兰"},{"parentId":"0065","id":"6512","value":"石河子"},{"parentId":"0065","id":"6513","value":"塔城"},{"parentId":"0065","id":"6514","value":"吐鲁番"},{"parentId":"0065","id":"6515","value":"伊犁"},{"parentId":"0065","id":"6516","value":"克州"},{"parentId":"0065","id":"6517","value":"阿拉尔"},{"parentId":"0065","id":"6518","value":"五家渠"},{"parentId":"2001","id":"9901","value":"香港"},{"parentId":"2002","id":"9902","value":"澳门"},{"parentId":"2003","id":"9903","value":"台湾"}]

    }
  },
  methods:{
        checkinput(){
            let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
            let rephone = /^1[3456789]\d{9}$/; //手机号码
            let rebank = /^\+?[1-9][0-9]*$/;
            if(this.username==""){
                this.$msg.alert("请输入真实姓名！")
                return false
            }
            if(rename.test(this.username).length >20){
                this.$msg.alert("真实姓名不能大于20个中文字符")
                return false
            }
            if(this.usercard==""){
                this.$msg.alert("请输入身份证号！")
                return false
            }
            if(this.usercard.length<15||this.usercard.length>18){
                this.$msg.alert("请输入正确的身份证号码！")
                return false
            }

            if(this.bankname=="请选择开户银行"){
                this.$msg.alert("请选择开户银行！")
                return false
            }
            if(this.selectCity=="请选择开户城市"){
                this.$msg.alert("请选择开户省市！")
                return false
            }


            if(this.bankcode==""){
                this.$msg.alert("请输入银行卡号！")
                return false
            }

            if(!rebank.test(this.bankcode)||this.bankcode.length>19||this.bankcode.length<16){
                this.$msg.alert("请输入正确的银行卡号！")
                return false
            }
            if(this.phone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }
            if(!rephone.test(this.phone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
            return true
        },
        cancel(){
            this.showmsg = false;
        },
        oneNext(){
            let _this = this
            if(!this.checkinput()){
                return
            }
            this.$http(this.$api.HFBindCardReg({"bankName":this.bankname,"cardNo":this.bankcode,"cardMobile":this.phone,"realName":this.username,"idCard":this.usercard,"cityName":this.selectCity,"terminalType":"3","stepFlag":"01","smsCode":"","orderId":"","cardCode":""} ))
            .then(function(data){
                if(data.data.ResultCode==100000 ){
                    _this.showmsg = true;
                    _this.orderId = data.data.ResultData.orderId;
                    _this.cardCode = data.data.ResultData.cardCode
                    _this.phones = _this.phone.substr(0,3)+'****'+_this.phone.substr(7,11)
                    let interval = window.setInterval(function() {
                      if ((_this.time --) <= 0) {
                        _this.time = 60
                        _this.sendMsgDisabled = false;
                        _this.timerCodeMsg="获取验证码";
                        window.clearInterval(interval)
                        _this.dis=false
                        _this.vbtncolor="yzmwz"
                      }else{
                        _this.timerCodeMsg=_this.time+'秒后获取'
                        _this.dis=true
                        _this.vbtncolor="yzmwz_bd"
                      }
                    }, 1000)
                }
            })
        },
        twoNext(){
            let _this = this
            if(this.vcode==""){
                this.$msg.alert("请输入验证码！")
                return false
            }
            this.$http(this.$api.HFBindCardReg({"bankName":this.bankname,"cardNo":this.bankcode,"cardMobile":this.phone,"realName":this.username,"idCard":this.usercard,"cityName":this.selectCity,"terminalType":"3","stepFlag":"02","smsCode":this.vcode,"orderId":this.orderId,"cardCode":this.cardCode}))
            .then(function(data){
                console.log(data.data.ResultData)
                if(data.data.ResultCode==100000){
                    _this.$router.push('/addbankhc')
                }else{
                    this.$msg.alert(data.data.ResultMessage)
                }
            })
        },
        send(){
            let _this = this
            if(!this.checkinput()){
                return
            }

            this.$http(this.$api.HFBindCard({"bankName":this.selected,"cardMobile":this.phone,"cardNo":this.bankcode,"cityName":this.selectCity,"idCard":this.usercard,"realName":this.username,"terminalType":2}))
            .then(function(data){
                if(data.data.ResultCode==100000 ){
                    window.location.href=config.baseUrl+"/web/huifuweb/PostBindCard?orderId="+data.data.ResultData.orderId+"&token="+ls.getItem("_user").Token+"&ver=mobile"
                    // _this.$msg.alert(data.data.ResultMessage,function(){
                    //     _this.$router.push('/my')
                    // })
                }else{
                     _this.$msg.alert(data.data.ResultMessage)
                }
            })

        },

        cancelbanklist(){
            this.showbanklist = false;
        },
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
            selectBank(index){
                let _this = this
                this.banklist.forEach(function(v,i){if(v.active==1){_this.banklist[i].active=0}})
                console.log(this.banklist)
                this.banklist[index].active=1;
                this.bankname = this.banklist[index].value;
                this.bankicon = this.banklist[index].icon;
                this.showbanklist = false;
            },
            getbanklist(){
                let _this = this
                this.showbanklist = true;
                // let bankIosSelect = new IosSelect(1,[_this.banklist,],{
                //         title:"选择银行",
                //         itemShowCount: 5,
                //         callback: function (selectOneObj) {
                //             _this.bankname=selectOneObj.value
                //             _this.bankicon = selectOneObj.icon
                //         }
                //     })
            },
            userinfo(){
              let _this = this
                this.$http(this.$api.QueryRealNameInfo({}))
                 .then((data) => {
                    _this.username = data.data.ResultData.RealName
                    _this.usercard = data.data.ResultData.IDCardNo
                    console.log(_this.usercard)
                    _this.isRealName = true
                })
            },
            userRealNameStatus(){
                let _this = this
                this.$http(this.$api.QueryRealNameStatus({}))
                 .then((data) => {
                    //1.未认证，2.正在审核，3.认证成功，4，认证失败
                    if(data.data.ResultData.CheckStatus==3){
                        _this.userinfo()
                    }

                })
            }
       },
       mounted : function() {

       },
   created :function(){
    let _this=this
            this.userRealNameStatus()
            this.$http(this.$api.GetBankCardInfo({}))
            .then((data) => {
                console.log(data.data.ResultData.cardInfo)
                if(data.data.ResultData.cardInfo.cardStatus==3||data.data.ResultData.cardInfo.cardStatus==6){
                    _this.bankname = data.data.ResultData.cardInfo.bankName;
                    _this.bankicon = data.data.ResultData.cardInfo.BankIcon;
                    _this.bankcode = data.data.ResultData.cardInfo.cardNo;
                    _this.phone =  data.data.ResultData.cardInfo.cardMobile;
                    _this.selectProv =  data.data.ResultData.cardInfo.cardProvince;
                    _this.selectCity =  data.data.ResultData.cardInfo.cardCity;
                }
            })
            this.$http(this.$api.GetHFBankList({}))
            .then(function(data){
                    //_this.banklist = data.data.ResultData
                    console.log(data.data.ResultData)
                    data.data.ResultData.forEach(function(v,i){
                        _this.banklist.push({'value':v.BankName,'icon':v.BankIcon,'id':i,"BankRemark":v.BankRemark})
                    })
            })
   },
  components:{
    heads,
  }
}
</script>

<style lang="scss" scoped>
.toptext{width:90%; margin:auto; margin-top:rem(10);}
.cz_cont {background:#fff;padding-top:0.025rem;margin:0.25rem auto 0;position: relative;}
.bank_namag .tip-sure{ font-family:"微软雅黑"; margin:0.5rem auto;color:#4f4f4f;}
.new_bank ul{ width:90%; margin:0 auto;}
.new_bank ul li{ border-bottom: 1px solid #e1e1e1;height: 1.25rem;line-height: 1.25rem;}
.new_bank ul li:last-child{ border-bottom:none;}
.add_card{ text-indent:0; width:30%; color:#626262;}
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #555;text-align:left;}
.new_bank ul li span img{width:rem(30);height:rem(30);display: inline-block; vertical-align:middle;margin-right:rem(10);}
select#DetailBankName{ width:70%;height:0.75rem; border-radius:0.125rem; outline: none;}
select.BankName{ width:70%; height:0.75rem; border-radius:0.125rem; outline: none;}
select#BankProvID{ width:35%; height:0.75rem; border-radius:0.125rem; outline: none;}
select#BankCityID{ width:34%; height:0.75rem; border-radius:0.125rem; outline: none;}
select.BankName option{ font-size:14px}

input#UserName,input#CardNo,input#ConfirmCardNo,input#IdCard,input#MobilePhone{ width: 70%;height: 0.75rem;line-height: 0.75rem;padding: 0.25rem 0;margin: 0px;border: none;outline: 0;float: left;font-size: 0.35rem;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#de3132;text-indent: 0em;padding:0rem;-webkit-appearance: none; border:none; border-radius:rem(5);}
.form-group .yzmwz_bd{position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#e1e1e1;text-indent: 0em;padding:0rem;}

.form-group input {width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.next{ width:90%; height:1.2rem; line-height:1.2rem; text-align:center; margin:0.5rem auto; color:#fff; background:#de3132; border-radius:0.1rem;display:block;font-size:0.45rem;}

.new_bank ul li.row:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10); color:#d8d8d8}
.bg_box{width:100%; height:100%; background:rgba(0,0,0,0.7); position:fixed; left:0; top:0; z-index:100;}
.msg_box{width:100%; height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center; position:absolute;top: 0;left:0;z-index: 101;}
.msg_box .msgmain{width:80%; position:relative; background:#fff; padding:rem(15) rem(10); border-radius:rem(5);box-sizing:border-box;}
.msg_box .msgmain a.cancel{width:rem(12); height:rem(12);@include bg("/static/img/my/cancel.png"); display:block; position:absolute; top:rem(10); right:rem(10);}
.msg_box .msgmain .title{font-size:0.45rem; text-align:center;}
.msg_box .msgmain .sub{color:#999; margin-top:rem(5); text-align:center;}
.msg_box .msgmain .phone{font-size:0.45rem; text-align:center;margin-top:rem(5)}
.msg_box .msgmain .input{border:1px solid #d8d8d8; margin-top:rem(10); height:rem(35); padding:0 rem(10);box-sizing:border-box; position:relative; border-radius:rem(5); box-sizing:border-box; overflow:hidden;}
.msg_box .msgmain .input input.text{border:none; height:rem(30); font-size:0.4rem; font-weight:normal;}
.msg_box .msgmain .input input.text::-webkit-input-placeholder{font-size:0.35rem;}
.msg_box .msgmain .input input.btn{position:absolute; top:-rem(1); right:rem(0); height:rem(35); border:none; width:rem(100);border-bottom-right-radius:rem(5);border-top-right-radius:rem(5);background:#de3132; color:#fff;font-size:0.30rem;}
.msg_box .msgmain .input input.yzmwz_bd{background:#999;}
.submiBank a{ margin-top:rem(20); height:rem(40); line-height:rem(40); text-align:center; color:#fff; background:#de3132; display:block; border-radius:rem(5);}
.showbanklist .banklist_bg{width:100%; height:100%; background:rgba(0,0,0,0.7); position:fixed; left:0; top:0; z-index:100;}
.showbanklist .banklist_box{position:fixed; left:0; bottom:0; z-index:101;background:#fff; overflow:hidden;}
.showbanklist .banklist_box .top{height:rem(50); line-height:rem(50); font-size:0.45rem; padding:0 rem(15); box-sizing:border-box;}
.showbanklist .banklist_box .top a{width:rem(15); height:rem(15);@include bg("/static/img/my/cancel.png"); display:block; float:right; margin-top:rem(15)}
.showbanklist .banklist_box ul{height:6rem; overflow-y:auto; border-top:1px solid #e1e1e1;}
.showbanklist .banklist_box ul li{height:rem(60); border-bottom:1px solid #e1e1e1; font-size:0.45rem; overflow:hidden; box-sizing:border-box; position:relative;}
.showbanklist .banklist_box ul li img{width:rem(35);height:rem(30); margin-right:rem(10);margin-left:rem(20); display:block; float:left;}
.showbanklist .banklist_box ul li.active i{width:rem(20);height:rem(12); display:block;@include bg("/static/img/my/bank_active.png"); margin-top:rem(10);margin-right:rem(20); position:absolute; top:20%; right:rem(10);}
.showbanklist .banklist_box ul li span.main{font-size:0.4rem; display:block;}
.showbanklist .banklist_box ul li span.sub{display:block; color:#999; font-size:0.35rem; width:auto;overflow:hidden;box-sizing:border-box;}
.showbanklist .banklist_box ul li .middle{display:flex;align-items:center;justify-content:center; float:left; width:auto; height:rem(60);}
.showbanklist .banklist_box ul li .middle div{}
</style>
