'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './sorrymodal.less';

@observer
class Sorrymodal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sorrymodal ">
        <span className="back"></span>
        <span className="confirm md28" onClick={this.closeModal}></span>
        <span className="desc tc">{`您的金币今日\n已达上限`}</span>
      </div>
    );
  }
}
export default Sorrymodal;
