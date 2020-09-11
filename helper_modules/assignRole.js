// Assign role in guild
exports.assignRole = (guildMember, role, reason) => {
	guildMember.roles.add(role, reason ? reason : null)
}
