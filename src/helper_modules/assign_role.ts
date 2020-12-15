// Assign role in guild
export function assignRole (guildMember, role, reason) {
	guildMember.roles.add(role, reason ? reason : null)
}
