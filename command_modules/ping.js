module.exports = {
	enabled: true,
	can_toggle: true,
	name: 'ping',
	description: 'Ping!',
	execute(itemTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = itemTable
		message.channel.send('Pong.')
	},
}
