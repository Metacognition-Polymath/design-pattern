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

export class RemoteControl {
  private onCommands: Command[];
  private offCommands: Command[];

  constructor() {
    this.onCommands = [];
    this.offCommands = [];
  }

  public setCommand(
    slot: number,
    onCommand: Command,
    offCommand: Command
  ): void {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  public onButtonWasPushed(slot: number): void {
    this.onCommands[slot].execute();
  }

  public offButtonWasPushed(slot: number): void {
    this.offCommands[slot].execute();
  }
}
