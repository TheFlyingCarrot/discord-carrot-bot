module.exports = {
	enabled: true,
	canToggle: true,
	name: 'mute',
	args: true,
	description: 'Set a custom role.',
	cooldown: 10,
	guildOnly: true,
	guildSpecific: ['442001192655257620', '750480529765171302'],
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