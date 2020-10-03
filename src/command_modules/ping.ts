import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const ping: Command = {
	name: 'ping',
	description: 'Ping!',

	enabled: true,
	toggleable: true,

    execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean) {
      message.channel.send('Pong!')
    }
}

export default ping as Command
