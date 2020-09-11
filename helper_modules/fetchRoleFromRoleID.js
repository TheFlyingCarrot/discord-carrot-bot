// Fetch role in guild
exports.fetchRoleFromRoleID = (guild, roleID) => {
	return new Promise(resolve => {
		resolve(guild.roles.fetch(roleID))
	})
}