import { DiscordJS } from '../internal'

export async function fetchPartial (partial: Partial<DiscordJS.MessageReaction | DiscordJS.User | DiscordJS.Channel>): Promise<Partial<DiscordJS.MessageReaction | DiscordJS.User | DiscordJS.Channel>> {
	try {
		await partial.fetch()
	} catch (error) {
		console.error(error)
	}
	return partial
}
