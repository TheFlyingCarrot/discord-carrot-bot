import { client, Discord, HelperModules } from '../internal.js'

export async function isValidReaction (messageReaction: Discord.MessageReaction, user: Discord.User): Promise<boolean> {
	if (messageReaction.partial) await HelperModules.fetchPartial(messageReaction)
	if (user.partial) await HelperModules.fetchPartial(user)

	if (messageReaction.message.channel.type == 'dm'
		|| messageReaction.message.channel.name != 'role-request'
		|| (messageReaction.message
			&& messageReaction.message.author
			&& !messageReaction.message.author.equals(client.user))) {
		return true
	}
	return false
}
