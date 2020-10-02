const { APIUser } = require('discord-api-types/v6')
const { prefix, developers, personal_role_id, max_role_name_length, default_cooldown } = require('../config.json')
const team_discord = require('./guilds/team_discord.json')
const invalid_command = { command: null, args: {} }

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
