import { Command, Discord, fs } from '../internal.js'

const guild_info: Command = {
	name: 'guild-info',
	description: 'Generate a JSON list of information for a server.',
	enabled: true,
	toggleable: true,

	aliases: ['guildinfo'],

	guildOnly: true,

	developerOnly: true,

	async execute ({ message }: { client: Discord.Client, message: Discord.Message, args: string[] }): Promise<void> {
		const data = JSON.stringify(message.guild, null, '	')
		const filename = `${message.guild.id}.json`

		fs.writeFileSync(filename, data)
		message.reply("Here's the info for this guild.", { files: [filename] })
		setTimeout(() => {
			if (fs.existsSync(filename)) fs.unlinkSync(filename)
		}, 1000)
		
	}
}

export default guild_info as Command
