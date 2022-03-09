'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gameovermodal.less';

@observer
class Gameovermodal extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModal3 = ()=>{
    modalStore.closeModal('Gameovermodal')
  }
  render() {
    const {score, credits} = this.props
    return (
      <div className="gameovermodal">
        <span className="back"></span>
        <span className="coin"></span>
        <span className="count">{credits}</span>
        <span className="closebtn" onClick={this.closeModal3}></span>
        <span className="confirmbtn md26" onClick={this.closeModal3}></span>
        <span className="desc tc">恭喜获得{credits}个金币</span>
        <span className="d tc">游戏得分：{score}分</span>
      </div>
    );
  }
}
export default Gameovermodal;
