module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const schema = new Schema({
		files: {
			type: Array,
		},
		sheetNames: {
			type: Array,
		}
	})
	return mongoose.model('TempWorkBook', schema)
}
