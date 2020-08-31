import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { Message, MessageEmbed } from "discord.js";

export default class extends Command {
    public constructor() {
        super("purge", {
            aliases: ["purge", "clear"],
            category: "Moderation",
            args: [{
                id: "one",
                type: "number",
                prompt: {
                    start: `Please provide an amount to delete`,
                    retry: `Please provide a valid amount to delete`
                }
            }
            ]
        })
    }
    public async exec(message: Message, { one }: { one: number }): Promise<Message> {
        // if (!one || isNaN(one) || one < 2 || one > 100) return message.util.send(`Please provide a **number** from \`2-100\``);
        const deleted = await message.channel.messages.fetch({ limit: one });
        message.delete();
        let ch = (message.channel as TextChannel);
        try {
            ch.bulkDelete(deleted)
        } catch (error) {
            message.util.send(`You cant delete messages that are more than 14 days old`)
        }
        return message.util.send(`Deleted: \`${deleted.size}/${one}\` messages.`)
            .then(m => m.delete({ timeout: 10000 }));

    }
}