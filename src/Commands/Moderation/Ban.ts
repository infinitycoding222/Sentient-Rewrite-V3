import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class extends Command {
    public constructor() {
        super("ban", {
            aliases: ["ban", "banish"],
            category: "Moderation",
            args: [{
                id: "member",
                type: "member",
            },
            {
                id: "reason",
                type: "string"
            }
            ],
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            ratelimit: 3,
            cooldown: 20e3
        })
    }
    public exec(message: Message, { member, reason }: { member: GuildMember, reason: string }) {
        let embed = new VisionEmbed(message)
            .successColor()
            .customFooter()
            .addField(`**Responsible Moderator:**`, `${message.author.tag} (${message.author.id})`)
            .addField(`**Punished Member:**`, `${member.user.tag} (${member.user.id})`)
            .addField(`**Reason:**`, reason)
            .setDescription(`If you think this is a mistake please DM a moderator`)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle(`Action: Ban`)
        try {
            member.ban({ reason: reason })
            message.util.send(embed)
            member.send(new VisionEmbed(message).customFooter().setDescription(`Hello, you have been banned in ${message.guild.name} with reason: ${reason}\nModerator: ${message.author.tag}`))
        } catch (err) {
            message.util.send(`Error while trying to ban this member, ${err.message}`)
        }
    }
}