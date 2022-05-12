import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"
import "./style.less"
import { Turntable } from "./bundle.js"
import API from "@src/api"
import store from "@src/store"
// import * as actions from "@src/store/action";
import { useThrottle } from "@src/utils"
import { useSelector } from "react-redux"
import drawPrizeModel from "@spark/preset-drawPrize"
import { observer } from "mobx-react"
import { Toast } from "@spark/ui"
import { ERROR_MESSSAGE } from "@src/constants"
import Getpriz1 from "../../components/getpriz1/getpriz1"
import EdPop from "@src/EdPopRedux/EdPop"
import Noprize from "../../components/noprize/noprize"
import { RES_PATH } from "../../../sparkrc.js"
import Tip from "../../components/tip/tip"
import dataCenter from "@src/utils/dataCenter"
import messageIns from "@src/utils/message"
const turnTableConfig = {
  props: {
    // 奖品个数
    prizeCount: 6,
    // 框
    bg: "//yun.duiba.com.cn/spark/assets/8bc7b6dd3b90fa27f6ba455b8171f43fcd0f8c11.png",
    // 底图
    rotateBg:
      "//yun.duiba.com.cn/spark/assets/8c94ef5f83dd14a4720f2c8fd2cd901d184e5f36.png",
    // 奖品图片宽度
    prizeWidth: 90,
    /**默认是否开启旋转 */
    initRoate: true,
  },
}

const turnlottery = (props, ref) => {
  const turntable = useRef()
  const getPrizes = async () => {
    console.log("11112222")
    const res = dataCenter.getData("isLogin")
    try {
      await drawPrizeModel.init({
        playwayId: "drawPrize_1",
      })
    } catch (e) {
      if (e.code == "600002") {
        // EdPop.showPop(Tip)
      }
    }
  }
  useEffect(() => {
    // getPrizes();
    messageIns.on("getPrize", getPrizes.bind(this))
  }, [])
  useEffect(() => {
    if (Object.keys(drawPrizeModel.lastOptions)?.length) {
      turntable.current.rotateStart()
      // 抽奖接口请求后调用
      doStop()
    }
  }, [drawPrizeModel.lastOptions])
  // const init = () => {
  //   turntable.current.rotateInit();
  // };
  // 开始转盘
  const doStart = useThrottle(async () => {
    try {
      await drawPrizeModel.draw()
    } catch (e) {
      if (ERROR_MESSSAGE(e.code)) {
        Toast(ERROR_MESSSAGE(e.code), 2000)
      } else {
        Toast(e.message || "网络开小差了，稍后再试", 2000)
      }
    }
  })
  // 停止转盘
  const doStop = async () => {
    const { lastOptions, options } = drawPrizeModel
    let _index = options.findIndex(
      (item) => item.optionId == lastOptions[0]?.optionId
    )
    turntable.current.rotateStop(_index)
  }
  // 展示中奖结果
  const showResult = () => {
    const { lastOptions } = drawPrizeModel
    if (lastOptions[0]?.prizeId && lastOptions[0]?.prizeId !== "thanks") {
      //中奖
      EdPop.showPop(Getpriz1, { prop: { lastOptions: lastOptions } })
    } else {
      EdPop.showPop(Noprize, { prop: { drawPrizeModel: drawPrizeModel } })
    }
  }
  const renderItem = (item, index) => {
    return (
      <>
        <div className="prize-dialog">
          <p className="prize-name">{item.optionName}</p>
          <div className="prizeimage">
            <img src={item.optionImg}></img>
          </div>
        </div>
      </>
    )
  }
  const renderCenter = () => {
    return (
      <>
        {drawPrizeModel?.freeJoinTimes ? (
          <div className="start md1" onClick={doStart}>
            <img src="//yun.duiba.com.cn/spark/assets/31e8206bee4e48bd2a431139880220a471696cbc.png"></img>
          </div>
        ) : (
          <div className="start" onClick={doStart}>
            <img
              className="gray"
              src="//yun.duiba.com.cn/spark/assets/25bc45c1566cb38f060ada5f7c0b5001d4ea1c9e.png"
            ></img>
          </div>
        )}
      </>
    )
  }
  return (
    <div className="turnLottery">
      <Turntable
        className="sichuanturn"
        turnTableConfig={turnTableConfig}
        prizeList={drawPrizeModel.options}
        renderItem={renderItem}
        renderCenter={renderCenter}
        onResult={showResult}
        ref={turntable}
      />
      <div onClick={doStart}></div>
      <div className="pointer"></div>
      <span className="todayFreeTimes1">
        今日免费次数：{drawPrizeModel?.freeJoinTimes}次
      </span>
    </div>
  )
}
export default observer(forwardRef(turnlottery))
