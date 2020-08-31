import { Command } from "discord-akairo";
import { Message, version as djs } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed";
import ts, { version as tsv } from "typescript"
import ms from "ms"
import moment from "moment"

export default class BotinfoCommand extends Command {
  public constructor() {
    super("botinformation", {
      aliases: ["botinfo", "botinformation"],
      args: [
        {
          id: "advanced",
          match: "flag",
          flag: ["--advanced", ":adv", "--adv", ":advanced"]
        }
      ],
      description: {
        content: "Displays the bot information",
        usage: "botinfo <:advanced>",
        examples: ["botinfo", "botinfo --advanced"]
      }
    });
  }

  public async exec(message: Message, { advanced }: { advanced: boolean }) {
    const embed = new VisionEmbed(message)
      .customFooter()
      .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .successColor()
    if (!advanced) {
      embed.addField('General Stats', [
        `**Users Count:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
        `**Server Count:** ${this.client.guilds.cache.size}`,
        `**Uptime:** ${ms(this.client.uptime, { long: true })}`,
        `**Channels Count:** ${this.client.channels.cache.size}`,
        `**Bot Created At:** ${moment.utc(this.client.user.createdTimestamp).format("LLLL")}`
      ])
      message.util.send(embed)
    } else {
      embed.addField(`Advanced Information`, [
        `**NodeJS Version:** ${process.version} [Link](https://nodejs.org)`,
        `**Discord.JS Version:** ${djs} [Link](https://discord.js.org)`,
        `**Typescript: Version:** ${tsv} [Link](https://typescriptlang.org)`,
        `**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
      ])
      message.util.send(embed)
    }
  }
}
