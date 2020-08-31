import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { TextChannel } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class extends Command {
    public constructor() {
        super("bug", {
            aliases: ["bug", "bugreport"],
            category: "Server",
            args: [{
                id: "bug",
                type: "string",
                match: "rest",
            }
            ]
        })
        cooldown: 15e3
    }
    public exec(message: Message, { suggestion }: { suggestion: string }) {
        let ch = this.client.channels.cache.get("738493096257650754");
        (ch as TextChannel).send(new VisionEmbed(message).customFooter().errorEmbed().setDescription(suggestion)
            .addField(`Bug Reported by:`, `${message.author.tag} (${message.author.id})`)
            .addField(`Bug was reported in:`, message.guild.name))
        message.util.send(`Bug was reported to Developers`)
    }
}