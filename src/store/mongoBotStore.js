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
            let bot = new Bot(botToAdd);
            bot.save((error) => {
                if(error) {
                    throw error;
                }
                console.log("Saved successfully!")
            });
        }, logError)
    },

    findBot(botId) {
        getMongoConnection(() => {
            Bot.find({},
                (error, bot) => {
                    return bot;
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