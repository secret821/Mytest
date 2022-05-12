import { useState } from "react";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import React from "react";
import { EdPopStore } from "./EdPopStore";
import './style/EdPop.less'
import { CLOSE_POP, SHOW_POP } from "./EdPopAction";
import EdPopBgType from "./style/EdPopBgType";
import EdPopAnimType from "./style/EdPopAnimType";
import EdPopFun from "./EdpopFun";
class EDPOP {
    constructor() {
        EdPopStore.subscribe(this.renderPop);
        this.createMainPopContainer();
    }
    /**创建弹窗主容器 */
    createMainPopContainer() {
        this.mainPopContainer = document.createElement('div');
        this.mainPopContainer.className = 'mainPopContainer'
        document.body.appendChild(this.mainPopContainer);
    }

    /**弹出一个弹窗
     * @T 弹窗组件，直接传组件名即可
     * @proprty 弹窗参数
     * @example
     * prop:{},       //传入的属性，会直接传给弹窗的props
     * animType:EdPopAnimType.zoom,    //弹窗动画类型，默认为缩放
     * maskValue:0.7,  //背景蒙层的透明度,默认为0.7
     * maskColor:'#000000', //背景蒙层的颜色,默认为黑色
     * clickThrough:false,     //是否可以点击穿透蒙层，默认为否
     * clickMaskClose:false,   //是否可以点击蒙层关闭
     * closeCall:null,  //关闭弹窗时的回调函数
     * isCenter:true,   //是否剧中
     */
    showPop(T, propty) {
        EdPopStore.dispatch(SHOW_POP({ com: T, propty }));
    }

    /**关闭弹窗 */
    closePop(closeAll = false) {
        EdPopStore.dispatch(CLOSE_POP({ closeAll }))
    }

    /**注册弹窗 */
    registerPop() {

    }

    /**取消弹窗 */
    cancelPop() {

    }

    /**从store内获取state中的popArr,经过处理生成心的popDataArr */
    getPopArr() {
        const { changePop } = EdPopStore.getState() || {};
        const { popArr } = changePop || {};
        let proptyArr = [];
        popArr?.map((itm, idx) => {
            proptyArr.push({ com: itm.com, propty: EdPop.getPropty(itm.propty) });
        })
        console.log('yef-->', EdPopStore.getState(), proptyArr);
        return proptyArr;
    }

    /**获取属性值 */
    getPropty(originPropty) {
        let _popData = {}
        let _posCls = '';
        let _animCls = ''
        let _propty = Object.assign({}, defaultPropty, originPropty);
        const { animType, animCls, isCenter, ...props } = _propty;
        if (isCenter) _posCls = EdPopBgType.center;
        else _posCls = EdPopBgType.noCenter;
        if (animCls) _animCls = `${animCls} ${_posCls}`;
        else _animCls = `${animType || ''} ${_posCls}`;
        _popData = { _posCls, _animCls, props };
        return _popData;
    }

    /**渲染弹窗 */
    renderPop() {
        const popDataArr = EdPop.getPopArr();
        return ReactDOM.render(
            popDataArr?.map((itm, idx) => {
                const { _posCls, _animCls, props } = itm.propty;
                const { maskValue, maskColor, prop } = props;
                const RGBColor = EdPopFun.colorToRgb(maskColor);
                return (
                    <div key={idx} className={_posCls} style={{ backgroundColor: `RGBA(${RGBColor},${maskValue})` }}>
                        <div className={_animCls}>
                            <itm.com {...prop} ></itm.com>
                        </div>
                    </div>
                )
            })
            , EdPop.mainPopContainer)
    }
}
const EdPop = new EDPOP();
const defaultPropty = {
    prop: {},       //传入的属性，会直接传给弹窗的props
    animType: EdPopAnimType.zoom,    //弹窗动画类型，默认为缩放
    animCls: null,   //自定义弹窗动画类
    maskValue: 0.7,  //背景蒙层的透明度,默认为0.7
    maskColor: '#000', //背景蒙层的颜色,默认为黑色
    clickThrough: false,     //是否可以点击穿透蒙层，默认为否
    clickMaskClose: false,   //是否可以点击蒙层关闭
    closeCall: () => { },  //关闭弹窗时的回调函数
    isCenter: true, //是否弹窗是否剧中
}
export default EdPop;

