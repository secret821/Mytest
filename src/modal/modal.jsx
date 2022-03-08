import React, { Component } from "react";
import Drawfailmodal from "../components/drawfailmodal/drawfailmodal";
import Drawsucmodal from "../components/drawsucmodal/drawsucmodal";
import Gamefailmodal from "../components/gamefailmodal/gamefailmodal";
import Gameovermodal from "../components/gameovermodal/gameovermodal";
import Gametipsconfirmmodal from "../components/gametipsconfirmmodal/gametipsconfirmmodal";
import './modal.less';
import { observer } from 'mobx-react';
import modalStore from '../store/modal';
import { toJS } from 'mobx';
import wxcode from "@src/components/WxCode/wxcode";
import Service from "@src/components/ServiceModal/servicemodal";
import taskModal from "@src/components/taskModal/Index";
import album from "@src/components/Album/album";
import albumInclude from "@src/components/AlbumInclude/albumInclude";
import intro from "@src/components/Intro/intro";
import Rule from "@src/components/rule/rule";
import getread from "@src/components/getread/getread"
import getinvite from "@src/components/getinvite/getinvite"

export const cfg = {
  Rule:Rule,
  wxcode:wxcode,
  Service:Service,
  taskModal:taskModal,
  album:album,
  albumInclude:albumInclude,
  intro:intro,
  Gametipsconfirmmodal: Gametipsconfirmmodal,
  Gameovermodal: Gameovermodal,
  Gamefailmodal: Gamefailmodal,
  Drawsucmodal: Drawsucmodal,
  Drawfailmodal: Drawfailmodal,
  Rule:Rule,
  getread:getread,
  getinvite:getinvite
};

@observer
class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const list = toJS(modalStore.popList);

    if (!list.length) {
      //TODO:此处根据需要自行修改
      document.body.style.overflow = 'auto';
      return <section></section>;
    }

    let PopUp, popData, PopUpMulti, popUpMultiData;

    if (list.length > 1 && list[list.length - 1].isMulti == true) {
      const popObj2 = list[list.length - 1];
      PopUpMulti = cfg[popObj2.key];
      popUpMultiData = popObj2.data;
    }

    const popObj = list[0];
    PopUp = cfg[popObj.key];
    popData = popObj.data;

    if (PopUp || PopUpMulti) {
      document.body.style.overflow = 'hidden';
    }

    return <section className="modal-hoc-bg" style={{
      zIndex: !!modalStore.popList.length ? 1000 : -1,
      display: !!modalStore.popList.length ? 'block' : 'none'
    }}>
      {PopUp && <PopUp popData={popData} />}
      {PopUpMulti && <section className="modal-hoc-bg" style={{
        zIndex: !!modalStore.popList.length ? 1000 : -1,
        display: !!modalStore.popList.length ? 'block' : 'none'
      }}><PopUpMulti popData={popUpMultiData} />
      </section>}
    </section>;
  }

}

export default Modal;