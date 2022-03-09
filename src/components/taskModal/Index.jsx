import React, { Component } from "react"
import "./style.less"
import modalStore from "@src/store/modal"
import getTaskApi from "@spark/api-task"
import { _throttle } from "@src/utils/utils"
import store from "@src/store"
import { Toast } from "@spark/ui"

const taskApi = getTaskApi("task_1")
import getInviteAssistApi from "@spark/api-inviteAssist"
import { domain } from "@spark/dbdomain"
import API from "@src/api"
import { classnames } from "@lightfish/tools"
import { showShareGuide } from "@spark/share"
import { ModalCtrlIns } from "@lightfish/reactmodal"
import Sorrymodal from "../sorrymodal/sorrymodal"
import { RES_PATH } from "../../../sparkrc"

// const inviteAssistApi = getInviteAssistApi("inviteAssist_1");
class taskModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
    }
  }

  componentDidMount() {
    this.getTaskList()
  }
  getTaskList = async () => {
    const { success, data } = await API.queryTaskList()
    if (success) {
      this.setState({ taskList: data })
    }

    // try {
    //   const res = await taskApi.queryTasks();
    //   if (res?.item) {
    //     let newArr = res?.item.map((item, index) => {
    //       if (item?.code == "assist") {
    //         item.type = 1;
    //       } else if (item?.code.indexOf("browse") > -1) {
    //         item.type = 2;
    //       } else if (item?.code == "answer") {
    //         item.type = 3;
    //       }
    //       return item;
    //     });
    //     this.setState({ taskList: newArr });
    //   }
    // } catch (e) {
    //   Toast(e?.message || "网络异常，请稍后再试～")
    // }
  }
  //组件卸载
  componentWillUnmount() {
    this.setState = () => {
      return
    }
  }
  doTask = _throttle(async (item) => {
    console.log(item.state, "item.state")
    const { todaySignStatus } = store?.indexInfo
    if (false) {
      return
    } else {
      if (item.state === 0 && !todaySignStatus) {
        Toast("请先完成今日打卡哦")
        return
      }
      switch (item.code) {
        case "assist":
          showShareGuide()
          document.querySelector('#share_guide_layer .bg').src = RES_PATH + 'outShare/shareGuide.png'
          break
        case "read":
          if (item.state === 0) {
            const {success, data} =  await API.doReadTask()
            if (data?.ifLimit) {
              ModalCtrlIns.showModal(Sorrymodal)
            }
          }
          window.location.href = store.indexInfo.readLinkUrl
          break
        case "game":
          store.changePage("gamePage")
          break
      }
      this.closeModal()
    }
  })
  render() {
    const { taskList } = this.state
    return (
      <div className="taskModal">
        <div
          className="taskmodalclose"
          onClick={() => {
            this.closeModal()
          }}
        ></div>
        <div className="tasklist">
          {taskList.map((item, index) => {
            const mdKv = {
              'assist': 10,
              'read': 11,
              'game': 12,
            }
            return (
              <div className="taskItem" key={index}>
                <div className="itemicon">
                  <img src={item?.icon} />
                </div>
                <div className="itemtitle">
                  {item?.taskName}({item.completeTimes}/{item.allTimes})
                </div>
                <div className="itemdesc">{item?.desc || " "}</div>
                <div
                  className={classnames(
                    `itembtn`,
                    `${item.state ? `grey md${13+index}` : `gobtn md${10+index}` }`
                  )}
                  onClick={() => {
                    this.doTask(item)
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default taskModal
