"use strict"

import React from "react"
import { RES_PATH } from "../../../sparkrc.js"
import { observer } from "mobx-react"
import store from "../../store/index"
import modalStore from "@src/store/modal"
import API from "../../api"
import "./homepage.less"
import Index from "./Iconlist/Index.jsx"
import { _throttle } from "@src/utils/utils"
import EventBus from "@duiba/event-bus"
import { SvgaPlayer, loadSvga } from "@spark/animation"
import { SVGA_RES_INDEX } from "@src/utils/constants"
import * as actions from "@src/store/action"
import { onInitShare } from "@src/store/utils.js"
import { getUrlParam, setUrlParam, scrollTo } from "@lightfish/tools"
import { showToast } from "@src/utils/utils.js"
import { Toast } from "@spark/ui"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import album from "@src/components/Album/album.jsx"
import { soundCtrl } from "@src/utils/soundCtrl"
import config from "@src/utils/config"

@observer
class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      homeInfo: {},
      cardInfo: [],
      showSignAni: false, // 是否展示印章动画
      // totalCredits:0,
      
    }
    this.locateRef = React.createRef()
  }

  // componentDidMount = async () => {
  //   await store.getIndex()
  //   await this.getCardInfo()
  //   EventBus.on("UPDATE", this.update, this)
  // }

  componentWillUnmount() {
    clearInterval(this.timer)
    EventBus.off("UPDATE", this.update)

    window.scrollFunc = scrollTo
  }

  update = _throttle(async () => {
    console.info(store.cardInfo,'=====cards')
    const res = await API.join()
    if (res?.success) {
      this.setState({
        credits: res?.data?.credits,
      })
      // store.getIndex()
      await this.setIndex()
      // store.indexInfo.currentTaskId ++ 
      // store.indexInfo.todaySignStatus = true
      const currDaysIndex = store.indexInfo.currentTaskId + 1
      const parseIntTop = parseInt(getComputedStyle(document.querySelector('.locatpos' + currDaysIndex)).top)
      function disableHtml() {
        document.querySelector('.wrapper-cont').style.pointerEvents = 'none'
      }
      disableHtml()

      scrollTo(parseIntTop-400, 500, document.querySelector('html'))
      await new Promise(r => {
        setTimeout(r, 500)
      })
      this.setState({
        showSignAni: true,
      }, () => {
        // parseInt(document.querySelector('.locatpos' + currDaysIndex).style.top)
        function enableHtml() {
          document.querySelector('.wrapper-cont').style.pointerEvents = 'auto'
        }
        function endPlay(){
          document.querySelector(".sign_icon_ani").addEventListener("animationend", () => {
            enableHtml()
            // console.log("动画结束");
            ModalCtrlIns.showModal(album, {
                  credits: this.state.credits,
                  cardInfo: this.state.cardInfo
                }, {
                  transitionName: 'scale-in-center',
                  fixedBody: false
                }
            )
          })
        }
        endPlay.call(this)
      })
      
      // setTimeout(()=>{
      //   ModalCtrlIns.showModal(album, {
      //     credits: this.state.credits,
      //     cardInfo: this.state.cardInfo
      //   }, {
      //     transitionName: 'scale-in-center',
      //     fixedBody: false
      //   },1000)
      // })
      // modalStore.pushPop("album", )
      // this._type = +data?.taskTypeBySignDays;
    }
  })

  async componentDidUpdate(preprops, prestate) {
    if (!preprops?.homeInfo && !this.props.homeInfo?.firstJoin) {
      if (!prestate.pageShow && !this.state.pageShow) {
        this.setState({ pageShow: true })
      }
    }
    if (
      !preprops?.homeInfo?.currentTaskId !== this.props.homeInfo?.currentTaskId
    ) {
      if (this.props.homeInfo?.currentTaskId) {
        // 当前站点位置
        let _locY =
          this.locateRef.current?.children[
            +this.props.homeInfo?.currentTaskId - 1
          ].offsetTop
        window.scrollTo(0, _locY - 250)
      }
    }
  }
  componentDidMount = async () => {
    // await this.beginMusic()
    // modalStore.pushPop('Drawfailmodal')
    await this.setIndex()
    await this.getCardInfo()
    EventBus.on("UPDATE", this.update, this)
    if (store.indexInfo.followOfficalAccount) {
      onInitShare()
      this.onDoHelp()
    } else {
      onInitShare(false, false)
    }
  }

  // beginMusic =()=>{
  //   config.mute = false
  //   soundCtrl.playSound("bg")
  // }
  setIndex = async()=>{
    await store.getIndex()
    this.setState({
      homeInfo:store.indexInfo
    })
  }

  async onDoHelp() {
    const shareCode = getUrlParam("shareCode")
    if (!shareCode) {
      return
    }
    const { success, data } = await API.doAssist({ assistItemId: shareCode })
    if (success) {
      showToast("恭喜为好友助力成功")
    }
    if (history) {
      history.replaceState(null, null, setUrlParam("shareCode", ""))
    }
  }

  getCardInfo = async () => {
    const res = await API.cardList()
    if (res?.success) {
      this.setState({
        cardInfo: res?.data.length
          ? res?.data.map((item, inedx) => {
              return item
            })
          : [],
      })
      store.setCardInfo(res)
    }
  }
  getAllCoin() {
    const { totalCredits } = store?.indexInfo
    console.log(totalCredits, "totalCredits-------")
    this.setState({
      totalCredits: totalCredits,
    })
  }

  // 已打卡山-展示简介
  showDeatil = _throttle((index) => {
    const { ifend } = store?.indexInfo
    // console.log( +index + 1 <=store.indexInfo?.currentTaskId,'store.indexInfo?.currentTaskId - !+store.indexInfo?.todaySignStatus--')
    if (
      +index + 1 <=
      +store.indexInfo?.currentTaskId
    ) {
      // store.dispatch(actions.changeSelectIndex(index));
      modalStore.pushPop("intro", {
        cardInfo: this.state.cardInfo,
        index: index,
      })
    } else {
      Toast("该建筑未解锁")
    }
  })

  render() {
    const { cards, cardInfo, showSignAni } = this.state
    const { totalCredits } = store.indexInfo
    const homeInfo = store.indexInfo
    // console.log(homeInfo?.currentTaskId - !+homeInfo?.todaySignStatus, "homeInfo?.todaySignStatus------=====")
    return (
      <div className="wrapper-cont">
        <div className="homepage">
          {cards.length && <Index data={store.indexInfo}></Index>}
          <div className="locateWrap" ref={this.locateRef}>
            {cardInfo?.map((item, index) => {
              return (
                <div
                  className={`locatpos${+index + 1} md9dpm_d=${+index+1}`}
                  key={index}
                  onClick={() => {
                    this.showDeatil(index)
                  }}
                >
                  {+index + 1 >
                  +homeInfo?.currentTaskId ? (
                    ""
                  ) : (
                    <div className="signedTag">
                      {/* {showSignAni &&
                        index + 1 === +homeInfo?.currentTaskId &&
                        homeInfo?.todaySignStatus 
                        } */}
                      <div
                        className={
                          (function() {
                            return showSignAni 
                            &&
                            index + 1 === +homeInfo?.currentTaskId &&
                             homeInfo?.todaySignStatus
                            ? "sign_icon sign_icon_ani"
                            : "sign_icon"
                          })()
                          
                        }
                      ></div>
                    </div>
                  )}
                  {/* <div className={`tipsicon${item.type} tipsicon`}></div> */}
                </div>
              )
            })}
          </div>
          <div className="bgalls">
            <span className="bgall"></span>
            <span className="top"></span>
            <span className="liu"></span>
            <span className="liu2"></span>
          </div>
          <div className="longjingwencha">
            <span className="bglongjing"></span>
            <span className="yanzilongjing"></span>
          </div>
          <div className="liulangwenyan">
            <span className="yanziliulang"></span>
            <span className="bgliuliang"></span>
          </div>
          <div className="yuhuangfeiyun">
            <span className="yun1yuhuang"></span>
            <span className="shanhou"></span>
            <span className="yun2yuhuang"></span>
            <span className="shanqian"></span>
            <span className="yunyouyuhuang"></span>
            <span className="yun3yuhuang"></span>
            <span className="shipyuhuang"></span>
            <span className="liushuyuhuang"></span>
          </div>
          <div className="nanpingwanzhong">
            <span className="people"></span>
            <span className="yun"></span>
            <span className="clock"></span>
            <span className="dayan"></span>
            <span className="house"></span>
            <span className="shipnanping"></span>
          </div>
          <div className="huanglongtucui">
            <span className="bghuanglong"></span>
            <span className="shiphuanglong"></span>
            <span className="liuye"></span>
          </div>
          <div className="wushantianfeng">
            <span className="bgwushan"></span>
            <SvgaPlayer
              className="wushansvga"
              src={`${RES_PATH}homeSvga/吴山天风.svga`}
              // src="//yun.duiba.com.cn/aurora/assets/9ab51170dca045696011f1aac7aa5ae6a6c2f058.svga"
            ></SvgaPlayer>
          </div>
          <div className="hupaimengquan">
            <span className="bghupao"></span>
          </div>
          <div className="jiuxiyanshu">
            <span className="bgjiuquan"></span>
          </div>
          <div className="ruandunhuanbi">
            <span className="bghuanbi"></span>
            <span className="yanziyou"></span>
            <span className="yanzizuo"></span>
            <span className="yanziwhite"></span>
          </div>
          <div className="pinghuqiuyue">
            <span className="bgpinghu"></span>
            <span className="light"></span>
          </div>
          <div className="duanqiaocanxue">
            <span className="bgduanqiao"></span>
            <SvgaPlayer
              className="snow"
              src={`${RES_PATH}homeSvga/雪花.svga`}
              // src="//yun.duiba.com.cn/aurora/assets/2f6768ff2c3e5a322f47c32c2d60456ad325bb96.svga"
            ></SvgaPlayer>
          </div>
          <div className="manlongguiyu">
            <span className="bg_guiyu"></span>
            <span className="swallowguiyu"></span>
            <span className="shipguiyu"></span>
            <SvgaPlayer
              className="flowers"
              src={`${RES_PATH}homeSvga/花.svga`}
              // src="//yun.duiba.com.cn/aurora/assets/f90ee4ba20d4df38795e0ace9f56a0b4326a175b.svga"
            ></SvgaPlayer>
          </div>
          <div className="sudichunwan">
            <span className="bg_shudi"></span>
            <span className="ship"></span>
            <span className="swallow"></span>
            <span className="kite"></span>
          </div>
          <div className="yunxizhujing">
            <span className="shan"></span>
            <span className="zhuzihou"></span>
            <span className="yuntop_1"></span>
            <span className="zhuziqian"></span>
            <span className="yun2"></span>
          </div>
          <div className="santanyingyue">
            <span className="bgsantan"></span>
            <span className="yanzizuo_1"></span>
            <span className="yanziyou_1"></span>
            <span className="yanzi1"></span>
          </div>
          <div className="huagangguanyu">
            <span className="bghuagang"></span>
            {/* <span className="fish"></span> */}
            <SvgaPlayer
              className="fish"
              // src="//yun.duiba.com.cn/aurora/assets/479eafd3181763d09cd569d52dd9f672bd997961.svga"
              src={`${RES_PATH}homeSvga/鱼.svga`}
            ></SvgaPlayer>
            <span className="yunhuagang"></span>
          </div>
          <div className="leifengxizhao">
            <span className="yun2_1"></span>
            <span className="yun_1"></span>
            <span className="bgleifeng"></span>
            <span className="shipleifeng"></span>
            <span className="shuye"></span>
            <span className="dayan_1"></span>
          </div>
          <div className="shuangfengchayun">
            <span className="shan1"></span>
            <span className="yun1"></span>
            <span className="shan2"></span>
            <span className="yun2_2"></span>
            <span className="shan3"></span>
            <span className="yun3"></span>
            <span className="yun4"></span>
            <span className="yan"></span>
          </div>
          <div className="quyuanfenghe">
            <span className="zu103"></span>
            <span className="zu1033"></span>
            <SvgaPlayer
              className="heye"
              // src="//yun.duiba.com.cn/aurora/assets/40befec68d4f7a66b44fc797324ce51aadf53642.svga"
              src={`${RES_PATH}homeSvga/荷花.svga`}
            />
          </div>
          <div className="baoshiliuxia">
            <span className="bgliuxia"></span>
            <span className="yunliuxiayou"></span>
            <span className="yunliuxiazuo"></span>
            <span className="birdbao"></span>
          </div>
          <div className="button">
            <span className="yunzuo"></span>
            <span className="mzuo"></span>
            <span className="mhou"></span>
            <span className="yunyou"></span>
            <span className="mqian"></span>
          </div>
          <div className="titles">
            {cards.map((item, index) => {
              return (
                <div key={index}>
                  <span className={`_${index + 1}`}></span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
