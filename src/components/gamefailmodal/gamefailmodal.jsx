'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gamefailmodal.less';

@observer
class Gamefailmodal extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModal4 =()=>{
    this.closeModal()
  } 
  render() {
    return (
      <div className="gamefailmodal">
        <span className="back"></span>
        <span className="closebtn" onClick={this.closeModal4}></span>
        <span className="confirmbtn md27" onClick={this.closeModal4}></span>
        <span className="t2 ">- 闯关失败 再接再厉 -</span>
        <span className="t1 ">游戏得分：{this.props.score}分</span>
        <span className="xixi"></span>
      </div>
    );
  }
}
export default Gamefailmodal;
