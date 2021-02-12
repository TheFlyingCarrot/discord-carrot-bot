import { ClientModules, Command } from '../internal.js'

const ban: Command = {
	name: 'ban',
	description: 'Ban a user.',
	enabled: true,
	toggleable: true,

	usage: '[user mention]',
	args: true,
	cooldown: 10,

	guildOnly: true,
	permission: 'BAN_MEMBERS',

	execute ({ message }) {
		const targetUser = message.mentions.members.first()
		if (!targetUser.bannable) {
			message.reply('I can\'t ban that user.')
			throw new Error('PermissionsError')
		}
		targetUser.ban({ reason: `Banned by: ${message.author.tag}` })
			.then(() => {
				ClientModules.logEvent(message.guild, `${message.author} banned ${targetUser}.`)
				setTimeout(() => {
					if (message.deletable) message.delete({ reason: 'Ban command.' })
				}, 1250)
			})
			.catch(console.error)
	}
}

export default ban as Command
