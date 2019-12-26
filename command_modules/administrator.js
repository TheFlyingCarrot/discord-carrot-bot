module.exports = {
	name: 'administrator',
	aliases: ['admin'],
    usage: '[user mention]',
	args: true,
	description: 'Grant a user permission to use this bot with elevated permissions.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	role: 'admin',
	execute(message, args) {
		
	},
}