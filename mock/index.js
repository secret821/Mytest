
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
    data: {
      ifLimit: false
    }
  },
  'GET /game/index.do': {
    success: true,
    data: {
      gameRule:" 2",
      targetScore: 20,
      frequency: 22,
      gameTime: 100,
      newUsr: 1,
      coins: 11
    }
  },
  "GET /ru_1.query": {
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
    success: false,
    data: 11,
    code: 600021
  },
  'GET /home/taskList.do': {
    "code": null,
    "data": [
      {
        "desc": "好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的好的",
        "icon": "mollit",
        "code": "game",
        "state": -77685484.66632512,
        "taskName": "exercitation",
        "completeTimes": 64959444.97871822,
        "allTimes": 94664497.99014458,
        "reward": 56744787.345980406
      },
      {
        "desc": "tempor dolore nostrud non irure",
        "icon": "ad mollit dolore nisi",
        "code": "anim culpa non tempor",
        "state": 9648522.719964921,
        "taskName": "amet dolor incididunt",
        "completeTimes": -38485889.83291119,
        "allTimes": 72047390.25917467,
        "reward": 55160697.188619286
      },
      {
        "desc": "in officia amet fugiat id",
        "icon": "mollit sint ea cillum",
        "code": "ipsum dolore ut",
        "state": -49528105.441326484,
        "taskName": "in officia Lorem proident",
        "completeTimes": -88498185.55347255,
        "allTimes": 55095227.97355163,
        "reward": -40412866.65284405
      },
      {
        "desc": "irure eu quis",
        "icon": "dolor proident nisi pariatur",
        "code": "voluptate",
        "state": 85102378.773601,
        "taskName": "qui est Lorem dolore magna",
        "completeTimes": -78114986.19152775,
        "allTimes": -54693439.91379456,
        "reward": -83775539.58226663
      }
    ],
    "message": null,
    "success": true
  },
  'GET /home/doTask.do': {
    success: true,
    data: {
      ifLimit: true
    }
  }

};
module.exports = proxy;
