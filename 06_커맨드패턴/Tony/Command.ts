export interface Command {
  execute(): void;
}

export class DummyCommand implements Command {
  execute(): void {
    console.log("DummyCommand.execute()");
  }
}

export class Light {
  on() {
    console.log("Light On");
  }
  off() {
    console.log("Light Off");
  }
}

// 조명을 켤 때 필요한 커맨드 클래스 구현
export class LightOnCommand implements Command {
  light: Light; // 리시버

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.on();
  }
}

export class GarageDoor {
  up() {
    console.log("Garage Door is Open");
  }
  down() {
    console.log("Garage Door is Closed");
  }
  stop() {
    console.log("Garage Door is Stopped");
  }
  lightOn() {
    console.log("Garage light is on");
  }
  lightOff() {
    console.log("Garage light is off");
  }
}

export class GarageDoorOpenCommand implements Command {
  garageDoor: GarageDoor;

  constructor(garageDoor: GarageDoor) {
    this.garageDoor = garageDoor;
  }

  execute(): void {
    this.garageDoor.up();
  }
}
