/*
 * @Author: super
 * @Date: 2021-01-20 14:08:27
 * @LastEditTime: 2021-01-20 14:53:39
 * @LastEditors: super
 * @Description: 
 */
// 弹窗优先级 可以是负数， 不写默认是10， 数值越小，层级越高
export const MODAL_INDEX = {
  // rank: 1,
  // task: 1
  lastgain: 1,
  auth: 2,
  assit: 3,
  rankprize: 4,
  // sucwalk: 1
  // taskfinish: 1
};
export function ERROR_MESSSAGE(errorCode) {
  let message = "";
  const kv = {
    100020: '自己不能为自己助力',
    600023: '您的助力次数已用完',
    600020: '您已为他助力过啦',
    600021: '您的好友被助力已达上限'
  }
  // switch (errorCode) {
  //   // case 999101:
  //   //   message = "登录已过期";
  //   //   break;
  //   case 999002:
  //     message = "活动已结束";
  //   break;
  //   case 500021:
  //     message = "没有昨日线下步数";
  //     break;
  //   case 500022:
  //     message = "已经领取过了";
  //     break;
  //   default:
  //     message = "";
  //     break;
  // }
  return kv[errorCode] || '';
}
// 首页svga资源组
// export const SVGA_RES_INDEX = {
//   index_enter:
//     "//yun.duiba.com.cn/aurora/assets/4838bdf10e63fd848c18913c5773ba1b2f39d650.svga",
//   index_car:
//     "//yun.duiba.com.cn/aurora/assets/ea19753c5892b754474067e5a97621f7f12fc192.svga",
//   index_cloud:
//     "//yun.duiba.com.cn/aurora/assets/8c8d5419bf2450242bd26ef97daadabab9427bbf.svga",
//   index_gameicon:
//     "//yun.duiba.com.cn/aurora/assets/c04f09b421a15c35fba238f8fa61d456b8943890.svga",
//   index_inviteicon:
//     "//yun.duiba.com.cn/aurora/assets/3d4681a250a541f835de8eb963c26758f07bc82b.svga",
//   index_readicon:
//     "//yun.duiba.com.cn/aurora/assets/322ea89467cb2f5bf5c9e0c601262dc62e19b09a.svga",
//   index_title:
//     "//yun.duiba.com.cn/aurora/assets/01b6bbf37f4bd8d719ff36d5c82cf8cb16dec560.svga",
//   index_sign: 
//     "//yun.duiba.com.cn/aurora/assets/d8d305132febd28c59eb41538d1f8a4d3ac34ef2.svga",
//   index_signmodal:
//     "//yun.duiba.com.cn/aurora/assets/c3383aff0ff2a8999d2def58041ef3d51855471c.svga",
// };