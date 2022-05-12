'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './getpriz1.less';
import EdPop from '@src/EdPopRedux/EdPop.js';
import Guide from '../guide/guide.jsx';
import { _throttle, checkNavWX, initShare, onShare } from "@src/utils";


@observer
class Getpriz1 extends Component {
  constructor(props) {
    super(props);
    console.log('hahaha-->', this.props);
  }

  goPrize = () => {
    if (checkNavWX()) {
      EdPop.closePop();
      EdPop.showPop(Guide)
      window.history.replaceState({}, '四川联通大转盘', CFG.recordUrlAPP);
      return;
    } else {
      window.location.href = CFG.recordUrl;
    }
  }

  closePop = () => {
    EdPop.closePop();
  }
  render() {
    return (
      <div className="getpriz1">
        <span className="background"></span>
        <img className="prize_img" src={this.props.lastOptions[0]?.optionImg} />
        <span className="closeButton" onClick={this.closePop}></span>
        <span className="button md3" onClick={this.goPrize}></span>
        <span className="copywritingCopywriting">{this.props.lastOptions[0]?.optionName}</span>
      </div>
    );
  }
}
export default Getpriz1;
