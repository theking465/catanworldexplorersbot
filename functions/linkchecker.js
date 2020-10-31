module.exports = {
    async execute(message) {
        const client = require('../index.js').client;
        const Discord = require('discord.js');
        const data = require('../data.json');
        const roles = require('../data.json').roles;
        const links = ['discord.gg/', 'discord.com/'];
        const admin = message.guild.roles.cache.get(roles.admin_ID);
        const moderator = message.guild.roles.cache.get(roles.moderator_ID);

        if (message.member.roles.cache.has(roles.admin_ID) || message.member.roles.cache.has(roles.moderator_ID) || message.member.roles.cache.has(roles.minimod_ID)) {
            return;
        }
        for (let i = 0; i < links.length; i++) {
            if (message.content.includes(links[i])) {
                if (message.mentions.members.first() != undefined) {
                    if (message.mentions.members.first().roles.cache.has(roles.admin_ID) || message.mentions.members.first().roles.cache.has(roles.moderator_ID) || message.mentions.members.first().roles.cache.has(roles.minimod_ID)) {
                        sendApproval();
                    } else {
                        sendWarning();
                    }
                }
            }
        }

        function sendWarning() {
            let embed = new Discord.MessageEmbed().setColor(data.bot.color).setTitle('Discord invite detected').setDescription('Posting discord invites without permission is not allowed, send a DM to an admin or moderator for approval.').setAuthor(message.member.user.tag).setTimestamp().setThumbnail(message.member.user.displayAvatarURL());
            message.channel.send(embed);
            message.delete();
            let logChannel = message.guild.channels.cache.get(data.channels.log_ID);
            let embed2 = new Discord.MessageEmbed().setColor(data.bot.color).setTitle('Discord invite deleted').addField('message', message.content).setAuthor(message.member.user.tag).setTimestamp().setThumbnail(message.member.user.displayAvatarURL());
            logChannel.send(embed2);
        }

        function sendApproval() {
            let logChannel = message.guild.channels.cache.get(data.channels.log_ID);
            let embed2 = new Discord.MessageEmbed().setColor(data.bot.color).setTitle('Link approved').addField('message', message.content).addField("approved by", message.mentions.members.first().user.tag).setAuthor(message.member.user.tag).setTimestamp().setThumbnail(message.member.user.displayAvatarURL());
            logChannel.send(embed2);
        }
    },
};