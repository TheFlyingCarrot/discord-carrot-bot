import { TeamDiscord } from '../guilds/750480529765171302.js'
import { DiscordJS, isValidReaction } from '../internal'
import { ReactionRole } from '../typings'

export async function onMessageReactionRemove (messageReaction: DiscordJS.MessageReaction, user: DiscordJS.User): Promise<void> {
	if (!isValidReaction(messageReaction, user)) return

	const { guild } = messageReaction.message
	// Message most likely originates from a Direct Message, no implementation.
	if (!guild) return
	if (!guild.available) throw new Error('Guild not available.')

	if (guild.id == TeamDiscord.guild_id) {
		const reactionRole: ReactionRole = TeamDiscord.reaction_roles.find((role) => role.emoji_tag == messageReaction.emoji.toString())
		if (!reactionRole) return

		new Promise((resolve) => resolve(guild.roles.fetch(reactionRole.role_id)))
			.then((desiredRole: DiscordJS.Role) => {
				guild.member(user).roles.remove(desiredRole, 'Sub-team removal.')
			})
			.catch((error) => console.error(error))
	}
}
