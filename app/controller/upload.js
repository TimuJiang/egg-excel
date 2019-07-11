const path = require('path');
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const XLSX = require('xlsx');

function insertMany(collection, data) {
	return new Promise(function(resolve, reject) {
		collection.insertMany(data, {safe: true}, (err, result) => {
			if (err) {
				return reject(err);
			}
			return resolve(result);
		});
	});
}

class UploadController extends Controller {
	// todo 新建一个数据源
	async createDataSource() {
		// todo 返回一个固定的临时ID， 清空临时ID 记录的已有的数据
	}

	// todo 上传一个工作表
	/*
	* @id: 数据源ID
	* @excel:
	* */
	async upload() {
		const { ctx } = this
		const stream = await ctx.getFileStream()
		let buf
		try {
			const parts = await toArray(stream)
			buf = Buffer.concat(parts)
		} catch (err) {
			await sendToWormhole(stream)
			throw err
		}
		let id = ctx.query.id
		let workbook = XLSX.read(buf, {type:'buffer'});
		// todo 查看是否指定header 没有自动生成一行 或者用指定行做头
		if(id === 't123') {
			// todo 如果是临时ID 上传的数据表 存入临时表
			let files = {
				filename: stream.filename,
				updateTime: new Date().getTime()
			}
			let sheetNames = workbook.SheetNames
		}else{
			// todo 查询已有的
		}
		const sheetsInfos = {}
		const sheets = []
		workbook.SheetNames.forEach(name => {
			sheet = workbook.Sheets[name]
			sheets.push(sheet)
			range = XLSX.utils.decode_range(sheet['!ref'])
			let end = range.e
			let col = end.c + 1
			let row = end.r + 1
			sheetsInfos[name] = {
				col: col,
				row: row
			}
		})

		let sheet = workbook.Sheets[workbook.SheetNames[0]]
		// 获取数据范围
		let range = XLSX.utils.decode_range(sheet['!ref'])
		let end = range.e
		let colNum = end.c + 1
		let header = []
		let key
		let cell
		let cells = []
		let d = {}
		for (let i = 0; i < colNum; i++) {
			key = XLSX.utils.encode_cell({r: 0, c: i})
			cell = sheet[key]
			let s = key.replace(/\d/g, '')
			cells.push(s)
			header.push(`F${i}`)
		}
		let newsheet = XLSX.utils.aoa_to_sheet(header);
		let data = XLSX.utils.sheet_to_json(sheet, {header: 1});
		XLSX.utils.sheet_add_json(newsheet, data, {skipHeader: false, origin: -1})
		// await insertMany(ctx.model.Excel.collection, data)
		// let some = await ctx.model.Excel.find({})
		ctx.body = {
			code: 'success',
			data:{
				url: data || {},
			},
			message: 'message'
		};
	}

	// todo 设置行作为头
	async setHeader() {}

	// todo 查询一个工作表
	/*
	* id
	* */
	async getWorkBook() {}
}
module.exports = UploadController
