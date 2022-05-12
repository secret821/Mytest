import store from "@src/store";
import React, { Component } from "react";
import "./style.less";
class ShareModal extends Component {
  goDeepLink = () => {
    store.goDeepLink();
  };
  render() {
    return (
      <div className="shareModal">
        <div
          className="helpbtn md24"
          onClick={() => {
            this.goDeepLink();
          }}
        ></div>
      </div>
    );
  }
}

export default ShareModal;
