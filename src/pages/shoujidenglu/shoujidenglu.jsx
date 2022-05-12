'use strict';

import React, { Component } from 'react';
import EdPop from '../../EdPopRedux/EdPop.js';
import { RES_PATH } from '../../../sparkrc.js';
import API from '../../api';
import './shoujidenglu.less';
import { ApiTool } from '../../util/NetCheck.js';
import { Toast } from '@spark/ui'
import Henbaoqian from '../henbaoqian/henbaoqian.jsx';
const INVALID_CHARS = ['-', '+', 'e', '.', 'E'];
class Shoujidenglu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 60,
      isCount: true,
      visible: false,
    }
  }

  phoneNum = '';
  code = '';
  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  /**不允许输入e，小数，正负号 */
  onlyInputNumber = (e) => {
    if (INVALID_CHARS.indexOf(e.key) !== -1 || e.target.value.length >= 11 || isNaN(e.target.value)) {
      e.preventDefault();
    }
  };


  /**
   * 倒计时
   */
  timer1;
  countDown() {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({
        timer: 60,
        isCount: true,
        visible: false,
      });
      return;
    } else {
      this.setState({
        timer: timer - 1,
        isCount: false
      });
    }
    this.timer1 = setTimeout(this.countDown.bind(this), 1000);
  }

  /**
   * 点击获取验证码，开始倒计时
   */

  click1 = true;//验证码防连点
  handleSendCode = async () => {
    let phoneNum = this.phoneInput.value
    if (phoneNum.length != 11) {
      Toast("手机号格式错误");
      return;
    }
    if (this.click1) {
      this.click1 = false;
      const result = await ApiTool("sendCode", { phone: phoneNum, });
      this.click1 = true;
      if (result && result.data && result.data.code == "0100") {
        Toast("当日重试次数已达上限");
      } else {
        if (result && result.success && result.data.code != "0100") {
          this.beginCount();
        }
      }

    }
  }

  /**
   * 开始倒计时 
   */
  beginCount = () => {
    const { isCount } = this.state;
    if (!isCount) {
      return;
    } else {
      this.setState({
        visible: true
      })
      this.countDown();
    }
  }

  /**
   * 手机号绑定,将手机号和验证码post传回
   */
  click2 = true;//登陆防连点
  savePhone = async () => {
    if (this.click2) {
      let phoneNum = this.phoneInput.value;
      if (phoneNum.length != 11) {
        Toast("请输入正确的手机号");
        console.log(typeof phoneNum, phoneNum)
        return;
      }
      if (!Boolean(this.code.trim())) {
        Toast("请输入验证码");
        return;
      }

      this.click2 = false;
      const result = await ApiTool("savePhone", { phone: phoneNum, code: this.code });
      setTimeout(() => {
        this.click2 = true;
      }, 2000);
      if (result && result.success) {
        EdPop.closePop();
        this.props.getIndex();
      } else {
        if (result && result.code == 10007) {
          EdPop.closePop();
          EdPop.showPop(Henbaoqian)
        }
      }
    }

  }

  /**
   * 获取电话输入框内容
   */
  getPhoneInputValue = (e) => {
    if (INVALID_CHARS.indexOf(e.key) !== -1 || e.target.value.length >= 11 || isNaN(e.target.value)) {
      e.preventDefault();
    }
  }

  /**
   * 获取验证码输入框内容
   */
  getCodeInputValue = (e) => {
    this.code = e.target.value;
  }

  /**
   * 失去焦点事件
   */
  onBlur = () => {

  }

  /**
   * 获取焦点事件
   */
  onFocus = () => {
    document.body.style.overflow = "hidden";
  }


  render() {
    let { visible, timer } = this.state;
    return (
      <div className="shoujidenglu ">
        <img className="kuang_18 " src={RES_PATH + 'shoujidenglu/框18.png'} />
        <div className="qing_shu_ru_shou_ji_hao_ma ">
          <input type="tel" placeholder="请输入手机号码" ref={ref => this.phoneInput = ref} maxLength={11} onKeyPress={this.onlyInputNumber} onChange={this.getPhoneInputValue} onBlur={this.onBlur} onFocus={this.onFocus}></input>
        </div>
        <div className="qing_shu_ru_yan_zheng_ma ">
          <input type="text" placeholder="请输入验证码" onChange={this.getCodeInputValue}></input>
        </div>
        <img className="huo_qu_yan_zheng_ma " src={RES_PATH + 'shoujidenglu/获取验证码.png'} onClick={this.handleSendCode} />
        {visible && <div className="dao_ji_shi_60s16 ">
          <img className="ju_xing_10kao_bei " src={RES_PATH + 'shoujidenglu/矩形10拷贝.png'} />
          <div className="dao_ji_shi_60s17 ">倒计时{timer}s</div>
        </div>}
        <img className="li_ji_deng_lu_15 MD-md1" src={RES_PATH + 'shoujidenglu/立即登陆15.png'} onClick={this.savePhone} />
        <div className="warning"><span>手机号请与参与活动报名时填写的手机号保持一致</span></div>
      </div>
    );
  }
}
export default Shoujidenglu;
