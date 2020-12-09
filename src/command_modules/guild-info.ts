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
			filesys.writeFileSync(`dump/${message.guild.id}.json`, message.guild.toString())
			message.reply("Here's the info for this guild.", { files: [`dump/${message.guild.id}.json`] })
			if (filesys.existsSync(`dump/${message.guild.id}.json`)) filesys.unlinkSync(`dump/${message.guild.id}.json`)
		} catch (error) {
			console.error(error)
		}
	}
}

export default guild_info as Command
