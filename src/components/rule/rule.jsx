"use strict"

import React, { Component } from "react"
import modalStore from "@src/store/modal"
import { observer } from "mobx-react";
import API from "@src/api";
import "./rule.less"

@observer
class Rule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
    }
  }

  componentDidMount() {
    this.getRule()
  }

  getRule = async () => {
    const result = await API.getRule()
    if (result && result.success) {
      this.setState({
        text: result.data,
      })
    }
  }

 close =()=>{
  modalStore.closePop()
 }

  render() {
    return (
      <div className="rule modalbg">
        <span className="background"></span>
        <span className="redBtn" onClick={this.close}></span>
        <article
          className="activityRulesActivityRules"
          dangerouslySetInnerHTML={{ __html: this.state.text }}
        ></article>
      </div>
    )
  }
}
export default observer(Rule)
