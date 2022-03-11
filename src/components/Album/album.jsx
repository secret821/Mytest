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
    console.log(this.props,'------')
    // await this.getCards()
    await this.getAlbumList()
  }

  // getCards = () => {
  //   const { cardInfo } = this.props
  //   // console.log(cardInfo[0].name,'----cardinfo')
  //   // const { data } = store.cardInfo
  //   this.setState({
  //     cardsList: cardInfo || []
  //       // : [],
  //   })
  //   console.log(this.state.cardsList,'......')
  // }

  showPhoto = _throttle((index, item) => {
    this.closeModal(null, false)
    // modalStore.pushPop("albumInclude", {
    //   cardsList: this.state.cardsList,
    //   curIndex: this.state.curIndex,
    // })
    ModalCtrlIns.showModal(albumInclude, {
      cardsList: this.props.cardInfo,
      curIndex: this.state.curIndex,
    }, {
      queue: true,
      transitionName: 'scale-in-center',
      fixedBody: false
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
    const { credits, cardInfo } = this.props
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
        {curIndex !== 0 && (
          <span className="album-name">{cardInfo[curIndex-1].name || ''}一游</span>
        )}
        <div className="moneys">
          <span className="icons">{credits}</span>
          <span className="coin"></span>
        </div>
        <span className={`btn-albm md9-${store.indexInfo.currentTaskId}`} onClick={this.showPhoto}></span>
      </div>)
  }
}

export default album
