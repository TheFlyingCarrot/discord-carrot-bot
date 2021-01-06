import { Command, Discord } from '../internal.js'

const unload: Command = {
	name: 'unload',
	description: 'Unloads a command.',
	enabled: true,
	toggleable: true,

	args: true,

	execute ({ args, client, message }) {
		const commandName = args.shift().toLowerCase()
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (!command) {
			message.reply('No such command was found.')
			return
		}

		delete require.cache[require.resolve(`./${command.name}.js`)]
		client.commands.sweep((_value: Command, key: string) => key === commandName)

		if (!client.commands.has(commandName)) {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setTimestamp()
				.setFooter(`Carrot Bot${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
				.setTitle('Command Unload')
				.setColor('#00ff00')
				.setDescription(`Command \`${commandName}\` unloaded.`)
			message.reply(newEmbed)
			console.log(`Command Unloaded: ${commandName}`)
		} else {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setTimestamp()
				.setFooter(`Carrot Bot${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
				.setTitle('Command Unload')
				.setColor('#ff0000')
				.setDescription(`Command \`${commandName}\` could not be unloaded.`)
			message.reply(newEmbed)
		}
	}
}

export default unload as Command
