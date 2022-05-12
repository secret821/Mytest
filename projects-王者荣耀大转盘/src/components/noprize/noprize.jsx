'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './noprize.less';
import EdPop from '@src/EdPopRedux/EdPop.js';

@observer
class Noprize extends Component {
  constructor(props) {
    super(props);
  }

  closePop = () => {
    EdPop.closePop();
  }
  render() {
    return (
      <div className="noprize">
        <span className="background"></span>
        <span className="closeButton" onClick={this.closePop}></span>
        <span className="nothingMore">什么也没有，再接再厉</span>
        {this.props.drawPrizeModel?.freeJoinTimes && <div className="button" onClick={this.closePop} ></div>}
        {!this.props.drawPrizeModel?.freeJoinTimes && <div className="button1 md4" onClick={this.closePop}></div>}
      </div>
    );
  }
}
export default Noprize;
