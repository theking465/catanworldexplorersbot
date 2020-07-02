const Discord = require('discord.js');
const fs = require('fs');
const { bot, channels, links } = require('./data.json');
const levels = require('./levels.json');
const reactionRoles = require('./functions/reactionroles.js');
const linkchecker = require('./functions/linkchecker.js')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

module.exports = { client };


client.on('ready', async() => {
    reactionRoles.execute();
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('a waiting game');
});

client.on('message', message => {
    if (message.author.bot) return;
    linkchecker.execute(message);

    //level trying shizzle
    /*userId = message.author.id;
    if (userId in levels.users) {
        levels.users[userId]++;
        fs.writeFileSync('levels.json', JSON.stringify(levels));

    } else {
        levels.users[userId] = 0;
        console.log(levels);
        fs.writeFileSync('levels.json', JSON.stringify(levels));
    }*/



    const args = message.content.slice(bot.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (message.channel.type !== 'text') {
        return message.channel.send(':warning: I can\'t execute commands inside DMs.');
    }

    try {
        command.execute(message, args, bot.prefix);
    } catch (error) {
        console.log(error.stack);
        message.channel.send(':warning: There was an error trying to execute that command. It\'s logged.');
        const logChannel = message.guild.channels.cache.get(channels.log_ID);
        if (logChannel) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setTitle('An error occured')
                .setAuthor(message.member.user.tag)
                .setThumbnail(message.member.user.displayAvatarURL())
                .setDescription('```' + error.message + `\`\`\`\n[message](${message.url})`)
                .setTimestamp().setURL("https://www.youtube.com/watch?v=t3otBjVZzT0");

            logChannel.send(errorEmbed);
        }
    }
});

client.on('guildMemberAdd', member => {
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Welcome to ${member.guild.name}!`)
        .setAuthor(member.user.tag)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`Make sure to read our <#${channels.rules_ID}> and have fun!\n\n**__Links:__**\n[Discord server](${links.Discord})\n[Reddit](${links.Reddit})`)
        .setFooter(`We have ${member.guild.members.cache.filter(m => !m.user.bot).size} human members now`)
        .setTimestamp();

    const welcomeChannel = member.guild.channels.cache.get(channels.welcome_ID);
    if (welcomeChannel) {
        welcomeChannel.send(member.toString(), welcomeEmbed);
    }
    console.log(member.user.tag + ' has joined the server');
});

client.login(bot.token);