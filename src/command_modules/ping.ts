const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

    execute (_client, message, _args, MessageEmbed): void {
		const newEmbed = new MessageEmbed
		newEmbed.title = "Ping"
		newEmbed.addField('Response', 'Pong!', true)
		message.channel.send(newEmbed)
    }
}
