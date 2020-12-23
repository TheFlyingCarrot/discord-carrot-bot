import { Command, Config, Discord, ExtendedClient } from '../internal.js'

export function getCommand ({ client, message }: { client: ExtendedClient, message: Discord.Message }): { command: Command, args: string[] | null } | null {
	if (!message.content.startsWith(Config.prefix) || message.author.bot || message.tts || message.system) {
		return
	}
	const args = message.content.slice(Config.prefix.length).split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	if (command === undefined) return
	try {
		// Command(s) enabled?
		if (!command.enabled || (!client.commandsEnabled && !Config.developers.includes(`${message.author.id}`))) {
			// message.reply(`\`${command.name}\` is currently \`disabled\`. Sorry!`)
			return
		}
		// Command is dev-only?
		if (command.developerOnly && !Config.developers.includes(message.author.id)) {
			message.reply('That command can only be used by developers. Sorry!')
			return
		}
		// Command is guild-only?
		if (command.guildOnly && message.channel.type !== 'text') {
			message.reply('That command is reserved for servers only. Sorry!')
			return
		}
		// Command is guild-specific?
		if (command.guildSpecific && !command.guildSpecific.includes(message.guild.id)) {
			message.reply('That command is reserved for certain servers only. Sorry!')
			return
		}
		// Command requires permissions?
		if (command.permission && !message.guild.me.hasPermission(command.permission, { checkAdmin: true })) {
			message.reply(`I lack the \`${command.permission}\` permission to execute that command.`)
			return
		} else if (message.member && !message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })) {
			message.reply('You do not have permission to use that command.')
			return
		}
		// Command requires args?
		if (command.args && !args.length) {
			message.reply(`That command requires arguments.${command.usage ? `\nThe proper usage is: \`${Config.prefix}${command.name} ${command.usage}\`` : ''}`)
			return
		}
	} catch (error) {
		console.error(error)
		message.reply(`\`${command.name}\` caused an internal error and has been cancelled.`)
		return
	}
	return { command, args }
}
