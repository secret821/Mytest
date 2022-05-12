import React, {
    Component
} from 'react';
import ReactDOM from "react-dom";
import config from './config';
import Enum from './enum';
import dataCenter from './dataCenter';
// import TWEEN from './Tween';
// import Toast from '../components/toast/toast.jsx';
// import Waitting from '../components/waitting/waitting.jsx';

const ViewCtrl = {
    showToast: (msg = "活动异常火爆，请稍后再试") => {
        let T = Toast;
        var m = document.createElement('div');
        m.className = "popcontainer_empty"
        m.style.zIndex = 9999;
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 500 / 1000;
            m.style.webkitTransition = 'opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, 500);
        }, 1500);
        T = < T msg = {
            msg
        }
        />
        ReactDOM.render(T, m);
    },

    initWaiting: () => {
        if (document.getElementById("waittingId")) return;
        let T = Waitting;
        var m = document.createElement('div');
        m.className = "popcontainer_empty"
        m.id = "waittingId"
        m.style.zIndex = 99999;
        m.style.opacity = 0;
        m.style.pointerEvents = "none";
        document.body.appendChild(m);
        T = < T / >
            ReactDOM.render(T, m);
    },

    showWaiting: () => {
        let node = document.getElementById("waittingId");
        node.style.pointerEvents = "";
        node.style.opacity = 1;
    },

    hideWaiting: () => {
        let node = document.getElementById("waittingId");
        node.style.pointerEvents = "none";
        node.style.opacity = 0;
    },


    /**控制显示隐藏，name：节点的类名，value为布尔值 */
    changeVisible: (name, value) => {
        let node;
        node = document.getElementsByClassName(name)[0]
        if (value == true) {
            node.style.display = ''
        } else if (value == false) {
            node.style.display = 'none'
        }
    },

    // clickZoom:(className)=>{
    //     let node;
    //     node = document.getElementsByClassName(className)[0];
    //     if(node){
    //         node.style =  "transform-origin:50% 50% 0px";
    //         new TWEEN.Tween(node)
    //         // .to({node.})
    //     }
    // },


    /**弹出弹窗 */
    showWin: (enumComKey, data = {}, call) => {
        let T = config.comMap.get(enumComKey)
        var m = document.createElement('div');
        m.className = "popcontainer"
        document.body.appendChild(m);


        /**
         * @param {function} cb 
         */
        const closeWin = (cb) => {
            document.body.removeChild(m);
            if (typeof cb == 'function') {
                try {
                    cb()
                } catch (error) {
                    console.log(error)
                }
            }
        }
        T = < T closeWin = {
            closeWin
        }
        data = {
            data
        }
        call = {
            call
        }
        />
        ReactDOM.render(T, m);
    },


    /**刷新页面 */
    flushPage: () => {
        let event = new Event("flushPage");
        document.dispatchEvent(event)
    },

    /**切换页面 */
    changePage: (enumPageKey = -1) => {
        let event = new CustomEvent("changePage", {
            detail: {
                id: enumPageKey
            }
        });
        document.dispatchEvent(event)
    }


}


export default ViewCtrl