module.exports = {
	/**
	 * Function which sends an embed at the specified channel.
	 * @param {*} message 
	 * @param {*} title Title of the embed
	 * @param {*} description Description of the embed
	 * @param {*} whereToSend Channel where to send the embed too: "c.log" || "c.msg"
	 */
	execute(message, title, description, whereToSend) {
		const Discord = require("discord.js");
		const { bot, channels } = require("../data.json");
		const logChannel = message.guild.channels.cache.get(channels.log_ID);

		const embed = new Discord.MessageEmbed()
			.setColor(bot.color)
			.setTitle(title)
			.setDescription(description)
			.setTimestamp();

		if (whereToSend == "c.log" && logChannel) {
			logChannel.send(embed);
		}
		if (whereToSend == "c.msg") {
			message.channel.send(embed);
		}
		if (whereToSend == "both") {
			if (logChannel) {
				logChannel.send(embed);
			}
			message.channel.send(embed);
		}
	},
};