import { setUrlParam } from '@lightfish/tools'
import { start, Weixin, updateShare } from '@spark/share'
import { miniDoShare } from '@src/utils/share'
import { getDomain } from '@spark/dbdomain'
import API from '@src/api'

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
  try {
    const resList = await Promise.all(
      promiseList
    )
    console.info('2222')
    // CFG.shareDomain = isResolve(resList[0]) ? resList[0].value : location.origin
    CFG.shareDomain = resList[0] || location.origin
    let baseInviteUrl = CFG.ShareData.url.replace(/(https{0,1}:\/\/[^\/]*)/g, CFG.shareDomain)
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
    console.info('分享连接========', baseInviteUrl)
    Object.assign(CFG.ShareData, {
      url: baseInviteUrl
    })
  } catch(e) {
    console.error(e)
  }
  updateShare(CFG.ShareData)
  // 初始化页面分享
  miniDoShare(CFG.ShareData)
}