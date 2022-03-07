
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
  },
  "GET /gameInvite/createItem.do": {
    success: true,
    data: {
      sceneId: 'sceneId'
    }
  },
  "GET /wechat/sceneqrcode/getSceneQrCodeContent": {
    "success":"z9IbyO",
    "code":"jYi8",
    "desc":"t@BDSI*",
    "timestamp":"4O#6",
    "data":"$b7"
  },
  "GET /customActivity/qrcode/getQrcode": {
    "success":true,
    "code":"0000000000",
    "desc":"OK",
    "timestamp":1561085307121,
    "data":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAAA9ElEQVR42u3aSw7DIAxFUe8g+98lO6AfjGMQaTsrL7ooqpB7MgKMQ2L1l1YMBoP9l1m04x0pr84chGmxw0e4dZ7/zEGYIGtD3CKtMwVh2qz3Yfdgr7VcYHdgQ4pOv58yOWxnlqqmIT9fV1ywzVluvqK/PRnB9mdeEvcWWRomyjxu8y1+4wHTY+04wmXvxOPPOUNgOuwsg2tddmCqLCdns7yoYXJsKKXMzt02JgBMjS0eeaJCLgaTZOMpRIx+rG6YIss776J2gimz/D7Oq+UK02fp7fkwE2BSbDjVH6+rTA7bmi0P//sWfPnZEmxjxkd3MNje7AHBF+7396cjdQAAAABJRU5ErkJggg=="
  },
  'GET /gameInvite/doAssist.do': {
    success: true,
    data: 11
  }

};
module.exports = proxy;
