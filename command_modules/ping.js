module.exports = {
	enabled: true,
	can_toggle: true,
	name: 'ping',
	description: 'Ping!',
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		message.channel.send('Pong.')
	},
}
