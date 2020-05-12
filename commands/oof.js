module.exports = {
	name: 'oof',
	category: '',
	description: 'The bot will send **BIG OOF**.',
	execute(message) {
		message.delete();
		message.channel.send('**BIG OOF**');
	},
};