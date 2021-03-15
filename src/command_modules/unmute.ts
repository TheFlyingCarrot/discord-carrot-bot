import { config } from '../internal'
import { Command } from '../typings'

const unmute: Command = {
	name: 'unmute',
	description: 'Unmute a user.',
	enabled: true,
	toggleable: true,

	execute ({ args, message }): void {
		const targetUser = message.mentions.members.first()
		args.shift()

		if (!config.muted_role_ids[message.guild.id]) {
			message.reply('There is no configured muted role for this server.')
				.then((sentMessage) => {
					setTimeout(() => {
						if (sentMessage.deletable) sentMessage.delete({ reason: 'Unmute command. | Invalid.' })
						if (message.deletable) message.delete({ reason: 'Unmute command. | Invalid.' })
					}, 1250)
				})
			return
		}
		const mutedRoleID: string = config.muted_role_ids.get[message.guild.id] ?? '-1'

		const mutedRole = message.guild.roles.cache.find((role) => role.id === mutedRoleID)
		if (!mutedRole) return

		targetUser.roles.remove(mutedRole, args.join(' '))
			.catch(console.error)

		message.reply(`${targetUser.user.tag} was unmuted.`)
			.then((sentMessage) => {
				setTimeout(() => {
					if (sentMessage.deletable) sentMessage.delete({ reason: 'Unmute command.' })
					if (message.deletable) message.delete({ reason: 'Unmute command.' })
				}, 1250)
			})
			.catch(console.error)
	}
}

export default unmute as Command