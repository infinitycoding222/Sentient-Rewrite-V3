import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";

import VisionEmbed from "../../Client/Utils/VisionEmbed";

export default class ErrorListener extends Listener {
  public constructor() {
    super("listeners-error-handler", {
      emitter: "commandHandler",
      event: "error"
    });
  }

  public async exec(error: Error, message: Message, cmd: Command) {
    console.error(
      `Error on command: ${cmd}. Error: ${error.message}`
    );

    return message.util?.send(
      new VisionEmbed(message).errorEmbed(
        `There was an error while trying to execute the command: \`${cmd}\`. Please report this to the developer. <@473276250815856650>\n\n\`${error.message}\``
      )
    );
  }
}
