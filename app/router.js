'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/geely-dataview/dataSource/upload',controller.upload.upload);
  router.post('/geely-dataview/borad/charts',controller.charts.getCharts);
  router.post('/geely-dataview/borad/get',controller.charts.getBorad);
};
