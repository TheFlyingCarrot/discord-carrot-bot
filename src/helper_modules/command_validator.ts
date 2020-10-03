const invalid_command = { command: null, args: {} }

export function validate_command({ client, message, prefix, developers, cooldowns, Discord }) {
	if (!message.content.startsWith(prefix) || message.author.bot || message.tts || message.system) {
		return invalid_command
	}
	const args = message.content.slice(prefix.length).split(/ +/u)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	try {
		// Command Validity Check
		if (!command) {
			return invalid_command
		}
		// Developer Command Check
		if (command.developerOnly && !developers.includes(`${message.author.id}`)) {
			message.channel.send(`${message.author}, that command can only be used by developers. Sorry!`)
			return invalid_command
		}
		// Guild-Only Command Check
		if (command.guildOnly && message.channel.type !== 'text') {
			message.channel.send(`${message.author}, that command is reserved for servers only. Sorry!`)
			return invalid_command
		}
		// Guild-Specific Command Check
		if (command.guildSpecific && !command.guildSpecific.includes(message.guild.id)) {
			message.channel.send(`${message.author}, that command is reserved for certain servers only. Sorry!`)
			return invalid_command
		}
		// Toggled Check / Enabled Check
		if (!command.enabled) {
			message.channel.send(`${message.author}, ${command.name} is currently \`disabled\`. Sorry!`)
			return invalid_command
		}
		// Permissions Check
		if (command.permission && !message.guild.me.hasPermission(command.permission)) {
			message.channel.send(`${message.author}, I lack the \`${command.permission}\` permission to execute that command.`)
			return invalid_command
		}
		// Arguments Check
		if (command.args && !args.length) {
			message.channel.send(`${message.author}, that command requires arguments.${command.usage ? `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\`` : null}`)
			return invalid_command
		}
		// Command Cooling
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection())
		}
	} catch (err) {
		console.log(err)
		message.channel.send(`${message.author}, \`${command.name}\` caused an internal error and has been cancelled.`)
		return invalid_command
	}
	return { command, args }
}
