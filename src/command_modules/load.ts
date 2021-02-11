import { client, Command, Discord, fs, path } from '../internal.js'

const load: Command = {
	name: 'load',
	description: 'Loads a command.',
	enabled: true,
	toggleable: true,

	args: true,

	developerOnly: true,

	execute ({ args, message }) {
		const commandName = args.shift().toLowerCase()
		if (client.getCommand(commandName)) {
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

		const newEmbed = new Discord.MessageEmbed()
		newEmbed
			.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
			.setTitle('Command Load')
		if (newCommand) {
			newEmbed
				.setColor('#00ff00')
				.setDescription(`Command \`${commandName}\` was loaded.`)
		} else {
			newEmbed
				.setColor('#ff0000')
				.setDescription(`Command \`${commandName}\` could not be loaded.`)
			console.error(`Command could not load: ${commandName}`)
		}
		message.reply(newEmbed)
	}
}

export default load as Command
