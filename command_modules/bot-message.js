module.exports = {
	enabled: true,
	name: 'bot-message',
	usage: '[guild] [channel] [message]',
	description: 'Send a message to a guild channel.',
	guildOnly: true,
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const guild = args.shift()
		const channel = args.shift()
		const newMessage = args.join(' ')
		guild.channel.send(newMessage)
	},
}
