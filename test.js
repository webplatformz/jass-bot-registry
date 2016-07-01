let create = require('./src/store/mongoBotStore');

var mongoTest = create();
mongoTest.addBot({id: 'someBot', owner: 'someOwner'});

console.log("finished");