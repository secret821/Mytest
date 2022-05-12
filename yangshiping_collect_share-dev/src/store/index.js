import { makeAutoObservable } from "mobx";
import API from "../api/index";
import { obj2query } from "@spark/utils";
import { getUrlParam } from "@src/utils/utils";
const store = makeAutoObservable({
  ruleInfo: "",
  curPage: "homePage",
  setRule(ruleInfo) {
    this.ruleInfo = ruleInfo;
  },
  changePage(page, callback) {
    this.curPage = page;
    callback && callback();
  },
  async initRule() {
    // 模拟获取远程的数据
    const { data } = await API.getRule();
    this.setRule(data);
  },
  goDeepLink() {
    const _params = {
      type: getUrlParam("type"),
      shareCode: getUrlParam("shareCode"),
      spId: getUrlParam("spId"),
      spCode: getUrlParam("spCode"),
      userId: getUrlParam("userId")
    };
    //targetUrl为指定页面地址
     const middleLoginUrl =
       "https://m.yangshipin.cn/static/duiba.html?redirect=" +
       encodeURIComponent(
         `${location.origin}/projectx/${CFG.projectId}/index.html?appID=${
           CFG.appID
         }&${obj2query(_params)}`
       );
     window.location.href = middleLoginUrl;
    // return;
    // location.href = url;
  }
});
export default store;
