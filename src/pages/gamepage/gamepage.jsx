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
import {mute, unmute, unwatchPageVisibility, watchPageVisibility} from '@spark/utils'
import { classnames } from '@lightfish/tools'

const GameEvent = {
  GAME_START: 'GAME_START',
  GAME_OVER: 'GAME_OVER',
}


class HoldFruitGameScene extends React.Component {
  GameScene = null
  componentDidMount() {
    // 取消静音
    unmute()
    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth * (window.devicePixelRatio || 1)
		canvas.height = document.body.clientHeight * (window.devicePixelRatio || 1)
    const main = this.GameScene = new Main(canvas, this.props)
    var mouseEvent = main.stage.onMouseEvent.bind(main.stage);
		canvas.addEventListener("touchstart", mouseEvent, false);
		canvas.addEventListener('touchmove', mouseEvent, false);
		canvas.addEventListener('touchend', mouseEvent, false);

    main.addGlobalEvent("onMessage", this.onMessage, this)

    watchPageVisibility(this.onPageVisibilityChange)
  }

  onMessage = async (e) => {
    //接口名字
    let netName = e.data.netName;
    //接口参数
    let parameter = e.data.parameter;
    const preffix = netName.split('.')[0]
    if (preffix == 'levono') {
      const apiName = netName.split('.')[1]
      
      
    } else {
      switch (netName) {
        case 'mine.turnBgm':
          console.log('mine.turnBgm:', parameter)
          if (parameter.play) {
            playSound(parameter.id, { loop: parameter.loop || false });
          } else {
            stopSound(parameter.id)
          }
          break
      }
      this.postMessage(netName, {
        success: true
      })
    }
  }

  postMessage(netName, data) {
    this.GameScene && this.GameScene.dispatchGlobalEvent({
      type: netName
    }, data) //以防复用事件event串了，就用这种方式
  }

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
    ModalCtrlIns.showModal(Gametipsconfirmmodal, {
      onConfirm: this.onGameRealStart
    })
  }

  onGameRealStart = () => {
    this.setState({
      startGameFlag: true
    })
    GDispatcher.dispatchEvent(GameEvent.GAME_START)
  }

  initEvents() {
    GDispatcher.addEventListener(GameEvent.GAME_OVER, this.onGameOver, this)
  }

  removeEvents() {
    GDispatcher.removeEventListener(GameEvent.GAME_OVER, this.onGameOver)
  }

  onGameOver(e) {
    console.log(e)
  }

  render() {
    const {startGameFlag} = this.state
    return (
      <div className={classnames('main-game-page', {gaming: startGameFlag})}>
        <div className="gamepage">
          <span className="back"></span>
          <div className="groupcont">
            <span className="groupback"></span>
            <span className="titledesc">{`目标分数：50分\n闯关成功获得20个金币`}</span>
            <span className="smalltips tc">剩余次数：1次</span>
            <span className="startbtn" onClick={this.onGameStart}></span>
            <span className="lucky"></span>
          </div>
          <span className="goback"></span>
          <span className="rulebtn"></span>
        </div>
        <div className="game-scene-container">
          <HoldFruitGameScene {...this.props}/>
        </div>
      </div>
    );
  }
}
export default Gamepage;
