import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, User } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"
import { Repository } from "typeorm";
import { Warns } from "../../Models/Warns";

export default class Inf extends Command {
    public constructor() {
        super("infractions", {
            aliases: ["infractions"],
            category: "Moderation",
            args: [{
                id: "member",
                type: "member",
                default: _ => _.member
            }
            ]
        })
    }
    public async exec(message: Message, { member }: { member: GuildMember }) {
        const w: Repository<Warns> = this.client.db.getRepository(Warns);
        const ws: Warns[] = await w.find({ user: member.id, guild: message.guild.id })
        if (!ws.length) return message.util.reply(`No infractions found on database for this user`)
        const inf = await Promise.all(ws.map(async (v: Warns, i: number) => {
            const m: User = await this.client.users.fetch(v.moderator).catch(() => null);
            if (m) return {
                index: i + 1,
                moderator: m.tag,
                reason: v.reason
            }
        }))
        return message.util.send(new VisionEmbed(message)
            .setAuthor(`Infractions | ${member.user.tag} | ${message.guild.name}`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(inf.map(v => `\`#${v.index}\` | Moderator: **${v.moderator}**\nReason: **${v.reason}**\n`))
            .customFooter())
    }
}