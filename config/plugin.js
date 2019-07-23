'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    multipart: {
        enable: true
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    pug: {
        enable: true,
        package: 'egg-view-pug'
    },
	'geely-sso': {
		enable: true,
		path: path.join(__dirname, '../lib/plugin/egg-geely-sso'),
	}
};
