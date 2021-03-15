import { config, createRole, DiscordJS } from '../internal'
import { Command } from '../typings'

export const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/iu

async function clearVIPRoles (guild: DiscordJS.Guild, guildMember: DiscordJS.GuildMember, reason: string) {
	const personalRole = await guild.roles.fetch(config.personal_role_ids[guild.id]['personal_role_id'])
	guildMember.roles.cache.forEach((existingRole: DiscordJS.Role) => {
		if (existingRole.id !== guild.roles.everyone.id && existingRole.position < personalRole.position) {
			existingRole.delete(reason)
		}
	})
}

const customRole: Command = {
	name: 'customrole',
	description: 'Set a custom role.',
	enabled: true,
	toggleable: true,

	aliases: ['custom-role', 'crole', 'cr'],
	usage: '[hex color] [role name]',
	args: true,
	cooldown: 10,

	guild_only: true,
	guildSpecific: ['442001192655257620', '701622386163712001'],

	async execute ({ args, message }) {
		const { guild } = message
		if (!guild.available) throw new Error('Guild not available.')
		const guildMember = guild.member(message.author)
		const roleColor = args.shift()
		const roleName = args.join(' ')

		try {
			await clearVIPRoles(guild, guildMember, 'Old VIP role.')
			await createRole(guild, roleColor, roleName, 'New VIP role.')
				.then((newRole) => {
					guildMember.roles.add(newRole, 'New VIP role.')
					message.reply(`Custom role created and assigned! ${newRole}`)
				})
				.catch(console.error)
		} catch (error) {
			if (error == 'StringLengthError') {
				message.reply(`Your role name cannot be exceed ${config.maximum_role_name_length} characters.`)
			} else if (error == 'RoleColorError') {
				message.reply('You provided an invalid role color.')
			} else {
				console.error(error)
			}
		}
	}
}

export default customRole as Command
