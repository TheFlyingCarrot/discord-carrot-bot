import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const assignRole = require('../helper_modules/assign_role').default
const cleanseOldVIPRoles = require('../helper_modules/cleanse_old_vip_roles')
const { max_role_name_length } = require('../config.json')
const HexColorRegExp = /^[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?$/iu

async function createRole(guild: any, roleColor: string, roleName: string, reason: string) {
  new Promise((resolve, reject) => {
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
  guildSpecific: ['442001192655257620'],
  execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean) {
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
	}
}

export default custom_role as Command
