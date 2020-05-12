module.exports = {
	name: 'ban',
	category: 'Moderation',
	usage: '<membermention> (<reason>)',
	description: 'Ban a member.',
	async execute(message) {
		const sendEmbed = require('../functions/sendembed.js');
		const banMember = message.mentions.members.first();
		let stop;

		if (!banMember) {
			return message.channel.send(':warning: Make sure to mention the person you want to ban.');
		}
		const reason = message.content.split(banMember.id + '>')[1];

		if (banMember.id == message.guild.me.id) {
			return message.channel.send(':warning: I cannot ban myself.');
		}
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send(':warning: You need the `BAN_MEMBERS` permission in order to ban someone.');
		}
		if (message.member.id == banMember.id) {
			return message.channel.send(':warning: You cannot ban yourself.');
		}
		if (message.member.roles.highest.comparePositionTo(banMember.roles.highest) <= 0 && message.member.id !== message.guild.owner.id) {
			return message.channel.send(`:warning: You don't have the permission to ban \`${banMember.displayName}\` because you have a lower or equal role.`);
		}

		await banMember.ban({ reason: reason.trim() })
			.catch(() => {
				stop = true;
				message.channel.send(`:warning: I cannot ban \`${banMember.displayName}\`.`);
			});

		if (!stop) {
			sendEmbed.execute(message, `\`${banMember.displayName}\` was banned`, reason ? 'Reason: ' + reason.trim() : '', 'both');
		}
	},
};