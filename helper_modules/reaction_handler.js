const team_discord = require('../guilds/cgw_discord.json')
const { assignRole } = require('./assignRole')
const { fetchRoleFromRoleID } = require('./fetchRoleFromRoleID')
const { findMatchingReactionRoleWithEmojiTag } = require('./findMatchingReactionRoleWithEmojiTag')
const { roleChecker } = require('./roleChecker')

module.exports = {
	execute(dataTable) {
		const { client, reaction, user } = dataTable

		if (reaction.message.channel.id != team_discord.role_channel_id) return null

		const guild = reaction.message.guild
		const guildMember = guild.member(user)

		if (reaction.message.author == client.user) {
			const DesiredReactionRole = findMatchingReactionRoleWithEmojiTag(reaction.emoji.name, reaction.emoji.id)
			if (!DesiredReactionRole) return null

			const CategoryIsFull = roleChecker(guildMember, DesiredReactionRole)
			if (CategoryIsFull) return null

			fetchRoleFromRoleID(guild, DesiredReactionRole.role_id)
				.then(DesiredRole => {
					assignRole(guildMember, DesiredRole, 'Sub-team setup.')
				})
				.catch(error => {
					console.error(error)
				})
		}
	},
}
