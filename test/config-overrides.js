/**
 * Created by rockyl on 2020/11/20.
 */
const path = require('path');

module.exports = {
	devServer: function(configFunction){
		return function(proxy, allowedHost) {
			const config = configFunction(proxy, allowedHost);
			config.contentBase = [path.resolve('public'), path.resolve('../')];

			return config;
		};
	}
}
