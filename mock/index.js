
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const coopFrontVariable = require("./common/coopFrontVariable");
const index = require("./common/index")
const accessData = require("./common/accessData")
const cardList = require("./common/cardList")

const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /coop_frontVariable.query": coopFrontVariable,
  "GET /home/index.do": index,
  "GET /home/accessData.do": accessData,
  "GET /home/cardList.do": cardList,
  ...require("./common/task"),
};
module.exports = proxy;
