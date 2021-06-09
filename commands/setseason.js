module.exports = {
	name: "setseason",
	category: "Moderation",
	description: "Sets the new UNIX timestamp for the season",
	execute(message, args) {
		const data = require("../data.json");
		const fs = require("fs");
		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(":warning: You don't have permission to use this command");
		}
		data.season.end = args[0].trim();
		fs.writeFile("data.json", JSON.stringify(data), () => message.reply("Season end date succesfully set to " + new Date(args[0]*1000).toLocaleString()) );		
	},
};