import { Command, ExtendedClient } from '../typings.js'
import Discord, { Client, Collection, Message, MessageEmbed } from '../internal.js'
import { SystemChannelFlags } from 'discord.js'

const webhookActions = [50, 51, 52]
const webhookActionMap = { 'WEBHOOK_CREATE': 'Create Webhook', 'WEBHOOK_UPDATE': 'Update Webhook', 'WEBHOOK_DELETE': 'Delete Webhook' }
const embedActions = { 'CREATE': '#00ff00', 'DELETE': '#ff0000', 'UPDATE': '#ff6400', 'ALL': '#ff00ff' }

export async function handleWebhookUpdate (channel: Discord.TextChannel) {
	if (!channel.guild.available) return

	const logChannel = channel.guild.channels.cache.find(channel => channel.name === "logs" && channel.type === "text") as Discord.TextChannel
	if (!logChannel) return

	try {
		let fetchedLogs: Discord.GuildAuditLogs
		let webhookUpdateLog: Discord.GuildAuditLogsEntry

		for await (const possibleAction of webhookActions) {
			fetchedLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: possibleAction })
			webhookUpdateLog = fetchedLogs.entries.first()
			if (webhookUpdateLog && webhookUpdateLog.createdTimestamp && (Date.now() - webhookUpdateLog.createdTimestamp) < 1000) {
				break
			}
		}

		if (!webhookUpdateLog) {
			return
		}

		const { executor, target, reason, action, changes, id } = webhookUpdateLog
		const newEmbed = new MessageEmbed()

		newEmbed.setAuthor('Carrot Bot', 'https://i.ibb.co/v3d9t9x/carrot-clip-art.png')
			.setTimestamp()
			.setColor(embedActions[webhookUpdateLog.actionType] || '#ff6400')
			.setTitle('Webhook Updated')
			.addField(`Executor`, `${executor}`, true)
			.addField(`Channel`, `${channel}`, true)
			.addField('Reason', reason || 'Unspecified', true)
			.addField('Action', webhookActionMap[webhookUpdateLog.action] || 'Unknown')
			.setFooter(`Executor ID: ${id} ${process.env.ENV_TYPE === 'test' ? '| Test Build' : ''}`)
		changes.forEach(change => {
			if (change.old && change.new) {
				newEmbed.addField('Change', `Key: ${change.key}\nOld: ${change.old}\nNew: ${change.new}`)
			} else if (change.new) {
				newEmbed.addField('Change', `Key: ${change.key}\nValue: ${change.new}`)
			} else if (change.old) {
				newEmbed.addField('Change', `Key: ${change.key}\nValue: ${change.old}`)
			}
		})

		logChannel.send(newEmbed)
	} catch (error) {
		console.error(error)
	}
}
