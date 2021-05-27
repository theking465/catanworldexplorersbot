module.exports = {
	name: "kick",
	category: "Moderation",
	usage: "<membermention> (<reason>)",
	description: "Kick a member.",
	async execute(message) {
		const sendEmbed = require("../functions/sendembed.js");
		const kickMember = message.mentions.members.first();
		let stop;

		if (!kickMember) {
			return message.channel.send(":warning: Make sure to mention the person you want to kick.");
		}
		const reason = message.content.split(kickMember.id + ">")[1];

		if (kickMember.id == message.guild.me.id) {
			return message.channel.send(":warning: I cannot kick myself.");
		}
		if (!message.member.hasPermission("KICK_MEMBERS")) {
			return message.channel.send(":warning: You need the `KICK_MEMBERS` permission in orde to kick someone.");
		}
		if (message.member.id == kickMember) {
			return message.channel.send(":warning: You cannot kick yourself.");
		}
		if (message.member.roles.highest.comparePositionTo(kickMember.roles.highest) <= 0 && message.member.id !== message.guild.owner.id) {
			return message.channel.send(`:warning: You don't have the permission to kick \`${kickMember.displayName}\` because you have a lower or equal role.`);
		}

		kickMember.kick(reason.trim())
			.catch(() => {
				stop = true;
				message.channel.send(`:warning: I cannot kick \`${kickMember.displayName}\`.`);
			});

		if (!stop) {
			sendEmbed.execute(message, `\`${kickMember.displayName}\` was kicked`, reason ? "Reason: " + reason.trim() : "", "both");
		}
	},
};