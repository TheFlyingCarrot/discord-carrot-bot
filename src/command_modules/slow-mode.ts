import { Command } from '../internal.js'

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

	execute ({ message, args }) {
		if (!message.member.hasPermission(this.permission, { checkAdmin: true, checkOwner: true })) {
			message.reply('You do not have permission to use that command.')
			return
		}
		if (message.channel.type == 'dm' || message.channel.type == 'news') return
		if (message.channel.rateLimitPerUser > 0) {
			message.channel.edit({ rateLimitPerUser: 0 })
				.then(() => {
					message.reply('Slow-mode was disabled in this channel.')
				})
				.catch((error) => {
					message.reply('There was an error executing that command.')
					console.error(error)
				})
		} else {
			const rateLimit: number = parseInt(args[0], 10) ? parseInt(args[0], 10) : 5
			message.channel.edit({ rateLimitPerUser: rateLimit })
				.then(() => {
					message.reply(`Slow-mode was enabled in this channel for ${rateLimit} seconds per user.`)
				})
				.catch((error) => {
					message.reply('There was an error executing that command.')
					console.error(error)
				})
		}
	}
}

export default slow_mode as Command
