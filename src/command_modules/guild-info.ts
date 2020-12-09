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

	async execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): Promise<void> {
		await filesys.writeFile(`${message.guild.id}.json`, message.guild.toString(), console.error)
		message.reply("Here's the info for this guild.", { files: [`${message.guild.id}.json`] })
		filesys.unlink(`${message.guild.id}.json`, console.error)
	}
}

export default guild_info as Command
