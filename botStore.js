const bots = [];
const BotStore = {
    findBots() {
        return bots;
    },
    findBot(id) {
       return bots.find(bot => bot.id === id);
    },
    addBot(_bot) {
        const alreadyContained = bots.some((bot) => bot.url === _bot.url && bot.id === _bot.id);
        if(!alreadyContained){
            bots.push(_bot)
        }
    }
};
module.exports = BotStore;
