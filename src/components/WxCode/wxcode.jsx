import React, { Component } from 'react';
import "./style.less";
import store from "@src/store";
import modalStore from '@src/store/modal';

class wxcode extends Component {
  render() {
    return (
      <div className="WxcodeModal md2">
        <span className="wxcode-close" onClick={() => {modalStore.closePop('wxcode')}}></span>
        <img
          src="//yun.duiba.com.cn/aurora/assets/f8844b7790ad96e1aa0849fe6f1072abba032b55.png"
          className="wxcodeImage"
        />
      </div>
    );
  }
}

export default wxcode;