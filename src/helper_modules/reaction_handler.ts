import Discord, { Role } from '../internal.js'
import { ExtendedClient, ReactionRole, ReactionRoleConfig } from '../typings.js'
const TeamDiscord = require('../guilds/750480529765171302.json')

async function fetchPartial (partial) {
    try {
        await partial.fetch()
    } catch (error) {
        console.error(error)
        return null
    }
    return partial
}

export function handleReaction (client: ExtendedClient, reaction: Discord.MessageReaction, user: Discord.User, operation: string): null | void {
    if (reaction.partial) fetchPartial(reaction)
    if (user.partial) fetchPartial(user)

    if (reaction.message.channel.type == 'dm') return null
    if (reaction.message.channel.name != 'role-request') return null
    if (reaction.message && reaction.message.author && !reaction.message.author.equals(client.user)) return null

    const { guild } = reaction.message

    if (!guild.available) {
        console.error('[Reaction Handler] [Error] Guild not available:', guild)
        return null
    }

    if (guild.id == TeamDiscord.guild_id) {
        const reactionRole: ReactionRole = TeamDiscord.reaction_roles.find((role) => role.emoji_tag == reaction.emoji.toString())
        if (!reactionRole) return null

        new Promise((resolve) => resolve(guild.roles.fetch(reactionRole.role_id)))
            .then((desiredRole: Role) => {
                if (operation === 'add') {
                    guild.member(user).roles.add(desiredRole, 'Sub-team selection.')
                } else if (operation === 'remove') {
                    guild.member(user).roles.remove(desiredRole, 'Sub-team removal.')
                }
            })
            .catch((error) => console.error(error))
    }
}
