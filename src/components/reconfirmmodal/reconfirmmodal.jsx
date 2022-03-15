'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './reconfirmmodal.less';

@observer
class Reconfirmmodal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="reconfirmmodal">
        <span className="closebtn" onClick={this.closeModal}></span>
        <span className="back"></span>
        <div className="operationcont">
          <span className="confirmbtn" onClick={async () => {
            await this.props.onConfirm()
            this.closeModal()
          }}></span>
          <span className="closebtn_1" onClick={this.closeModal}></span>
        </div>
        <span className="desc">{`确认消耗${this.props.needCoins}个金币\n抽奖吗？`}</span>
      </div>
    );
  }
}
export default Reconfirmmodal;
