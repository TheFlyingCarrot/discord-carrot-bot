import { Command, Discord, fs, path } from '../internal.js'

const load: Command = {
	name: 'load',
	description: 'Loads a command.',
	enabled: true,
	toggleable: true,

	args: true,

	execute ({ args, client, message }): void {
		const commandName = args.shift().toLowerCase()
		if (client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))) {
			message.reply('That command is already loaded.')
			return
		}
		const commandPath = path.join(process.cwd(), 'dist/command_modules', `${commandName}.js`)
		if (!fs.existsSync(commandPath)) {
			message.reply('No file belonging to that command name was found.')
			return
		}

		const newCommand: Command = require(commandPath).default
		client.commands.set(newCommand.name, newCommand)

		if (newCommand) {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setTimestamp()
				.setFooter(`Carrot Bot${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
				.setTitle('Command Load')
				.setColor('#00ff00')
				.setDescription(`Command \`${commandName}\` was loaded.`)
			message.reply(newEmbed)
			console.log(`Command Loaded: ${commandName}`)
		} else {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setTimestamp()
				.setFooter(`Carrot Bot${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
				.setTitle('Command Load')
				.setColor('#ff0000')
				.setDescription(`Command \`${commandName}\` could not be loaded.`)
			message.reply(newEmbed)
		}
	}
}

export default load as Command
