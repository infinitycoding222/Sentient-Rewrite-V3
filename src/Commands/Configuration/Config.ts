import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"


export default class extends Command {
    public constructor() {
        super("config", {
            aliases: ["config"],
            category: "Configuration",
        })
    }
    public exec(message: Message) {
        // let ch = this.client.settings.getRaw()
    }
}