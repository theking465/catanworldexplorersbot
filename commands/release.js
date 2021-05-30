const sendembed = require("../functions/sendembed");

module.exports = {
	name: "release",
	category: "Miscellaneous",
	description: "The bot will send the release date.",
	execute(message) {
		sendembed.execute(message, "Release", "The game will release when it's ready. \n For live progress see [here](http://theking465.me/catanworldexplorersbot/).", "c.msg");
	},
};