'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './tip.less';

@observer
class Tip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tip">
        <span className="background"></span>
        <span className="imSorryYoureNotAvailableThisTime">抱歉，您非本次活动 目标用户，不可参与</span>
      </div>
    );
  }
}
export default Tip;
