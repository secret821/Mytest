import React, { Component } from "react"
import store from "@src/store"
import API from "@src/api"
import "./style.less"
import { _throttle } from "@src/utils/utils"
import { Toast } from "@spark/ui"
import modalStore from "@src/store/modal"
import { RES_PATH } from "../../../sparkrc"
import { SvgaPlayer, loadSvga } from "@spark/animation"
import { ModalControllerComponent, ModalCtrlIns } from "@lightfish/reactmodal"
import albumInclude from "../AlbumInclude/albumInclude"

// const lockSrc =
//   "//yun.duiba.com.cn/aurora/assets/cebd52aec5eff0fa453b4798ceb7c4476dc92627.png";
class album extends ModalControllerComponent {
  constructor(props) {
    super(props)
    this.state = {
      curIndex: 0,
      cardsList: [],
    }
  }

  transitionMounted() {
    this.albumModal.classList.add('aniTitle')
  }

  componentDidMount = async () => {
    await this.getAlbumList()
    await this.getCards()
  }

  getCards = () => {
    const { data } = store.cardInfo
    this.setState({
      cardsList: data.length
        ? data.map((item, inedx) => {
            return item
          })
        : [],
    })
  }

  showPhoto = _throttle((index, item) => {
    this.closeModal(null, false)
    // modalStore.pushPop("albumInclude", {
    //   cardsList: this.state.cardsList,
    //   curIndex: this.state.curIndex,
    // })
    ModalCtrlIns.showModal(albumInclude, {
      cardsList: this.state.cardsList,
      curIndex: this.state.curIndex,
    }, {
      queue: true,
      transitionName: 'scale-in-center',
    })
  })
  async getAlbumList() {
    const { success, data } = await API.GET_PHOTOLIST()
    if (success) {
      this.setState({ curIndex: data?.checkTime })
    }
  }
  render() {
    const { curIndex, cardsList } = this.state
    const { credits } = this.props
    return (
      <div className="albumModal" ref={el => el && (this.albumModal=el)}>
        <span className='bg'></span>
        <span
          className="album-close"
          onClick={() => {
            this.closeModal()
          }}
        ></span>
        <span className="head">
          <div className="head-title">
            <p>打</p>
            <p>卡</p>
            <p>成</p>
            <p>功</p>
          </div>
        </span>
        {/* <img src={`${RES_PATH}cards/${curIndex}.png`} /> */}
        <SvgaPlayer
          className="imgSvga"
          src={`${RES_PATH}svga/${curIndex}.svga`}
          loop={false}
        ></SvgaPlayer>
        {cardsList?.length && (
          <span className="album-name">{cardsList[curIndex - 1].name}一游</span>
        )}
        <div className="moneys">
          <span className="icons">{credits}</span>
          <span className="coin"></span>
        </div>
        {/* md9dpm_d=${+index + 1} */}
        <span className={`btn-albm `} onClick={this.showPhoto}></span>
      </div>
    )
  }
}

export default album
