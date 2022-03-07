"use strict"

import React from "react"
import { RES_PATH } from "../../../sparkrc.js"
import { observer } from "mobx-react"
import store from "../../store/index"
import modalStore from "@src/store/modal"
import API from "../../api"
import "./homepage.less"
import Index from "./Iconlist/Index.jsx"
import { onInitShare } from "@src/store/utils.js"
import { getUrlParam, setUrlParam } from "@lightfish/tools"
import { showToast } from "@src/utils/utils.js"

@observer
class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      // totalCredits:0,
    }
  }

componentDidMount = async()=>{
  // modalStore.pushPop('taskModal')
  await store.getIndex()
  if (store.indexInfo.followOfficalAccount) {
    onInitShare()
    this.onDoHelp()
  } else {
    onInitShare(false, false)
  }
}

async onDoHelp() {
  const shareCode = getUrlParam('shareCode')
  if (!shareCode) {
    return
  }
  const { success, data } = await API.doAssist({ assistItemId: shareCode })
  if (success) {
    showToast('恭喜为好友助力成功')
    if (history) {
      history.replaceState(null, null, setUrlParam('shareCode', ''))
    }
  }
}

getAllCoin(){
  const { totalCredits } = store?.indexInfo
  console.log(totalCredits,'totalCredits-------')
  this.setState({
    totalCredits:totalCredits,
  })
}

  render() {
    const { cards } = this.state
    const { totalCredits } = store.indexInfo
    console.log(store.indexInfo?.totalCredits,'totalCredits------=====')
    return (
      <div className="homepage">
        {totalCredits&&<Index data={store.indexInfo}></Index>}
        <div className="bgalls">
          <span className="bgall"></span>
          <span className="top"></span>
        </div>
        <div className="longjingwencha">
          <span className="bglongjing"></span>
          <span className="yanzilongjing"></span>
        </div>
        <div className="liulangwenyan">
          <span className="yanziliulang"></span>
          <span className="bgliuliang"></span>
        </div>
        <div className="yuhuangfeiyun">
          <span className="yun1yuhuang"></span>
          <span className="shanhou"></span>
          <span className="yun2yuhuang"></span>
          <span className="shanqian"></span>
          <span className="yunyouyuhuang"></span>
          <span className="yun3yuhuang"></span>
          <span className="shipyuhuang"></span>
          <span className="liushuyuhuang"></span>
        </div>
        <div className="nanpingwanzhong">
          <span className="people"></span>
          <span className="yun"></span>
          <span className="clock"></span>
          <span className="dayan"></span>
          <span className="house"></span>
          <span className="shipnanping"></span>
        </div>
        <div className="huanglongtucui">
          <span className="bghuanglong"></span>
          <span className="shiphuanglong"></span>
          <span className="liuye"></span>
        </div>
        <div className="wushantianfeng">
          <span className="bgwushan"></span>
          <span className="yunbutton"></span>
          <span className="yuntop"></span>
          <span className="yanwushan"></span>
        </div>
        <div className="hupaimengquan">
          <span className="bghupao"></span>
        </div>
        <div className="jiuxiyanshu">
          <span className="bgjiuquan"></span>
        </div>
        <div className="ruandunhuanbi">
          <span className="bghuanbi"></span>
          <span className="yanziyou"></span>
          <span className="yanzizuo"></span>
          <span className="yanziwhite"></span>
        </div>
        <div className="pinghuqiuyue">
          <span className="bgpinghu"></span>
          <span className="light"></span>
        </div>
        <div className="duanqiaocanxue">
          <span className="bgduanqiao"></span>
          <span className="snow"></span>
        </div>
        <div className="manlongguiyu">
          <span className="bg_guiyu"></span>
          <span className="swallowguiyu"></span>
          <span className="shipguiyu"></span>
        </div>
        <div className="sudichunwan">
          <span className="bg_shudi"></span>
          <span className="ship"></span>
          <span className="swallow"></span>
          <span className="kite"></span>
        </div>
        <div className="yunxizhujing">
          <span className="shan"></span>
          <span className="zhuzihou"></span>
          <span className="yuntop_1"></span>
          <span className="zhuziqian"></span>
          <span className="yun2"></span>
        </div>
        <div className="santanyingyue">
          <span className="bgsantan"></span>
          <span className="yanzizuo_1"></span>
          <span className="yanziyou_1"></span>
          <span className="yanzi1"></span>
        </div>
        <div className="huagangguanyu">
          <span className="bghuagang"></span>
          <span className="fish"></span>
          <span className="yunhuagang"></span>
        </div>
        <div className="leifengxizhao">
          <span className="yun2_1"></span>
          <span className="yun_1"></span>
          <span className="bgleifeng"></span>
          <span className="shipleifeng"></span>
          <span className="shuye"></span>
          <span className="dayan_1"></span>
        </div>
        <div className="shuangfengchayun">
          <span className="shan1"></span>
          <span className="yun1"></span>
          <span className="shan2"></span>
          <span className="yun2_2"></span>
          <span className="shan3"></span>
          <span className="yun3"></span>
          <span className="yun4"></span>
          <span className="yan"></span>
        </div>
        <div className="quyuanfenghe">
          <span className="zu103"></span>
        </div>
        <div className="baoshiliuxia">
          <span className="bgliuxia"></span>
          <span className="yunliuxiayou"></span>
          <span className="yunliuxiazuo"></span>
        </div>
        <div className="button">
          <span className="yunzuo"></span>
          <span className="mzuo"></span>
          <span className="mhou"></span>
          <span className="yunyou"></span>
          <span className="mqian"></span>
        </div>
        <div className="titles">
          {cards.map((item, index) => {
            return (
              <div key={index}>
                <span className={`_${index + 1}`}></span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Homepage
