import React, { Component } from 'react';
import "./style.less";
import modalStore from '@src/store/modal';
import { RES_PATH } from "../../../sparkrc"
class intro extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log("inx", this.props.popData);
  }
  render() {
    const { cardInfo, index } = this.props.popData;
    return (
      <div className={`mdmount${index+1} IntroModal`}>
        <span className="intro-close" onClick={()=>{modalStore.closePop('intro')}}></span>
        <img src={`${RES_PATH}cards/${index+1}.png`} className="intro-image" />
        <span className="intro-title">{cardInfo[index+1]?.name}一游</span>
        <div
          className="intro-content"
          dangerouslySetInnerHTML={{
            __html: cardInfo[index+1]?.desc
          }}
        ></div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     signReward: state.signReward,
//     cardInfo: state.cardInfo,
//     selectIndex: state.selectIndex
//   };
// };
export default intro