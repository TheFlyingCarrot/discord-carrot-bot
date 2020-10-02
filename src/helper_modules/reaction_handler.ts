function handle_reaction (client, reaction, user) {
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
			.catch((error) => {
				console.error(error)
			})
	}
}
