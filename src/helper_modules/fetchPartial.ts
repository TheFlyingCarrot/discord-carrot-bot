import { Discord } from '../internal'

export async function fetchPartial (partial: Partial<Discord.MessageReaction | Discord.User | Discord.Channel>): Promise<Partial<Discord.MessageReaction | Discord.User | Discord.Channel>> | null {
	try {
		await partial.fetch()
	} catch (error) {
		console.error(error)
		return null
	}
	return partial
}
