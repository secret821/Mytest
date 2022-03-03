import React, { Component } from 'react';
import { connect } from "react-redux";
import "./style.less";
class intro extends Component {
  componentDidMount() {
    console.log("inx", this.props.selectIndex);
  }
  render() {
    const { cardInfo, onClose, selectIndex } = this.props;
    return (
      <div className={`mdmount${selectIndex} IntroModal`}>
        <span className="intro-close" onClick={onClose}></span>
        <img src={cardInfo[selectIndex]?.icon} className="intro-image" />
        <p className="intro-title">{cardInfo[selectIndex]?.name}简介</p>
        <div
          className="intro-content"
          dangerouslySetInnerHTML={{
            __html: cardInfo[selectIndex]?.desc
          }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signReward: state.signReward,
    cardInfo: state.cardInfo,
    selectIndex: state.selectIndex
  };
};
export default connect(mapStateToProps)(intro);