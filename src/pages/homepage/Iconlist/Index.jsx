import React, { Component } from "react"
// import { SvgaPlayer, loadSvga } from "@spark/animation";
import { connect } from "react-redux"
import { Toast } from "@spark/ui"
import { _throttle } from "@src/utils/utils"
import "./style.less"
import store from "@src/store"
import modalStore from "@src/store/modal"
import API from "@src/api"
class Index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  //已打卡
  signedClick = _throttle(() => {
    Toast("今日已打卡，请明天再来吧");
    return;
  });
  //结束
  doEnd = _throttle(() => {
    Toast("活动已结束");
    return;
  });
  //未开始
  doPre = _throttle(() => {
    Toast("活动未开始");
    return;
  });
  // doStart = _throttle(() => {
  //   const { startSign, actEndType } = this.props;
  //   if (actEndType >= 1) {
  //     Toast("活动已结束");
  //     return;
  //   }
  //   startSign && startSign();
  // });
  goLottery = _throttle(() => {
    const { ifPre,ifEnd } = this.props;
    if (ifPre) {
      Toast("活动未开始");
      return;
    }
    if (ifEnd) {
      Toast("活动已结束");
      return;
    }
    window.location.href = CFG.turngameUrl;
  });

  //奖品
  goRecord = _throttle(() => {
    const { ifPre } = this.props;
    if (ifPre) {
      Toast("活动未开始");
      return;
    }
    window.location.href = CFG.recordUrl;
  });

  //规则
  goRule = _throttle(() => {
    const { ifPre } = this.props;
    if (ifPre) {
      Toast("活动未开始");
      return;
    }
    modalStore.pushPop("Rule")
  });

  //客服
  goService = _throttle(() => {
    const { ifPre,ifEnd } = this.props;
    if (ifPre) {
      Toast("活动未开始");
      return;
    }
    if (ifEnd) {
      Toast("活动已结束");
      return;
    }
    modalStore.pushPop("Service")
  });

  //任务
  goTask =  _throttle(() => {
    const { ifPre,ifEnd } = this.props;
    if (ifPre) {
      Toast("活动未开始");
      return;
    }
    if (ifEnd) {
      Toast("活动已结束");
      return;
    }
    modalStore.pushPop("taskModal")
  });

  render() {
    const { totalCredits, todaySignStatus, prizeCredits, ifPre, ifEnd } =
      this.props?.data
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
          className="icon-rule"
          onClick={() => {this.goRule()}}
        ></div>
        <div
          className="icon-prize"
          onClick={() => {
            this.goRecord()
          }}
        ></div>
        <div
          className="icon-kefu"
          onClick={() => {
            this.goService()
          }}
        ></div>
        <div>
          <span className="musicOpen"></span>
          {/* <span className="musicClose"></span> */}
        </div>
        <div className="my-credits">
          <span className="credits-count">当前金币：{totalCredits}</span>
        </div>
        <div
          className="icon-lottery"
          onClick={() => {
            this.goLottery()
          }}
        >
          <div className="lottery-icom"></div>
          <p className="cost-num">{prizeCredits}金币/次</p>
        </div>
        <span className="toGetCoins" onClick={this.goTask}></span>
        {ifEnd ? (
          // 活动已结束
          <div
            className="endbtn"
            onClick={() => {
              this.doEnd()
            }}
          ></div>
        ) : ifPre ? (
          //未开始
          <div
            className="prebtn"
            onClick={() => {
              this.doPre()
            }}
          ></div> ? (
            !ifPre&&!ifEnd&&todaySignStatus
          ) : (
            // 明日再来
            <div
              className="signedBtn"
              onClick={() => {
                this.signedClick()
              }}
            ></div>
          )
        ) : (
          // 签到
          <div
            className="startbtn"
            onClick={() => {
              this.doStart()
            }}
          ></div>
        )}
      </div>
    )
  }
}

export default Index
