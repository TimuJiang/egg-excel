const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

const Excel = require('exceljs');
const XLSX = require('xlsx');

class UploadController extends Controller {
	async upload() {
		const { ctx } = this;
		const file = ctx.request.files[0];
		const name = 'egg-multipart-test/' + path.basename(file.filename);
		let workbook = XLSX.readFile(file.filepath)
		let {SheetNames, Sheets} = workbook
		let sheet = Sheets[SheetNames[0]]
		let list = XLSX.utils.sheet_to_json(sheet, {header: 1})
		ctx.body = {
			code: 'success',
			data:{
				url: name,
				sheetNames: SheetNames,
				sheets: list
			},
			message: 'message'
		};
	}
}
module.exports = UploadController
