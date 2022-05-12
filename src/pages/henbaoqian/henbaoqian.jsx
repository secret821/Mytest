'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
//import API from '../../api';

import './henbaoqian.less';
class Henbaoqian extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 跳转首页
   */
  handleShouye = () => {
    location.href = CFG.appIndexUrl;
  }
  render() {
    return (
      <div className="henbaoqian ">
        <img className="kuang_13 " src={RES_PATH + 'henbaoqian/框13.png'} />
        <div className="hen_bao_qian_nin_zan_bu_shu ">很抱歉，<br />您暂不属于目标用户群体</div>
        <img className="li_ji_deng_lu_12 " src={RES_PATH + 'henbaoqian/立即登陆12.png'} onClick={this.handleShouye} />
      </div>
    );
  }
}
export default Henbaoqian;
