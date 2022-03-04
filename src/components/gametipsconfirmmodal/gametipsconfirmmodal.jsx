'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gametipsconfirmmodal.less';

@observer
class Gametipsconfirmmodal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="gametipsconfirmmodal">
        <span className="desc tc">{`在30秒内游戏分数达到50分\n即挑战成功\n可获得20个金币！`}</span>
        <span className="confirmbtn" onClick={() => {
          this.closeModal()
          this.props.onConfirm()
        }}></span>
      </div>
    );
  }
}
export default Gametipsconfirmmodal;
