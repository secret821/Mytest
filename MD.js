import MD from 'spark-utils/out/md/index.js';

let appId = CFG.appID;
const dcm = '202.' + CFG.projectId + '.0.0';
const domain = '//embedlog.duiba.com.cn';

let MDList = [
  {
    ele: `.MD-md1`,
    data: {
      dpm: `${appId}.110.1.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
  {
    ele: `.MD-md2`,
    data: {
      dpm: `${appId}.110.2.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
  {
    ele: `.MD-md3`,
    data: {
      dpm: `${appId}.110.3.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
  {
    ele: `.MD-md4`,
    data: {
      dpm: `${appId}.110.4.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
  {
    ele: `.MD-md5`,
    data: {
      dpm: `${appId}.110.5.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
  {
    ele: `.MD-md6`,
    data: {
      dpm: `${appId}.110.6.1`,
      dcm,
      domain,
      appId
    },

    once: false
  },
];

export default () =>
  MD({
    show: MDList, // 曝光
    click: MDList // 点击
  });
