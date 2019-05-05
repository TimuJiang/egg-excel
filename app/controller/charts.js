const Mock = require('mockjs')
const Controller = require('egg').Controller;

class ChartsController extends Controller {
	async getCharts() {
		const {ctx} = this;

		ctx.body = {
			code: 'success',
			data: Mock.mock({
				'list|10': [{
					'id|+1': 1,
					'name': '@cname',
					'value|200-1000': 1
				}]
			}),
			message: 'message'
		};
	}
}

module.exports = ChartsController
