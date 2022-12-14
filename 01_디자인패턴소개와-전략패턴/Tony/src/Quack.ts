export interface QuackBehavior {
  quack(): void;
}

export class Quack implements QuackBehavior {
  quack() {
    console.log("꽥꽥");
  }
}

export class Squeak implements QuackBehavior {
  quack() {
    console.log("삑삑");
  }
}

export class MuteQuack implements QuackBehavior {
  quack() {
    console.log("소리를 내지 않습니다.");
  }
}
