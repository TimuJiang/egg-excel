const path = require('path');
const Controller = require('egg').Controller;

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
		const { ctx } = this;
		const parts = ctx.multipart({ autoFields: true });
		debugger
		const files = [];
		let stream = await parts()
		while (stream != null) {
			const filename = stream.filename.toLowerCase();
			const target = path.join(this.config.baseDir, 'app/public', filename);
			files.push(filename);
		}

		// const file = ctx.request.files[0];
		// const name = 'egg-multipart-test/' + path.basename(file.filename);
		// let workbook = XLSX.readFile(file.filepath)
		// let data = await formatExcel(workbook)
		// console.log(ctx.model)
		ctx.body = {
			code: 'success',
			data:{
				url: files,
			},
			message: 'message'
		};
	}
}
module.exports = UploadController
