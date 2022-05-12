'use strict';

import React, { Component } from 'react';
import { RES_PATH } from '../../../sparkrc.js';
import { ApiTool } from '../../util/NetCheck.js';
import EdPop from '../../EdPopRedux/EdPop.js';
import { Toast } from '@spark/ui';

import './noPrize.less';
class noPrize extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="noPrize">
                <img className="kuang_7 " src={RES_PATH + 'noPrize/框.png'} />
                <img className="button" src={RES_PATH + "noPrize/我知道了.png"} onClick={() => { EdPop.closePop() }} />
                <img className="guan_bi " src={RES_PATH + 'noPrize/关闭.png'} onClick={() => { EdPop.closePop() }} />
            </div>
        );
    }
}
export default noPrize;
