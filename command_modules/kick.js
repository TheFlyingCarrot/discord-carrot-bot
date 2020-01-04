module.exports = {
	name: 'kick',
	usage: '[user mention]',
	args: true,
	description: 'Kick a user.',
	cooldown: 10,
	guildOnly: true,
	permission: 'KICK_MEMBERS',
	requiredRole: ['admin', 'mod'],
	execute(message) {
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) return { title: 'Command Error', body: 'You do not have permission to use this command.' }
		if (!message.mentions.members.size) return { title: 'Command Error', body: 'You must tag a user.' }
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) return { title: 'Command Error', body: 'I can\'t kick that user.' }
		targetUser.kick().then(() => {
			return { title: 'Command Success', body: `${targetUser} was kicked.` }
		}).catch((err) => {
			return { title: 'Command Fail', body: `${targetUser} was not kicked. ${err}` }
		})
	},
}