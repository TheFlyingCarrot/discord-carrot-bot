import { client, Discord } from '../internal.js'
import { fetchPartial } from './fetchPartial'

export async function isValidReaction (messageReaction: Discord.MessageReaction, user: Discord.User): Promise<boolean> {
	if (messageReaction.partial) await fetchPartial(messageReaction)
	if (user.partial) await fetchPartial(user)

	if (messageReaction.message.channel.type == 'dm'
		|| messageReaction.message.channel.name != 'role-request'
		|| (messageReaction.message
			&& messageReaction.message.author
			&& !messageReaction.message.author.equals(client.user)))
		return true
	return false
}
