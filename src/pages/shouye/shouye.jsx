"use strict"
import React, { Component } from "react"
import { RES_PATH } from "../../../sparkrc.js"
import "./shouye.less"
import Shoujidenglu from "../../pages/shoujidenglu/shoujidenglu.jsx"
import Henbaoqian from "../../pages/henbaoqian/henbaoqian.jsx"
import Jiangpingongshi from "../../pages/jiangpingongshi/jiangpingongshi"
import Zhongjiang from "../../pages/zhongjiang/zhongjiang.jsx"
import Huodongguize from "../../pages/huodongguize/huodongguize.jsx"
import EdPop from "../../EdPopRedux/EdPop.js"
import { ApiTool } from "../../util/NetCheck.js"
import noPrize from "../noPrize/noPrize.jsx"
class Shouye extends Component {
  constructor(props) {
    super(props)
    this.state = {
      area: [],
      userInfo: {
        optionList: [],
      },
      prizeInfo: {},
      click: true,
      isBind: false, //手机号是否份绑定
      canChou: false, //抽奖按钮灰色是否显示
      isUser: true, //是否是用户群体
    }
  }

  componentDidMount() {
    this.getIndex()
    this.setEvent()
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  setEvent = () => {
    this.pan.addEventListener("transitionend", this.openPrizeModule)
  }

  removeEvent = () => {
    this.pan.removeEventListener("transitionend", this.openPrizeModule)
  }

  openPrizeModule = () => {
    this.setState({
      click: true,
    })
    this.pan.style.transition = ``
    this.pan.style.transitionProperty = "none"
    this.pan.style.transform = `rotate(${0}deg)`
    if (this.state.prizeInfo.prizeType == 0) {
      EdPop.showPop(noPrize)
    } else {
      EdPop.showPop(Zhongjiang, {
        prop: {
          prizeName: this.state.prizeInfo.prizeName,
          icon: this.state.prizeInfo.icon,
        },
      })
    }
  }

  /**
   * 进入首页请求接口
   */
  getIndex = async () => {
    const result = await ApiTool("getIndex")
    if (result && result.success) {
      this.setState({
        userInfo: result.data,
      })
      this.handleCheckBind()
    }
  }
  /**
   * 大转盘旋转
   */
  rotate = () => {
    let n //奖品序号
    this.state.userInfo.optionList.map((item, index) => {
      if (this.state.prizeInfo.prizeId !== "thanks") {
        if (this.state.prizeInfo.prizeId == item.prizeId) {
          n = index + 1 //奖品序号
        }
      } else {
        n = 1
      }
    })
    this.pan.style.transition = `all 4s ease-in-out`
    this.pan.style.transitionProperty = "all"
    this.pan.style.transform = `rotate(${2500 + (360 - (n - 1) * 60)}deg)`
  }
  /**
   * 请求中奖接口
   */
  getPrize = async () => {
    if (this.state.click) {
      this.setState({
        click: false,
      })
      const result = await ApiTool("doPrize")
      if (result && result.success) {
        this.getIndex()
        this.setState(
          {
            prizeInfo: result.data,
          },
          () => {
            this.rotate()
          }
        )
      } else {
        this.setState({
          click: true,
        })
      }
    }
  }

  /**
   * 判断手机号是否绑定
   * @returns
   */

  handleCheckBind = () => {
    if (this.state.userInfo.state == 0) {
      EdPop.showPop(Shoujidenglu, {
        prop: {
          getIndex: () => {
            this.getIndex()
          },
        },
      })
    } else {
      this.handleCheckWhite()
    }
  }

  /**
   * 验证是否是白名单用户
   */

  handleCheckWhite = () => {
    if (this.state.userInfo.whiteState == 0) {
      EdPop.showPop(Henbaoqian)
    } else {
      EdPop.closePop()
      this.handleCheckDrawNum()
    }
  }
  /**
   * 显示游戏规则弹窗
   */
  handleShowRule = () => {
    EdPop.showPop(Huodongguize)
  }

  /**
   * 显示奖品公示弹窗
   */
  handleShowPrize = () => {
    EdPop.showPop(Jiangpingongshi)
  }
  /**
   * 判断是否还有抽奖次数
   */
  handleCheckDrawNum = () => {
    if (this.state.userInfo.drawNum > 0) {
      this.setState({
        canChou: true,
      })
    } else {
      this.setState({
        canChou: false,
      })
    }
  }

  /**
   * 跳转我的奖品链接
   */
  handleMyPrize = () => {
    location.href = CFG.prizeUrl
  }
  render() {
    let { canChou } = this.state
    let optionList = this.state.userInfo.optionList?.map((item, index) => {
      return (
        <div className={`prize${index + 1}_mixed`} key={index}>
          <span className={`tu_ceng_9zhe_gou_${index + 1}`}>{item.name}</span>
          <div className={`prize${index + 1}_icon`}>
            <img className={`prize${index + 1}`} src={item.url} />
          </div>
        </div>
      )
    })
    return (
      <div className="shouye ">
        <img className="tu_ceng_24 " src={RES_PATH + "shouye/图层24.png"} />
        <img
          className="bg "
          src={
            "//yun.duiba.com.cn/aurora/assets/8ccabf018690e18687bfd442d6ac1e55571abcdf.png"
          }
        />
        <div className="zhuan_pan">
          <div className="fixed" ref={(ref) => (this.pan = ref)}>
            <img
              className="zhuan_pan_mian"
              src={
                "//yun.duiba.com.cn/aurora/assets/866cf20f2983b23855f0d5c4faed0b9dc74fac8a.png"
              }
            />
            {optionList}
          </div>
          <img
            className="dian_ji_chou_jiang MD-md2"
            src={
              "//yun.duiba.com.cn/aurora/assets/6853d9d4fa9e3ece30c5631af9e8440feed47624.png"
            }
            onClick={this.getPrize}
          />
          {/* {!canChou && (
            <img
              className="dian_ji_chou_jiang_hui "
              src={RES_PATH + "shouye/点击抽奖灰.png"}
            />
          )} */}
        </div>
        <img
          className="biao_ti "
          src={
            "//yun.duiba.com.cn/aurora/assets/c9e7fcda9ad34fd27764eb11cce5ab3bfd89aa9c.png"
          }
        />
        <img
          className="biao_ti2 "
          src={
            "//yun.duiba.com.cn/aurora/assets/dd4268459ab19c2d0fe11c9f5142c68b399f0bdd.png"
          }
        />
        <span
          className="huo_dong_gui_ze_20 MD-md3"
          onClick={this.handleShowRule}
        >
          <p>我的奖品</p>
        </span>
        <span className="wo_de_jiang_pin MD-md4" onClick={this.handleMyPrize}>
          <p></p>
        </span>
        {/* <img
          className="jiang_pin_gong_shi_19 MD-md5"
          src={RES_PATH + "shouye/奖品公示19.png"}
          onClick={this.handleShowPrize}
        /> */}
      </div>
    )
  }
}
export default Shouye
