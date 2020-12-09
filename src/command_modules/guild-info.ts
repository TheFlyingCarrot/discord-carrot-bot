import filesys from 'fs'
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

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		try {
			filesys.writeFileSync(`${message.guild.id}.json`, message.guild.toString())
			message.reply("Here's the info for this guild.", { files: [`${message.guild.id}.json`] })
			if (filesys.existsSync(`${message.guild.id}.json`)) filesys.unlinkSync(`${message.guild.id}.json`)
		} catch (error) {
			console.error(error)
		}
	}
}

export default guild_info as Command
