import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class extends Command {
    public constructor() {
        super("suggest", {
            aliases: ["suggest", "suggestion"],
            category: "Server",
            args: [{
                id: "suggestion",
                type: "string",
                match: "rest",
                prompt: {
                    start: `Please provide the suggestion you want to report to Vision Developers`,
                    retry: `Provide a valid suggestion`
                }
            }
            ]
        })
        cooldown: 15e3
    }
    public exec(message: Message, { suggestion }: { suggestion: string }) {
        let ch = this.client.channels.cache.get("738493096257650754");
        (ch as TextChannel).send(new VisionEmbed(message).customFooter().successColor().setDescription(suggestion)
            .addField(`Suggestion Reported by:`, `${message.author.tag} (${message.author.id})`)
            .addField(`Suggestion was reported in:`, message.guild.name))
        message.util.send(`Suggestion was reported to Developers`)
    }
}