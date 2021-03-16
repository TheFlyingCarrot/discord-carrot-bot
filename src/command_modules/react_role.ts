import { TeamDiscord } from '../guilds/750480529765171302.js'
import { DiscordJS } from '../internal'
import { Command, ReactionRole } from '../typings'

const reactRole: Command = {
	name: 'reactrole',
	description: 'Add a message for reaction roles.',
	enabled: true,
	toggleable: true,

	aliases: ['react-role', 'reactroles', 'react-roles'],

	developer_only: true,

	execute ({ args, message }) {
		const desiredRoleCategory = args.shift()
		if (TeamDiscord.role_categories.includes(desiredRoleCategory)) {
			const newEmbed = new DiscordJS.MessageEmbed()
			newEmbed.setTitle(`${desiredRoleCategory.toUpperCase()} ROLES`)
			let ReactionRole: ReactionRole
			for (ReactionRole of Object.values(TeamDiscord.reaction_roles)) {
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
