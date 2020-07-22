module.exports = {
    name: 'mute',
    category: 'Moderation',
    usage: '<membermention> (<reason>)',
    description: 'Mute a member.',
    execute(message) {
        const sendEmbed = require('../functions/sendembed.js');
        const roles = require('../data.json').roles;
        const muted = message.guild.roles.cache.get(roles.muted_ID);
        const muteMember = message.mentions.members.first();
        let stop;

        if (!muteMember) {
            return message.channel.send(':warning: Make sure to mention the person you want to mute.');
        }
        const reason = message.content.split(muteMember.id + '>')[1];

        if (muteMember.id == message.guild.me.id) {
            return message.channel.send(':warning: I cannot mute myself.');
        }
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.channel.send(':warning: You need the `MANAGER_ROLES` permission in order to mute someone.');
        }
        if (message.member.id == muteMember.id) {
            return message.channel.send(':warning: You cannot mute yourself.');
        }
        if (message.member.roles.highest.comparePositionTo(muteMember.roles.highest) <= 0 && message.member.id !== message.guild.owner.id) {
            return message.channel.send(`:warning: You don't have the permission to mute \`${muteMember.displayName}\` because you have a lower or equal role.`);
        }

        if (muted) {
            message.mentions.members.first().roles.add(muted.id)
                .catch(() => {
                    stop = true;
                    message.channel.send(`:warning: I cannot mute \`${muteMember.displayName}\`.`);
                });
        } else {
            return message.channel.send(':warning: This command does not belong to this server.');
        }

        if (!stop) {
            sendEmbed.execute(message, `\`${muteMember.displayName}\` was muted`, reason ? 'Reason: ' + reason.trim() : '', 'both');
        }
    },
};