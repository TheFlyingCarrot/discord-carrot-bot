import { client, config, DiscordJS } from '../internal'
import { Command } from '../typings'

export function canUseCommand (message: DiscordJS.Message, command: Command, args: string[] | null): boolean {
	const isDeveloper = config.developers.includes(message.author.id)
	// Enabled?
	if (!command.enabled && !isDeveloper) {
		// message.reply(`\`${command.name}\` is currently \`disabled\`. Sorry!`)
		return false
	}
	// Client has commands enabled?
	if (!client.commands_enabled && !isDeveloper) {
		// message.reply('All commands are currently disabled. Sorry!')
		return false
	}
	// Dev-only?
	if (command.developer_only && !isDeveloper) {
		message.reply('That command can only be used by developers. Sorry!')
		return false
	}
	// Guild-only?
	if (command.guild_only && message.channel.type !== 'text') {
		message.reply('That command is reserved for servers only. Sorry!')
		return false
	}
	// Guild-specific?
	if (command.guildSpecific && !command.guildSpecific.includes(message.guild.id)) {
		message.reply('That command is reserved for certain servers only. Sorry!')
		return false
	}
	// Requires permissions?
	if (command.permission && !message.guild.me.hasPermission(command.permission, { checkAdmin: true })) {
		message.reply(`I lack the \`${command.permission}\` permission to execute that command.`)
		return false
	} else if (message.member && !message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })) {
		message.reply('You do not have permission to use that command.')
		return false
	}
	// Requires args?
	if (command.args && !args.length) {
		if (command.usage) {
			message.reply(`The proper usage for that command is: \`${config.prefix}${command.name} ${command.usage}\``)
		} else {
			message.reply('That command requires arguments.')
		}
		return false
	}
	return true
}
