var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let botSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    owner: {type: String, required: true},
    host: {type: String, required: true},
    port: {type: String, required: true},
    path: {type: String, required: true}
});

let Bot = mongoose.model('Bot', botSchema);

module.exports = Bot;