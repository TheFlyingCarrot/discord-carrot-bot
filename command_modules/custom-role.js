const { personal_role_id, max_role_name_length } = require('../helper_modules/config.json')
const { assignRole } = require('../helper_modules/assignRole')
const { createRole } = require('../helper_modules/createRole')

function cleanseOldVIPRoles(guild, guildMember, reason) {
	guild.roles.fetch(personal_role_id)
		.then(personal_role => {
			guildMember.roles.cache.forEach(existingRole => {
				if ((existingRole.id !== guild.roles.everyone.id) && (existingRole.position < personal_role.position)) {
					existingRole.delete(existingRole, reason)
				}
			})
		})
}

module.exports = {
	enabled: true,
	canToggle: true,
	name: 'custom-role',
	aliases: ['customrole', 'crole', 'cr'],
	usage: '[hex color] [role name]',
	args: true,
	description: 'Set a custom role.',
	cooldown: 10,
	guildOnly: true,
	guildSpecific: ['442001192655257620'],
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const guild = message.guild; if (!guild.available) throw new Error('Guild not available.')
		const guildMember = guild.member(message.author)
		const roleColor = args.shift()
		const roleName = args.join(' ')

		if ((!roleColor) || (!roleName)) {
			message.channel.send(`${message.author}, you must provide proper arguments.`)
		} else {
			createRole(guild, roleColor, roleName, 'New VIP role.')
				.then(newRole => {
					message.channel.send(`${message.author}, your new role was created and has been assigned.`)
					cleanseOldVIPRoles(guild, guildMember, 'Old VIP role.')
					assignRole(guildMember, newRole, 'New VIP role.')
				})
				.catch(error => {
					if (error == 'StringLengthError') {
						message.channel.send(`${message.author}, your role name cannot be exceed ${max_role_name_length} characters.`)
					} else if (error == 'RoleColorError') {
						message.channel.send(`${message.author}, you provided an invalid role color.`)
					} else {
						console.error(error)
					}
				})
		}
	},
}
