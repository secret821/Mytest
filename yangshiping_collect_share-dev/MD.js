import MD from "spark-utils/out/md/index.js";

let appId = CFG.appID;
const dcm = "202." + CFG.projectId + ".0.0";
const domain = "//embedlog.duiba.com.cn";

let MDList = [22, 23, 24].map((item, index) => {
  return {
    ele: `.md${item}`,
    data: {
      dpm: `${appId}.110.${item}.1`,
      dcm,
      domain,
      appId
    },
    once: false
  };
});

export default () =>
  MD({
    show: MDList, // 曝光
    click: MDList // 点击
  });
