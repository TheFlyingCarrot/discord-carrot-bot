// const team_discord = require('../guilds/team_discord.json')

// Check if any other categorical roles exist
function roleChecker(guildMember: { roles: { cache: any[]} } , desiredReactionRole: any) {
	const categoricalRolesArray = Object.values(team_discord.reaction_roles).filter(reaction_role => reaction_role['category'] == desiredReactionRole.category)
	let categoricalRoles: Object[] = []
	for (const temporaryCategoryRole in categoricalRolesArray) {
		if (categoricalRolesArray.hasOwnProperty(temporaryCategoryRole)) {
			const categoricalRole = categoricalRolesArray[temporaryCategoryRole]
			categoricalRoles.push(categoricalRole['name'])
		}
	}
	const existingRoles: Array<Object> = guildMember.roles.cache.filter((role: { name: string} ) => categoricalRoles.indexOf(role.name) !== -1)

	if (existingRoles.length) {
		return true
	}

	return false
}
