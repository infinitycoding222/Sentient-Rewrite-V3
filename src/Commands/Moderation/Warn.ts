import { Command } from "discord-akairo";
import { GuildMember } from "discord.js";
import { GuildManager } from "discord.js";
import { Message, MessageEmbed } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"
import { Repository } from "typeorm"
import {
    Warns
} from "../../Models/Warns"

export default class extends Command {
    public constructor() {
        super("warn", {
            aliases: ["warn"],
            category: "Moderation",
            args: [{
                id: "member",
                type: "member",
                prompt: {
                    start: `Please provide a member`,
                    retry: `Please provide a valid member to warn`
                }
            }, {
                id: "reason",
                type: "string",
                match: "rest",
                default: "No reason is provided by moderator"
            }
            ]
        })
    }
    public async exec(message: Message, { member, reason }: { member: GuildMember, reason: string }): Promise<Message> {
        const WarnRepo: Repository<Warns> = this.client.db.getRepository(Warns);
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.util.reply(new VisionEmbed(message).errorEmbed().customFooter().setDescription(`I cant warn a member that has higher or equal role to you.`))
        await WarnRepo.insert({
            guild: message.guild.id,
            user: member.id,
            moderator: message.author.id,
            reason: reason
        })
        message.util.send(new VisionEmbed(message).successColor().addField(`**Moderator:**`, message.author.tag)
            .addField(`**User:**`, member.user.tag)
            .addField(`**Reason**`, reason)
            .customFooter()
            .setTitle("Action: Warn"))
    }
}