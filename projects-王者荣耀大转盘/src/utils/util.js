import ViewCtrl from './viewCtrl';
import Enum from './enum';
import dataCenter from './dataCenter';

const util = {

    // 获取网页地址参数
    getQueryString: (name) => {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var search = window.location.href.split('?')[1];
        if (search) {
            var r = search.match(reg);
            if (r !== null) {
                console.log(r)
                return decodeURIComponent(r[2]);
            }
        }
        return '';
    },



    /**鼠标点击延迟，name：节点的类名，delay:延迟时间（ms） */
    clickDelay: (name, delay = 1200) => {
        let node;
        node = document.getElementsByClassName(name)[0]
        node.style.pointerEvents = 'none'
        setTimeout(() => {
            if (node)
                node.style.pointerEvents = ''
        }, delay)

    },

    /**禁用点击事件 */
    disableClick: (name) => {
        let node;
        node = document.getElementsByClassName(name)[0]
        node.style.pointerEvents = "none"
    },

    /**启用点击事件 */
    enableClick: (name) => {
        let node;
        node = document.getElementsByClassName(name)[0]
        node.style.pointerEvents = ''
    },

    /**获取星速台token */
    getProjectXToken: () => {
        let _token;
        if (top.location.href.indexOf('preview') >= 0 || top.location.href.indexOf('localhost') >= 0) {
            _token = 'dev-token';
            return _token
        } else {
            if (window['getPxToken']) {
                return new Promise(resolve => {
                    window.getPxToken((e, token) => {
                        switch (e) {
                            case 'net error':
                                console.log("获取星速台token_Error")
                                resolve(null)
                                break;
                            case 'need login':
                                console.log("获取星速台token_login")
                                resolve(null)
                                break;
                            case 'state invalid':
                                console.log("获取星速台token_invalid")
                                resolve(null)
                                break;
                            default:
                                if (token) {
                                    resolve(token)
                                } else {
                                    console.log('获取星速台token_invalid key');
                                    resolve(null)
                                }
                        }
                    });
                })

            } else {
                console.log("获取星速台token_Error")
                resolve(null)
            }
        }

    },

    //获取duibaToken
    getDuibaToken: () => {
        if (window['getDuibaToken']) {
            return new Promise(resolve => {
                window['getDuibaToken']((tokenObj) => {
                    resolve(tokenObj.token)
                }, (key, messageObj) => {
                    resolve(null);
                });
            })

        } else { //本地测试用
            return "_token"
        }
    },

    /**接口轮询
     * @param api API.XXX
     * @param name 字段名
     * @param successVlues 成功值
     * @param params 参数
     * @param count 次数:10
     * @param delay 延迟:500
     * 
     */
    async getApiStatus(api, name, successVlues, params, count = 10, delay = 500) {
        var pollingCount = dataCenter.getData("pollingCount");
        console.log("qqweqweq", api)
        if (!pollingCount || isNaN(pollingCount) || pollingCount < 0 || pollingCount > count) {
            pollingCount = 0;
            dataCenter.setData("pollingCount", 0)
        }
        try {
            return new Promise(async (resolve, reject) => {
                pollingCount++
                dataCenter.setData("pollingCount", pollingCount);
                console.log(pollingCount);
                var apiStatus = await api(params)
                if (apiStatus.success) {
                    if (apiStatus[name] == successVlues && pollingCount <= count) {
                        //轮询成功
                        resolve(apiStatus)
                    } else if (pollingCount > count) {
                        //超时
                        resolve();
                    } else {
                        //轮询
                        setTimeout(async () => {
                            let data = await util.getApiStatus(api, name, successVlues, params, count, delay);
                            resolve(data);
                        }, delay);
                    }

                } else {
                    //轮询失败
                    resolve(apiStatus);
                }
            })
        } catch {
            console.error("111");
        }
    },

    /**
     * 获取日期-日-月
     * @param {2020-08-13} date 
     * 
     * return 08月13日
     */
    getDateToDayMonth(date) {
        let dateStrs = date.split("-")
        return dateStrs[1] + "月" + dateStrs[2] + "日"
    },

    /**根据时间戳获取日期-月-日 */
    getDateDayMonthByTime(time) {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        date = month + '-' + day;

        console.log(date);

        return date;
    },

    //微信分享
    wechatShare(data) {
        console.log(JSON.stringify(data))
        wx.miniProgram.postMessage({
            data: {
                title: data.desc, // 标题
                desc: data.desc, // 描述
                imgUrl: data.imgUrl, // 图片
                link: data.link // 链接
            }
        });
        ViewCtrl.showWin(Enum.Com.Comshareguidewin)

    },

    dispatchEvent(type) {
        let e = new Event(type);
        document.dispatchEvent(e);
    }
}

export default util