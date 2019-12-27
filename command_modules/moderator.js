const fs = require('fs')
module.exports = {
	name: 'moderator',
	aliases: ['mod'],
    usage: '[grant/set] [user mention/role ID]',
	args: true,
	description: 'Grant a user permission to use this bot with limited permissions.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	execute(message, args) {
		if (args[0] === 'set') {
			console.log('moderator role set to...')
			const guildFile = JSON.parse(fs.readFileSync(`./guilds/${message.guild.id}.json`))
			if (guildFile) {
				console.log('Guild file exists!')
			}
		} else if (args[0] === 'grant') {
			console.log('moderator role granted to...')
		}
	},
}