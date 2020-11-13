module.exports = {
    name: 'stores',
    category: '',
    description: "The bot will send links to the game's store pages.",
    execute(message) {
        
        const sendEmbed = require("../functions/sendembed");
        
        const Store_Links = require("../data.json");
        const GooglePlayLink = "[Google Play Link](" + Store_Links.GooglePlay + ")";
        const AppStoreLink = "[App Store Link](" + Store_Links.AppStore + ")";

        sendEmbed.execute(message, "Google Play", GooglePlayLink, "c.msg");
        sendEmbed.execute(message, "App Store", AppStoreLink, "c.msg");
    },
};