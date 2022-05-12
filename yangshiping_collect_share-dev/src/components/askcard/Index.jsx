import store from "@src/store";
import React, { Component } from "react";
import { RES_PATH } from "../../../sparkrc";
import "./style.less";
class askcard extends Component {
  constructor(props) {
    super(props);
  }
  goUrl = () => {
    store.goDeepLink();
  };
  render() {
    const { popData } = this.props;
    return (
      <div className="askcard">
        <div className="askcardImage">
          <img src={RES_PATH + `card/${popData?.spId}.png`} />
        </div>

        <div
          className="sendbtn md23"
          onClick={() => {
            this.goUrl();
          }}
        ></div>
      </div>
    );
  }
}

export default askcard;
