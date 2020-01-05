module.exports = {
	name: 'postupdate',
	aliases: ['postupdates', 'posteverywhere'],
	usage: '[message]',
	args: true,
	description: 'Posts in all connected guilds where possible.',
	developerOnly: true,
	execute(message, args) {
		if (!args.length) {
			return { title: '[DEV] Command Fail', body: 'You didn\'t give me anything to say.' }
		}
		return { title: '[DEV] Command Fail', body: args }
	},
}