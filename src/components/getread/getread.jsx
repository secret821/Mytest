import React, { Component } from "react"
import store from "@src/store"
import API from "@src/api"
import "./style.less"
import { _throttle } from "@src/utils/utils"
import { Toast } from "@spark/ui"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"
import { SvgaPlayer, loadSvga } from "@spark/animation"


class getread extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = async () => {
  }

  render() {
    const { readCredits } = this.props.popData
    return (
      <div className="getread">
        <span className='bgGetRead'></span>
        <span
          className="getread-close"
          onClick={() => {
            modalStore.closePop("getread")
          }}
        ></span>
          <span className="getread-name">恭喜获得{readCredits}</span>
        <span className='getread-btn' onClick={() => {
            modalStore.closePop("getread")
          }}></span>
      </div>
    )
  }
}

export default getread
