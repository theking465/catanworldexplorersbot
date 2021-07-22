module.exports = {
	async execute() {
		const client = require("../index.js").client;
		const Discord = require("discord.js");
		const { channels, messages, roles } = require("../data.json");

		//fetches the message and guild
		const reactionRolesMessage = await client.channels.cache.get(channels.roles_ID).messages.fetch(messages.reactionRoles_ID);
		const guild = reactionRolesMessage.guild;

		//adds a filter for the collector
		const filter = (reaction) => {
			return reaction.emoji.id == "664004090124173326" || reaction.emoji.id == "826356826500759583" || reaction.emoji.id == "664001732052910092" || reaction.emoji.id == "664003725035044886" || reaction.emoji.id == "728253916025847859" || reaction.emoji.id == "728253916004745327" || reaction.emoji.id == "728253915694497884" || reaction.emoji.name == "🏎️";
		};

		//creates collector
		const collector = new Discord.ReactionCollector(reactionRolesMessage, filter, { dispose: true });

		//adds roles if collected emoji id matches
		collector.on("collect", (reaction, user) => {
			if (reaction.emoji.id == "664004090124173326") guild.members.cache.get(user.id).roles.add(roles.wizard_ID);
			if (reaction.emoji.id == "664001732052910092") guild.members.cache.get(user.id).roles.add(roles.pokemon_ID);
			if (reaction.emoji.id == "664003725035044886") guild.members.cache.get(user.id).roles.add(roles.ingress_ID);
			if (reaction.emoji.id == "826356826500759583") guild.members.cache.get(user.id).roles.add(roles.pikmin_ID);
			if (reaction.emoji.id == "728253916025847859") guild.members.cache.get(user.id).roles.add(roles.wolf_ID);
			if (reaction.emoji.id == "728253916004745327") guild.members.cache.get(user.id).roles.add(roles.eagle_ID);
			if (reaction.emoji.id == "728253915694497884") guild.members.cache.get(user.id).roles.add(roles.bear_ID);
			if (reaction.emoji.name == "🏎️") guild.members.cache.get(user.id).roles.add(roles.transformers_ID);

		});

		//removes roles if collected emoji id matches
		collector.on("remove", (reaction, user) => {
			if (reaction.emoji.id == "664004090124173326") guild.members.cache.get(user.id).roles.remove(roles.wizard_ID);
			if (reaction.emoji.id == "664001732052910092") guild.members.cache.get(user.id).roles.remove(roles.pokemon_ID);
			if (reaction.emoji.id == "664003725035044886") guild.members.cache.get(user.id).roles.remove(roles.ingress_ID);
			if (reaction.emoji.id == "826356826500759583") guild.members.cache.get(user.id).roles.remove(roles.pikmin_ID);
			if (reaction.emoji.id == "728253916025847859") guild.members.cache.get(user.id).roles.remove(roles.wolf_ID);
			if (reaction.emoji.id == "728253916004745327") guild.members.cache.get(user.id).roles.remove(roles.eagle_ID);
			if (reaction.emoji.id == "728253915694497884") guild.members.cache.get(user.id).roles.remove(roles.bear_ID);
			if (reaction.emoji.name == "🏎️") guild.members.cache.get(user.id).roles.remove(roles.transformers_ID);
		});
	},
};