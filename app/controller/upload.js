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

function find(collection) {
	return new Promise(function(resolve, reject) {
		collection.find({}, (err, result) => {
			if (err) {
				return reject(err);
			}
			debugger
			return resolve(result);
		});
	});
}

class UploadController extends Controller {
	async upload() {
		const { ctx } = this
		const stream = await ctx.getFileStream()
		let buf
		let workbook
		try {
			const parts = await toArray(stream)
			buf = Buffer.concat(parts)
		} catch (err) {
			await sendToWormhole(stream)
			throw err
		}
		workbook = XLSX.read(buf, {type:'buffer'});
		let data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:0});
		await insertMany(ctx.model.Excel.collection, data)
		let some = await ctx.model.Excel.find({})
		ctx.body = {
			code: 'success',
			data:{
				url: some || {},
			},
			message: 'message'
		};
	}
}
module.exports = UploadController
