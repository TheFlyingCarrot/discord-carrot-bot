import { config, DiscordJS } from '../internal'
import { HexColorRegExp } from '../command_modules/custom_role'

export async function createRole (guild: DiscordJS.Guild, roleColor: string, roleName: string, reason: string): Promise<DiscordJS.Role> {
	return new Promise((resolve, reject) => {
		if (roleName.length > config.maximum_role_name_length) {
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
