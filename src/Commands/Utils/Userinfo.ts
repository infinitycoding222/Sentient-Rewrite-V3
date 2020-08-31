import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, User } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class UserinfoCommand extends Command {
  public constructor() {
    super("userinfo", {
      aliases: ["userinfo", "whois", "info"],
      args: [
        {
          id: "member",
          type: "member",
          default: _ => _.member
        }
      ],
      description: {
        content:
          "Displays the user information on yourself, or a mentioned member",
        usage: "userinfo <member>",
        examples: [
          "userinfo Clientboot",
          "userinfo 123456789012345678",
          "userinfo @mee6",
          "userinfo"
        ]
      },
      channel: "guild"
    });
  }

  public exec(message: Message, { member }: { member: GuildMember }) {
    let status = {
      online: "Online",
      idle: `Idle / Away`,
      dnd: `Do Not Disturb`,
      offline: `Offline / Invisible`
    }
    let embed = new VisionEmbed(message)
      .customFooter()
      .setAuthor(`${member.user.username} Information`, member.user.displayAvatarURL({ dynamic: true }))
      .addField(`User Information`, [
        `**Username, Tag & ID:** ${member.user.tag} (${member.user.id})`,
        `**Created At:** ${member.user.createdAt.toLocaleString("en-Gb")}`,
        `**Status:** ${status[member.presence.status]}`,
        `**Nickname:** ${member.nickname || "None"}`,
        `**Bot:** ${member.user.bot ? "Yes" : "No"}`,

      ])
      .addField(`Server Member Information`, [
        `**Joined Server:** ${member.joinedAt.toLocaleString("en-Gb")}`,
        `**Boosted:** ${member.premiumSince || "Not Boosted"}`,
        `**Roles:** ${member.roles.cache.sort((a, b) => b.position - a.position).first(20).map(x => x.toString()).slice(0, -1).join(", ")}`,
      ])
      .setColor(member.displayHexColor || this.client.color)
    message.util.send(embed)
  }
}
