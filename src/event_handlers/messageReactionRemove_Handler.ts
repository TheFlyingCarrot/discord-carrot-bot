import TeamDiscord from '../guilds/750480529765171302.json'
import { client, isValidReaction, ReactionRole, Discord } from '../internal.js'

export async function handleMessageReactionRemove (messageReaction: Discord.MessageReaction, user: Discord.User): Promise<void> {
	if (!isValidReaction(messageReaction, user)) return

	if (client.events.messageReactionRemove === false) return

	const { guild } = messageReaction.message

	if (!guild.available) {
		console.error('[Reaction Handler] [Error] Guild not available:', guild)
		return
	}

	if (guild.id == TeamDiscord.guild_id) {
		const reactionRole: ReactionRole = TeamDiscord.reaction_roles.find((role) => role.emoji_tag == messageReaction.emoji.toString())
		if (!reactionRole) return

		new Promise((resolve) => resolve(guild.roles.fetch(reactionRole.role_id)))
			.then((desiredRole: Discord.Role) => {
				guild.member(user).roles.remove(desiredRole, 'Sub-team removal.')
			})
			.catch((error) => console.error(error))
	}
}
