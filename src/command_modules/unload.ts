import { client, getCommand, DiscordJS } from '../internal'
import { Command } from '../typings'

const unload: Command = {
	name: 'unload',
	description: 'Unloads a command.',
	enabled: true,
	toggleable: true,

	args: true,

	developer_only: true,

	execute ({ args, message }) {
		const commandName = args.shift().toLowerCase()
		const command = getCommand(commandName)
		if (!command) {
			message.reply('No such command was found.')
			return
		}

		delete require.cache[require.resolve(`./${command.name}.js`)]
		client.commands.sweep((_value: Command, key: string) => key === commandName)

		const newEmbed = new DiscordJS.MessageEmbed()
		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setFooter(`Carrot Bot${process.env.NODE_ENV == 'test' ? ' | Test Build' : ''}`)
			.setTitle('Command Unload')

		if (!client.commands.has(commandName)) {
			newEmbed.setColor('#00ff00')
				.setDescription(`Command \`${commandName}\` unloaded.`)
			message.reply(newEmbed)
			console.log(`Command Unloaded: ${commandName}`)
		} else {
			newEmbed.setColor('#ff0000')
				.setDescription(`Command \`${commandName}\` could not be unloaded.`)
			message.reply(newEmbed)
		}
	}
}

export default unload as Command
