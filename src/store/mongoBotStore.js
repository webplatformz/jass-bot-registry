let mongoose = require('mongoose');
let Bot = require('./model/bot');

function logError(error) {
    console.error(error);
}

function getMongoConnection(callback, errorCallback) {
    mongoose.connect('mongodb://localhost/bots');
    let db = mongoose.connection;
    db.on('error', errorCallback);
    db.once('open', callback);
}

const BotStore = {
    addBot(botToAdd) {
        getMongoConnection(() => {
            Bot.find({
                id: botToAdd.id,
                owner: botToAdd.owner},
                (error, bots) => {
                    if(bots.length == 0) {
                        var modelledBot = new Bot(botToAdd);
                        modelledBot.save();
                    } else {
                        console.log("Bot already contained");
                        // TODO return error
                    }
                });
        }, logError)
    },

    findBot(botId) {
        getMongoConnection(() => {
            Bot.find({},
                (error, bots) => {
                    return bots[0];
                });
        }, logError)
    },

    findBots() {
        getMongoConnection(() => {
            Bot.find(function(error, bots){
                console.log("found bots " + bots);
                return bots;
            });
        }, logError)
    }
};

module.exports = BotStore;