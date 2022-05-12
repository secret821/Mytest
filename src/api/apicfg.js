
const apiCfg = {
  getRule: `projectRule.query`,
  doJoin: {
    uri: `join.do`,
    method: "post"
  },
  doPhone: {
    uri: `draw/savePhone.do`,
    method: "post",
    withToken: true
  },
  doPrize: {
    uri: `draw/join.do`,
    method: "post",
    withToken: true
  },
  sendCode: {
    uri: `draw/sendSmsCode.do`,
    method: "post",
    withToken: true
  },
  savePhone: {
    uri: `draw/savePhone.do`,
    method: "post",
    withToken: true
  },
  getRecode: `draw/record.do`,
  getIndex: `draw/index.do`
}

export default apiCfg;
