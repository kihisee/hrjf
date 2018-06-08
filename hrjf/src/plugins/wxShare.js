import axios from 'axios'
import wx from 'weixin-js-sdk'
import config from '../api/ajax.js'
const wxshare = function(options){
        var ua = window.navigator.userAgent.toLowerCase();
       if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        axios.get(config.baseUrl+"/api/wx/GetWxConfigInfo?url="+ encodeURIComponent(window.location.href)) // 微信分享
        .then((data) => {
                wx.config({
                    debug: false,
                    appId: data.data.ResultData.appId,
                    timestamp: data.data.ResultData.timestamp,
                    nonceStr: data.data.ResultData.noncestr,
                    signature: data.data.ResultData.signature,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareQQ',
                        'onMenuShareQZone',
                        'onMenuShareWeibo'
                    ]
                });
                let sharptitle,sharedesc,sharelink,shareimg
                if(typeof options.title==="undefined"){
                    sharptitle = '恒瑞金服'
                }else{
                    sharptitle = options.title
                }
                if(typeof options.desc==="undefined"){
                    sharedesc = '国内领先互联网理财平台，躺着也能赚钱的平台'
                }else{
                    sharedesc = options.desc
                }
                if(typeof options.img==="undefined"){
                    shareimg = window.location.protocol+"//"+window.location.host+"/static/img/logo/s_logo.png";
                }else{
                    shareimg = window.location.protocol+"//"+window.location.host+"/static/img/"+options.img
                }
                if(typeof options.href==="undefined"){
                    sharelink = window.location.href;
                }else{
                    sharelink = window.location.protocol+"//"+window.location.host+options.href
                }
                var configWx= {
                        title: sharptitle,
                        desc: sharedesc,
                        link: sharelink,
                        imgUrl: shareimg,
                        success: function () {
                            if(typeof options.callback === 'function'){
                                options.callback()
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    }
                wx.ready(function () {
                    wx.onMenuShareTimeline(configWx);
                    wx.onMenuShareAppMessage(configWx);
                    wx.onMenuShareQQ(configWx);
                    wx.onMenuShareQZone(configWx);
                    wx.onMenuShareWeibo(configWx);
                });
          })
       }

}

export default wxshare ;