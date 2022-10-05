export interface FlyBehavior {
  fly(): void;
}

export class FlyWithWings implements FlyBehavior {
  constructor() {}
  fly() {
    console.log("날개로 날아갑니다.");
  }
}

export class FlyNoWay implements FlyBehavior {
  constructor() {}
  fly() {
    console.log("날지 못합니다.");
  }
}
