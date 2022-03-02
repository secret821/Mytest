import React, { Component } from "react"
// import { SvgaPlayer, loadSvga } from "@spark/animation";
import { connect } from "react-redux"
import { Toast } from "@spark/ui"
import { _throttle } from "@src/utils/utils"
import "./style.less"
import store from "@src/store"
import modalStore from "@src/store/modal";
import API from "@src/api"
class Index extends Component {
  constructor(props) {
    super(props)
  }
  // signedClick = _throttle(() => {
  //   Toast("今日已打卡，请明天再来吧");
  //   return;
  // });
  // doStart = _throttle(() => {
  //   const { startSign, actEndType } = this.props;
  //   if (actEndType >= 1) {
  //     Toast("活动已结束");
  //     return;
  //   }
  //   startSign && startSign();
  // });
  // goLottery = _throttle(() => {
  //   const { actEndType } = this.props;
  //   if (actEndType >= 2) {
  //     Toast("活动已结束");
  //     return;
  //   }
  //   window.location.href = CFG.turngameUrl;
  // });
  // goRecord = _throttle(() => {
  //   const { actEndType } = this.props;
  //   if (actEndType === 3) {
  //     Toast("活动已结束");
  //     return;
  //   }
  //   window.location.href = CFG.recordUrl;
  // });
  render() {
    // const { homeInfo, actEndType, pageShow } = this.props;
    return (
      <div className="iconWrap">
        <div className="index-title">
          {/* {pageShow && (
            <SvgaPlayer
              src={SVGA_RES_INDEX["index_title"]}
              className="title-ani"
              loop={1}
            ></SvgaPlayer> */}
          {/* )} */}
        </div>
        <div
          className="icon-rule md4"
          onClick={() => {
            modalStore.pushPop('Rule')
          }}
        ></div>
        <div
          className="icon-prize md5"
          onClick={() => {
            this.goRecord()
          }}
        ></div>
        <div
          className="icon-kefu md6"
          onClick={() => {
            // store.dispatch(actions.modalCtl("service"));
          }}
        ></div>
        <div>
          <span className="musicOpen"></span>
          {/* <span className="musicClose"></span> */}
        </div>
        <div className="my-credits">
          <span className="credits-count">当前金币：9999{}</span>
        </div>
        <div
          className="icon-lottery md9"
          onClick={() => {
            this.goLottery()
          }}
        >
          {/* <span className="lottery-icom"></span> */}
          {/* <p className="cost-num">{}金币/次</p> */}
        </div>
        <span className="toGetCoins"></span>
        {/* {actEndType >= 1 ? (*/
          <div
            className="endbtn"
            onClick={() => {
              this.doStart();
            }}
          ></div>
          /*
        ) : homeInfo?.todaySignStatus ? (
          <div
            className="signedBtn"
            onClick={() => {
              this.signedClick();
            }}
          ></div>
        ) : (
          <div
            className="startbtn md8"
            onClick={() => {
              this.doStart();
            }}
          ></div>
        )} */}
      </div>
    )
  }
}

export default Index
