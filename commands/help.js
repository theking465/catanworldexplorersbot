module.exports = {
	name: 'help',
	category: 'Miscellaneous',
	usage: '(<categoryname>)',
	description: 'Get information about commands.',
	execute(message, args) {
		const client = require('../index.js').client;
		const Discord = require('discord.js');
		const bot = require('../data.json').bot;

		if (args[0] && (args[0].toLowerCase().includes('server') || args[0].toLowerCase().includes('related'))) {
			sendEmbed('Server related');
		}

		else if (args[0] && args[0].toLowerCase().includes('fun')) {
			sendEmbed('Fun');
		}

		else if (args[0] && args[0].toLowerCase().includes('mod')) {
			sendEmbed('Moderation');
		}

		else if (args[0] && args[0].toLowerCase().includes('misc')) {
			sendEmbed('Miscellaneous');
		}

		else {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(bot.color)
				.setTitle('Overview of all commands')
				.setDescription(`Use \`${bot.prefix}help <categoryname>\` to get information about commands in a specific category.`)
				.addField('Server related', 'Commands regarding this server.')
				.addField('Fun', 'Commands that do not make sense.')
				.addField('Moderation', 'Commands for moderators.')
				.addField('Miscellaneous', 'Commands that don\'t fit in a category very well.')
				.setTimestamp();

			message.channel.send(helpEmbed);
		}

		function sendEmbed(categoryName) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(bot.color)
				.setTitle(categoryName)
				.setTimestamp();

			client.commands.forEach((command) => {
				if (command.category == categoryName) {
					helpEmbed.addField(bot.prefix + command.name + ' ' + (command.usage ? command.usage : ''), command.description);
				}
			});

			message.channel.send(helpEmbed);
		}
	},
};