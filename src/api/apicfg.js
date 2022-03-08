
const apiCfg = {
  getRule:`projectRule.query`,
  getFrontVariable:`coop_frontVariable.query`,
  doJoin: {
    uri: `join.do`,
    method: "post"
  },
  index:`home/index.do`,
  accessData:`home/accessData.do`,
  cardList:`home/cardList.do`,
  gameStart: 'game/start.do',
  gameSubmit: 'game/submit.do',
  gameIndex: 'game/index.do',
  prizeQuery: 'rule_1.query',
  prizeLottery: {
    uri: 'prize/join.do',
    withToken: true,
  },
  getSceneId: 'gameInvite/createItem.do',
  GET_QR_Content:`/wechat/sceneqrcode/getSceneQrCodeContent`,
  GET_QR_Code:`/customActivity/qrcode/getQrcode`,
  doAssist: 'gameInvite/doAssist.do',
  queryTaskList: 'home/taskList.do',
  doReadTask: 'home/doTask.do'
}

export default apiCfg;
