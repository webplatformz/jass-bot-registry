const http = require('http');

const BotApi = {
    inviteBotToPlay(bot, wsUrl, mode, sessionName, callBack) {
        const post_data = {
            wsUrl,
            mode,
            sessionName
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

        });

        post_req.on('error', (chunk) => {
            console.log('ErrorResponse: ' + chunk);
            callBack(500);
        });

        post_req.write(JSON.stringify(post_data));
        post_req.end();
    }
};
module.exports = BotApi;
