module.exports = {
    name: 'setactivity',
    category: 'Miscellaneous',
    description: 'Sets the activity of the bot',
    execute(message, args) {
        const client = require("../index.js").client;
        const roles = require("../data.json").roles;

        //checks if the user is an admin
        if (message.member.roles.cache.has(roles.admin_ID)) {
            client.user.setActivity(args.join(" "));
        } else {
            message.reply("⚠ you don't have permission to use this command!");
        }

    },
};