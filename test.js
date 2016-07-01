let BotStore = require('./src/store/mongoBotStore');

//BotStore.addBot({id: 'someBot', owner: 'someOwner2'});
let bots =BotStore.findBots();
console.log(bots);

console.log("finished");