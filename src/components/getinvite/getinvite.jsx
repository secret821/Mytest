import React, { Component } from "react"
import store from "@src/store"
import API from "@src/api"
import "./style.less"
import { _throttle } from "@src/utils/utils"
import { Toast } from "@spark/ui"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"
import { SvgaPlayer, loadSvga } from "@spark/animation"


class getinvite extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = async () => {
  }

  render() {
    const { inviteCredits } = this.props.popData
    return (
      <div className="getinvite">
        <span className='bggetinvite'></span>
        <span
          className="getinvite-close"
          onClick={() => {
            modalStore.closePop("getinvite")
          }}
        ></span>
          <span className="getinvite-name">恭喜获得{inviteCredits}</span>
        <span className='getinvite-btn' onClick={() => {
            modalStore.closePop("getinvite")
          }}></span>
      </div>
    )
  }
}

export default getinvite
