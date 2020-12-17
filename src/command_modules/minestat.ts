import { Command, Discord, fetch } from '../internal.js'

const minestat: Command = {
	name: 'minestat',
	description: 'Get Minecraft server\'s status.',
	enabled: true,
	toggleable: true,

	aliases: ['mcstat', 'mc-stat', 'mine-stat', 'minecraft-stat', 'minecraft-stats', 'minecraft-statistics'],
	usage: '[ip/address] (port)',
	args: true,

	async execute ({ message, args }): Promise<void> {
		const requestURL = `http://mcapi.us/server/status?ip=${args[0]}${args[1] ? `&port${args[1]}` : ''}`
		const fetchedData = await (await fetch(requestURL, { method: 'get', headers: { 'Content-Type': 'application/json' }, })).json()
			.catch(console.error)
		if (fetchedData) {
			const newEmbed = new Discord.MessageEmbed()
			newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
				.setThumbnail('https://i.ibb.co/xXQbnn5/user-menu.png')
				.setTitle('Minecraft Server Status')
				.setTimestamp()
				.addField('Status', fetchedData['status'] ? 'Online': 'Offline', true)
				.addField('Players', `${fetchedData['players'].now}/${fetchedData['players'].max}`, true)
				.addField('MOTD', fetchedData['motd'] || '`No MOTD`')
				.setFooter(`Carrot Bot${process.env.ENV_TYPE == 'test' ? ' | Test Build' : ''}`)
			message.reply(newEmbed)
		}
	}
}

export default minestat as Command
