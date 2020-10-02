const guild_info: Command = {
  name: 'guild-info',
  description: 'Generate a JSON list of information for a server.',
  enabled: true,
  toggleable: true,

  guildOnly: true,
  developerOnly: true,


  execute({ message }) {
    console.log(message.guild)
  }
}
