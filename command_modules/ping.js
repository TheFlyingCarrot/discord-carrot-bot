module.exports = {
	enabled: true,
	canToggle: true,
	name: 'ping',
	description: 'Ping!',
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		message.channel.send('Pong.')
		
		return null
	},
}
