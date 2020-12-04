import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const mod_mail: Command = {
	name: 'mod-mail',
	description: 'Message the admins.',
	enabled: true,
	toggleable: true,

	aliases: ['mm', 'modmail', 'admin-mail', 'adminmail'],
	usage: '[message]',
	args: true,
	cooldown: 45,
	guildOnly: true,

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		const { guild } = message
		if (!guild.available) console.error('[mod-mail.ts] [Error] Guild not available:', guild)
		const { publicUpdatesChannel } = guild
		if (!publicUpdatesChannel) console.error('[mod-mail.ts] [Error] publicUpdatesChannel does not exist:', guild)

		const modMail = args.join(' ')

		try {
			message.delete({ reason: 'Mod-mail.' })
			publicUpdatesChannel.send(`${message.author} sent:\n'${modMail}'`)
		} catch (error) {
			console.error(error)
		}
	}
}

export default mod_mail as Command
