"use strict"

import React from "react"
import { RES_PATH } from "../../../sparkrc.js"
import { observer } from "mobx-react"
import store from "../../store/index"
import modalStore from "@src/store/modal"
import API from "../../api"
import "./loading.less"
import { preloadAsset } from "@src/utils/preload1.3.js"
import assetList from "@src/assetList.json"
import { registerSounds, preloadSounds } from "@spark/utils"
@observer
class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      curPercentage: 0,
    }
    this.intervalId = ""
    this.isEvenLoad = true //是否匀速加载进度条
  }
  componentDidMount() {
    this.preloadAssetInit()
  }
  preloadAssetInit = async () => {
    await store.getFrontVariable();
    registerSounds({
      bgm: store.frontVariable.gameBgm
    })
    await preloadSounds()
    // 游戏基本信息
    await store.setGameInfo()
    await store.onInitLotteryData()
    this.onLoadingProgress(0.3)
    await preloadAsset(assetList.preLoadImg, 3).then(() => {
      //预加载资源完成
      setTimeout(() => {
        //异步加载资源开始
        preloadAsset(assetList.asyncLoadImg, 1)
      }, 5000)
    })
    this.onLoadingProgress(1)

  }
  /**
   * 资源加载进度回调
   * @param {*} index
   * @param {*} progress
   */
  onLoadingProgress = (progress) => {
    const percentage = Math.floor(progress * 100)
    console.log("progress", percentage)
    if (this.isEvenLoad) {
      this.setEvenProgress(percentage)
    } else {
      this.setProgress(percentage)
    }
  }
  /**
   * 非匀速加载进度
   * @param {*} percentage
   */
  setProgress = (percentage) => {
    this.progressBar.style.transform = `translateX(${percentage - 100}%)`
    if (percentage == 100) {
      setTimeout(() => {
        this.props.changePage && store.changePage(this.props.changePage) //跳转页面
      }, 500)
    }
  }

  /**
   * 以1%匀速加载进度
   * @param {*} percentage
   */
  setEvenProgress = (percentage) => {
    this.intervalId && clearInterval(this.intervalId)
    let curPercentage = this.state.curPercentage
    this.intervalId = setInterval(() => {
      if (curPercentage >= percentage) {
        clearInterval(this.intervalId)
        percentage == 100 &&
          store.changePage('homePage') //跳转页面
        return
      }
      curPercentage += 1
      // this.curPercentage = curPercentage;
      this.setState({
        curPercentage: curPercentage,
      })
      this.progressBar.style.transform = `translateX(${curPercentage - 100}%)`
    }, 10)
  }

  render() {
    // let curPercentage = this.curPercentage;
    return (
      <div className="loading md1">
        <span className="bg174"></span>
        <div className="progressBar">
          <span className="atBottom"></span>
          <span className="loadingBg">
            <span className="above" ref={(el) => (this.progressBar = el)}>
              <span className="inLoad">{this.state.curPercentage}%</span>
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default Loading
