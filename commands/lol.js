module.exports = {
	name: 'lol',
	category: '',
	description: 'The bot will send **VERY LOL**.',
	execute(message) {
		message.delete();
		message.channel.send('**VERY LOL**');
	},
};