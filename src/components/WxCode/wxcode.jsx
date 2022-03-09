import React, { Component } from 'react';
import "./style.less";
import store from "@src/store";
import modalStore from '@src/store/modal';

class wxcode extends Component {
  render() {
    return (
      <div className="WxcodeModal">
        {/* <span className="wxcode-close" onClick={() => {modalStore.closePop('wxcode')}}></span> */}
        <img
          src={store.frontVariable.qrcode}
          className="wxcodeImage md29"
        />
      </div>
    );
  }
}

export default wxcode;