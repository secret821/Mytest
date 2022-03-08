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
          src={store.frontVariable.qrcode}
          className="wxcodeImage"
        />
      </div>
    );
  }
}

export default wxcode;