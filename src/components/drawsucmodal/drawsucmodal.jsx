'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './drawsucmodal.less';

@observer
class Drawsucmodal extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModal2 = ()=>{
    modalStore.closePop('Drawsucmodal')
  }
  render() {
    const { icon, name } = this.props.prizeInfo
    return (
      <div className="drawsucmodal">
        <span className="inGroup2"></span>
        <span className="closebtn" onClick={this.closeModal2}></span>
        <span className="confirmbtn md21" onClick={this.closeModal2}></span>
        <span className="prizename lineClamp1">{name}</span>
        <div className="prize-img" style={{
          backgroundImage: `url(${icon})`
        }}></div>
        <span className="tips tc">*奖品可在【我的奖品】中查看</span>
      </div>
    );
  }
}
export default Drawsucmodal;
