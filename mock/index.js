const rule = require("./common/rule")
const drawNum = require("./common/drawNum")
const recode = require("./common/recode")
const index = require("./common/index")
const bind = require("./common/bind")
const join = require("./common/join")
const sendCode = require("./common/sendCode")
const savePhone = require("./common/savePhone")

const proxy = {
  "GET /game/index.do": index,
  "GET /game/join.do": join,
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /draw/record.do": recode,
  "POST /draw/savePhone.do": bind,
  "POST /draw/join.do": join,
  "POST /draw/sendSmsCode.do": sendCode,
  "POST /draw/savePhone.do": savePhone,
}
module.exports = proxy
