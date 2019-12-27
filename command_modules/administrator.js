module.exports = {
	name: 'administrator',
	aliases: ['admin'],
    usage: '[user mention]',
	args: true,
	description: 'Grant a user permission to use this bot with elevated permissions.',
	cooldown: 10,
	guildOnly: true,
	permission: 'ADMINISTRATOR',
	execute(message, args) {
		message.reply(`1st Arg: ${args[0]}\n2nd Arg: ${args[1]}`)
	},
}