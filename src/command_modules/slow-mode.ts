import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const slow_mode: Command = {
	name: 'slow-mode',
	description: 'Enable slow-mode in the current channel.',
	enabled: true,
	toggleable: true,

	aliases: ['slownode', 'slow'],
	usage: '(duration in seconds)',
	cooldown: 10,
	guildOnly: true,
	permission: 'MANAGE_CHANNELS',

	execute ({ client, message, args }: { client: Client, message: Message, args: string[] }): void {
		if (!message.member.hasPermission(this.permission, { checkAdmin: true, checkOwner: true })) {
			message.reply('You do not have permission to use that command.')
			return null
		}
		if (message.channel.type == 'dm' || message.channel.type == 'news') return null
		if (message.channel.rateLimitPerUser > 0) {
			message.channel.edit({ rateLimitPerUser: 0 })
				.then(() => {
					message.reply('Slow-mode was disabled in this channel.')
				})
				.catch((error) => {
					message.reply('There was an error executing that command.')
					return error
				})
		} else {
			const rateLimit: number = parseInt(args[0], 10) ? parseInt(args[0], 10) : 5
			message.channel.edit({ rateLimitPerUser: rateLimit })
				.then(() => {
					message.reply(`Slow-mode was enabled in this channel for ${rateLimit} seconds per user.`)
				})
				.catch((error) => {
					message.reply('There was an error executing that command.')
					return error
				})
		}
	}
}

export default slow_mode as Command
