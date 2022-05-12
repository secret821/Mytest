"use strict";

import React from "react";
import { RES_PATH } from "../../../sparkrc.js";
import { observer } from "mobx-react";
import store from "../../store/index";
import modalStore from "@src/store/modal";
import API from "../../api";
import "./homePage.less";
import { getUrlParam } from "../../utils/utils";
import { start, updateShare, Weixin } from "@spark/share";
import { shareContent } from "../../utils/constants";
@observer
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await start([Weixin], success => {
      console.info("分享成功" + success ? "成功" : "失败");
    });
    let _type = getUrlParam("type") || "share";
    updateShare({ ...shareContent[_type], url: location.href });
    // modalStore.pushPop("givecard");
    const type = getUrlParam("type") || "share";
    const spId = getUrlParam("spId") || "";
    if (type === "share") {
      modalStore.pushPop("sharemodal");
    } else if (type === "give") {
      modalStore.pushPop("givecard", { spId: spId });
    } else if (type === "ask") {
      modalStore.pushPop("askcard", { spId: spId });
    }
  }
  render() {
    return <div className="homePage"></div>;
  }
}

export default HomePage;
