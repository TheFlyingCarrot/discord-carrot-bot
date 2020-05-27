module.exports = {
	enabled: true,
	can_toggle: true,
	name: 'slowmode',
	aliases: ['slow'],
	usage: '(duration in seconds)',
	description: 'Enable slow-mode in the current channel.',
	cooldown: 10,
	guildOnly: true,
	permission: 'MANAGE_CHANNELS',
	execute(itemTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = itemTable
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {
			message.channel.send(`${message.author}, you do not have permission to use that command.`)
			return null
		}
		const channel = message.channel
		if (channel.rateLimitPerUser > 0) {
			channel.edit({ rateLimitPerUser: 0 })
				.then(() => {
					message.channel.send(`${message.author}, slow-mode was disabled in this channel.`)
				})
				.catch((err) => {
					message.channel.send(`${message.author}, there was an error executing that command. ${err}`)
				})
		} else {
			const rateLimit = args[0] ? args[0] : 5
			channel.edit({ rateLimitPerUser: rateLimit })
				.then(() => {
					message.channel.send(`${message.author}, slow-mode was enabled in this channel for ${rateLimit} seconds per user.`)
				})
				.catch((err) => {
					message.channel.send(`${message.author}, there was an error executing that command. ${err}`)
				})
		}
	},
}