const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/iu

const createRole = new Promise((resolve, reject) => (guild: any, roleColor: string, roleName: string, reason: string) => {
	if (roleName.length > max_role_name_length) {
		reject('StringLengthError')
	} else if (!HexColorRegExp.test(`${roleColor.replace('#', '')}`)) {
		reject('RoleColorError')
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
}) as Object as typeof Function


/* export function createRole (guild: any, roleColor: string, roleName: string, reason: string) {
	new Promise((resolve, reject) => {
		if (roleName.length > config.max_role_name_length) {
			reject('StringLengthError')
		} else if (!HexColorRegExp.test(`${roleColor.replace('#', '')}`)) {
			reject('RoleColorError')
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
} */
