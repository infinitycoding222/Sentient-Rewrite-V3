import { Listener } from "discord-akairo";

export default class UnhandledRejectionListener extends Listener {
  public constructor() {
    super("process-warning", {
      emitter: "process",
      event: "warning"
    });
  }

  public exec(warning: Error) {
    console.log(
      `Process Warning: ${warning.message} at ${warning.stack}`
    );
  }
}
