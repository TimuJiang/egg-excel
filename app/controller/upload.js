const path = require('path');
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const XLSX = require('xlsx');

async function formatExcel(workbook) {
	let {SheetNames, Sheets} = workbook
	let list = []
	Object.values(Sheets).forEach(function(item){
		list.push(XLSX.utils.sheet_to_json(item, {header: "A"}))
	});
	return {
		list,
		SheetNames
	}
}


class UploadController extends Controller {
	async upload() {
		const stream = await this.ctx.getFileStream()
		let buf
		let workbook
		try {
			const parts = await toArray(stream)
			buf = Buffer.concat(parts)
		} catch (err) {
			await sendToWormhole(stream)
			throw err
		}
		if(buf) {
			workbook = XLSX.read(buf, {type:'buffer'});
			console.log(workbook)
		}
		this.ctx.body = {
			code: 'success',
			data:{
				url: formatExcel(workbook) || {},
			},
			message: 'message'
		};
	}
}
module.exports = UploadController
