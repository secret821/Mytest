'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { ApiTool } from '../../util/NetCheck.js';
import EdPop from '../../EdPopRedux/EdPop.js';
import { Toast } from '@spark/ui';

import './jiangpingongshi.less';
class Jiangpingongshi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prizeLists: [],//获取奖品公示信息
      text: null,
      noMore: false,
      pageNum: 0,
      pageSize: 20,
      totalCount: 0,
      className: "tuo_min_de_shou_ji_hao_jiang_nei",
    }
  }
  componentDidMount() {
    this.getPrizeContent();
    if (this.scroll) {
      this.scroll.addEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll = (e) => {
    if (this.state.noMore == true) {
      return;
    }
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    if (clientHeight + scrollTop == scrollHeight && this.state.pageNum < this.state.totalCount / this.state.pageSize) {
      this.setState(pre => {
        return {
          pageNum: pre.pageNum + 1,
        }
      }, this.getPrizeContent);
    }
  }
  componentWillUnmount() {
    this.scroll.removeEventListener('scroll', this.handleScroll);
  }

  /**
  * 获取奖品信息
  */
  getPrizeContent = async () => {
    const results = await ApiTool("getRecode", { pageNum: this.state.pageNum, pageSize: this.state.pageSize }, false);
    if (results && results.success) {
      if (results.data.list.length < this.state.pageSize) {
        this.setState({
          noMore: true,
          className: "tuo_min_de_shou_ji_hao_jiang_nei"
        });
      }
      this.setState(pre => {
        return {
          prizeLists: pre.prizeLists.concat(results.data.list),
          totalCount: results.data.totalCount
        }
      })

    } else {
      if (results && results.code == "100000") {
        this.setState({
          text: results.message,
          className: "tuo_min_de_shou_ji_hao_jiang_wai"
        })
      }
    }
  }


  render() {
    let prizeLists;
    if (this.state.text != null) {
      prizeLists = this.state.text;
    } else {
      prizeLists = this.state.prizeLists?.map((list, index) => {
        return (
          <div className="spanMixed" key={index}>
            <span className="span1">{list.phone}</span>
            <span className="span2">{list.prizeName}</span>
          </div>
        )
      });
    }
    return (
      <div className="jiangpingongshi ">
        <img className="kuang_7 " src={RES_PATH + 'jiangpingongshi/框7.png'} />
        <div className={`${this.state.className}`} ref={e => (this.scroll = e)}  >
          {prizeLists}
        </div>
        <img className="guan_bi_m6 " src={RES_PATH + 'jiangpingongshi/关闭m6.png'} onClick={() => { EdPop.closePop() }} />
      </div>
    );
  }
}
export default Jiangpingongshi;
