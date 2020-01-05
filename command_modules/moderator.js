const fs = require('fs')
module.exports = {
	name: 'moderator',
	aliases: ['mod'],
	usage: '[grant/role] [user (id/mention)/role (id/mention)]',
	args: true,
	description: 'Grant a user permission to use limited commands.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	execute(itemTable) {
		const { client, message, args, templateEmbed } = itemTable
		const guild = message.guild
		const guildFile = JSON.parse(fs.readFileSync(`./guilds/${guild.id}.json`))
		if (!guildFile) {
			message.reply('your guild does not have a file! Please contact my developer.')
			return null
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
				if (targetRole) {
					guildFile.adminRoleID = targetRole.id
					fs.writeFileSync(`./guilds/${guild.id}.json`, JSON.stringify(guildFile), 'utf-8')
					message.reply(`${this.name} role set to: ${targetRole.name}`)
					return null
				} else {
					message.reply(`I could not find a role with an ID that matches: ${targetRoleID}`)
					return null
				}
			} else {
				message.reply('you didn\'t provide me with a role.')
				return null
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
			try {
				if (targetMember && (guildFile.modRoleID)) {
					targetMember.addRole(guildFile.modRoleID)
					message.reply(`granted ${message.mentions.members.first()} the ${this.name} role.`)
					return null
				} else if (targetMember && (!guildFile.modRoleID)) {
					message.reply(`I could not grant ${message.mentions.members.first()} the ${this.name} role because you do not have one set.`)
					return null
				} else if (!targetMember && (guildFile.modRoleID)) {
					message.reply(`you didn't give me a member to assign the ${this.name} role to, but your guild does have a ${this.name} role ID.`)
					return null
				} else {
					message.reply('I can\'t process that argument.')
					return null
				}
			} catch(err) {
				console.log(err)
			}
		} else {
			message.reply('please use the help command to see usage for this command.')
			return null
		}
	},
}