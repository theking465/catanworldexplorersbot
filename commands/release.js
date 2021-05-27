module.exports = {
	name: "release",
	category: "Miscellaneous",
	description: "The bot will send the release date.",
	execute(message) {
		message.channel.send("The game will release when it's ready.");
	},
};