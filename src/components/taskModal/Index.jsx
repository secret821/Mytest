import React, { Component } from "react";
import "./style.less";
import modalStore from "@src/store/modal";
import getTaskApi from "@spark/api-task";
import { _throttle } from "@src/utils/utils";
import store from "@src/store";
import { Toast } from "@spark/ui";

const taskApi = getTaskApi("task_1");
import getInviteAssistApi from "@spark/api-inviteAssist";
import { domain } from "@spark/dbdomain";

// const inviteAssistApi = getInviteAssistApi("inviteAssist_1");
class taskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    };
  }

  componentDidMount() {
    this.getTaskList();
  }
  getTaskList = async () => {
    try {
      const res = await taskApi.queryTasks();
      if (res?.item) {
        let newArr = res?.item.map((item, index) => {
          if (item?.code == "game") {
            item.type = 1;
          } else if (item?.code.indexOf("browse") > -1) {
            item.type = 2;
          } else if (item?.code == "assist") {
            item.type = 3;
          }
          return item;
        });
        this.setState({ taskList: newArr });
      }
    } catch (e) {
      Toast(e?.message || "网络异常，请稍后再试～")
    }
  };
  //组件卸载
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  doTask = _throttle(async item => {
    if (item.code == "assit" || item.code == "game") {
      //判断完成次数
      if (+item?.completedSize >= +item?.intervalLimitSize) {
        return;
      }
    } else {
      if (+item?.completedSize) {
        return;
      }
    }
    switch (
      +item?.type // 1游戏 2浏览 3邀请  
    ) {
      case 1:
        //TODO
        window.location.href=''
        break;
      case 2:
        const res = await taskApi.doCompleted(item?.id);
        //浏览任务
        if (item?.jumpUrl === "null") {
          Toast("网络异常，请稍后再试～");
          return;
        }
        window.location.href = item?.jumpUrl;
        break;
      case 3:
        //邀请
        this.getInviteCode();
        break;
    }
  });

  renderBtnClass = item => {
    if (item.code == "assist") {
      //去助力
      if (+item?.completedSize >= +item?.intervalLimitSize) {
        return "gobtn grey";
      } else {
        return `gobtn`;
      }
    } else if (item?.code == "game") {
      //去助力
      if (+item?.completedSize >= +item?.intervalLimitSize) {
        //完成
        return "gobtn  grey";
      } else {
        return "gobtn";
      }
    } else {
      //浏览类任务-去完成按钮
      if (item?.completedSize) {
        //完成
        return "gobtn grey";
      } else {
        return "gobtn";
      }
    }
  };
  render() {
    const { taskList } = this.state;
    return (
      <div className="taskModal">
        <div
          className="taskmodalclose"
          onClick={() => {
            modalStore.closePop();
          }}
        ></div>
        <div className="tasklist">
          {taskList.map((item, index) => {
            return (
              <div className="taskItem" key={index}>
                <div className="itemicon">
                  <img src={item?.icon} />
                </div>
                {/* //任务标题 */}
                <div className="itemtitle">{item?.title}({item?.completedSize}/{item?.intervalLimitSize})</div>
                {/* //任务描述 */}
                <div className="itemdesc">{item?.desc}</div>
                <div
                  className={`itembtn ${this.renderBtnClass(item)} ${
                    item?.completedSize ? "" : `md${25 + index}`
                  }`}
                  onClick={() => {
                    this.doTask(item);
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default taskModal;
