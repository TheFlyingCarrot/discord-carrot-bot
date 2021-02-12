import { ClientModules, Command } from '../internal.js'

const kick: Command = {
	name: 'kick',
	description: 'Kick a user.',
	enabled: true,
	toggleable: true,

	usage: '[user mention]',
	args: true,
	cooldown: 10,

	guildOnly: true,
	permission: 'KICK_MEMBERS',

	execute ({ message }) {
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) {
			message.reply('I can\'t kick that user.')
			throw new Error('PermissionsError')
		}
		targetUser.kick(`Kicked by: ${message.author.tag}`)
			.then(() => {
				ClientModules.logEvent(message.guild, `${message.author} kicked ${targetUser}.`)
				setTimeout(() => {
					if (message.deletable) message.delete({ reason: 'Kick command.' })
				}, 1250)
			})
			.catch(console.error)
	}
}

export default kick as Command
