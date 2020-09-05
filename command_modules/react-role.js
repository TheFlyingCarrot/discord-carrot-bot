const team_discord = require('../guilds/cgw_discord.json')

module.exports = {
	enabled: true,
	canToggle: true,
	name: 'react-roles',
	aliases: ['reactroles', 'react-role'],
	usage: '[message]',
	args: true,
	description: 'Message the admins.',
	cooldown: 10,
	guildOnly: true,
	developerOnly: true,
	execute(dataTable) {
		// eslint-disable-next-line no-unused-vars
		const { client, message, args, templateEmbed } = dataTable
		if (team_discord.role_categories.includes(args[0])) {
			const newEmbed = templateEmbed
				.setTitle(`${args[0].toUpperCase()} ROLES`)
			for (const reaction_role of Object.values(team_discord.reaction_roles)) {
				if (reaction_role.category == args[0].toLowerCase()) {
					newEmbed.addField(reaction_role.emoji_tag, reaction_role.name)
				}
			}
			message.channel.send(newEmbed)
		} else {
			message.channel.send(`${message.author}, please provide valid arguments for \`${this.name}\`.`)
		}
	},
}