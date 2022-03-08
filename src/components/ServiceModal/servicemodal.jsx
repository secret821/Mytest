import React, { Component } from "react"
import "./style.less"
import modalStore from "@src/store/modal"

export default class Service extends Component {
  toGo = () => {
    window.location.href = "https://activity.m.duiba.com.cn/faq/index?dbnewopen"
  }

  render() {
    return (
      <div className="modal-service">
        {/* <div className="title">是否前往人工服务</div> */}
        <div className="btn-box">
          <div
            className="go"
            onClick={() => {this.toGo()}}
          ></div>
          <div
            className="back md7"
            onClick={() => {
              modalStore.closePop("Service")
            }}
          ></div>
        </div>
        <div
          className="close"
          onClick={() => {
            modalStore.closePop("Service")
          }}
        ></div>
      </div>
    )
  }
}
