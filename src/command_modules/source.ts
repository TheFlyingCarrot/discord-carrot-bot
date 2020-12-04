import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const source: Command = {
	name: 'source',
	description: 'View my GitHub repository.',
	enabled: true,
	toggleable: true,

	aliases: ['sourcecode', 'github', 'repository'],

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		const newEmbed = new MessageEmbed()
		try {
			newEmbed.setAuthor('TheFlyingCarrot', 'https://avatars2.githubusercontent.com/u/32348022?s=460&u=8ae440138c2f4e729ca6f41fc9e057732da3a177&v=4')
				.setThumbnail('https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setTimestamp()
				.addField('Carrot Bot Repository', 'https://github.com/TheFlyingCarrot/discord-carrot-bot')
			message.channel.send(newEmbed)
		} catch (error) {
			return error
		}
	}
}

export default source as Command
