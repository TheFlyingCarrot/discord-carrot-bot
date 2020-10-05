const { personal_role_id } = require('../config.json')

export function clearVIPRoles (guild: any, guildMember: any, reason: string) {
    const personal_role = guild.roles.fetch(personal_role_id)
    guildMember.roles.cache.forEach((existingRole: { id: any, position: number, delete: (arg0: any, arg1: string) => void }) => {
        if (existingRole.id !== guild.roles.everyone.id && existingRole.position < personal_role.position) {
            existingRole.delete(existingRole, reason)
        }
    })
}
