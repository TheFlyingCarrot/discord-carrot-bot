import { Discord } from '../internal'

// Assign role in guild
export function assignRole (guildMember: Discord.GuildMember, role: Discord.Role, reason: string): void {
	guildMember.roles.add(role, reason ? reason : null)
}
