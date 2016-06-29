let express = require('express');
let bodyParser = require('body-parser');
const BotStore = require('./botStore');
const BotApi = require('./botApi');

let app = express();
const port = process.env.PORT || 3001;

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
    const serverIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!botToAdd) {
        // TODO proper response
        console.log('no bot found for' + req.body.botId);
    }
    BotApi.inviteBotToPlay(botToAdd, serverIP, (status) => res.sendStatus(status));
});

router.get('/', (req, res) => {

    console.log("IP: " + req.ip);
    console.log('received getBots from ' + ip);

    res.json(BotStore.findBots());
});

app.use('/api', router);

app.listen(port);
console.info('Server listening on port:', port);
