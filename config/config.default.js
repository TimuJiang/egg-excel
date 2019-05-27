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
	},
	config.mongoose = {
		client: {
			url: 'mongodb://127.0.0.1/study',
			options: {},
		},
	},
	config.multipart = {
		mode: 'file',
		fileSize: '50mb',
		fileExtensions: [
			'.xls',
			'.xlsx'
		]
	}
	config.view = {
		defaultViewEngine: 'pug',
		mapping: {'.pug': 'pug'}
	}
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
