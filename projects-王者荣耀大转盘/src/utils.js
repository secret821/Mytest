/*
 * @Author: super
 * @Date: 2021-01-20 14:08:27
 * @LastEditTime: 2021-01-20 14:45:29
 * @LastEditors: super
 * @Description: 
 */
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  start,
  updateShare,
  Weixin
} from "@spark/share";

/**
 * @description: 函数节流，普通防连点
 * @param {(Function, number?)}
 * @return {Function}
 */
export const _throttle = (fun, delay = 2000) => {
  let last, deferTimer;
  return function () {
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
      }, delay);
    } else {
      last = now;
      fun.apply(this, arguments);
    }
  };
};
export function useThrottle(fn, delay=2000, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
/** 判断环境 */
export function checkNavWX() {
  return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
}
/**
 * @description: 分享处理中心
 * @param {Object} 分享信息
 */
export const requireShare = (opts) => {
  var shareData = {
    title: opts.shareTitle,
    content: opts.shareContent,
    url: opts.shareUrl,
    images: [{ image: opts.shareThumbnail, type: "url" }],
  };
  console.log('分享数据', opts);
  var shareStr = JSON.stringify(shareData);

};
/**
 * @description: 小程序分享
 * @param {*} 
 * @return {*}
 */
export const miniDoShare = (opts) => {
  console.log(opts);
  wx.miniProgram.postMessage({
    data: {
      title: opts.title, // 标题
      desc: opts.desc, // 描述
      imgUrl: opts.imgUrl, // 图片
      link: opts.link // 链接
    }
  });
}
/**
 * @description: 小程序跳转
 * @param {*} 
 * @return {*}
 */
export const miniGoUrl = (url) => {
  wx.miniProgram.navigateTo({ url: url });
}
/**
 * 判断是否为ios系统
 */
export function isIos() {
  return navigator.userAgent.match(/iphone|ipod|ipad/gi)
}

/**
 * 转换k
 * @param {*} num
 */
export function getThousandToK(num) {
  if (num >= 1000) {
    let result = num / 1000;
    result = Math.floor(result * 10) / 10;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf(".");
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += ".";
    }
    while (s_x.length <= pos_decimal + 1) {
      s_x += "0";
    }
    s_x += "k";
  } else {
    s_x = num;
  }
  return s_x;
}

/**
 * 截取字符串 中2英1
 * @param {*} str 
 * @param {*} sub_length 
 */
export function subStringCE(str, sub_length) {
  let temp1 = str.replace(/[^\x00-\xff]/g, "**");
  let temp2 = temp1.substring(0, sub_length);
  let x_length = temp2.split("\*").length - 1;
  let hanzi_num = x_length / 2;
  sub_length = sub_length - hanzi_num;
  let res = str.substring(0, sub_length);
  let endStr;
  if (sub_length < str.length) {
    endStr = res + "...";
  } else {
    endStr = res;
  }
  return endStr;
}
// Weixin.debugMode = true;
/**
 * 初始化分享
 */
 export async function initShare() {
  await start([Weixin], function (success) {
    console.log("share result:", success);
  });
}
/**
 * 更新分享
 * @param {*} shareParams
 */
export function onShare(shareParams) {
  console.info("Weixin.isOn:", Weixin.isOn);
  if (Weixin.isOn) {
    updateShare(shareParams);
  }
}
