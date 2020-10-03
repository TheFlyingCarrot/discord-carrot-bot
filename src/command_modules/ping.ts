const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

    execute ({client, message,  args, MessageEmbed, Debugging}) {
      message.channel.send('Pong!')
    }
}

export default ping as Command
