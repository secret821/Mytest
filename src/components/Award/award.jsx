import React, { Component } from "react"
import "./style.less"
import store from "@src/store"
import * as actions from "@src/store/action"
import { connect } from "react-redux"
class award extends Component {
  close = () => {
    store.dispatch(actions.modalCtl(""))
    // 当前站点位置
    setTimeout(() => {
      let _locY =
        document.querySelector(".locateWrap").children[
          +this.props.homeInfo?.currentTaskId - 1
        ].offsetTop
      window.scrollTo(0, _locY - 250)
    }, 0)
  }

  // close = () => {
  //   this.close,
  //     ModalCtrlIns.showModal(
  //       taskModal,
  //       {},
  //       {
  //         transitionName: "slide-top",
  //         center: false,
  //       }
  //     )
  // }

  render() {
    const { rewardcredits } = this.props
    return (
      <div className="awardModal">
        <span className="award-close" onClick={this.close}></span>
        <div className="award-image">
          <span
            // src="//yun.duiba.com.cn/aurora/assets/6911429dd9d38e62c80540873a591f51006fe53f.png"
            className="award-prizeimage"
          />
        </div>
        <p className="award-count">
          x{rewardcredits}
          <span className="award-coin"></span>
        </p>
        <div className="awardbtn" onClick={this.close}></div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    rewardcredits: state.rewardcredits,
    homeInfo: state.homeInfo,
  }
}
export default connect(mapStateToProps)(award)
