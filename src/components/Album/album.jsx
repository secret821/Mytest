import React, { Component } from "react"
import store from "@src/store"
import API from "@src/api"
import "./style.less"
import { _throttle } from "@src/utils/utils"
import { Toast } from "@spark/ui"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"
import { SvgaPlayer, loadSvga } from "@spark/animation"

// const lockSrc =
//   "//yun.duiba.com.cn/aurora/assets/cebd52aec5eff0fa453b4798ceb7c4476dc92627.png";
class album extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curIndex: 0,
      cardsList: [],
    }
  }
  componentDidMount = async () => {
    console.log(this.props,'------')
    // await this.getCards()
    await this.getAlbumList()
  }

  getCards = () => {
    const { cardInfo } = this.props.popData
    console.log(cardInfo[0].name,'----cardinfo')
    // const { data } = store.cardInfo
    this.setState({
      cardsList: cardInfo || []
        // : [],
    })
    console.log(this.state.cardsList,'......')
  }

  showPhoto = _throttle((index, item) => {
    modalStore.closePop("album")
    modalStore.pushPop("albumInclude", {
      cardsList: this.props.popData.cardInfo,
      curIndex: this.state.curIndex,
    })
  })
  getAlbumList =async()=> {
    const res = await API.GET_PHOTOLIST()
    if (res?.success) {
      this.setState({ curIndex: parseInt(res?.data) })
    }
  }
  render() {
    const { curIndex, cardsList } = this.state
    const { cardInfo } = this.props.popData
    // console.log(cardInfo?.length,'cardInfo---')
    // console.log(curIndex,'curIndex---')
    // console.log(cardInfo[curIndex-1].name,'cardInfo[]----')
    const { credits } = this.props.popData
    return (
      <div className="albumModal">
        <span className='bg'></span>
        <span
          className="album-close"
          onClick={() => {
            modalStore.closePop("album")
          }}
        ></span>
        <span className="head">
          <p>打</p>
          <p>卡</p>
          <p>成</p>
          <p>功</p>
        </span>
        {/* <img src={`${RES_PATH}cards/${curIndex}.png`} /> */}
        <SvgaPlayer
          className="imgSvga"
          src={`${RES_PATH}svga/${curIndex}.svga`}
          loop={false}
        ></SvgaPlayer>
        {curIndex !== 0 && (
          <span className="album-name">{cardInfo[curIndex-1].name || ''}一游</span>
        )}
        <div className="moneys">
          <span className="icons">{credits}</span>
          <span className="coin"></span>
        </div>
        <span className="btn-albm" onClick={this.showPhoto}></span>
      </div>
    )
  }
}

export default album
