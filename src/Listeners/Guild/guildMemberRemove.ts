import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";
import { TextChannel, MessageEmbed } from "discord.js";

export default class extends Listener {
    public constructor() {
        super("guildMemberRemove", {
            emitter: "client",
            event: "guildMemberRemove",
            category: "guild"
        });
    }
    public exec(member: GuildMember): void {
        let ch = this.client.settings.get(member.guild, "config.wchannel", [])
        let cha = this.client.channels.cache.get(ch) as TextChannel;
        if (!cha) return;
        cha.send(new MessageEmbed()
            .setAuthor(`A Member Has Left!`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user.tag} has left! :(`)
            .setColor("RED"))
    }
}