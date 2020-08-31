import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class ReadyListener extends Listener {
  public constructor() {
    super("listeners-ready", {
      emitter: "client",
      event: "ready"
    });
  }

  public exec(message: Message) {
    let statuses: string | string[] = [
      `${this.client.prefix}help`,
      `${this.client.guilds.cache.size} guilds`,
      `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`
    ],
      i = 0;

    this.client.user.setStatus("dnd");

    console.log(`Started!`);
    this.client.guilds.cache.forEach((guild) => {
      console.log(`=> ${guild.name} - ${guild.memberCount}`)
    })

    setTimeout(() => {
      this.client.user.setActivity(statuses[i++ % statuses.length], {
        type: "WATCHING"
      });
    }, 2e5);
  }
}
