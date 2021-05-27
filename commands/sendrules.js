module.exports = {
	name: "sendrules",
	category: "",
	description: "The bot will send the rules",
	execute(message) {
		const { rules, channels } = require("../data.json");
		const rulesChannel = message.guild.channels.cache.get(channels.rules_ID);

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(":warning: You don't have permission to use this command");
		}
		for (let rule in rules) {
			rulesChannel.send(rules[rule]);
		}

	},
};