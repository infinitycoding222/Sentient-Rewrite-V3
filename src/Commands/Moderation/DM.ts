import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class DM extends Command {
    public constructor() {
        super("dm", {
            aliases: ["dm"],
            category: "Moderation",
            args: [{
                id: "member",
                type: "member",
                prompt: {
                    start: `Please provide a member to dm`,
                    retry: `Please provide a **VALID** member to dm`
                }
            },
            {
                id: "dmMessage",
                type: 'string',
                prompt: {
                    start: `Please provide a message to the user`
                },
                match: "rest",
                default: "No Message is provided by sender"
            }
            ]
        })
    }
    public exec(message: Message, { member, msg }: { member: GuildMember, msg: string }): Promise<Message> {
        try {
            member.send(
                new VisionEmbed(message)
                    .customFooter()
                    .successColor()
                    .setAuthor(`Direct Message | ${message.guild.name}`, message.guild.iconURL())
                    .setDescription(msg)
            )
            return message.util.send(new VisionEmbed(message).customFooter().successColor().setDescription(`Successfully sent a direct message to: \`${member.user.tag}\``));
        } catch (err) {
            console.error(err);
            return message.util.send('Couldnt dm that user.');
        }
    }
}