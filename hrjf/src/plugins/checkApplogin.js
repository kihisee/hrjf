
import router from '../router'
import store from '../store/index'
import ls from '../store/lStorage'
function GetQueryString(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r =decodeURIComponent(window.location.search).substr(1).match(reg);
     if(r!=null)return decodeURIComponent(r[2]); return null;
}
const applogin = function(url){
    var ver = GetQueryString("ver")
    var token = GetQueryString("token")
    var chackapp = ls.getItem("isapp")
    if (ver == 'android'||chackapp == 'android') {
      if(token==null||token==''||token=="undefined"){
        android.SyncLogin();
        return false;
      }
    }else if (ver == 'ios'||chackapp=='ios') {
      if(token==null||token==''||token=="undefined"){
        window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
        return false;
      }
    }else if(typeof store.state.user === 'undefined'){
      if(url){
         router.push('/login??back=' + escape(url))
       }else{
        router.push('/login?back=' + escape(router.app._route.fullPath).split('/')[1])
       }

        return false;
    }
    return true;
}
const appshare = function(){
  var ver = GetQueryString("ver")
  if (ver == 'android') {
      android.share();
      return true;
  }else if (ver == 'ios') {
     window.webkit.messageHandlers.Method.postMessage({ type: "share" });
      return true;
  }
  return false;
}
const isapp = function(){
  var ver = GetQueryString("ver")
    if (ver == 'android') {
      return false;
    }else if (ver == 'ios') {
      return false;
    }
    return true;
}

export default {applogin,isapp,appshare} ;