module.exports = {
	enabled: true,
	can_toggle: true,
	name: 'ping',
	description: 'Ping!',
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		message.channel.send('Pong.')
	},
}
