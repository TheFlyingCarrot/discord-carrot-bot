module.exports = {
	name: 'ban',
    usage: '[user mention]',
    args: true,
    description: 'Ban a user.',
    cooldown: 30,
	guildOnly: true,
	permission: 'BAN_MEMBERS',
	execute(message) {
        if (!message.member.hasPermission(`${this.permission}`, false, true, true)) {return message.reply('you do not have permission to use this command.')}
        if (!message.mentions.members.size) {return message.reply('you must tag a user.')}
        const targetUser = message.mentions.members.first()
        if (!targetUser.bannable) {return message.reply('I cannot ban this user.')}
        targetUser.ban().then(() => {
			message.reply(`${targetUser} was banned.`)
		}).catch((error) => {
			message.reply(`${targetUser} was not banned. ${error}`)
		})
	},
}