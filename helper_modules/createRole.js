const { max_role_name_length } = require('./config.json')
const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/i

exports.createRole = (guild, roleColor, roleName, reason) => {
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
			reason: reason,
		}))
	})
}
