import Discord, { Role } from '../internal.js'
import { ExtendedClient, ReactionRole } from '../typings.js'
import TeamDiscord from '../guilds/750480529765171302.json'

async function fetchPartial (partial) {
	try {
		await partial.fetch()
	} catch (error) {
		console.error(error)
		return null
	}
	return partial
}

export async function handleMessageReaction (client: ExtendedClient, reaction: Discord.MessageReaction, user: Discord.User, operation: string): Promise<void> {
	if (reaction.partial) await fetchPartial(reaction)
	if (user.partial) await fetchPartial(user)

	if (reaction.message.channel.type == 'dm') return
	if (reaction.message.channel.name != 'role-request') return
	if (reaction.message && reaction.message.author && !reaction.message.author.equals(client.user)) return

	const { guild } = reaction.message

	if (!guild.available) {
		console.error('[Reaction Handler] [Error] Guild not available:', guild)
		return
	}

	if (guild.id == TeamDiscord.guild_id) {
		const reactionRole: ReactionRole = TeamDiscord.reaction_roles.find((role) => role.emoji_tag == reaction.emoji.toString())
		if (!reactionRole) return

		new Promise((resolve) => resolve(guild.roles.fetch(reactionRole.role_id)))
			.then((desiredRole: Role) => {
				if (operation === 'messageReactionAdd') {
					guild.member(user).roles.add(desiredRole, 'Sub-team selection.')
				} else if (operation === 'messageReactionRemove') {
					guild.member(user).roles.remove(desiredRole, 'Sub-team removal.')
				}
			})
			.catch((error) => console.error(error))
	}
}
