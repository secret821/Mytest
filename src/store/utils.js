import { setUrlParam } from '@lightfish/tools'
import { start, Weixin, updateShare } from '@spark/share'
import { miniDoShare } from '@src/utils/share'
import { getDomain } from '@spark/dbdomain'
import API from '@src/api'

Weixin.debugMode = CFG.ShareDebug || false

async function WeiXinIntShare(cb) {
  await start([Weixin], function (success) {
      console.log("share result:----", success)
      cb && cb()
  })
}

/**
 * 或者验证重定向地址
 * @returns 
 */
function getAuthUrl() {
  return CFG.shareDomain+ "/wechat/access?apk=31bpesX7LYKiqsCWbTU2AN65kZxT&dbredirect=";
}

/**
 * 默认是设置分享落地页面
 * @param {*} isWithInviteCode 
 * @param {*} isJumpToShare 
 */
 export async function onInitShare(isWithInviteCode = true, isJumpToShare = true) {
  const promiseList = [
    getDomain()
  ]
  if (isWithInviteCode) {
    if (CFG.isShare) {
      promiseList.push(Promise.resolve({
        data: {
          sceneId: getUrlParam('sceneId') || ''
        }
      }))
    } else {
      promiseList.push(
        API.getSceneId()
      )
    }
  }
  promiseList.push(
    WeiXinIntShare()
  )
  console.info('1111')
  let baseInviteUrl = ''
  try {
    const resList = await Promise.all(
      promiseList
    )
    console.info('2222')
    // CFG.shareDomain = isResolve(resList[0]) ? resList[0].value : location.origin
    CFG.shareDomain = resList[0] || location.origin
    // 跳转地址 默认是分享落地页面
    baseInviteUrl = CFG.shareDomain + '/projectx/' + CFG.projectId + '/share.html?appID=' + CFG.appID
    baseInviteUrl = baseInviteUrl.replace(/(https{0,1}:\/\/[^\/]*)/g, CFG.shareDomain)
    if (isJumpToShare) {
      baseInviteUrl = baseInviteUrl.replace(/\/([^\/]*)\.html/g, `/share.html`)
    } else {
      baseInviteUrl = baseInviteUrl.replace(/\/([^\/]*)\.html/g, `/index.html`)
    }
    if (isWithInviteCode) {
      const code = resList[1]?.data?.sceneId || ''
      baseInviteUrl = setUrlParam('sceneId', code, baseInviteUrl)
    }
    baseInviteUrl = getAuthUrl() + encodeURIComponent(baseInviteUrl)
    Object.assign(CFG.ShareData, {
      url: baseInviteUrl
    })
  } catch(e) {
    console.error(e)
  }
  console.info('分享连接========', baseInviteUrl)
  console.info('分享配置========', CFG.ShareData)
  // eslint-disable-next-line
  CFG.ShareData.thumbnail = 'https://yun.duiba.com.cn/aurora/assets/2d6a1386d49779555d2181269041fd3d726c8315.png'
  updateShare(CFG.ShareData)
  // 初始化页面分享
  // miniDoShare(CFG.ShareData)
}


var cubic = function cubic(value) {
  return Math.pow(value, 3);
};

var easeInOutCubic = function easeInOutCubic(value) {
  return value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
};
/**
 * 滚动到指定位置
 * @param num
 * @param t
 * @param dom
 * @param attr
 */


function scrollTo() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var dom = arguments.length > 2 ? arguments[2] : undefined;
  var attr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'scrollTop';
  var el = dom || document.documentElement;
  var beginTime = Date.now();
  var beginValue = el[attr];

  var rAF = window.requestAnimationFrame || function (func) {
    return setTimeout(func, 16);
  };

  var frameFunc = function frameFunc() {
    var progress = (Date.now() - beginTime) / t;

    if (progress < 1) {
      el[attr] = beginValue - (beginValue - num) * easeInOutCubic(progress);
      rAF(frameFunc);
    } else {
      el[attr] = num;
    }
  };

  rAF(frameFunc);
}