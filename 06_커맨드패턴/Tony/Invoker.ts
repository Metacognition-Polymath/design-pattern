import { Command, DummyCommand, Light, LightOnCommand } from "./Command";

export class SimpleRemoteControl {
  private slot: Command;

  constructor() {
    this.slot = new DummyCommand();
  }

  public setCommand(command: Command): void {
    this.slot = command;
  }

  public buttonWasPressed(): void {
    this.slot.execute();
  }
}
