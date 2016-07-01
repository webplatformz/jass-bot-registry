# jass-bot-registry ![Build STatus](https://travis-ci.org/webplatformz/jass-bot-registry.svg?branch=develop)

Server which handle available bots for the jass-challenge app.

## API
### Endpoints
#### Add bot
#### Get bots


### Schemas
#### Bot
```javascript
var botSchema = mongoose.Schema({
    id: String,
    owner: String,
    host: String,
    port: Number,
    path: String
});
```

