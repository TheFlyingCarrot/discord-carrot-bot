const fs = require('fs')
module.exports = {
	name: 'moderator',
	aliases: ['mod'],
	usage: '[grant/role] [user (id/mention)/role (id/mention)]',
	args: true,
	description: 'Grant a user permission to use this bot with limited permissions.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	execute(message, args) {
		const guild = message.guild
		const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
		if (!guildFile) {
			return message.reply('your guild does not have a file! Please contact my developer.')
		}
		if (args[0] === 'role') {
			let targetRoleID = null
			if ((args[1].startsWith('<@&')) && (args[1].endsWith('>'))) {
				targetRoleID = args[1].slice(3, -1)
			} else if (/^\d+$/.test(args[1])) {
				targetRoleID = args[1]
			}
			if (targetRoleID) {
				const targetRole = guild.roles.find(role => role.id === targetRoleID)
				guildFile.modRoleID = targetRole.id
				fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(guildFile), 'utf-8')
				message.reply(`moderator role set to: ${targetRole.name}`)
			} else {
				message.reply('you didn\'t provide me with a role.')
			}
		} else if (args[0] !== 'role') {
			let targetMember = null
			if (args[0] === 'grant') {
				if (/^\d+$/.test(args[1])) {
					targetMember = guild.members.find(member => member.id === args[1])
				} else if ((args[1].startsWith('<@!')) && (args[1].endsWith('>'))) {
					targetMember = message.mentions.members.first()
				}
			} else if ((args[0].startsWith('<@!')) && (args[0].endsWith('>'))) {
				targetMember = message.mentions.members.first()
			}
			try {
				if (targetMember && (guildFile.modRoleID)) {
					targetMember.addRole(guildFile.modRoleID)
					.then(message.reply(`granted ${message.mentions.members.first()} the administrator role.`))
				} else if (targetMember && (!guildFile.modRoleID)) {
					message.reply(`I could not grant ${message.mentions.members.first()} the administrator role because you do not have one set.`)
				} else {
					message.reply('I experienced an unknown error when trying to run that command. Please contact my developer.')
				}
			} catch(err) {
				console.log(err)
			}
		} else {
			message.reply('please use the help command to see usage for this command.')
		}
	},
}