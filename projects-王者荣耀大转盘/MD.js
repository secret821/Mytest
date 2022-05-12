/*
 * @Author: super
 * @Date: 2020-11-05 10:14:07
 * @LastEditTime: 2021-01-12 10:27:24
 * @LastEditors: super
 * @Description:
 */
import MD from "spark-utils/out/md/index.js";

let appId = CFG.appID;

const dcm = "202." + CFG.projectId + ".0.0";
const domain = "//embedlog.duiba.com.cn";

let MDList = Array(4)
  .fill("")
  .map((_, index) => {
    return {
      ele: `.md${index + 1}`,
      data: {
        dpm: `${appId}.110.${index + 1}.1`,
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
  click: MDList, // 点击
});