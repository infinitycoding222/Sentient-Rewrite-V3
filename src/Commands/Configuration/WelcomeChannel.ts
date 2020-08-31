import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildChannel } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"


export default class extends Command {
    public constructor() {
        super("welcome", {
            aliases: ["welcome", "welcomechannel", "wch"],
            category: "Configuration",
            args: [{
                id: "channel",
                type: "channel",
                prompt: {
                    start: `Please mention a channel`,
                    retry: `Please provide a valid channel`
                }
            }
            ],
            clientPermissions: ["SEND_MESSAGES"],
            userPermissions: ["MANAGE_GUILD"]
        })
    }
    public exec(message: Message, { channel }: { channel: GuildChannel }) {
        this.client.settings.set(message.guild, "config.wchannel", channel)
        let embed = new VisionEmbed(message)
            .customFooter()
            .successColor()
            .setDescription(`Set the welcome / leave channel to ${channel}`)
        message.util.send(embed)
    }
}