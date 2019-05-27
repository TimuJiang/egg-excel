'use strict';

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
};
