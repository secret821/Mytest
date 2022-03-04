import React, { Component } from "react"
import store from "@src/store"
import API from "@src/api"
import "./style.less"
import { _throttle } from "@src/utils/utils"
import { Toast } from "@spark/ui"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"

class albumInclude extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = async () => {
  }

  render() {
    const { curIndex,cardsList } = this.props.popData
    return (
      <div className="albumIncludeModal md15">
        <span
          className="albumInclude-close"
          onClick={() => {
            modalStore.closePop("albumInclude")
          }}
        ></span>
        <img src={`${RES_PATH}cards/${curIndex}.png`} />
        {cardsList?.length && (
          <span className="albumInclude-name">{cardsList[curIndex - 1].name}一游</span>
        )}
        <article
          className="text"
          dangerouslySetInnerHTML={{ __html: cardsList[curIndex - 1].desc }}
        ></article>
      </div>
    )
  }
}

export default albumInclude
