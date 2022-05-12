import store from '@src/store';
import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc';
import "./style.less";
class giveCard extends Component {
  constructor(props) {
    super(props);
  }
  goUrl = () => {
    store.goDeepLink();
  }
  render() {
    const {popData} = this.props;
    return (
      <div className="giveCardModal">
        <div className="givecard">
          <img src={RES_PATH + `card/${popData?.spId}.png`} />
        </div>

        <div className="btn md22" onClick={() => {this.goUrl()}}></div>
      </div>
    );
  }
}

export default giveCard;