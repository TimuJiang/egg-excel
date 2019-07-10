module.exports = app => {
    const mongoose = app.mongoose;
    return mongoose.model('Excel', {});
}
