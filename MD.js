import {md} from '@spark/utils'

const {appID: appId, projectId} = window['CFG']
const dcm = '202.' + projectId + '.0.0';

<<<<<<< HEAD
let MDList = new Array(23).fill("").map((item, index) => {
  return {
    ele: `.md${index+1}`,
    data: {
      dpm: `${appId}.110.${index+1}.1`,
=======
md.prepare({appId})
const mdList = Array(23).fill(1).map((_,index) => {
  const ci = index + 1
  return {
    ele: `.md${ci}`,
    data: {
      dpm: `${appId}.110.${ci}.1`,
>>>>>>> 5885e54506d8cd3a4d0fc153ba0fc94041d04fb6
      dcm,
    },
<<<<<<< HEAD
    once: false
  };
});

export default () =>
  MD({
    show: MDList, // 曝光
    click: MDList // 点击
  });
=======
    logExposure: true,
    logClick: [4,5,6,7,8,9,10,11,12, 16,23].includes(ci)
  }
})
md.registerBuriedPoints(mdList)
>>>>>>> 5885e54506d8cd3a4d0fc153ba0fc94041d04fb6
