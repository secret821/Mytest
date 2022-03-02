import { makeAutoObservable } from 'mobx';
import API from '../api/index';
const store = makeAutoObservable({
  ruleInfo: '',
  frontVariable: {},
  //前端开发配置
  curPage: 'loading',
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
  async getFrontVariable() {
    // 获取前端开发配置
    const { data } = await API.getFrontVariable();
    this.frontVariable = data || {};
    console.log('前端开发配置', data);
  },
});
export default store;
