import { makeAutoObservable } from "mobx"
import API from "../api/index"
import modalStore from "@src/store/modal"

const LotteryData = {
  lotteryPrizeList: [],

  async onInitLotteryData() {
    const {success, data} = await API.prizeQuery()
    if (success) {
      this.lotteryPrizeList = data
    }
  }
}

const GameIndex = {
  GameInfo: {
    gameRul:" 2",
    targetScore: 20,
    frequency: 22,
    gameTime: 100,
    newUsr: 1,
    coins: 22
  },

  async setGameInfo() {
    const { success, data } = await API.gameIndex()
    if (success) {
      this.GameInfo = data
    }
  },

  reduceFrequency() {
    this.GameInfo.frequency--
  }
}

const store = makeAutoObservable({
  ruleInfo: "",
  frontVariable: {},
  indexInfo: {},
  cardInfo:{},
  curIndex:0,
  //前端开发配置
  curPageData: {},
  curPage: "loading",
  setRule(ruleInfo) {
    this.ruleInfo = ruleInfo
  },
  changePage(page, data, callback) {
    this.curPage = page;
    this.curPageData = data
    callback && callback();
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

  setCardInfo(cardInfo){
    this.cardInfo = cardInfo
  },
  setCurIndex(curIndex){
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
    console.log("前端开发配置", data)
  },
  //首页
  async getIndex() {
    const res = await API.index()
    if (res?.success) {
      this.setIndexInfo(res?.data)
      await API.accessData()
      const { followOfficalAccount } = res?.data
      //关注公众号弹窗
      if (!followOfficalAccount) {
        modalStore.pushPop("wxcode")
      }
    }
  },
  //卡片信息
  async getCardInfo(){
    const res = await API.cardList()
    if(res?.success){
      // this.setState({
        let cards = res?.data.length? (res?.data.map((item,inedx)=>{return item})):[]
        this.setCardInfo(cards)
      // })
    }
  },

  ...GameIndex,
  ...LotteryData
})
export default store
