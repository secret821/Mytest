'use strict';

import React, { Component } from 'react';
import EdPop from '../../EdPopRedux/EdPop.js';
import { RES_PATH } from '../../../sparkrc.js';
import API from '../../api';

import './zhongjiang.less';
class Zhongjiang extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * 跳转我的奖品链接
   */
  handleMyPrize = () => {
    location.href = CFG.prizeUrl;
    EdPop.closePop();
  }

  render() {
    return (
      <div className="zhongjiang ">
        <img className="guang " src={RES_PATH + 'zhongjiang/光.png'} />
        <div className="kuang_4">
          <img className="kuang_4_icon" src={RES_PATH + 'zhongjiang/框4.png'} />
          <div className="prize_name">{this.props.prizeName}</div>
          <img className="li_ji_ling_qu_3 MD-md6" src={RES_PATH + 'zhongjiang/立即领取3.png'} onClick={this.handleMyPrize} />
          <div className="ju_xing_11">
            <img className="ju_xing_11_icon " src={this.props.icon} />
          </div>
          <img className="gong_xi_zhong_jiang " src={RES_PATH + 'zhongjiang/恭喜中奖.png'} />
        </div>
        <img className="guan_bi_m2 " src={RES_PATH + 'zhongjiang/关闭m2.png'} onClick={() => { EdPop.closePop() }} />
      </div>
    );
  }
}
export default Zhongjiang;
