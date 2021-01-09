import { connect } from 'http2'
import { Command, Config } from '../internal.js'

const mute: Command = {
	name: 'mute',
	description: 'Mute a user.',
	enabled: true,
	toggleable: true,

	execute ({ args, message }): void {
		const targetUser = message.mentions.members.first()
		args.pop()

		if (!Config.muted_role_ids[message.guild.id]) {
			message.reply('There is no configured muted role for this server.')
			return
		}
		const mutedRoleID = Config.muted_role_ids[message.guild.id].muted_role_ids

		const mutedRole = message.guild.roles.cache.find((role) => role.id === mutedRoleID)
		console.log(mutedRole)
		if (!mutedRole) return

		targetUser.roles.add(mutedRole, args.join(' '))
			.catch(console.error)

		message.reply(`${targetUser.user.tag} was muted.`)
			.then((sentMessage) => {
				setTimeout(() => {
					if (sentMessage.deletable) sentMessage.delete({ reason: 'Mute command.' })
					if (message.deletable) message.delete({ reason: 'Mute command.' })
				}, 1250)
			})
			.catch(console.error)
	}
}

export default mute as Command