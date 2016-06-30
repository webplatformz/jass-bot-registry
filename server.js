let express = require('express');
let bodyParser = require('body-parser');
let create = require('./src/registryRouter');

const port = process.env.PORT || 3001;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', create());

app.listen(port);
console.info('Server listening on port:', port);
