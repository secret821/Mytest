import {md} from '@spark/utils'

const {appID: appId, projectId} = window['CFG']
const dcm = '202.' + projectId + '.0.0';

md.prepare({appId})
const mdList = Array(29).fill(1).map((_,index) => {
  const ci = index + 1
  return {
    ele: `.md${ci}`,
    data: {
      dpm: `${appId}.110.${ci}.1`,
      dcm,
    },
    logExposure: true,
    logClick: true
  }
})

const mdList2 = Array(20).fill(1).map((_,index) => {
  const ci = index + 1
  return {
    ele: `.md9-${ci}`,
    data: {
      dpm: `${appId}.110.9.1`,
      dcm,
      dom: ci
    },
    logExposure: true,
    logClick: true
  }
})
md.registerBuriedPoints(mdList2)
md.registerBuriedPoints(mdList)
