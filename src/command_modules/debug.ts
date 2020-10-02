const debug: Command = {
  name: 'debug',
  description: 'Log verbose info for debugging purposes.',

  enabled: true,
  toggleable: true,

  developerOnly: true,

  execute({ client, message, args, Debugging }): string {
    Debugging = !Debugging
    return 'Verbose debug info enabled.'
  }
}
