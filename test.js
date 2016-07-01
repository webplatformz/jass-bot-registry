let BotStore = require('./src/store/mongoBotStore');

BotStore.addBot({id: 'someBot1', owner: 'someOwner3', host: 'http:something', port: 1234, path: 'api'});
//let bots =BotStore.findBots();
//console.log(bots);

console.log("finished");