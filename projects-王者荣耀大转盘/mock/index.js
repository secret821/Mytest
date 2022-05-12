/*
 * @Author: super
 * @Date: 2021-01-12 15:32:13
 * @LastEditTime: 2021-01-12 16:43:24
 * @LastEditors: super
 * @Description:
 */
const rule = require("./common/rule");
const checkPhoneBinded = require("./common/checkPhoneBind");
const sendCapCode = require("./common/sendCapCode");
const bindPhone = require("./common/bindPhone");
const index = require("./common/index");
const checkIsBindPhone = require("./common/checkIsBindPhone");
const verify = require("./common/verify");
const proxy = {
  "GET /projectRule.query": rule,
  ...require("./common/drawPrize"),
  "POST /wechat/transform/checkMobile": checkPhoneBinded,
  "POST /duibaUser/sendCode/v2": sendCapCode,
  "POST /wechat/transform/bind": bindPhone,
  "GET /drawPrize_1/index.do": index,
  "POST /wechat/transform/check": checkIsBindPhone,
  "GET /drawPrize_1/checkMobile.do": verify
};
module.exports = proxy;