import React, { Component } from "react";
import store from "@src/store";
import * as actions from "@src/store/action";
import { MOUNTAINS } from "@src/constants";
import API from "../../../api";
import {connect} from "react-redux";
import "./style.less";
import { _throttle } from "@src/utils";
import { Toast } from "@spark/ui";
const lockSrc =
  "//yun.duiba.com.cn/aurora/assets/cebd52aec5eff0fa453b4798ceb7c4476dc92627.png";
class album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0
    };
  }
  componentDidMount() {
    this.getAlbumList();
  }
  showPhoto = _throttle((index, item) => {
    if(+index + 1 > this.state.curIndex) {
      Toast("卡片未解锁");
      return;
    }
    store.dispatch(actions.modalCtl(""));
    store.dispatch(actions.changeSelectIndex(index));
    store.dispatch(actions.modalCtl("intro"))
  })
  async getAlbumList() {
    const { success, data } = await API.GET_PHOTOLIST();
    if (success) {
      this.setState({ curIndex: data?.checkTime });
    }
  }
  render() {
    const { curIndex } = this.state;
    return (
      <div className="albumModal md15">
        <span
          className="album-close"
          onClick={() => {
            store.dispatch(actions.modalCtl(""));
          }}
        ></span>
        <div className="album-title">当前已登高打卡{curIndex}/21座祖国山川</div>
        <ul className="album-list">
          {MOUNTAINS.map((item, index) => {
            return (
              <li
                className="album-item"
                key={index}
                onClick={() => {
                  this.showPhoto(index, item);
                }}
              >
                <img src={`${+index + 1 > curIndex ? lockSrc : item.imgSrc}`} />
                <p className="album-name">{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default album;
