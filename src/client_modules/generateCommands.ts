import { Collection } from 'discord.js'
import { fs, path } from '../internal'
import { Command } from '../typings'

const commandModulesPath = path.join(process.cwd(), 'dist/command_modules')

export function generateCommands (): Collection<string, Command> {
	const commands = new Collection<string, Command>()
	for (const file of fs.readdirSync(commandModulesPath)) {
		const commandPath = path.join(commandModulesPath, `${file}`)
		const command: Command = require(commandPath).default
		commands.set(command.name, command)
	}
	return commands
}
