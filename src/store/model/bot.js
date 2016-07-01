var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let botSchema = mongoose.Schema({
    id: String,
    owner: String,
    host: String,
    port: Number,
    path: String
});

let Bot = mongoose.model('Bot', botSchema);

module.exports = Bot;