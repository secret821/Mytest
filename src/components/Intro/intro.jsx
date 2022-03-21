import React, { Component } from "react"
import "./style.less"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"
import { SvgaPlayer, loadSvga } from "@spark/animation"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import taskModal from "../taskModal/Index"

class intro extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log("inx", this.props.popData)
  }
  render() {
    const { cardInfo, index } = this.props.popData
    return (
      <div className={`mdmount${index + 1} IntroModal`}>
        <span className="intro-bg"></span>
        <span
          className="intro-close"
          onClick={() => {
              ModalCtrlIns.showModal(
                taskModal,
                {},
                {
                  transitionName: "slide-top",
                  center: false,
                  fixedBody: false
                }
              )
            modalStore.closePop("intro")
          }}
        ></span>
        {/* <img src={`${RES_PATH}cards/${index+1}.png`} className="intro-image" /> */}
        <SvgaPlayer
          className="intro-image"
          src={`${RES_PATH}svga/${index + 1}.svga`}
          loop={false}
        ></SvgaPlayer>
        <span className="intro-title">{cardInfo[index]?.name}一游</span>
        <div
          className="intro-content"
          dangerouslySetInnerHTML={{
            __html: cardInfo[index]?.desc,
          }}
        ></div>
      </div>
    )
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
