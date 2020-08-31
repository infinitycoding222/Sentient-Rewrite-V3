import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
  Command,
  Listener,
  Inhibitor
} from "discord-akairo";
import { Message } from "discord.js";
import { owners, dbName } from "./Utils/Config";
import { config } from "dotenv";
import ms from "ms"
import moment from "moment"
import VisionEmbed from "./Utils/VisionEmbed";
import { Connection } from "typeorm"
import Database from "../Structures/Database";
import SettingsProvider from "../Structures/SettingsProvider";
import { Settings } from "../Models/Settings";

declare module "discord-akairo" {
  interface AkairoClient {
    inhibitorHandler: InhibitorHandler;
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    BotOptions: BotOptions;
    config: BotOptions;
    snipes;
    settings: SettingsProvider;
    prefix;
    ms;
    moment;
    color;
    vision;
    db: Connection;
  }
}

interface BotOptions {
  token?: string;
  owners?: string;
  prefix?: string;
  color?: number;
}

export default class VisionClient extends AkairoClient {
  public snipes = new Map();
  public prefix = "s"
  public ms;
  public moment;
  public color = 2123412;
  public vision = VisionEmbed;
  public db!: Connection;
  public settings!: SettingsProvider;

  public commandHandler: CommandHandler = new CommandHandler(this, {
    prefix: "s",
    directory: require("path").join(__dirname, "..", "Commands"),
    automateCategories: true,
    allowMention: true,
    argumentDefaults: {
      prompt: {
        modifyStart: (msg: Message, str: string) =>
          `${msg.author}, ${str}\n\nType: \`cancel\` at any time to cancel the command...`,
        modifyRetry: (msg: Message, str: string) =>
          `${msg.author}, ${str}\n\nType: \`cancel\` at any time to cancel the command...`,
        cancel: (msg: Message) =>
          `${msg.author}, I have cancelled the command for you per your request.`,
        timeout: (msg: Message) =>
          `${msg.author}, whoopies! Looks like you left me hanging there! I went ahead and cancelled the command for you!`,
        ended: (msg: Message) =>
          `${msg.author}, looks like you still haven't gotten it! I've cancelled the command for you.`,
        retries: 3,
        time: 60000
      },
      otherwise: ""
    },
    commandUtilLifetime: 300000,
    defaultCooldown: 6000,
    classToHandle: Command,
    commandUtil: true,
    handleEdits: true,
    blockBots: true,
    blockClient: true
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: require("path").join(__dirname, "..", "Listeners"),
    classToHandle: Listener
  });

  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: require("path").join(__dirname, "..", "Inhibitors"),
    classToHandle: Inhibitor
  });

  public constructor(config: BotOptions) {
    super(
      {
        ownerID: owners
      }
    );

    this.config = config;
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler)


    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process
    });

    await this.commandHandler.loadAll();
    await this.listenerHandler.loadAll();
    await this.inhibitorHandler.loadAll();
    this.db = Database.get(dbName)
    await this.db.connect();
    await this.db.synchronize();
    this.settings = new SettingsProvider(this.db.getRepository(Settings));
    await this.settings.init();
    config();
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }
}