export interface Command {
  execute(): void;
  undo?(): void;
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

  undo(): void {
    this.light.off();
  }
}

export class LightOffCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.off();
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

export class GarageDoorCloseCommand implements Command {
  garageDoor: GarageDoor;

  constructor(garageDoor: GarageDoor) {
    this.garageDoor = garageDoor;
  }

  execute(): void {
    this.garageDoor.down();
  }
}

export class Stereo {
  on() {
    console.log("Stereo is on");
  }
  off() {
    console.log("Stereo is off");
  }
  setCD() {
    console.log("Stereo is set for CD input");
  }
  setDVD() {
    console.log("Stereo is set for DVD input");
  }
  setRadio() {
    console.log("Stereo is set for Radio");
  }
  setVolume(volume: number) {
    console.log(`Stereo volume set to ${volume}`);
  }
}

export class StereoOnWithCDCommand implements Command {
  stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute(): void {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }
}

export class StereoOffCommand implements Command {
  stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute(): void {
    this.stereo.off();
  }
}

export class CeilingFan {
  private location: string;
  private level: number;

  constructor(location: string) {
    this.location = location;
    this.level = 0;
  }

  public high(): void {
    this.level = 3;
    console.log(`${this.location} Ceiling Fan is on high`);
  }

  public medium(): void {
    this.level = 2;
    console.log(`${this.location} Ceiling Fan is on medium`);
  }

  public low(): void {
    this.level = 1;
    console.log(`${this.location} Ceiling Fan is on low`);
  }

  public off(): void {
    this.level = 0;
    console.log(`${this.location} Ceiling Fan is off`);
  }

  public getSpeed(): number {
    return this.level;
  }
}

export class CeilingFanHighCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.high();
  }
}

export class CeilingFanMediumCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.medium();
  }
}

export class CeilingFanLowCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.low();
  }
}

export class CeilingFanOffCommand implements Command {
  ceilingFan: CeilingFan;
  prevSpeed: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute(): void {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.off();
  }
}

export class Hottub {
  on() {
    console.log("Hottub is bubbling!");
  }
  off() {
    console.log("Hottub is cooling to 98 degrees");
  }
  circulate() {
    console.log("Hottub is circulating");
  }
  jetsOn() {
    console.log("Hottub jets are on");
  }
  jetsOff() {
    console.log("Hottub jets are off");
  }
  setTemperature(temperature: number) {
    console.log(`Hottub is heating to a steaming ${temperature} degrees`);
  }
}

export class HottubOnCommand implements Command {
  hottub: Hottub;

  constructor(hottub: Hottub) {
    this.hottub = hottub;
  }

  execute(): void {
    this.hottub.on();
  }
}

export class HottubOffCommand implements Command {
  hottub: Hottub;

  constructor(hottub: Hottub) {
    this.hottub = hottub;
  }

  execute(): void {
    this.hottub.off();
  }
}

export class HottubCirculateCommand implements Command {
  hottub: Hottub;

  constructor(hottub: Hottub) {
    this.hottub = hottub;
  }

  execute(): void {
    this.hottub.circulate();
  }
}

export class HottubJetsOnCommand implements Command {
  hottub: Hottub;

  constructor(hottub: Hottub) {
    this.hottub = hottub;
  }

  execute(): void {
    this.hottub.jetsOn();
  }
}

export class HottubJetsOffCommand implements Command {
  hottub: Hottub;

  constructor(hottub: Hottub) {
    this.hottub = hottub;
  }

  execute(): void {
    this.hottub.jetsOff();
  }
}
