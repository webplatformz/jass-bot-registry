let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let router = express.Router();

router.post('/', (req, res) => {
    //TODO insert bot into db

    res.send(200);
});

router.get('/', (req, res) => {
    //TODO get all bots

    res.send(200);
});

app.use('/api', router);

app.listen(1337);
console.log('server listening on port 1337');
