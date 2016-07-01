let mongoose = require('mongoose');

function error(error) {
    console.error(error);
}

var botSchema = mongoose.Schema({
    id: String,
    owner: String,
    host: String,
    port: Number,
    path: String
});

function getMongoConnection(callback, error) {
    mongoose.connect('mongodb://localhost/bots');
    let db = mongoose.connection;
    db.on('error', error);
    db.once('open', callback);
}

const BotStore = {
    addBot(botToAdd) {
        getMongoConnection(() => {
            let Bot = mongoose.model('Bot', botSchema);
            var modelledBot = new Bot(botToAdd);
            modelledBot.save(error);
        }, error)
    }
};

module.exports = function create() {
    let botStore = Object.create(BotStore);

    return botStore;
};