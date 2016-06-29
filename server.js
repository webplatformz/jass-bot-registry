let express = require('express');
let bodyParser = require('body-parser');
const BotStore = require('./botStore');
const BotApi = require('./botApi');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let router = express.Router();

router.post('/', (req, res) => {
    console.log('received bot registration:');
    console.log(req.body);
    BotStore.addBot(req.body);
    res.sendStatus(200);
});

router.post('/addBot', (req, res) => {
    console.log('received addBot:');
    console.log(req.body);

    const botToAdd = BotStore.findBot(req.body.botId);
    if (!botToAdd) {
        console.log('no bot found for' + req.body.botId);
    }
    BotApi.inviteBotToPlay(botToAdd, req.body.wsUrl, (status) => res.sendStatus(status));
});

router.get('/', (req, res) => {
    console.log('received getBots:');

    res.json(BotStore.findBots());
});

app.use('/api', router);

app.listen(1338);
console.log('server listening on port 1338');
