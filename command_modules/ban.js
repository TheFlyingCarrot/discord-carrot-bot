module.exports = {
	name: 'ban',
	usage: '[user mention]',
	args: true,
	description: 'Ban a user.',
	cooldown: 30,
	guildOnly: true,
	permission: 'BAN_MEMBERS',
	requiredRole: ['admin'],
	execute(message) {
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) return { title: 'Command Error', body: 'You do not have permission to use this command.' }
		if (!message.mentions.members.size) return { title: 'Command Error', body: 'You must tag a user.' }
		const targetUser = message.mentions.members.first()
		if (!targetUser.bannable) return { title: 'Command Error', body: 'I can\'t ban that user.' }
		targetUser.ban().then(() => {
			return { title: 'Command Success', body: `${targetUser} was banned.` }
		}).catch((err) => {
			return { title: 'Command Fail', body: `${targetUser} was not banned. ${err}` }
		})
	},
}