import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandFinishedListener extends Listener {
  public constructor() {
    super("commandFinished", {
      emitter: "commandHandler",
      event: "commandFinished"
    });
  }

  public async exec(message: Message, cmd: Command, args: any) {
    console.debug(
      `${cmd.id} was finished in ${
      message.guild
        ? `${message.guild.name} | (${message.guild.id})`
        : `${message.author.username} | (DMS)`
      } by: ${message.author.tag} (${message.author.id}) ${
      Object.keys(args).length && !args.command
        ? `with arguments ${Object.values(args)}`
        : ""
      }`
    );
  }
}
