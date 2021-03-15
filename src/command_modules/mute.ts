import { config, logToGuild as logToGuild } from '../internal'
import { Command } from '../typings'

const mute: Command = {
	name: 'mute',
	description: 'Mute a user.',
	enabled: true,
	toggleable: true,

	execute ({ args, message }): void {
		const targetUser = message.mentions.members.first()
		args.shift()

		if (!config.muted_role_ids[message.guild.id]) {
			message.reply('There is no configured muted role for this server.')
			return
		}
		const mutedRoleID: string = config.muted_role_ids[message.guild.id] ?? '-1'

		const mutedRole = message.guild.roles.cache.find((role) => role.id === mutedRoleID)
		if (!mutedRole) return

		targetUser.roles.add(mutedRole, args.join(' '))
			.catch(console.error)

		message.reply(`${targetUser.user.tag} was muted.`)
			.then((sentMessage) => {
				logToGuild(message.guild, `${message.author} muted ${targetUser}.`)
				setTimeout(() => {
					if (sentMessage.deletable) sentMessage.delete({ reason: 'Mute command.' })
					if (message.deletable) message.delete({ reason: 'Mute command.' })
				}, 1250)
			})
			.catch(console.error)
	}
}

export default mute as Command