import { DiscordJS } from '../internal'

// Assign role in guild
export function assignRole (guildMember: DiscordJS.GuildMember, role: DiscordJS.Role, reason: string): void {
	guildMember.roles.add(role, reason ? reason : null)
}
