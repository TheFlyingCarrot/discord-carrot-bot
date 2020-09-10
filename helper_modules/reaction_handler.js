const team_discord = require('../guilds/cgw_discord.json')

// Check if any other categorical roles exist
function roleCheck(guildMember, desiredReactionRole) {
	const categoricalRolesArray = Object.values(team_discord.reaction_roles).filter(reaction_role => reaction_role.category == desiredReactionRole.category)
	// eslint-disable-next-line prefer-const
	let categoricalRoles = []
	for (const temporaryCategoryRole in categoricalRolesArray) {
		// eslint-disable-next-line no-prototype-builtins
		if (categoricalRolesArray.hasOwnProperty(temporaryCategoryRole)) {
			const categoricalRole = categoricalRolesArray[temporaryCategoryRole]
			categoricalRoles.push(categoricalRole.name)
		}
	}
	const existingRoles = guildMember.roles.cache.filter(role => categoricalRoles.indexOf(role.name) !== -1)

	if (existingRoles.size > 0) {
		return true
	} else {
		return false
	}
}

// Find matching reaction_role using the emoji_tag
function findMatchingReactionRoleWithEmojiTag(emojiName, emojiID) {
	for (const reaction_role of Object.values(team_discord.reaction_roles)) {
		if (`<:${emojiName}:${emojiID}>` == reaction_role.emoji_tag) {
			return reaction_role
		}
	}
}

// Fetch role in guild
function getRole(guild, roleID) {
	return new Promise(resolve => {
		resolve(guild.roles.fetch(roleID))
	})
}

// Assign role in guild
function assignRole(guildMember, role) {
	guildMember.roles.add(role, 'Sub-team setup.')
}

module.exports = {
	execute(dataTable) {
		const { client, reaction, user } = dataTable

		if (reaction.message.channel.id != team_discord.role_channel_id) return null

		const guild = reaction.message.guild
		const guildMember = guild.member(user)

		if (reaction.message.author == client.user) {
			const DesiredReactionRole = findMatchingReactionRoleWithEmojiTag(reaction.emoji.name, reaction.emoji.id)
			if (!DesiredReactionRole) return null

			const CategoryIsFull = roleCheck(guildMember, DesiredReactionRole)
			if (CategoryIsFull) return null

			getRole(guild, DesiredReactionRole.role_id)
				.then(DesiredRole => {
					assignRole(guildMember, DesiredRole)
				})
				.catch(error => {
					console.error(error)
				})
		}
	},
}
