// Assign role in guild
function assignRole(guildMember, role, reason) {
	guildMember.roles.add(role, reason ? reason : null)
}

export default assignRole
