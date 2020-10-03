class Command {
	name: string
	description: string
	enabled: boolean
  toggleable: boolean

	aliases?: string[]
	usage?: string
	args?: boolean
	cooldown?: number

	guildOnly?: boolean
	permission?: string
  guildSpecific?: string[]

	developerOnly?: boolean

  execute?: (client: any, message: any, args: any[] | void, MessageEmbed?: any, Debugging?: any) => string | void
}
