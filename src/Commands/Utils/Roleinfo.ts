import { Command } from "discord-akairo";
import { Message, MessageEmbed, Role } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class extends Command {
    public constructor() {
        super("role", {
            aliases: ["roleinfo", "role"],
            category: "Utils",
            args: [{
                id: "role",
                type: "string",
            }
            ]
        })
    }
    public exec(message: Message, { role }: { role: Role }) {
        if (!role) return message.util.send(`Please mention a role`)
        let embed = new VisionEmbed(message)
            .setDescription(`Role: ${role.name}
        Color: ${role.hexColor}
        Hoisted: ${role.hoist ? "Yes" : "No"}
        Mentionable: ${role.mentionable ? "Yes" : "No"}`)
            .setColor(role.hexColor)
            .customFooter()
        message.util.send(embed)
    }
}