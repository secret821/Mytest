
const apiCfg = {
  getRule:`projectRule.query`,
  getFrontVariable:`coop_frontVariable.query`,
  doJoin: {
    uri: `join.do`,
    method: "post"
  },
  index:`home/index.do`,
  accessData:`home/accessData.do`,
  cardList:`home/cardList.do`
}

export default apiCfg;
