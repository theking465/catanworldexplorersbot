module.exports = {
	name: "ping",
	category: "Miscellaneous",
	description: "The bot will send its latency.",
	execute(message) {
		const client = require("../index.js").client;
		const Discord = require("discord.js");
		const bot = require("../data.json").bot;

		message.channel.send("Pinging...")
			.then((pingMessage) => {
				const pingEmbed = new Discord.MessageEmbed()
					.setColor(bot.color)
					.setTitle("Pong!")
					.setTimestamp();

				const description = `My latency is \`${pingMessage.createdAt - message.createdAt}ms\`\nAPI latency is \`${Math.round(client.ws.ping)}ms\``;
				pingEmbed.setDescription(description);
				pingMessage.edit(null, pingEmbed);
			});
	},
};