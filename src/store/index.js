import { makeAutoObservable } from "mobx"
import API from "../api/index"
import modalStore from "@src/store/modal"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import Sorrymodal from "@src/components/sorrymodal/sorrymodal"


const LotteryData = {
  lotteryPrizeList: [],

  async onInitLotteryData() {
    const { success, data } = await API.prizeQuery()
    if (success) {
      this.lotteryPrizeList = data
    }
  },
}

const GameIndex = {
  GameInfo: {
    gameRule: " 2",
    targetScore: 20,
    frequency: 22,
    gameTime: 100,
    newUsr: 1,
    coins: 22,
  },

  async setGameInfo() {
    const { success, data } = await API.gameIndex()
    if (success) {
      this.GameInfo = data
    }
  },

  reduceFrequency() {
    this.GameInfo.frequency--
  },
}

const store = makeAutoObservable({
  ruleInfo: "",
  frontVariable: {},
  indexInfo: {},
  // cardInfo:{},
  curIndex: 0,
  indexInfo: {
    totalCredits: 0,
    prizeCredits: 20,
    followOfficalAccount: false,
    showAnimate: true,
    inviteCredits: 20,
  },
  cardInfo: [],
  //前端开发配置
  curPageData: {},
  curPage: "loading",
  setRule(ruleInfo) {
    this.ruleInfo = ruleInfo
  },
  changePage(page, data, callback) {
    this.curPage = page
    this.curPageData = data
    document.querySelector("html").scrollTop = 0
    callback && callback()
  },
  /**
   * 暂不使用
   */
  reduceIndexInfoOfTotalCredits() {
    this.indexInfo.totalCredits -= this.indexInfo.prizeCredits
  },
  //首页数据
  setIndexInfo(indexInfo) {
    this.indexInfo = indexInfo
  },

  /**
   * 扣除疾风
   * @param {*} num
   */
  reduceCredits(num = 0) {
    this.indexInfo.totalCredits -= num
  },

  setCardInfo(cardInfo) {
    this.cardInfo = cardInfo
  },
  setCurIndex(curIndex) {
    this.curIndex = curIndex
  },
  async initRule() {
    // 模拟获取远程的数据
    const { data } = await API.getRule()
    this.setRule(data)
  },
  async getFrontVariable() {
    // 获取前端开发配置
    const { data } = await API.getFrontVariable()
    this.frontVariable = data || {}
    CFG.ShareData.thumbnail = this.frontVariable.shareUrl
    console.log("前端开发配置", data)
  },
  //首页
  async getIndex(params) {
    const res = await API.index(params)
    if (res?.success) {
      this.setIndexInfo(res?.data)
      const { followOfficalAccount, newUser, tagList, ifLimit } = res?.data
      //数据访问记录接口
      if (newUser === 1) {
        await API.accessData()
      }
      //关注公众号弹窗
      if (!followOfficalAccount) {
        modalStore.pushPop("wxcode")
      }
      if (ifLimit) {
        ModalCtrlIns.showModal(Sorrymodal)
      } else {
        if (tagList !== null && tagList !== "") {
          tagList.length &&
            tagList.map((item, index) => {
              console.log(tagList, "tagList")
              switch (item.code) {
                case "assist":
                  modalStore.pushPop("getinvite", { tagList: item })
                  break
                case "read":
                  modalStore.pushPop("getread", { tagList: item })
                  break
              }
            })
        }
      }
      // if(showAnimate){
      //   if(inviteCredits !== ''){
      //     modalStore.pushPop('getinvite',{inviteCredits:inviteCredits})
      //   }
      //   if(readCredits !== ''){
      //     modalStore.pushPop('getread',{readCredits:readCredits})
      //   }
      // }
    }
  },
  //卡片信息
  async getCardInfo() {
    const res = await API.cardList()
    if (res?.success) {
      // this.setState({
      let cards = res?.data.length
        ? res?.data.map((item, inedx) => {
            return item
          })
        : []
      this.setCardInfo(cards)
      // })
    }
  },

  ...GameIndex,
  ...LotteryData,
})
export default store
