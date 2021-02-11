import { Command, Discord } from '../internal.js'

import team_discord from '../guilds/750480529765171302.json'
import { ReactionRole } from '../typings.js'

const reactRole: Command = {
	name: 'reactrole',
	description: 'Add a message for reaction roles.',
	enabled: true,
	toggleable: true,

	aliases: ['react-role', 'reactroles', 'react-roles'],

	developerOnly: true,

	execute ({ args, message }) {
		const desiredRoleCategory = args.pop()
		if (team_discord.role_categories.includes(desiredRoleCategory)) {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setTitle(`${desiredRoleCategory.toUpperCase()} ROLES`)
			let ReactionRole: ReactionRole
			for (ReactionRole of Object.values(team_discord.reaction_roles)) {
				if (ReactionRole.category === desiredRoleCategory.toLowerCase()) {
					newEmbed.addField(ReactionRole.emoji_tag, ReactionRole.name)
				}
			}
			message.reply(newEmbed)
		} else {
			message.reply(`Please provide valid arguments for \`${this.name}\`.`)
		}
	}
}

export default reactRole as Command
