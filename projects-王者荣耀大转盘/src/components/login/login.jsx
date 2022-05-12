"use strict"

import React, { Component } from "react"
import { RES_PATH } from "../../../sparkrc.js"
import { observer } from "mobx-react"
import store from "../../store/index"
import modalStore from "../../store/modal"
import API from "../../api"
import "./login.less"
const INVALID_CHARS = ["-", "+", "e", ".", "E"]
import { Toast } from "@spark/ui"
import EdPop from "@src/EdPopRedux/EdPop.js"
import { useThrottle } from "@src/utils"
import Tip from "../../components/tip/tip.jsx"
import util from "../../utils/tool"
import { ERROR_MESSSAGE } from "../../constants"
import { ApiTool } from "../../utils/NetCheck"
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      timer: 60,
      isCount: true,
    }
  }

  phoneNum = ""
  code = ""
  _bizId = ""
  componentWillUnmount() {
    clearTimeout(this.timer1)
  }

  /**不允许输入e，小数，正负号 */
  onlyInputNumber = (e) => {
    if (
      INVALID_CHARS.indexOf(e.key) !== -1 ||
      e.target.value.length >= 11 ||
      isNaN(e.target.value)
    ) {
      e.preventDefault()
    }
  }

  /**
   * 倒计时
   */
  timer1
  countDown() {
    const { timer } = this.state
    if (timer === 0) {
      this.setState({
        timer: 60,
        isCount: true,
        visible: false,
      })
      return
    } else {
      this.setState({
        timer: timer - 1,
        isCount: false,
      })
    }
    this.timer1 = setTimeout(this.countDown.bind(this), 1000)
  }

  /**
   * 点击获取验证码，开始倒计时
   */

  handleSendCode = async () => {
    util.clickDelay("sendVerificationCode")
    let phoneNum = this.phoneInput.value
    if (phoneNum.length != 11) {
      Toast("手机号格式错误")
      return
    }
    const resp = await API.VERIFY_TEL({ mobile: phoneNum })

    if (!resp.success) {
      return
    } else {
      if (!resp.data) {
        // EdPop.showPop(Tip)
        return
      }
    }
    const { data, success, code, desc } = await API.CHECK_PHONE_BINDED({
      mobile: phoneNum,
    })
    if (success) {
      if (data) {
        Toast("手机号已被绑定")
        return
      }
    }
    const res = await API.SEND_CAP_CODE({ mobile: phoneNum, custom: "default" })
    if (res?.success && res?.data) {
      this._bizId = res?.data
      //倒计时
      this.setState({
        visible: true,
      })
      this.beginCount()
    }
  }

  /**
   * 开始倒计时
   */
  beginCount = () => {
    const { isCount } = this.state
    if (!isCount) {
      return
    } else {
      this.setState({
        visible: true,
      })
      this.countDown()
    }
  }

  /**
   * 手机号绑定,将手机号和验证码post传回
   */
  savePhone = async () => {
    util.clickDelay("button")
    let phoneNum = this.phoneInput.value
    if (phoneNum.length != 11) {
      Toast("请输入正确的手机号")
      return
    }
    if (!Boolean(this.code.trim())) {
      Toast("请输入验证码")
      return
    }
    let params = {
      bizId: this._bizId,
      verifyCode: this.code,
      mobile: phoneNum,
      redirectUrl: CFG.activityUrl,
    }
    // const result = await API.BIND_PHONE(params);
    const result = await ApiTool("BIND_PHONE", params)

    if (result && result.success) {
      EdPop.closePop()
      // this.props.getIndex();
      window.location.replace(result.data)
    }
  }

  /**
   * 获取电话输入框内容
   */
  getPhoneInputValue = (e) => {
    if (
      INVALID_CHARS.indexOf(e.key) !== -1 ||
      e.target.value.length >= 11 ||
      isNaN(e.target.value)
    ) {
      e.preventDefault()
    }
  }

  /**
   * 获取验证码输入框内容
   */
  getCodeInputValue = (e) => {
    this.code = e.target.value
  }

  /**
   * 获取焦点事件
   */
  onFocus = () => {
    document.body.style.overflow = "hidden"
  }

  render() {
    return (
      <div className="login">
        <span className="background"></span>
        <span className="captchaButton"></span>
        <span className="mobileLoginToParticipateInLive">
          手机登录，参与活动抽好礼
        </span>

        <div className="enterYourMobilePhoneNumber ">
          <input
            type="tel"
            placeholder="请输入手机号码"
            ref={(ref) => (this.phoneInput = ref)}
            maxLength={11}
            onKeyPress={this.onlyInputNumber}
            onChange={this.getPhoneInputValue}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          ></input>
        </div>
        <div className="enterVerificationCode ">
          <input
            type="text"
            placeholder="请输入验证码"
            onChange={this.getCodeInputValue}
          ></input>
        </div>

        <span className="sendVerificationCode" onClick={this.handleSendCode}>
          {this.state.visible ? this.state.timer : "发送验证码"}
        </span>
        <span className="button md2" onClick={this.savePhone}></span>
      </div>
    )
  }
}
export default Login
