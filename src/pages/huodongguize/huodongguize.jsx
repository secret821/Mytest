'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { ApiTool } from "../../util/NetCheck.js";
import EdPop from '../../EdPopRedux/EdPop.js';
import './huodongguize.less';

class Huodongguize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: null,
    }
  }

  componentDidMount() {
    this.getRule();
  }

  getRule = async () => {
    const result = await ApiTool("getRule");
    if (result && result.success) {
      this.setState({
        rules: result.data
      });
    }

  }

  render() {
    const { rules } = this.state;
    return (
      <div className="huodongguize ">
        <img className="kuang_10 " src={RES_PATH + 'huodongguize/框10.png'} />
        <div className="rule_text" dangerouslySetInnerHTML={{ __html: rules }}></div>
        <img className="guan_bi_m9 " src={RES_PATH + 'huodongguize/关闭m9.png'} onClick={() => { EdPop.closePop() }} />
      </div>
    );
  }
}
export default Huodongguize;
