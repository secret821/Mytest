import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./app.less";
import Modal from './modal/modal';
import MD from '../MD';
import Shouye from './pages/shouye/shouye.jsx';
import messageIns from "./utils/message";
import msg from "./utils/msg";
MD();
import "../monitor.js"; //前端错误监控
import Getpriz1 from "./components/getpriz1/getpriz1";
import Login from "./components/login/login"
import Noprize from "./components/noprize/noprize";
import Rule from "./components/rule/rule";
import Tip from "./components/tip/tip";
//此处为spark-cli动态生成

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainPage: < Shouye />
    }
  }
  componentDidMount() {
    messageIns.on(msg.changePage, this.changePage);
  }

  componentWillUnmount() {
    messageIns.remove(msg.changePage, this.changePage);
  }
  changePage = (e) => {
    let T = e;
    this.setState({
      mainPage: <T></T>
    })
  }

  // splicingAllUrl = () => {
  //   return new Promise((r, j) => {
  //     CFG.noLoginUrl = this.splicingAllUrl(CFG.noLoginUrl);
  //     CFG.activityUrl = this.splicingAllUrl(CFG.activityUrl);
  //     CFG.recordUrl = this.splicingAllUrl(CFG.recordUrl);
  //     CFG.recordUrlAPP = this.splicingAllUrl(CFG.recordUrlAPP);
  //     r();
  //   })
  // }


  // splicingAllUrl = (url, redirectUrl = '') => {
  //   if (!url) return;
  //   return url = (domain || location.origin) + url + redirectUrl;
  // }

  render() {
    const { mainPage } = this.state;
    return (
      <div>
        {mainPage}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
