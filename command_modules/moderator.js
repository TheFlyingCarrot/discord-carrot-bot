module.exports = {
	name: 'moderator',
	aliases: ['mod'],
    usage: '[user mention]',
	args: true,
	description: 'Grant a user permission to use this bot with limited permissions.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	role: '',
	execute(message, args) {
		
	},
}