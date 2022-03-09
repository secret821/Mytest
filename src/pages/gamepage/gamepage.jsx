'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './gamepage.less';
import { ModalControllerComponent, ModalCtrlIns } from '@lightfish/reactmodal'
import Gametipsconfirmmodal from '@src/components/gametipsconfirmmodal/gametipsconfirmmodal.jsx';
import { Main, GDispatcher } from './game.js'
import {md5, mute, playSound, stopSound, unmute, unwatchPageVisibility, watchPageVisibility} from '@spark/utils'
import { classnames, PromiseAwait } from '@lightfish/tools'
import { hideLoading, showLoading } from '@spark/ui';
import Gameovermodal from '@src/components/gameovermodal/gameovermodal.jsx';
import Gamefailmodal from '@src/components/gamefailmodal/gamefailmodal.jsx';
import { showToast } from '@src/utils/utils.js';
import Rule from '@src/components/rule/rule.jsx';

const GameEvent = {
  GAME_START: 'GAME_START',
  GAME_OVER: 'GAME_OVER',
  GAME_BGM: 'GAME_BGM',
}
class HoldFruitGameScene extends React.Component {
  GameScene = null
  componentDidMount() {
    // 取消静音
    unmute()
    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth * (window.devicePixelRatio || 1)
		canvas.height = document.body.clientHeight * (window.devicePixelRatio || 1)
    const main = this.GameScene = new Main(canvas, {
      isNewGuy: store.GameInfo.newUsr,
      countDownNum: store.GameInfo.gameTime,
      musicStatus: localStorage.getItem('musicStatus') === 'true' ? true : false,
    })
    var mouseEvent = main.stage.onMouseEvent.bind(main.stage);
		canvas.addEventListener("touchstart", mouseEvent, false);
		canvas.addEventListener('touchmove', mouseEvent, false);
		canvas.addEventListener('touchend', mouseEvent, false);

    // main.addGlobalEvent("onMessage", this.onMessage, this)

    watchPageVisibility(this.onPageVisibilityChange)
  }

  // onMessage = async (e) => {
  //   //接口名字
  //   let netName = e.data.netName;
  //   //接口参数
  //   let parameter = e.data.parameter;
  //   const preffix = netName.split('.')[0]
  //   if (preffix == 'levono') {
  //     const apiName = netName.split('.')[1]
      
      
  //   } else {
  //     switch (netName) {
  //       case 'mine.turnBgm':
  //         console.log('mine.turnBgm:', parameter)
  //         if (parameter.play) {
  //           playSound(parameter.id, { loop: parameter.loop || false });
  //         } else {
  //           stopSound(parameter.id)
  //         }
  //         break
  //     }
  //     this.postMessage(netName, {
  //       success: true
  //     })
  //   }
  // }

  // postMessage(netName, data) {
  //   this.GameScene && this.GameScene.dispatchGlobalEvent({
  //     type: netName
  //   }, data) //以防复用事件event串了，就用这种方式
  // }

  onPageVisibilityChange = (visible) => {
    if (visible) {
      unmute()
    } else {
      mute()
    }
  }

  componentWillUnmount() {
    mute()
    this.GameScene && this.GameScene.destroy()
    unwatchPageVisibility(this.onPageVisibilityChange)
  }

  componentDidUpdate() {
    if (this.props.gaming) {
      // 取消静音
      unmute()
    } else {
      mute()
      GDispatcher.dispatchEvent(GameEvent.GAME_BGM, {
        isOn: false,
        store: false
      })
    }
  }

  render() {
    return (
      <div className="Game-scene">
        <div id="cusEngine" style={{
          lineHeight:0,
          fontSize:0,
          position: 'absolute'
        }}>
          <canvas id="canvas" style={{
            width: '100%',
            height: '100%'
          }}></canvas>
        </div>
      </div>
    )
  }
}

@observer
class Gamepage extends ModalControllerComponent {
  startId = 0
  constructor(props) {
    super(props);
    this.state = {
      startGameFlag: false
    }
  }

  componentDidMount() {
    this.initEvents()
  }

  componentWillUnmount() {
    this.removeEvents()
  }

  onGameStart = () => {
    if (store.GameInfo.newUsr) {
      ModalCtrlIns.showModal(Gametipsconfirmmodal, {
        onConfirm: this.onGameRealStart.bind(this)
      })
    } else {
      this.onGameRealStart()
    }
  }

  /**
   * 开始游戏
   */
  @PromiseAwait
  async onGameRealStart() {
    if (!store.GameInfo.frequency) {
      showToast('游戏次数不足')
      return
    }
    const { success, data } = await API.gameStart()
    if (success) {
      this.startId = data.startId
      this.setState({
        startGameFlag: true
      })
      // 游戏次数 -1
      store.reduceFrequency()
      GDispatcher.dispatchEvent(GameEvent.GAME_START)
    }
  }

  initEvents() {
    GDispatcher.addEventListener(GameEvent.GAME_OVER, this.onGameOver, this)
    GDispatcher.addEventListener(GameEvent.GAME_BGM, this.onGameBgm, this)
  }

  onGameBgm(e) {
    const handle = typeof e.data === 'object' ? e.data : {
      isOn: e.data,
      store: true
    }
    const {isOn, store} = handle
    store && localStorage.setItem('musicStatus', isOn)
    if (isOn) {
      playSound('bgm', { loop: true })
    } else {
      stopSound('bgm')
    }
  }

  removeEvents() {
    GDispatcher.removeEventListener(GameEvent.GAME_OVER, this.onGameOver)
    GDispatcher.removeEventListener(GameEvent.GAME_BGM, this.onGameBgm)
  }

  /**
   * 游戏结束
   * @param {*} e 
   */
  @PromiseAwait
  async onGameOver(e) {
    showLoading()
    const {success, data} = await API.gameSubmit({
      startId: this.startId,
      score: e.data.score,
      sign: md5(`startId=${this.startId}&score=${e.data.score}&key=posf3usrjjnd9sd4w21ln3p`)
    })
    hideLoading()
    if (!success) return
    this.setState({
      startGameFlag: false
    })
    if (data && data.credits){
      ModalCtrlIns.showModal(Gameovermodal, {
        credits: data.credits,
        score: e.data.score,
      })
    } else {
      ModalCtrlIns.showModal(Gamefailmodal, {
        score: e.data.score,
      })
    }
  }

  render() {
    const {startGameFlag} = this.state
    const { frequency, targetScore, newUsr, gameTime, coins, gameRul } = store.GameInfo
    return (
      <div className={classnames('main-game-page', {gaming: startGameFlag})}>
        <div className="gamepage">
          <span className="back"></span>
          <div className="groupcont">
            <span className="groupback"></span>
            <span className="titledesc">{`目标分数：${targetScore}分\n闯关成功获得${coins}个金币`}</span>
            <span className="smalltips tc">剩余次数：{frequency}次</span>
            <span className="startbtn md23" onClick={this.onGameStart}></span>
            <span className="lucky"></span>
          </div>
          <span className="goback md24" onClick={() => {
            store.changePage('homePage')
          }}></span>
          <span className="rulebtn md25" onClick={() => {
            ModalCtrlIns.showModal(Rule, {
              ruleInfo: gameRul
            })
          }}></span>
        </div>
        <div className="game-scene-container">
          <HoldFruitGameScene gaming={startGameFlag} isNewGuy={newUsr} countDownNum={gameTime}/>
        </div>
      </div>
    );
  }
}
export default Gamepage;
