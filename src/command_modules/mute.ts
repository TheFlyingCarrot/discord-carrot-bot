import { Command } from '../internal.js'

const mute: Command = {
	name: 'mute',
	description: 'Mute a user.',
	enabled: true,
	toggleable: true,

	execute ({ args, message }): void {
		const targetUser = message.mentions.members.first()
		args.pop()

		targetUser.roles.add('Muted', args.join(' '))

		message.reply(`${targetUser.user.tag} was muted.`)
			.then((sentMessage) => {
				setTimeout(() => {
					if (sentMessage.deletable) sentMessage.delete({ reason: 'Mute command.' })
					if (message.deletable) message.delete({ reason: 'Mute command.' })
				}, 2500)
			})
	}
}

export default mute as Command