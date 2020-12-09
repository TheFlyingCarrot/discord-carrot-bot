import filesys, { constants } from 'fs'
import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const guild_info: Command = {
	name: 'guild-info',
	description: 'Generate a JSON list of information for a server.',
	enabled: true,
	toggleable: true,

	aliases: ['guildinfo'],

	guildOnly: true,

	developerOnly: true,

	async execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): Promise<void> {
		const data = JSON.stringify(message.guild)
		const filename = `${message.guild.id}.json`

		filesys.writeFileSync(filename, data)
		message.reply("Here's the info for this guild.", { files: [filename] })
		setTimeout(() => {
			if (filesys.existsSync(filename)) filesys.unlinkSync(filename)
		}, 1000)
		
	}
}

export default guild_info as Command
