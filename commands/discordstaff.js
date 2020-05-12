module.exports = {
	name: 'discordstaff',
	category: 'Server related',
	description: 'See who is Discord staff here.',
	execute(message) {
		const Discord = require('discord.js');
		const { bot, roles } = require('../data.json');

		const admin = message.guild.roles.cache.get(roles.admin_ID);
		const moderator = message.guild.roles.cache.get(roles.moderator_ID);

		if (!admin) {
			return message.channel.send(':warning: This command does not belong to this server.');
		}

		const description = `${admin}:\n- ${[message.guild.owner].concat(admin.members.filter(m => m.id !== message.guild.owner.id).array()).join('\n- ')}\n\n${moderator}:\n- ${moderator.members.filter(m => !m.roles.cache.has(admin.id)).array().join('\n- ')}\n`;
		const staffEmbed = new Discord.MessageEmbed()
			.setColor(bot.color)
			.setTitle('Discord staff card')
			.setDescription(description)
			.setTimestamp();

		message.channel.send(staffEmbed);
	},
};