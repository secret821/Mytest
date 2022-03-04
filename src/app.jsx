import React, { Component } from "react";
import ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import "./app.less";
import store from './store/index';
import Modal from './modal/modal';
import MD from '../MD';
MD();

//此处为spark-cli动态生成
import Loading from "@src/pages/loading/loading";
import HomePage from "@src/pages/homePage/homePage";
import Gamepage from "./pages/gamepage/gamepage";


const pageMap = {
  loading: <Loading/>,
  homePage: <HomePage/>,
  gamePage: <Gamepage />
}
@observer
class App extends Component {
  async componentDidMount(){
    //获取前端开发配置，依据项目需要，酌情添加 ！！！
    // await store.getFrontVariable(); 
    window.test = () => {
      store.changePage('gamePage', {
        isNewGuy: true
      });
    }
  }
  render() {
    let { curPage, curPageData } = store;
    return (
      <div>
        {{...pageMap[curPage], props: {changePage: 'homePage', ...curPageData}}}
        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
