import React, { Component } from "react"
// import { SvgaPlayer, loadSvga } from "@spark/animation";
import { connect } from "react-redux"
import { Toast } from "@spark/ui"
import { _throttle } from "@src/utils/utils"
import "./style.less"
import store from "@src/store"
import modalStore from "@src/store/modal"
import API from "@src/api"
import { thisExpression } from "@babel/types"
import EventBus from "@duiba/event-bus"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import Rule from "@src/components/rule/rule"
import taskModal from "@src/components/taskModal/Index"
import { soundCtrl } from "@src/utils/soundCtrl"
import config from "@src/utils/config"
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credits: 0,
      musicStart: true,
    }
  }
  componentDidMount = async () => {
    store.initRule()
    await this.beginMusic()
    // console.log(this.state.musicStart)
    // soundCtrl.changeMute("bg")

    document.addEventListener("visibilitychange", () => {
      let { musicStart } = this.state
      if (document.hidden) {
        config.mute = true
        soundCtrl.changeMute("bg")
        console.log("H5已切换到后台或手机息屏")
      } else {
        console.error(musicStart)
        console.log("H5已切换到网页")
        if (musicStart === true) {
          config.mute = false
          soundCtrl.changeMute("bg")
        } else {
          config.mute = true
          soundCtrl.changeMute("bg")
        }
      }
    })

    // soundCtrl.changeMute('bg');
  }

  audioAutoPlay = (music) => {
    var self = this
    //微信自动播放
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        // music.play();
        config.mute = false
        soundCtrl.playSound("bg")
      },
      false
    )
    document.addEventListener(
      "YixinJSBridgeReady",
      function () {
        // music.play();
        config.mute = false
        soundCtrl.playSound("bg")
      },
      false
    )

    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    function musicInBrowserHandler() {
      // self.musicPlay(true);
      config.mute = false
      soundCtrl.playSound("bg")
      document.body.removeEventListener("touchstart", musicInBrowserHandler)
    }
    document.body.addEventListener("touchstart", musicInBrowserHandler)
  }

  beginMusic = () => {
    config.mute = false
    soundCtrl.playSound("bg")
    this.audioAutoPlay()
  }

  //已打卡
  signedClick = _throttle(() => {
    Toast("今日已打卡，请明天再来吧")
    return
  })
  //结束
  doEnd = _throttle(() => {
    Toast("活动已结束")
    return
  })
  //未开始
  doPre = _throttle(() => {
    Toast("活动未开始")
    return
  })
  //最后一天
  ready = _throttle(() => {
    Toast("今日已打卡")
    return
  })

  doStart = _throttle(() => {
    const { ifPre, ifEnd } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    if (ifEnd) {
      Toast("活动已结束")
      return
    }
    this.getStart()
  })

  getStart = async () => {
    // const res = await API.join()
    // if(res?.success){
    //   this.setState({
    //     credits:res?.data?.credits
    //   })
    //   store.getIndex()
    //   modalStore.pushPop('album',{credits:this.state.credits})
    // }
    EventBus.fire("UPDATE")
  }

  goLottery = _throttle(() => {
    const { ifPre, ifEnd } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    if (ifEnd) {
      Toast("活动已结束")
      return
    }
    store.changePage("lottery")
  })

  //奖品
  goRecord = _throttle(() => {
    const { ifPre } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    window.location.href = CFG.recordUrl
  })

  //规则
  goRule = _throttle(() => {
    const { ifPre } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    // modalStore.pushPop("Rule")
    ModalCtrlIns.showModal(Rule, {
      ruleInfo: store.ruleInfo,
    })
  })

  //客服
  goService = _throttle(() => {
    const { ifPre, ifEnd } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    if (ifEnd) {
      Toast("活动已结束")
      return
    }
    modalStore.pushPop("Service")
  })

  //任务
  goTask = _throttle(() => {
    const { ifPre, ifEnd, readLinkUrl } = this.props?.data
    if (ifPre) {
      Toast("活动未开始")
      return
    }
    if (ifEnd) {
      Toast("活动已结束")
      return
    }
    // modalStore.pushPop("taskModal")
    ModalCtrlIns.showModal(
      taskModal,
      {},
      {
        transitionName: "slide-top",
      }
    )
  })

  startMusic = async () => {
    this.setState({
      musicStart: !this.state.musicStart,
    })
    console.log(this.state.musicStart, "this.state.musicStart")
    const { musicStart } = this.state
    if (!musicStart) {
      config.mute = false
      soundCtrl.playSound("bg")
    } else {
      config.mute = true
      soundCtrl.pauseSound("bg")
    }
    console.log(this.state.musicStart, "-------music")
  }

  render() {
    const {
      totalCredits,
      userId,
      todaySignStatus,
      prizeCredits,
      ifPre,
      ifEnd,
      currentTaskId,
    } = this.props?.data
    const { musicStart } = this.state
    console.log(musicStart, "musicStart---")
    return (
      <div className="iconWrap">
        <div className="index-title">
          <span className="bird11"></span>
          <span className="bird22"></span>
        </div>
        <div
          className="icon-rule md7"
          onClick={() => {
            this.goRule()
          }}
        ></div>
        <div
          className="icon-prize md8"
          onClick={() => {
            this.goRecord()
          }}
        ></div>
        <div
          className="icon-kefu md5"
          onClick={() => {
            this.goService()
          }}
        ></div>
        {(userId && (
          <>
            <div className="md6">
              {musicStart ? (
                <div className="musicOpen" onClick={this.startMusic}></div>
              ) : (
                <div className="musicClose" onClick={this.startMusic}></div>
              )}
            </div>
            <div className="my-credits">
              <span className="credits-count">当前金币：{totalCredits}</span>
            </div>
            <div
              className="icon-lottery md3"
              onClick={() => {
                this.goLottery()
              }}
            >
              <div className="lottery-icom"></div>
              <p className="cost-num">{prizeCredits}金币/次</p>
            </div>
            <span className="toGetCoins md4" onClick={this.goTask}></span>

            {
              currentTaskId === 20 ? (
                <div
                  className="readybtn md2"
                  onClick={() => {
                    this.ready()
                  }}
                ></div>
              ) : ifEnd ? (
                // 活动已结束
                <div
                  className="endbtn md2"
                  onClick={() => {
                    this.doEnd()
                  }}
                ></div>
              ) : ifPre ? (
                //未开始
                <div
                  className="prebtn md2"
                  onClick={() => {
                    this.doPre()
                  }}
                ></div>
              ) : !ifPre && !ifEnd && todaySignStatus ? (
                // 明日再来
                <div
                  className="signedBtn md2"
                  onClick={() => {
                    this.signedClick()
                  }}
                ></div>
              ) : !ifPre &&
                !ifEnd &&
                !todaySignStatus &&
                currentTaskId !== 20 ? (
                // 签到
                <div
                  className="startbtn md1"
                  onClick={() => {
                    this.doStart()
                  }}
                ></div>
              ) : (
                ""
              )
              //  : !ifPre && !ifEnd && todaySignStatus && currentTaskId === 20(
              //   <div
              //     className="readybtn md2"
              //     onClick={() => {
              //       this.ready()
              //     }}
              //   ></div>
              // )
            }
          </>
        )) ||
          ""}
      </div>
    )
  }
}

export default Index
