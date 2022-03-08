import {md} from '@spark/utils'

const {appID: appId, projectId} = window['CFG']
const dcm = '202.' + projectId + '.0.0';

md.prepare({appId})
const mdList = Array(23).fill(1).map((_,index) => {
  const ci = index + 1
  return {
    ele: `.md${ci}`,
    data: {
      dpm: `${appId}.110.${ci}.1`,
      dcm,
    },
    logExposure: true,
    logClick: [4,5,6,7,8,9,10,11,12, 16,23].includes(ci)
  }
})
md.registerBuriedPoints(mdList)