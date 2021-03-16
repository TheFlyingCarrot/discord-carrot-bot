import { client, config, DiscordJS } from '../internal'
import { Command } from '../typings'

export function isValidCommand (message: DiscordJS.Message, command: Command, args: string[] | null): boolean {
	if (command.args && !args.length) {
		if (command.usage) {
			message.reply(`The proper usage for that command is: \`${config.prefix}${command.name} ${command.usage}\``)
		} else {
			message.reply('That command requires arguments.')
		}
		return false
	}

	const isDeveloper = config.developers.includes(message.author.id)
	if (isDeveloper) return true
	if (command.developer_only) {
		message.reply('That command can only be used by developers. Sorry!')
		return false
	}

	if (!command.enabled) {
		// message.reply(`\`${command.name}\` is currently \`disabled\`. Sorry!`)
		return false
	} else if (!client.commands_enabled) {
		// message.reply('All commands are currently disabled. Sorry!')
		return false
	} else if (command.guild_only && message.channel.type !== 'text') {
		message.reply('That command is reserved for servers only. Sorry!')
		return false
	} else if (command.guildSpecific && !command.guildSpecific.includes(message.guild.id)) {
		message.reply('That command is reserved for certain servers only. Sorry!')
		return false
	} else if (command.permission && !message.guild.me.hasPermission(command.permission, { checkAdmin: true })) {
		message.reply(`I lack the \`${command.permission}\` permission to execute that command.`)
		return false
	} else if (message.member && !message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })) {
		message.reply('You do not have permission to use that command.')
		return false
	}

	return true
}
