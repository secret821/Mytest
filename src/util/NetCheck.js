import { Toast } from '@spark/ui';
import API from '../api';

const WrongCode = {
    0: "请输入验证码",
    10001: "不在活动时间范围内",
    10002: "网络繁忙，请稍后再试",
    10003: "手机号码错误",
    10004: "您已绑定过手机",
    10005: "参数异常",
    10006: "验证码不正确",
    10008: "抽奖次数不足",
    10009: "未绑定手机号",
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
        console.error("网络异常,请稍后再试", err);
    }

    if (!result || !result.success) {
        const code = result.code || null;
        if (code != "10007") {
            const message = WrongCode[code] || "网络异常，请稍后再试";
            toastEnable && Toast(message);
        }

    }
    return result;
}