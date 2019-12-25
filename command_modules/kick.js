module.exports = {
	name: 'kick',
    usage: '[user mention]',
	args: true,
	description: 'Kick a user.',
	cooldown: 10,
	guildOnly: true,
	permission: 'KICK_MEMBERS',
	execute(message) {
		if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {return message.reply('you do not have permission to use this command.')}
		if (!message.mentions.members.size) {return message.reply('you must tag a user.')}
		const targetUser = message.mentions.members.first()
		if (!targetUser.kickable) {return message.reply('I cannot kick this user.')}
		targetUser.kick().then(() => {
			message.reply(`${targetUser} was kicked.`)
		}).catch((error) => {
			message.reply(`${targetUser} was not kicked. ${error}`)
		})
	},
}