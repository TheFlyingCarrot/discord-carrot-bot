const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/i
const { personal_role_id, max_role_name_length } = require('../helper_modules/config.json')

function assignRole(guildMember, role) {
	guildMember.roles.add(role, 'New VIP role.')
}

function createRole(guild, roleColor, roleName) {
	return new Promise(resolve => {
		if (roleName.length > max_role_name_length) throw 'StringLengthError'
		if (!HexColorRegExp.test(`${roleColor.replace('#', '')}`)) throw 'RoleColorError'
		resolve(guild.roles.create({
			data: {
				name: roleName,
				color: roleColor,
				mentionable: true,
				permissions: 0,
			},
			reason: 'New VIP role.',
		}))
	})
}

function cleanseOldRoles(guild, guildMember) {
	guild.roles.fetch(personal_role_id)
		.then(personal_role => {
			guildMember.roles.cache.forEach(existingRole => {
				if ((existingRole.id !== guild.roles.everyone.id) && (existingRole.position < personal_role.position)) {
					existingRole.delete(existingRole, 'Old VIP role.')
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
			createRole(guild, roleColor, roleName)
				.then(newRole => {
					message.channel.send(`${message.author}, your new role was created and has been assigned.`)
					cleanseOldRoles(guild, guildMember)
					assignRole(guildMember, newRole)
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
