// Fetch role in guild
async function fetchRoleFromRoleID (guild, roleID) {
	new Promise(resolve => {
		resolve(guild.roles.fetch(roleID))
	})
}
