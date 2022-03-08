/*
 * @Author: super
 * @Date: 2020-12-21 10:34:34
 * @LastEditTime: 2021-01-10 16:07:46
 * @LastEditors: super
 * @Description: 
 */

import API from "../api";
import { MODAL_INDEX } from "@src/utils/constants";
import store from ".";

export const changeModalQueue = (value = 0, channel) => ({ type: "CHANGE_MODAL_QUEUE", value, channel });
export const changeRule = (value) => ({ type: "CHANGE_RULE", value });
export const changeHomeInfo = (value) => ({type: "CHANGE_HOME_INFO", value});
export const changeSignReward = value => ({ type: "CHANGE_SIGN_REWARD", value });
export const changeCardInfo = value => ({ type: "CHANGE_CARD_INFO", value });
export const changeActEndType = value => ({ type: "CHANGE_ACTEND_TYPE", value });
export const changeSelectIndex = value => ({ type: "CHANGE_SELECT_INDEX", value });
export const changeRewardGain = value => ({type: "CHANGE_REWARD_GAIN", value});
export const changeLoadingShow = value => ({ type: "CHANGE_LOADING_SHOW", value });
export const changeLoadingData = value => ({
  type: "CHANGE_LOADING_DATA",
  value
});
export const getHomeInfo = () => async dispatch => {
  const {success, data} = await API.GET_INDEX();
  if(success) {
    data && dispatch(changeHomeInfo(data));
    if(!data?.followOfficalAccount) {
      dispatch(modalCtl("wxcode"));
    }
    const _count = data?.inviteCredits || data?.readCredits || 0;
    if (data?.showAnimate && _count) {
      dispatch(changeRewardGain(_count));
      dispatch(modalCtl("award"));
    }
  }
}
export const getEndStatus = () => async dispatch => {
    const {success, data} = await API.QUERY_END();
    if(success) {
      data && dispatch(changeActEndType(+data?.activityEndLevel));
    }
  }
/**
 * @description: 弹窗控制
 */
export const modalCtl = (value, channel) => async (dispatch) => {
  dispatch(changeModalQueue(typeof (value) === 'string' ? value : '', MODAL_INDEX[value] || 10));
};
