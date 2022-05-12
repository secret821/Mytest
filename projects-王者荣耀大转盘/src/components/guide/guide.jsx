'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { observer } from 'mobx-react';
import store from '../../store/index';
import modalStore from '../../store/modal';
import API from '../../api';
import './guide.less';
import EdPop from '@src/EdPopRedux/EdPop.js';

@observer
class Guide extends Component {
    constructor(props) {
        super(props);
    }

    closePop = () => {
        EdPop.closePop();
        window.history.replaceState({}, '四川联通大转盘', CFG.activityUrl);
    }

    render() {
        return (
            <div className="guide" onClick={this.closePop}>
                <img className="guide_mask" src={RES_PATH + "guide/分享蒙层.png"} />
            </div>
        );
    }
}
export default Guide;
