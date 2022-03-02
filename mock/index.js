
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const coopFrontVariable = require("./common/coopFrontVariable");

const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /coop_frontVariable.query": coopFrontVariable
};
module.exports = proxy;
