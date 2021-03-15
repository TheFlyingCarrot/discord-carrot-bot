import { client, DiscordJS, HelperModules } from '../internal'

export async function isValidReaction (messageReaction: DiscordJS.MessageReaction, user: DiscordJS.User): Promise<boolean> {
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
