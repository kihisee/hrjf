import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      alias: '/', //别名
      name:'恒瑞金服',
      //redirect: '/b'   重定向
      component: require('../view/index'),
    },
    //登录
    {
      path: '/login',
      component: require('../view/pass/login')
    },
    //注册
    {
      path: '/reg',
      component: require('../view/pass/reg')
    },
    //找回密码
    {
      path: '/findpassword',
      component: require('../view/pass/findpassword')
    },
    //存钱宝注册
    {
      path: '/cqbreg',
      name:'新春投资  壕礼相送',
      component: require('../view/pass/cqbreg')
    },
    //tenderlist
    {
      path: '/tender',
      name:'理财',
      component: require('../view/tender/index')
    },
    //理财详情
    {
      path: '/tenderdetail',
      name:'理财详情',
      component: require('../view/tender/tenderdetail')
    },
    //新理财详情
    {
      path: '/tenderdetailnew',
      name:'新理财详情',
      component: require('../view/tender/tenderdetailnew')
    },
    //项目简介
    {
      path: '/porjcetdetail',
      name:'项目简介',
      component: require('../view/tender/porjcetdetail')
    },
    //投标记录
    {
      path: '/tenderpaylist',
      name:'投标记录',
      component: require('../view/tender/tenderlist')
    },
    //投标记录
    {
      path: '/financeagreement',
      name:'投资协议',
      component: require('../view/help/financeagreement')
    },
    // //存钱宝
    // {
    //   path: '/cqb',
    //   name:'活期宝',
    //   component: require('../view/cqb/index')
    // },
    //存钱宝
    {
      path: '/cqbindex',
      name:'活期宝',
      component: require('../view/cqb/cqbindex')
    },
    //线下转账
    {
      path: '/transfer',
      name:'线下转账',
      component: require('../view/my/transfer')
    },
    //我的理财
    {
      path: '/mytendercoupon',
      name:'理财优惠券',
      component: require('../view/tender/couponlist'),
      meta: {auth: true}
    },
    /*****************************个人中心******************************/
    //个人中心
    {
      path: '/my',
      name:'个人中心',
      component: require('../view/my/index'),
      meta: {auth: true}
    },
    //口令红包
    {
      path: '/exchangecommandcoupon',
      name:'口令红包',
      component: require('../view/my/exchangecommandcoupon'),
      meta: {auth: true}
    },
    //邀请奖励
    {
      path: '/myinvite',
      name:'邀请奖励',
      component: require('../view/my/Invite2'),
      meta: {auth: true}
    },
    //我的二维码
    {
      path: '/myerweima',
      name:'我的二维码',
      component: require('../view/my/myerweima'),
      meta: {auth: true}
    },
    //邀请奖励
    {
      path: '/invitestaff',
      name:'员工邀请奖励',
      component: require('../view/my/Invitestaff'),
      meta: {auth: true}
    },
     //我的奖励
    {
      path: '/myinviteindex',
      name:'我的奖励',
      component: require('../view/my/myinviteindex'),
      meta: {auth: true}
    },
    //兑换奖励
    {
      path: '/invitechange',
      name:'兑换奖励',
      component: require('../view/my/invitechange'),
      meta: {auth: true}
    },
    //邀请奖励明细列表
    {
      path: '/invitedetaillist',
      name:'奖励明细',
      component: require('../view/my/invitedetaillist'),
      meta: {auth: true}
    },
    //邀请奖励记录列表
    {
      path: '/invitestafflist',
      name:'邀请奖励记录',
      component: require('../view/my/invitestafflist'),
      meta: {auth: true}
    },
    //我的邀请列表
    {
      path: '/myinvitelist',
      name:'我的邀请',
      component: require('../view/my/myinvitelist'),
      meta: {auth: true}
    },
    //我的奖励
    {
      path: '/myinvitedetail',
      name:'我的邀请奖励',
      component: require('../view/my/myinvitedetail'),
      meta: {auth: true}
    },
    //我的邀请人列表
    {
      path: '/invitemyuserlist',
      name:'我的邀请人',
      component: require('../view/my/invitemyuserlist'),
      meta: {auth: true}
    },
    //我的间接邀请人
    {
      path: '/invitemyjjuserlist',
      name:'我的间接邀请人',
      component: require('../view/my/invitemyjjuserlist'),
      meta: {auth: true}
    },
    //邀请用户详情
    {
      path: '/invitestaffdetal',
      name:'邀请用户详情',
      component: require('../view/my/Invitestaffdetal'),
      meta: {auth: true}
    },
    //我的理财
    {
      path: '/mytenderlist',
      name:'我的理财',
      component: require('../view/my/tenderlist'),
      meta: {auth: true}
    },
    //我的理财详细
    {
      path: '/mytenderdetail',
      name:'我的理财详情',
      component: require('../view/my/tenderdetail'),
      meta: {auth: true}
    },
    //交易明细
    {
      path: '/tradelist',
      name:'交易明细',
      component: require('../view/my/tradelist'),
      meta: {auth: true}
    },
    //交易明细详情
    {
      path: '/tradedetail',
      name:'交易明细详情',
      component: require('../view/my/tradedetail'),
      meta: {auth: true}
    },
    //存钱宝转入
    {
      path: '/rollin',
      name:'活期宝转入',
      component: require('../view/cqb/rollin'),
      meta: {auth: true}
    },
    //存钱宝转出
    {
      path: '/rollout',
      name:'活期宝转出',
      component: require('../view/cqb/rollout'),
      meta: {auth: true}
    },
    //存钱宝转出
    {
      path: '/hqbtradelist',
      name:'活期宝交易记录',
      component: require('../view/cqb/tradelist'),
      meta: {auth: true}
    },
    //口令红包兑换记录
    {
      path: '/getmycommandexchangerecords',
      name:'口令红包兑换记录',
      component: require('../view/my/getmycommandexchangerecords'),
      meta: {auth: true}
    },
    //我的优惠券
    {
      path: '/mycouponlist',
      name:'我的优惠券',
      component: require('../view/my/couponlist'),
      meta: {auth: true}
    },
    //红包详情
    {
      path: '/couponcsah',
      name:'红包详情',
      component: require('../view/my/couponcsah'),
      meta: {auth: true}
    },
    //我的银行卡
    {
      path: '/mybank',
      name:'我的银行卡',
      component: require('../view/my/mybank'),
      meta: {auth: true}
    },
    //绑定银行卡
    {
      path: '/addbank',
      name:'绑定银行卡',
      component: require('../view/my/addbank'),
      meta: {auth: true}
    },
    //绑定银行卡处理
    {
      path: '/addbankhc',
      name:'绑定银行卡处理',
      component: require('../view/my/addbankhc'),
      meta: {auth: true}
    },
    //绑定银行卡状态
    {
      path: '/bindbankok',
      name:'绑定银行卡成功',
      component: require('../view/my/bindbankok'),
      meta: {auth: true}
    },
    //绑定银行卡状态
    {
      path: '/bindbankno',
      name:'绑定银行卡失败',
      component: require('../view/my/bindbankno'),
      meta: {auth: true}
    },
    //解绑银行卡
    {
      path: '/untilbank',
      name:'解绑银行卡',
      component: require('../view/my/untilbank'),
      meta: {auth: true}
    },
    //解绑微信
    {
      path: '/unweixinbind',
      name:'解绑微信',
      component: require('../view/my/unweixinbind'),
      meta: {auth: true}
    },
    //充值
    {
      path: '/charge',
      name:'充值',
      component: require('../view/account/charge'),
      meta: {auth: true}
    },
     //充值成功
    {
      path: '/chargesuccess',
      name:'充值成功',
      component: require('../view/account/chargesuccess'),
      meta: {auth: true}
    },
    //充值
    {
      path: '/fetchmoney',
      name:'提现',
      component: require('../view/account/fetchmoney'),
      meta: {auth: true}
    },
        //消息列表
    {
      path: '/msglist',
      name:'消息列表',
      component: require('../view/my/msglist'),
      meta: {auth: true}
    },
    //消息详细
    {
      path: '/msgdetail',
      name:'消息详细',
      component: require('../view/my/msgdetail'),
      meta: {auth: true}
    },
        //个人设置
    {
      path: '/mysettings',
      name:'个人设置',
      component: require('../view/my/mysettings'),
      meta: {auth: true}
    },
    //修改手机号码
    {
      path: '/setphone',
      name:'修改手机号码',
      component: require('../view/my/setphone'),
      meta: {auth: true}
    },
    //自动投标
    {
      path: '/autotender',
      name:'自动投标',
      component: require('../view/my/autotender'),
      meta: {auth: true}
    },
    //修改登录密码
    {
      path: '/updatapsw',
      name:'修改登录密码',
      component: require('../view/my/updatapsw'),
      meta: {auth: true}
    },
    //设置交易密码
    {
      path: '/setpaypsw',
      name:'设置交易密码',
      component: require('../view/my/setpaypsw'),
      meta: {auth: true}
    },
     //注册协议
    {
      path: '/agreement',
      name:'注册协议',
      component: require('../view/help/agreement')
    },
     //活期宝投资协议
    {
      path: '/hqbAgreement',
      name:'活期宝投资协议',
      component: require('../view/help/hqbAgreement')
    },
    //自动投标协议
    {
      path: '/automationtender',
      name:'自动投标协议',
      component: require('../view/help/automationtender')
    },
    //自动投标规则
    {
      path: '/automationregular',
      name:'自动投标规则',
      component: require('../view/help/automationregular')
    },
    //定向委托投资标的
    {
      path: '/tenderAgreement',
      name:'定向委托投资标的协议',
      component: require('../view/help/tenderAgreement')
    },
       //活期宝问题列表
    {
      path: '/cqbhelp',
      component: require('../view/cqb/help'),
    },
     //金服介绍
    {
      path: '/introduction',
      name:'积分说明',
      component: require('../view/help/introduction')
    },

       //金服首页公告详情
    {
      path: '/Noticedetail',
      name:'公告详情',
      component: require('../view/help/Noticedetail')
    },
      //金服首页公告列表
    {
      path: '/Noticelist',
      name:'公告列表',
      component: require('../view/help/Noticelist')
    },

    //邀请奖励收益示例
    {
      path: '/inviteincome',
      name:'邀请奖励收益计算',
      component: require('../view/my/inviteincome')
    },
    /*****************************活动区******************************/
     //百万体验金活动
    {
      path: '/experienceMoney',
      name:'百万体验金',
      component: require('../view/activity/experienceMoney'),
    },
     //新百万体验金活动
    {
      path: '/newexperienceMoney',
      name:'新百万体验金',
      component: require('../view/activity/newexperienceMoney'),
    },
     //邀请新手注册
    {
      path: '/invitelink',
      name:'邀请新手注册',
      component: require('../view/pass/invitelink'),
    },
    //恒瑞财富网专链
    {
      path: '/invitelinkTohrcf',
      name:'恒瑞金服注册',
      component: require('../view/pass/invitelinkTohrcf'),
    },
     //打卡签到
    {
      path: '/clock',
      name:'早起打卡赚积分',
      component: require('../view/activity/clock'),
    },
     //砸金蛋活动
    {
      path: '/hitegg',
      name:'欢乐砸金蛋',
      component: require('../view/activity/hitegg'),
    },

    //收货地址
    {
      path: '/myaddress',
      component: require('../view/pointstore/myaddress'),
      meta: {auth: true}
    },
     //零元购
    {
      path: '/zero',
      name:'0元购活动',
      component: require('../view/activity/zero'),
    },
    //0元购详情
    {
      path: '/zerotenderdetail',
      name:'0元购详情',
      component: require('../view/zero/tenderdetail'),
    },
    //0元购标的详情
    {
      path: '/zerotenderwork',
      name:'0元购标的详情',
      component: require('../view/zero/tenderwork'),
    },
     //砸金蛋活动
    {
      path: '/rollreward',
      name:'小积分抽大奖',
      component: require('../view/activity/rollreward'),
    },
    //资讯
    {
      path: '/news',
      name:'资讯',
      component: require('../view/news/index'),
    },
    //资讯详情
    {
      path: '/newsdetail',
      name:'资讯详情',
      component: require('../view/news/newsdetail'),
    },
    //暖冬注册
    {
      path: '/winter',
      name:'暖冬注册',
      component: require('../view/activity/winter'),
    },
    //帮助中心
    {
      path: '/help',
      name:'帮助中心',
      component: require('../view/help/index'),
    },
    //帮助中心列表
    {
      path: '/helplist',
      name:'帮助中心列表',
      component: require('../view/help/helplist'),
    },
    //帮助中心详细
    {
      path: '/helpdetail',
      name:'帮助中心详细',
      component: require('../view/help/helpdetail'),
    },
    //信息披露
    {
      path: '/infocate',
      name:'信息披露',
      component: require('../view/help/infocate'),
    },
    //信息披露列表
    {
      path: '/infolist',
      name:'信息披露列表',
      component: require('../view/help/infolist'),
    },
    //信息披露详细
    {
      path: '/infodetail',
      name:'信息披露详细',
      component: require('../view/help/infodetail'),
    },
    //会员详情
    {
      path: '/member',
      name:'会员详细',
      component: require('../view/activity/member'),
    },
    //等级说明
    {
      path: '/levalexplain',
      name:'等级说明',
      component: require('../view/activity/levalexplain'),
    },

     //新年瓜分百万红包活动
    {
      path: '/investment',
      name:'新年瓜分百万红包活动',
      component: require('../view/activity/investment'),
    },
     //新年瓜分百万红包活动分享
    {
      path: '/investmentshare',
      name:'新年瓜分百万红包活动分享',
      component: require('../view/activity/investmentshare'),
    },
    //开年红
    {
      path: '/newyearreg',
      name:'开年红',
      component: require('../view/activity/newyearreg'),
    },

     //风险评估调查问卷
    {
      path: '/risk',
      component: require('../view/activity/risk'),
    },
    //风险评估调查问卷结果
    {
      path: '/riskfinal',
      component: require('../view/activity/riskfinal'),
    },
    //51增投活动
    {
      path: '/activityMayDay',
      name:'51劳动补贴金',
      component: require('../view/activity/activityMayDay'),
    },
    //端午活动
    {
      path: '/duanwu',
      name:'端午粽头戏',
      component: require('../view/activity/duanwu'),
    },
    /*****************************发现区******************************/

     //会员
    {
      path: '/pointstore',
      name:'会员中心',
      component: require('../view/pointstore/index'),
    },

     //发现
    {
      path: '/storeindex',
      name:'发现',
      component: require('../view/pointstore/storeindex'),
    },


     //发现首页
    {
      path: '/new',
      name:'会中心',
      component: require('../view/pointstore/new'),
    },

    //积分商城
    {
      path: '/Integral',
      name:'积分商城',
      component: require('../view/pointstore/Integral'),
    },

    //积分中心
    {
      path: '/Integralcenter',
      name:'积分中心',
      component: require('../view/pointstore/Integralcenter'),
    },

    //积分商品详情
    {
      path: '/storedetail',
      name:'商品详情',
      component: require('../view/pointstore/storedetail'),
    },

    //领取记录
    {
      path: '/memberdetail',
      name:'领取记录',
      component: require('../view/pointstore/memberdetail'),
    },

    //兑换纪录
    {
      path: '/record',
      name:'兑换纪录',
      component: require('../view/pointstore/record'),
    },
    //订单详情
    {
      path: '/recorddetail',
      name:'订单详情',
      component: require('../view/pointstore/recorddetail'),
    },

     //查看详情
    {
      path: '/wuliudetail',
      name:'订单跟踪',
      component: require('../view/pointstore/wuliudetail'),
    },


    /*****保险******/
     //保险首页
    {
      path: '/insurance',
      name:'保险首页',
      component: require('../view/insurance/index'),
    },
    //保险详情
    {
      path: '/insurancedetail',
      name:'保险详情',
      component: require('../view/insurance/insurancedetail'),
    },

      //投保需知
    {
      path: '/needknow',
      name:'投保需知',
      component: require('../view/insurance/needknow'),
    },
      //保障方案
    {
      path: '/guarantee',
      name:'保障方案',
      component: require('../view/insurance/guarantee'),
    },
   //重疾险
    {
      path: '/disease',
      name:'保险',
      component: require('../view/insurance/disease'),
    },
    //车险列表
    {
      path: '/carlist',
      name:'保险列表',
      component: require('../view/insurance/carlist'),
    },
    //车险详情
    {
      path: '/cardetail',
      name:'车险详情',
      component: require('../view/insurance/cardetail'),
    },
    //保险预约
    {
      path: '/myorder',
      name:'保险预约',
      component: require('../view/insurance/myorder'),
    },

    /*信用卡*/
    //信用卡首页
    {
      path: '/credit',
      name:'信用卡',
      component: require('../view/credit/index'),
    },
    //信用卡详情
    {
      path: '/creditdetail',
      name:'信用卡详情',
      component: require('../view/credit/creditdetail'),
    },
    //特权详情
    {
      path: '/privilege',
      name:'特权详情',
      component: require('../view/credit/privilege'),
    },
     //费用详情
    {
      path: '/cost',
      name:'费用详情',
      component: require('../view/credit/cost'),
    },

     //银行卡列表
    {
      path: '/banklist',
      name:'银行卡列表',
      component: require('../view/credit/banklist'),
    },

     //投资结果
    {
      path: '/tenderfinal',
      name:'投资结果',
      component: require('../view/insurance/tenderfinal'),
    },

/*********************房产************************/
    {
      path: '/house',
      name:'房产',
      component: require('../view/house/index'),
    },
    {
      path: '/oldhouselist',
      name:'二手房',
      component: require('../view/house/oldhouselist'),
    },
    {
      path: '/oldhousedetail',
      name:'二手房详情',
      component: require('../view/house/oldhousedetail'),
    },
    {
      path: '/newhouselist',
      name:'房产列表',
      component: require('../view/house/newhouselist'),
    },
    {
      path: '/newhousedetail',
      name:'新房详情',
      component: require('../view/house/newhousedetail'),
    },
    {
      path: '/newhousetypelist',
      name:'新房户型',
      component: require('../view/house/newhousetypelist'),
    },
    {
      path: '/newhousetypedetail',
      name:'新房户型详情',
      component: require('../view/house/newhousetypedetail'),
    },
    {
      path: '/newhouseinfo',
      name:'楼盘信息',
      component: require('../view/house/newhouseinfo'),
    },
    {
      path: '/newhousenews',
      name:'楼盘动态',
      component: require('../view/house/newhousenews'),
    },
    {
      path: '/myhouselist',
      name:'我的收藏',
      component: require('../view/house/myhouselist'),
      meta: {auth: true}
    },
    /*********************贷款************************/
        //贷款首页
    {
      path: '/loan',
      name:'贷款',
      component: require('../view/loan/index'),
    },
    {
      path: '/loanlist',
      name:'贷款列表',
      component: require('../view/loan/list'),
    },
    {
      path: '/loandetail',
      name:'贷款详情',
      component: require('../view/loan/detail'),
    },
    {
      path: '/myloan',
      name:'我的预约',
      meta: {auth: true},
      component: require('../view/loan/myloan'),
    },
  ]

})



