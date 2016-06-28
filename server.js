let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);

    let body = req.body;
    let wsUrl = body.wsUrl;
    let sessionName = body.sessionName;

    //JassBot.create('fritz', wsUrl, sessionName, teamToJoin);

    res.send(200);
});

app.use('/api', router);

app.listen(1337);
console.log('server listening on port 1337');