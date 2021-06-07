import { Command } from '../typings'

const slowMode: Command = {
	name: 'slowmode',
	description: 'Enable slow-mode in the current channel.',
	enabled: true,
	toggleable: true,

	aliases: ['slow-mode'],
	usage: '(duration in seconds)',
	cooldown: 10,

	guild_only: true,

	permission: 'MANAGE_CHANNELS',

	async execute ({ args, message }) {
		if (message.channel.type == 'dm' || message.channel.type == 'news') return
		if (message.channel.rateLimitPerUser > 0) {
			await message.channel.edit({ rateLimitPerUser: 0 })
			message.reply('Slow-mode was disabled in this channel.')
		} else {
			const rateLimit = args.length ? parseInt(args.shift()) : 5
			await message.channel.edit({ rateLimitPerUser: rateLimit })
			message.reply(`Slow-mode was enabled in this channel. Rate limit per user: ${rateLimit} seconds.`)
		}
	}
}

export default slowMode as Command
