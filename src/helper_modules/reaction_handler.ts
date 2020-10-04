import { Command, ExtendedClient, ReactionRole } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed, Role } from '../internal.js'

const roleChecker = require('../helper_modules/role_checker').default
const assignRole = require('../helper_modules/assign_role').default
const team_discord = require('../guilds/team_discord.json')

// TODO: REFACTOR FUNCTIONS

function matchRoleWithEmojiTag (emojiName: any, emojiID: any) {
    for (const reaction_role of Object.values(team_discord.reaction_roles)) {
        if (`<:${emojiName}:${emojiID}>` == reaction_role['emoji_tag']) {
            return reaction_role
        }
    }
}

function fetchRoleFromRoleID (guild: { roles: { fetch: (arg0: any) => Discord.Role | PromiseLike<Discord.Role> } }, roleID: any): Promise<Role | null> {
    return new Promise((resolve) => {
        resolve(guild.roles.fetch(roleID))
    })
}

export function handle_reaction (client: ExtendedClient, reaction: Discord.MessageReaction, user: Discord.User) {
    if (reaction.message.channel.id != team_discord.role_channel_id) return null

    const { guild } = reaction.message
    const guildMember = guild.member(user)

    if (reaction.message.author == client.user) {
        const DesiredReactionRole: ReactionRole = matchRoleWithEmojiTag(reaction.emoji.name, reaction.emoji.id)
        if (!DesiredReactionRole) return null

        const CategoryIsFull = roleChecker(guildMember, DesiredReactionRole)
        if (CategoryIsFull) return null

        fetchRoleFromRoleID(guild, DesiredReactionRole.role_id)
            .then((DesiredRole) => {
                assignRole(guildMember, DesiredRole, 'Sub-team setup.')
            })
            .catch((error) => console.error(error))
    }
}
