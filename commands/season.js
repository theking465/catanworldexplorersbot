module.exports = {
    name: 'season',
    category: 'miscellaneous',
    description: 'show the information about the current season',
    async execute(message) {
        const seasondata = require("../data.json").season;
        var current = Math.round((new Date()).getTime() / 1000);
        var end = seasondata.end;
        var difference = end - current;
        var date = new Date(difference * 1000);

        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        var day = Math.floor(difference / 3600 / 24);

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        console.log(formattedTime);

        let embed = new Discord.MessageEmbed().setColor(bot.color)
            .setTitle("Season end time")
            .setAuthor("requested by: " + message.member.user.tag)
            .setDescription(day + " days left")
            .addField(formattedTime)
            .setTimestamp();
    },
};