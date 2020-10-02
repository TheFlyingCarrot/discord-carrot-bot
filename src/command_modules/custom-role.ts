/* import { Command } from "discord.js"
import assignRole from '../helper_modules/assign_role'
import createRole from '../helper_modules/create_role'
import cleanseOldVIPRoles from '../helper_modules/cleanse_old_vip_roles' */

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
	async execute ({ message, args }) {
		// eslint-disable-next-line no-unused-vars
		const { guild } = message
		if (!guild.available) throw new Error('Guild not available.')
		const guildMember = guild.member(message.author)
		const roleColor = args.shift()
		const roleName = args.join(' ')

		if (!roleColor || !roleName) {
			message.channel.send(`${message.author}, you must provide proper arguments.`)
		} else {
			try {
				const newRole = createRole(guild, roleColor, roleName, 'New VIP role.')
				cleanseOldVIPRoles(guild, guildMember, 'Old VIP role.')
				assignRole(guildMember, newRole, 'New VIP role.')
			} catch (err) {
				if (err == 'StringLengthError') {
					message.channel.send(`${message.author}, your role name cannot be exceed ${max_role_name_length} characters.`)
				} else if (err == 'RoleColorError') {
					message.channel.send(`${message.author}, you provided an invalid role color.`)
				} else {
					return err
				}
			}
		}

		return null
	}
}
