/*
 * @Author: super
 * @Date: 2021-01-20 14:08:27
 * @LastEditTime: 2021-01-20 14:53:39
 * @LastEditors: super
 * @Description: 
 */

import EdPop from "./EdPopRedux/EdPop";

// 弹窗优先级 可以是负数， 不写默认是10， 数值越小，层级越高
export const MODAL_INDEX = {
  black: 6,
  tel: 5
};
export function ERROR_MESSSAGE(errorCode) {
  let message = "";
  switch (errorCode) {
    // case 999101:
    //   message = "登录已过期";
    //   break;
    // case "600002":
    //   EdPop.showPop(Tip)
    //   break;
    case "200004":
      message = "活动未开始";
      break;
    case "200005":
      message = "活动已结束";
      break;
    case "201307":
      message = "抱歉，无游戏次数";
      break;
    case "201301":
      message = "抱歉，无游戏次数";
      break;
    default:
      message = "";
      break;
  }
  return message;
}