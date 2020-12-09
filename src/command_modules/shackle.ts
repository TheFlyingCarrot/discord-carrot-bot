import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const shackle: Command = {
	name: 'shackle',
	description: 'Restrict the bot to developer use only.',
	enabled: true,
	toggleable: true,

	developerOnly: true,

	execute ({ client, message, args }: { client: ExtendedClient, message: Message, args: string[] }): void {
		client.shackled = !client.shackled
		client.activity = (client.shackled ? 'to nobody.' : '.help')
		client.user.setStatus(client.shackled ? 'dnd' : 'online')
		console.log(`[Shackle] [Status] ${client.shackled.toString().replace(/^\w/u, character => character.toUpperCase())}`)
	}
}

export default shackle as Command
