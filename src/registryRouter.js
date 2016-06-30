let express = require('express');
let BotStore = require('./store/botStore');
let BotApi = require('./communication/botApi');

module.exports = function create() {
    let router = express.Router();

    router.post('/', (req, res) => {
        console.log('received bot registration:');
        console.log(req.body);
        BotStore.addBot(req.body);
        res.sendStatus(200);
    });

    router.post('/addBot', (req, res) => {
        console.log('received addBot:');
        const addBotRequeset = req.body;
        console.log(addBotRequeset);

        const botToAdd = BotStore.findBot(addBotRequeset.botId);

        if (!botToAdd) {
            // TODO proper response
            console.log('no bot found for' + addBotRequeset.botId);
        }
        BotApi.inviteBotToPlay(botToAdd, addBotRequeset.serverUrl, addBotRequeset.mode, addBotRequeset.sessionName,
            (status) => res.sendStatus(status));
    });

    router.get('/', (req, res) => {
        console.log('received getBots');
        res.json(BotStore.findBots());
    });

    return router;
}