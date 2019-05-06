const Mock = require('mockjs')
const Controller = require('egg').Controller;

class ChartsController extends Controller {
	async getCharts() {
		const {ctx} = this;

		ctx.body = {
			code: 'success',
			... Mock.mock({
				'data|10': [{
					'id|+1': 1,
					'name': '@cname',
					'value|200-1000': 1
				}]
			}),
			message: 'message'
		};
	}
	async getBorad() {
		const {ctx} = this;
		ctx.body = {
			code: 'success',
			... Mock.mock({
				'data|10': [{
					grid: { x: 0, y: 0, width: 380, height: 280, zIndex: null },
					'id|+1': 1,
					'reportDataBaseId|+1 ': 1,
					'resourceId|+1': 1,
					resourceType: 1,
					style: '{showTitle: true}',
					type: '1040',
					typeName: 'g2-bar',
					uid: 'uid-1556605339779-2',
					data: {
						content: '',
						dimension: [{ meta: 'name' }],
						legend: [],
						measure: [{ meta: 'value' }]
					}
				}]
			}),
			message: 'message'
		};
	}
}

module.exports = ChartsController
