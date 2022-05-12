import {
    Toast
} from '@spark/ui';
import API from '../api';
import dataCenter from './dataCenter';

const WrongCode = {
    100002: '验证码错误',
    1000004: '验证码错误，请稍后再试'
}



export async function ApiTool(apiName, params, toastEnable = true) {
    let result;
    try {
        if (params) {
            result = await API[apiName](params);
        } else {
            result = await API[apiName]();
        }
    } catch (err) {
        result = null;
        console.error("网络开小差了，稍后再试", err);
    }

    if (!result || !result.success) {
        const code = result.code || '网络开小差了，稍后再试';
        if (code != "10007") {
            const message = WrongCode[code] || "网络开小差了，稍后再试";
            toastEnable && Toast(message, 1500, {
                itemClass: 'testToast'
            });
        }

    }
    if (result) dataCenter.setData(apiName, result.data)
    return result;
}