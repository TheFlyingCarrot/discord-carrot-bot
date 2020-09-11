const team_discord = require('../guilds/cgw_discord.json')

// Find matching reaction_role using the emoji_tag
exports.findMatchingReactionRoleWithEmojiTag = (emojiName, emojiID) => {
	for (const reaction_role of Object.values(team_discord.reaction_roles)) {
		if (`<:${emojiName}:${emojiID}>` == reaction_role.emoji_tag) {
			return reaction_role
		}
	}
}
