import apiCfg from './apicfg';
import {getPxToken} from "@spark/projectx";
import {callApi} from '@spark/api-base'
import {Toast} from '@spark/ui'

import {isFromShare, newUser} from 'duiba-utils';
import { showToast } from '@src/utils/utils';

let mergeData = {
	user_type: newUser ? '0' : '1',
	is_from_share: isFromShare ? '0' : '1',
}

const apiList = {
	...apiCfg
}


const API = generateAPI(apiList);
export default API;

function getRequestParams(value) {
	if (typeof value === 'string') {
		return {
			uri: value,
			method: 'get'
		}
	} else if (typeof value === 'object') {
		const {uri, method = 'get', headers, withToken, secret, secretKey, contentType = 'form'} = value;
		return {
			uri,
			method,
			headers,
			withToken,
			secret,
			secretKey,
			contentType,
		}
	} else {
		console.error('getRequestParams: 传参有误');
	}
}

const reqDataCenter = {}
// fromCache

function generateAPI(apiList) {
	const api = {};
	for (let key in apiList) {
		let value = apiList[key];

		const {method, uri, headers: mHeaders, withToken, secret, secretKey, contentType} = getRequestParams(value);
		api[key] = async (params = {}, headers) => {
			if (params.fromCache && reqDataCenter[uri]) {
				return reqDataCenter[uri]
			}
			let token;
			if (withToken) {
				try {
					token = await getPxToken();
				} catch (e) {
					Toast('网络开小差了，稍后再试');
					return {
						success: false
					}
				}
			}

			let mergedHeaders = {...mHeaders, ...headers}
			if (withToken && token) {
				params.token = token;
			}

			params = {...params, ...mergeData};
			console.info('params:', token, withToken, params)

			const result = await callApi(uri, params, method, mergedHeaders, false, secret, secretKey, contentType)
				.catch(e => {
					//捕获网络异常
					Toast('网络开小差了，稍后再试');
				});
			if (result) {
				//判断接口错误
				if (!result.success) {
					showToast(result.message, result.code);
				}
				reqDataCenter[uri] = result
				//返回整个结果
				return result;
			}
			return {
				success: false
			}
		}
	}

	return api;
}
