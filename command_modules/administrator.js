const fs = require('fs')
module.exports = {
	name: 'administrator',
	aliases: ['admin'],
    usage: '[grant/role] [user (id/mention)/role (id/mention)]',
	args: true,
	description: 'Grant a user permission to use this bot with elevated permissions.',
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
				guildFile.adminRoleID = targetRole.id
				fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(guildFile), 'utf-8')
				message.reply(`administrator role set to: ${targetRole.name}`)
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
			} else if (/^\d+$/.test(args[0])) {
				targetMember = guild.members.find(member => member.id === args[0])
			}

			if (targetMember && (guildFile.adminRoleID)) {
				targetMember.addRole(guildFile.adminRoleID)
				.then(message.reply(`granted ${targetMember} the administrator role.`))
				.catch(console.error)
			} else if (targetMember && (!guildFile.adminRoleID)) {
				message.reply(`I could not grant ${targetMember} the administrator role because you do not have one set.`)
				.catch(console.error)
			} else if (!targetMember && (guildFile.adminRoleID)) {
				message.reply('You didn\'t give me a member to assign the administrator role to, but your guild does have a admin role ID.')
				.catch(console.error)
			} else {
				message.reply('I experienced an unknown error when trying to run that command. Please contact my developer.')
				.catch(console.error)
			}
		} else {
			message.reply('please use the help command to see usage for this command.')
		}
	},
}