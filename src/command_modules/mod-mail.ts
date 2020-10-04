import Discord, { Client, Message, MessageEmbed } from '../internal.js'

const mod_mail: Command = {
  name: 'mod-mail',
	description: 'Message the admins.',
	enabled: true,
  toggleable: true,
  
  aliases: ['mm', 'modmail', 'admin-mail', 'adminmail'],
	usage: '[message]',
  args: true,
  cooldown: 45,
  guildOnly: true,
  
  execute ({ client, message, args }: { client: Client, message: Message, args: string[] }, Debugging: boolean): string | null | void {
    const { guild } = message
    
    if (!guild.available) return `Guild: ${guild} - Not Available`

    if (message.guild.id == '750480529765171302') {
      try {
        message.delete({ reason: 'Mod-mail.' })
			  const modMail = args.join(' ')
			  guild.publicUpdatesChannel.send(`<@&750486984987770881>, ${message.author} sent: ${modMail}`)
      } catch (error) {
        return error
      }
		}
	}
}

export default mod_mail as Command
