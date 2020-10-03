import Discord, { Role } from '../internal'

const roleChecker = require('../helper_modules/role_checker').default
const assignRole = require('../helper_modules/assign_role').default
const team_discord = require('../guilds/team_discord.json')

// TODO: REFACTOR FUNCTIONS

function matchRoleWithEmojiTag (emojiName, emojiID) {
  for (const reaction_role of Object.values(team_discord.reaction_roles)) {
    if (`<:${emojiName}:${emojiID}>` == reaction_role['emoji_tag']) {
			return reaction_role
		}
	}
}

function fetchRoleFromRoleID(guild, roleID): Promise<Role | null> {
	return new Promise((resolve) => {
    resolve(guild.roles.fetch(roleID))
  })
}

export async function handle_reaction(client, reaction, user) {
	if (reaction.message.channel.id != team_discord.role_channel_id) return null

	const { guild } = reaction.message
	const guildMember = guild.member(user)

	if (reaction.message.author == client.user) {
		const DesiredReactionRole = matchRoleWithEmojiTag(reaction.emoji.name, reaction.emoji.id)
		if (!DesiredReactionRole) return null

		const CategoryIsFull = roleChecker(guildMember, DesiredReactionRole)
		if (CategoryIsFull) return null

    fetchRoleFromRoleID(guild, DesiredReactionRole['role_id'])
      .then((DesiredRole) => {
        assignRole(guildMember, DesiredRole, 'Sub-team setup.')
      })
      .catch((error) => console.error(error))
	}
}
