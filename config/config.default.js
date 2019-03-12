/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	const config = {};
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1552367152281_3381';
	// add your middleware config here
	config.middleware = [];
	config.security = {
		csrf: {
			enable: false,
		},
	}
	config.multipart = {
		mode: 'file',
		fileSize: '50mb',
		fileExtensions: [
			'.xls',
			'.xlsx'
		]
	}
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
