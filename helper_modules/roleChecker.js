const team_discord = require('../guilds/cgw_discord.json')

// Check if any other categorical roles exist
exports.roleChecker = (guildMember, desiredReactionRole) => {
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
