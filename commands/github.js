module.exports = {
	name: "github",
	category: "Miscellaneous",
	description: "shows the repository of this bot",
	execute(message) {
		const sendEmbed = require("../functions/sendembed");

		sendEmbed.execute(message, "repository", "[github link](https://www.github.com/theking465/catanworldexplorersbot)", "c.msg");

	},
};