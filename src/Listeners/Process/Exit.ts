import { Listener } from "discord-akairo";

export default class UnhandledRejectionListener extends Listener {
  public constructor() {
    super("process-exit", {
      emitter: "process",
      event: "exit"
    });
  }

  public exec(code: number) {
    console.log(`Process: Exited with Error Code: ${code}`);
  }
}
