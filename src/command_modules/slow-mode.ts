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

	async execute ({ message, args }) {
		if (message.channel.type == 'dm' || message.channel.type == 'news') return
		if (message.channel.rateLimitPerUser > 0) {
			await message.channel.edit({ rateLimitPerUser: 0 })
					message.reply('Slow-mode was disabled in this channel.')
		} else {
			const rateLimit: number = parseInt(args[0]) ? parseInt(args[0]) : 5
			await message.channel.edit({ rateLimitPerUser: rateLimit })
			message.reply(`Slow-mode was enabled in this channel for ${rateLimit} seconds per user.`)
		}
	}
}

export default slow_mode as Command
