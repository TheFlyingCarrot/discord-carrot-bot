import { Command, cooldown, ExtendedClient, Discord } from '../internal.js'

export function getCommand ({ client, message, prefix, developers }: { client: ExtendedClient, message: Discord.Message, prefix: string, developers: string[] }): { command: Command, args: any | null } | null {
	if (!message.content.startsWith(prefix) || message.author.bot || message.tts || message.system) {
		return null
	}
	const args = message.content.slice(prefix.length).split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	try {
		// Command Presence Check
		if (!command) {
			return null
		}
		// Command Toggle Check
		if (!command.enabled) {
			message.reply(`\`${command.name}\` is currently \`disabled\`. Sorry!`)
			return null
		}
		// Command Arguments Check
		if (command.args && !args.length) {
			message.reply(`That command requires arguments.\n${command.usage ? `The proper usage is: \`${prefix}${command.name} ${command.usage}\`` : null}`)
			return null
		}
		// Developer Command Check
		if (command.developerOnly && !developers.includes(`${message.author.id}`)) {
			message.reply('That command can only be used by developers. Sorry!')
			return null
		}
		// Client Shackle Check
		if (client.commandsEnabled && !developers.includes(`${message.author.id}`)) {
			return null
		}
		// Guild-Only Command Check
		if (command.guildOnly && message.channel.type !== 'text') {
			message.reply('That command is reserved for servers only. Sorry!')
			return null
		}
		// Guild-Specific Command Check
		if (command.guildSpecific && !command.guildSpecific.includes(message.guild.id)) {
			message.reply('That command is reserved for certain servers only. Sorry!')
			return null
		}
		// Permissions Check
		if (command.permission && !message.guild.me.hasPermission(command.permission, { checkAdmin: true })) {
			message.reply(`I lack the \`${command.permission}\` permission to execute that command.`)
			return null
		} else if (message.member && !message.member.hasPermission(command.permission, { checkAdmin: true, checkOwner: true })) {
			message.reply('You do not have permission to use that command.')
			return null
		}
	} catch (error) {
		console.error(error)
		message.reply(`\`${command.name}\` caused an internal error and has been cancelled.`)
		return null
	}

	return { command, args }
}
