const HexColorRegExp = /^#[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/i
const { personal_role_id } = require('../helper_modules/config.json')

function assignRole(guildMember, role) {
	guildMember.roles.add(role, 'New VIP role.')
}

function createRole(guild, roleColor, roleName) {
	return new Promise(resolve => {
		if (roleName.length > 64) throw new Error('StringLengthError')
		if (!HexColorRegExp.test(`${roleColor}`)) throw new Error('RoleColorError')
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
	can_toggle: true,
	name: 'custom-role',
	aliases: ['customrole', 'crole', 'cr'],
	usage: '#[hex color] [role name]',
	description: 'Set a custom role.',
	cooldown: 10,
	guildOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		const guild = message.guild; if (!guild.available) throw new Error('Guild not available.')
		const guildMember = guild.member(message.author)
		const roleColor = args.shift()
		const roleName = args.join(' ')

		cleanseOldRoles(guild, guildMember)
		createRole(guild, roleColor, roleName)
			.then(newRole => {
				message.channel.send(`${message.author}, your new role was created and has been assigned.`)
				assignRole(guildMember, newRole)
			})
			.catch(error => {
				console.error(error)
				message.channel.send(`${message.author}, something went wrong when creating your role.`)
			})
	},
}