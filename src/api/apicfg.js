
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
  }
}

export default apiCfg;
