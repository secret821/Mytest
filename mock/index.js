
const rule = require("./common/rule");
const drawNum = require("./common/drawNum");
const coopFrontVariable = require("./common/coopFrontVariable");
const index = require("./common/index")
const accessData = require("./common/accessData")
const cardList = require("./common/cardList")
const photolist = require("./common/photolist");
const join = require("./common/join")

const proxy = {
  "GET /projectRule.query": rule,
  "GET /drawNum.query": drawNum,
  "GET /coop_frontVariable.query": coopFrontVariable,
  "GET /home/landscapePhoto.do": photolist,
  "GET /home/index.do": index,
  "GET /home/accessData.do": accessData,
  "GET /home/cardList.do": cardList,
  "GET /home/join.do": join,
  ...require("./common/task"),
  'GET /game/start.do': {
    success: true,
    data: {
      startId: 111
    }
  },
  'GET /game/submit.do': {
    success: true,
    data: null
  },
  'GET /game/index.do': {
    success: true,
    data: {
      gameRul:" 2",
      targetScore: 20,
      frequency: 22,
      gameTime: 100,
      newUsr: 0,
      coins: 11
    }
  },
  "GET /rule_1.query": {
    success: true,
    data: Array(8).fill(1).map((_, index) => ({
      icon: `http://qnpic.top/yoona${index+2}.jpg`,
      name: 'yoona'+(index +2),
      prizeId: 'thanks'
    }))
  },
  'GET /prize/join.do': {
    success: true,
    data: {
      prizeName: 11,
      icon: 'http://qnpic.top/yoona2.jpg',
      prizeId: 'thanks'
    }
  }
};
module.exports = proxy;
