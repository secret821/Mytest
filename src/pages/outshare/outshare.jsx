'use strict';

import React from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '@src/store/modal';
import API from '../../api';
import './outshare.less';
import { onInitShare } from '@src/store/utils.js';
import { getUrlParam } from '@lightfish/tools'
import { showToast } from '@src/utils/utils.js';
import { accessLog } from 'duiba-utils'

@observer
class Outshare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_code: ''
    }
  }

  componentDidMount() {
    onInitShare(true, true)
    accessLog(506)
    const sceneId = getUrlParam('sceneId')
    if (!sceneId) {
      showToast("场景值获取失败~")
      return
    }
    this.onGetSceneQrcode(sceneId)
  }

  onGetSceneQrcode = async (sceneId) => {
    API.GET_QR_Content({sceneId}).then(res=>{
      if(res.success){
        res?.data && this.getQR_Code(encodeURIComponent(res.data))
      }
    })
  }

  getQR_Code=(content)=>{
    const {width,height}={
      width: 245,
      height: 245
    }
    let data = {width,height,content}
    API.GET_QR_Code(data).then(res=>{
      if(res.success){
        this.setState({QR_code:res.data})
      }
    })
  }


  render() {
    return (
      <div className="outshare">
        <span className="back"></span>
        <img className='QR_code md17' src={this.state.QR_code} />
      </div>
    );
  }
}
export default Outshare;
