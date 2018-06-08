 import Vue from 'vue'
 import sharp from '../components/sharp';
 import wxShare from '../plugins/wxShare.js'
 let sharpbox = Vue.extend(sharp);
 let instance;
 let initInstance = ()=>{
    if(instance==undefined){
        instance = new sharpbox({el: document.createElement('div')});
        document.body.appendChild(instance.$el);
    }

}

let sharpDiv = function (options,isboolean){ //{title:"",desc:"",img:"/sharpimg.png",href:"/index",callback:function(){}}
    if(typeof isboolean==="undefined"||isboolean){
        initInstance();
        instance.sharpshow = true;
    }
    wxShare(options)
}


export default sharpDiv ;