'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './drawfailmodal.less';

@observer
class Drawfailmodal extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModal = ()=>{
    modalStore.closePop('Drawfailmodal')
  }
  render() {
    return (
      <div className="drawfailmodal">
        <span className="back"></span>
        <span className="closebtn md22" onClick={this.closeModal}></span>
        <span className="good" onClick={this.closeModal}></span>
        <span className="tips" style={{
          whiteSpace: `pre-wrap`
        }}>{`本次没有中奖哦\n再接再厉吧～`}</span>
      </div>
    );
  }
}
export default Drawfailmodal;
