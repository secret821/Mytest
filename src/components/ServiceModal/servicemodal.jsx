import React, { Component } from "react"
import "./style.less"
import modalStore from "@src/store/modal"
import store from "@src/store"

export default class Service extends Component {

  render() {
    return (
      <div className="modal-service">
        {/* <div className="title">是否前往人工服务</div> */}
        <div className="btn-box">
          <div className="go" onClick={() => {
            window.location.href =
              store.frontVariable.serviceUrl;
          }}></div>
          <div className="back" onClick={()=>{modalStore.closePop('Service')}}></div>
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
