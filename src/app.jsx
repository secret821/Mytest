import React, { Component } from "react";
import ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import "./app.less";
import store from './store/index';
import Modal from './modal/modal';
import MD from '../MD';
// MD();

//此处为spark-cli动态生成
import Loading from "@src/pages/loading/loading";
import HomePage from "@src/pages/homepage/homepage";
import Gamepage from "./pages/gamepage/gamepage";
import Lukylotteryscene from "./pages/lukylotteryscene/lukylotteryscene";
import Outshare from "./pages/outshare/outshare";
import { unwatchPageVisibility, watchPageVisibility } from "@spark/utils";


const pageMap = {
  loading: Loading,
  homePage: HomePage,
  gamePage: Gamepage,
  lottery: Lukylotteryscene
}
@observer
class App extends Component {
  async componentDidMount(){
    //获取前端开发配置，依据项目需要，酌情添加 ！！！
    watchPageVisibility(this.watchPageVisibilityCallBack)
  }

  watchPageVisibilityCallBack() {
    setTimeout(() => {
      store.getIndex()
    }, 500)
  }

  componentWillUnmount() {
    unwatchPageVisibility(this.watchPageVisibilityCallBack)
  }

  render() {
    let { curPage, curPageData } = store;
    return (
      <div>
        {
          CFG.isShare ? (
            <Outshare />
          ) : (function() {
            const Scene = pageMap[curPage]
            return <Scene  {...curPageData}  />
          })()
        }
        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
