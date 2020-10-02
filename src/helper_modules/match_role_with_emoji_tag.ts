// Find matching reaction_role using the emoji_tag
function matchRoleWithEmojiTag (emojiName, emojiID) {
	for (const reaction_role of Object.values(team_discord.reaction_roles)) {
		if (`<:${emojiName}:${emojiID}>` == reaction_role['emoji_tag']) {
			return reaction_role
		}
	}
}
