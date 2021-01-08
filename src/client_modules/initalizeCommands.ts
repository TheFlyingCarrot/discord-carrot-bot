import { Command, Discord, fs, path } from '../internal'

export function initalizeCommands (): Discord.Collection<string, Command> {
	const commands = new Discord.Collection<string, Command>()
	for (const file of fs.readdirSync(path.join(process.cwd(), 'dist/command_modules'))) {
		if (!file.endsWith('.js'))
			continue
		const commandPath = path.join(process.cwd(), 'dist/command_modules', `${file}`)
		try {
			const command: Command = require(commandPath).default
			if (!commands.get(command.name)
				|| commands.find((command) => command.aliases ? command.aliases.includes(command.name) : false)) {
				commands.set(command.name, command)
			}
		} catch (error) {
			console.error('[Command Loading Error]', `${file}: Command could not be loaded.\nError: ${error}`)
		}
	}
	return commands
}
