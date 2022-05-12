/*
 * @Author: super
 * @Date: 2021-01-20 14:08:27
 * @LastEditTime: 2021-01-20 14:20:09
 * @LastEditors: super
 * @Description: 
 */
import {
  projectID
} from "duiba-utils";
const projectId = projectID || '1';

const apiCfg = {
  GET_RULE: `projectRule.query`,
  DO_JOIN: {
    uri: `join.do`,
    method: "post",
    withToken: true, //携带星速台token
    secret: true, //开启接口加密
    secretKey: 'duibaduiba123', //接口加密key
  },
  GET_INDEX: `drawPrize_1/index.do`,
  CHECK_PHONE_BINDED: {
    uri: `/wechat/transform/checkMobile`,
    method: "post"
  },
  SEND_CAP_CODE: {
    uri: `/duibaUser/sendCode/v2`,
    method: "post"
  },
  BIND_PHONE: {
    uri: `/wechat/transform/bind`,
    method: "post"
  },
  CHECK_ISBIND_PHONE: {
    uri: `/wechat/transform/check`,
    method: "post"
  },
  VERIFY_TEL: `drawPrize_1/checkMobile.do`
}

export default apiCfg;