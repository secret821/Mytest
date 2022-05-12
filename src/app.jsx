import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./app.less";
import MD from '../MD';
import Shouye from "./pages/shouye/shouye.jsx";
import Shoujidenglu from "./pages/shoujidenglu/shoujidenglu.jsx";
import Henbaoqian from "./pages/henbaoqian/henbaoqian.jsx";
import Jiangpingongshi from "./pages/jiangpingongshi/jiangpingongshi";
import Zhongjiang from "./pages/zhongjiang/zhongjiang.jsx";
import Huodongguize from "./pages/huodongguize/huodongguize.jsx";
import NoPrize from "./pages/noPrize/noPrize.jsx";
MD();
//此处为spark-cli动态生成

class App extends Component {

  render() {
    return (
      <Shouye />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
