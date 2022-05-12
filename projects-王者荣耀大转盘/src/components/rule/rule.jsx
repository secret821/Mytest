'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './rule.less';
import EdPop from '@src/EdPopRedux/EdPop.js';

@observer
class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.getRule();
  }

  getRule = async () => {
    const result = await API.GET_RULE();
    if (result && result.success) {
      this.setState({
        text: result.data
      })
    }

  }

  closePop = () => {
    EdPop.closePop();
  }
  render() {
    return (
      <div className="rule">
        <span className="background"></span>
        <span className="closeButton" onClick={this.closePop}></span>
        <span className="activityRules">活动规则</span>
        <div className="activityRulesActivityRules" dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
      </div>
    );
  }
}
export default Rule;
