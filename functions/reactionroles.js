module.exports = {
	async execute() {
		const client = require('../index.js').client;
		const Discord = require('discord.js');
		const { channels, messages, roles } = require('../data.json');

		const reactionRolesMessage = await client.channels.cache.get(channels.roles_ID).messages.fetch(messages.reactionRoles_ID);
		const guild = reactionRolesMessage.guild;
		const filter = (reaction) => {
			return reaction.emoji.id == '664004090124173326' || reaction.emoji.id == '664001732052910092' || reaction.emoji.id == '664003725035044886';
		};

		const collector = new Discord.ReactionCollector(reactionRolesMessage, filter, { dispose: true });
		collector.on('collect', (reaction, user) => {
			if (reaction.emoji.id == '664004090124173326') guild.members.cache.get(user.id).roles.add(roles.wizard_ID);
			if (reaction.emoji.id == '664001732052910092') guild.members.cache.get(user.id).roles.add(roles.pokemon_ID);
			if (reaction.emoji.id == '664003725035044886') guild.members.cache.get(user.id).roles.add(roles.ingress_ID);
		});

		collector.on('remove', (reaction, user) => {
			if (reaction.emoji.id == '664004090124173326') guild.members.cache.get(user.id).roles.remove(roles.wizard_ID);
			if (reaction.emoji.id == '664001732052910092') guild.members.cache.get(user.id).roles.remove(roles.pokemon_ID);
			if (reaction.emoji.id == '664003725035044886') guild.members.cache.get(user.id).roles.remove(roles.ingress_ID);
		});
	},
};