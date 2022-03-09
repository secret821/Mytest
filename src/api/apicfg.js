
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
  join:`home/join.do`,
  GET_PHOTOLIST: `home/landscapePhoto.do`,
  gameStart: {
    uri: 'game/start.do',
    withToken: true
  },
  gameSubmit: {
    uri: 'game/submit.do',
    withToken: true
  },
  gameIndex: 'game/index.do',
  prizeQuery: 'rule_1.query',
  prizeLottery: {
    uri: 'prize/join.do',
    withToken: true,
  },
  getSceneId: 'gameInvite/createItem.do',
  GET_QR_Content:`/wechat/sceneqrcode/getSceneQrCodeContent`,
  GET_QR_Code:`/customActivity/qrcode/getQrcode`,
  doAssist: {
    uri: 'gameInvite/doAssist.do',
    withToken: true
  },
  queryTaskList: 'home/taskList.do',
  doReadTask: 'home/doTask.do'
}

export default apiCfg;
