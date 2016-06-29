let express = require('express');
let bodyParser = require('body-parser');
const BotStore = require('./botStore');
const http = require('http');

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
    registerBotToRegistry(botToAdd, req.body.wsUrl, (status) => res.sendStatus(status));
});

router.get('/', (req, res) => {
    console.log('received getBots:');

    res.json(BotStore.findBots());
});

app.use('/api', router);

app.listen(1338);
console.log('server listening on port 1338');

function registerBotToRegistry(bot, wsUrl, callBack) {
    const post_data = {
        wsUrl
    };

    const post_options = {
        host: bot.host,
        port: bot.port,
        path: bot.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    const post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            callBack(200);
        });
        res.on('error', (chunk) => {
            console.log('ErrorResponse: ' + chunk);
            callBack(500);
        })
    });

    post_req.write(JSON.stringify(post_data));
    post_req.end();

}
