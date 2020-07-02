module.exports = {
	async execute(message) {
		const client = require('../index.js').client;
        const Discord = require('discord.js');
        const data = require('../data.json');
        const links = ['discord.gg/']
        for (let i = 0; i < links.length; i++) {
            if(message.content.includes(links[i])){
                sendWarning();
                return;
            }            
        }    
        
        function sendWarning(){
            let embed = new Discord.MessageEmbed().setColor(data.bot.color).setTitle('Link detected').setDescription('Link are not allowed on this server, send a DM to a moderator for approval.').setAuthor(message.member.user.tag).setTimestamp().setThumbnail(message.member.user.displayAvatarURL());
            message.channel.send(embed);
            message.delete();
            let logChannel = message.guild.channels.cache.get(data.channels.log_ID);
            let embed2 = new Discord.MessageEmbed().setColor(data.bot.color).setTitle('Link deleted').addField('message', message.content).setAuthor(message.member.user.tag).setTimestamp().setThumbnail(message.member.user.displayAvatarURL());
            logChannel.send(embed2);
        }
		
	},
};