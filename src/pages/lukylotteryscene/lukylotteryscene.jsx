"use strict"

import React from "react"
import { RES_PATH } from "../../../sparkrc.js"
import { observer } from "mobx-react"
import store from "../../store/index"
import modalStore from "@src/store/modal"
import API from "../../api"
import "./lukylotteryscene.less"
import { showToast, _throttle } from "@src/utils/utils.js"
import { removeClass, addClass, PromiseAwait } from "@lightfish/tools"
import Drawfailmodal from "@src/components/drawfailmodal/drawfailmodal.jsx"
import Drawsucmodal from "@src/components/drawsucmodal/drawsucmodal.jsx"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import Reconfirmmodal from "@src/components/reconfirmmodal/reconfirmmodal.jsx"

@observer
class Lukylotteryscene extends React.Component {
  latticeBoxList = []
  prizeHandledList = []
  constructor(props) {
    super(props)
  }

  doLottery = (function (
    nineBox,
    realLottery,
    loopFunc,
    preJudge = () => true
  ) {
    const defaultConfig = {
      startTime: 400,
      dt: 40,
      rt: -50,
      finalt: 300,
      miniSpt: 60,
      endStepTime: 800,
    }
    let isDrawing = false // 当前是否处理 转盘的状态
    let currIndex = 7 // 当前下标
    let nineBoxList = nineBox
    let startTime = defaultConfig.startTime // 开始抽奖的时间间隔
    let dt = defaultConfig.dt // 每次loop 递减的数值
    let rt = defaultConfig.rt // reverse +的时间
    let reverse = false // 是否已经开始 翻转 减速
    let finalt = defaultConfig.finalt // 最后最慢时间间隔

    let t = dt // 每次缩短的 时间
    let finalIndex = 0 // 最后停止的下标
    let timer = null // 定时器
    let lastNow = null // 达到最高速的时间点
    let maxSpeedCb = [] // 最大速度回调
    let endCb = [] // 结束回调
    let isRoll = true // 是否切换
    let totalPrizeLen = 8

    function showCurrIndexLattice() {
      removeClass(nineBoxList[currIndex], "active")
      currIndex = (currIndex + 1) % totalPrizeLen
      addClass(nineBoxList[currIndex], "active")
      loopFunc && loopFunc()
    }
    const lotteryFunc = {
      doTurn: function () {
        if (isDrawing) return
        if (!preJudge()) return
        isDrawing = true
        function loop() {
          if (!isRoll) return
          showCurrIndexLattice()
          // 达到最大速度
          if (startTime <= defaultConfig.miniSpt && !reverse) {
            lastNow = Date.now() // 记一次时间
            reverse = true // 开始反转
            t = 0 // 当前间隔不再缩短
            maxSpeedCb.forEach((f) => f())
          } else {
            startTime -= t
          }
          if (startTime >= finalt && reverse) {
            t = 0 // 不再缩短
            if (currIndex === finalIndex) {
              isRoll = false
              setTimeout(() => {
                endCb.forEach((f) => f())
                lotteryFunc.reset()
              }, defaultConfig.endStepTime)
            }
          }
          timer = setTimeout(() => {
            loop()
          }, startTime)
        }
        loop()
        realLottery && realLottery()
      },
      reset() {
        isRoll = true
        reverse = false
        startTime = defaultConfig.startTime
        t = defaultConfig.dt
        isDrawing = false
        // timer && timer.stop()
        clearTimeout(timer)
        lastNow = null
        maxSpeedCb.splice(0)
        endCb.splice(0)
        removeClass(nineBoxList[currIndex], "active")
      },

      /**
       * 走接口之后 设置 冲中下标
       * @param {*} n
       * @param {*} delay 持续时间
       */
      setPrizeIndex(n, delay = 1000) {
        finalIndex = n
        console.log("恭喜抽中:", n)
        let _t = delay
        if (lastNow) {
          const now = Date.now()
          const spt = now - lastNow
          _t = delay - spt
          setTimeout(() => {
            t = defaultConfig.rt
          }, _t)
        } else {
          maxSpeedCb.push(() => {
            setTimeout(() => {
              t = defaultConfig.rt
            }, _t)
          })
        }
      },
      addEndFunc(f) {
        endCb.push(f)
      },
    }
    return lotteryFunc
  })(this.latticeBoxList, this.onRealLottery.bind(this), null, this.onJudgeTrun)

  componentWillUnmount() {
    this.doLottery.reset()
  }

  onJudgeTrun() {
    if (store.indexInfo.prizeCredits > store.indexInfo.totalCredits) {
      showToast("金币不足哦~")
      return false
    } else if (!store.indexInfo.followOfficalAccount) {
      showToast("请先关注公众号哦~")
      return false
    } else if (!store.indexInfo.todaySignStatus) {
      showToast("请先完成今日打卡哦！")
      return false
    }
    return true
  }

  // componentDidMount = async()=>{
  //       // 网易易盾POC风控测试
  //       await rise()
  // }

  @PromiseAwait
  async onRealLottery() {
    console.log(CFG.isToken,'CFG.isToken======')
    console.log(CFG.blackbox,'CFG.blackbox=====')
    const { success, data } = await API.prizeLottery(
    //   {
    //   //网易sdk产生的token
    //   netEaseToken: CFG.isToken,
    //   //同盾sdk产生的值
    //   blackBox: CFG.blackbox,
    // }
    )
    if (success) {
      store.reduceCredits(store.indexInfo.prizeCredits)
      const i = this.prizeHandledList.findIndex(
        (item) => item.prizeId === data.prizeId
      )
      console.log(this.prizeHandledList, data)
      this.doLottery.setPrizeIndex(i, 2000)
      this.doLottery.addEndFunc(() => {
        const resultModal =
          data.prizeId === "thanks" ? Drawfailmodal : Drawsucmodal
        ModalCtrlIns.showModal(resultModal, {
          prizeInfo: this.prizeHandledList[i],
        })
      })
    } else {
      this.doLottery.reset()
    }
  }

  onDoLottery = () => {
    ModalCtrlIns.showModal(Reconfirmmodal, {
      needCoins: store.indexInfo.prizeCredits,
      onConfirm: () => {
        this.doLottery.doTurn()
      },
    })
  }

  render() {
    const { lotteryPrizeList } = store
    const { totalCredits, prizeCredits } = store.indexInfo
    const kv = {
      3: 7,
      4: 3,
      5: 6,
      6: 5,
      7: 4,
    } // 当前排序 对应 转盘实际下标
    return (
      <div className="lukylotteryscene">
        <span className="back"></span>
        <span
          className="goback md20"
          onClick={() => {
            store.changePage("homePage")
          }}
        ></span>
        <div className="coinboard">
          <span className="coinboardback"></span>
          <span className="num">{totalCredits}</span>
        </div>
        <div className="lotterymaincontainer">
          <span className="lotteryheader"></span>
          <div className="nineboxcont">
            <span className="lotteryback"></span>
            <div className="nineLatticeCont">
              {lotteryPrizeList &&
                lotteryPrizeList.map((item, index) => {
                  return (
                    <div className="col-8-cont" key={`col${index}`}>
                      <div
                        className="lattice-cont"
                        ref={(el) => {
                          if (el) {
                            this.prizeHandledList[kv[index] || index] = item
                            this.latticeBoxList[kv[index] || index] = el
                          }
                        }}
                      >
                        <span
                          className="lattice-img"
                          style={{ backgroundImage: `url(${item.icon})` }}
                        ></span>
                        <p className="lattice-name lineClamp1">{item.name}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className="lotterybtn md19" onClick={this.onDoLottery}>
            <span className="group1"></span>
            <span className="tips">{prizeCredits}金币/次</span>
          </div>
        </div>
        <div className="lottery-rule-cont"></div>
      </div>
    )
  }
}
export default Lukylotteryscene
