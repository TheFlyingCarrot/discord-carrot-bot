import { client } from '../internal'

client.hasPermission = (permissionString: string, guild: Discord.Guild): boolean => {
	return true
}
