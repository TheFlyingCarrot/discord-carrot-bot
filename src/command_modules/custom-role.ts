import { Command, Discord, Config } from '../internal.js'

const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/iu

// eslint-disable-next-line require-await
async function createRole (guild: any, roleColor: string, roleName: string, reason: string): Promise<Discord.Role> {
	return new Promise((resolve, reject) => {
		if (roleName.length > Config.max_role_name_length) {
			reject(Error('StringLengthError'))
		} else if (!HexColorRegExp.test(`${roleColor.replace('#', '')}`)) {
			reject(Error('RoleColorError'))
		} else {
			resolve(guild.roles.create({
				data: {
					name: roleName,
					color: roleColor,
					mentionable: true,
					permissions: 0
				},
				reason
			}))
		}
	})
}

async function clearVIPRoles (guild: any, guildMember: any, reason: string) {
	const personalRole = await guild.roles.fetch(Config.personal_role_ids[guild.id]['personal_role_id'])
	await guildMember.roles.cache.forEach((existingRole: { id: any, position: number, delete: (arg0: any, arg1: string) => void }) => {
		if (existingRole.id !== guild.roles.everyone.id && existingRole.position < personalRole.position) {
			existingRole.delete(existingRole, reason)
		}
	})
}

const custom_role: Command = {
	name: 'custom-role',
	description: 'Set a custom role.',
	enabled: true,
	toggleable: true,

	aliases: ['customrole', 'crole', 'cr'],
	usage: '[hex color] [role name]',
	args: true,
	cooldown: 10,

	guildOnly: true,
	guildSpecific: ['442001192655257620', '701622386163712001'],

	async execute ({ message, args }: { client: Discord.Client, message: Discord.Message, args: string[] }): Promise<void> {
		const { guild } = message
		if (!guild.available) throw new Error('Guild not available.')
		const guildMember = guild.member(message.author)
		const roleColor = args.shift()
		const roleName = args.join(' ')

		try {
			await clearVIPRoles(guild, guildMember, 'Old VIP role.')
			await createRole(guild, roleColor, roleName, 'New VIP role.')
				.then((new_role) => {
					guildMember.roles.add(new_role, 'New VIP role.')
					message.reply(`Custom role created and assigned! ${new_role}`)
				})
				.catch(console.error)
		} catch (error) {
			if (error == 'StringLengthError') {
				message.reply(`Your role name cannot be exceed ${Config.max_role_name_length} characters.`)
			} else if (error == 'RoleColorError') {
				message.reply('You provided an invalid role color.')
			} else {
				console.error(error)
			}
		}
	}
}

export default custom_role as Command
