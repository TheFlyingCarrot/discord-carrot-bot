/* eslint-disable no-multi-spaces */
export function debug_log ({ message, command, args, developers }) {
    console.log(`[Debug] [Log] *New message with prefix detected*
    message:
        author:
            message.author.tag:   ${message.author.tag      ? message.author.tag    : 'null'}
            message.author.id:    ${message.author.id       ? message.author.id     : 'null'}
        message.content:          ${message.content         ? message.content       : 'null'}
        message.channel:          ${message.channel         ? message.channel       : 'null'}
        message.channel.type:     ${message.channel.type    ? message.channel.type  : 'null'}
        message.createdAt:        ${message.createdAt       ? message.createdAt     : 'null'}
        guild:
            message.guild:        ${message.guild           ? message.guild         : 'null'}
            message.guild.id:     ${message.guild           ? message.guild.id      : 'null'}
        command:
            command.name:         ${command                 ? command.name          : 'null'}
            args:                 ${args                    ? args                  : 'null'}
        developer:
            developers:           ${developers}
            isDeveloper:          ${developers.includes(message.author.id) ? 'true' : 'false'}`)
}
