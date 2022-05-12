'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './shouye.less';
import Turnlottery from "../../components/turnLottery/turn.jsx";
import EdPop from '@src/EdPopRedux/EdPop.js';
import Rule from '@src/components/rule/rule.jsx';
import { _throttle, checkNavWX, initShare, onShare } from "@src/utils";
import Login from '@src/components/login/login.jsx';
import Tip from '@src/components/tip/tip.jsx';
import { useThrottle } from "@src/utils";
import dataCenter from '@src/utils/dataCenter.js';
import messageIns from '@src/utils/message.js';
import Guide from '@src/components/guide/guide.jsx';
import { ensureDomain, getDomain, domain } from '@spark/dbdomain'

@observer
class Shouye extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await ensureDomain();
    await this.splicingAllUrl();
    this.isWhite();
    // this.getIndex();
    await initShare();
    await onShare(CFG.shareData);
  }

  splicingAllUrl = () => {
    return new Promise((r, j) => {
      console.log(CFG.noLoginUrl)
      // CFG.noLoginUrl = this.splicingUrl(CFG.noLoginUrl);
      CFG.activityUrl = this.splicingUrl(CFG.activityUrl);
      // CFG.recordUrl = this.splicingUrl(CFG.recordUrl);
      // CFG.recordUrlAPP = this.splicingUrl(CFG.recordUrlAPP, encodeURIComponent(encodeURIComponent(CFG.recordUrl)));
      CFG.MID_LINK = this.splicingUrl(CFG.noLoginUrl, encodeURIComponent(CFG.activityUrl));
      CFG.shareData.url = CFG.MID_LINK;
      console.info('awdas-->>', CFG)
      r();
    })

  }


  splicingUrl = (url, redirectUrl = '') => {
    if (!url) return;
    console.info("====>", domain)
    return url = (domain || location.origin) + url + redirectUrl;
  }

  // getIndex = async () => {
  //   const { data, success } = await API.GET_INDEX();
  //   if (success) {
  //     if (!data?.canJoinActive) {
  //       EdPop.showPop(Tip)
  //     }
  //   }
  // }

  isWhite = async () => {
    if (!await this.checkIsBindPhone() && checkNavWX()) {
      // /微信端且没有绑定手机号
      EdPop.showPop(Login);
    } else {
      messageIns.emit('getPrize')
    }
  }

  /** 判断是否绑定手机号 */
  checkIsBindPhone = async () => {
    const { data, success, code } = await API.CHECK_ISBIND_PHONE();
    dataCenter.setData("isLogin", data)
    if (success && data) return true;
    return false;
  }

  goPrize = () => {
    if (checkNavWX()) {
      EdPop.showPop(Guide)
      window.history.replaceState({}, '四川联通大转盘', CFG.recordUrlAPP);
      return;
    } else {
      window.location.href = CFG.recordUrl;
    }
  }

  toRule = () => {
    EdPop.showPop(Rule);
  }
  render() {
    return (
      <div className="shouye">
        <span className="background"></span>
        <span className="title"></span>
        <Turnlottery ref={ref => (this.turnTabel = ref)}></Turnlottery>
        <span className="disc"></span>
        <span className="ruleBtn" onClick={this.toRule}></span>
        <span className="prizeBtn" onClick={this.goPrize}></span>
      </div>
    );
  }
}
export default Shouye;
