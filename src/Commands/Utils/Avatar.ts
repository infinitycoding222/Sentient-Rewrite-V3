import { Command } from "discord-akairo";
import { Message, MessageEmbed, ImageSize } from "discord.js";
import { GuildMember } from "discord.js";
import VisionEmbed from "../../Client/Utils/VisionEmbed"

export default class extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "pfp", "profile-picture"],
            category: "Utils",
            args: [{
                id: "member",
                type: "member",
                default: _ => _.member,
                match: "rest"
            },
            {
                id: "size",
                type: (_: Message, str: string): null | Number => {
                    if (
                        str &&
                        !isNaN(Number(str)) &&
                        [16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(Number(str))
                    )
                        return Number(str);
                    return null;
                },
                match: 'option',
                flag: ['-size=', ':size=', `<size=`],
                default: 1024,
            }
            ]
        })
    }
    public exec(message: Message, { member, size }: { member: GuildMember, size: number }) {
        let embed = new VisionEmbed(message)
            .customFooter()
            .successColor()
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: size as ImageSize }))
            .setTitle(`Avatar of ${member.user.tag}`)
        message.util.send(embed)
    }
}