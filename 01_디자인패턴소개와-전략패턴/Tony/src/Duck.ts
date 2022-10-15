import { FlyBehavior, FlyNoWay, FlyWithWings } from "./Fly";
import { MuteQuack, Quack, QuackBehavior, Squeak } from "./Quack";

export abstract class Duck {
  constructor(
    private flyBehavior: FlyBehavior,
    private quackBehavior: QuackBehavior
  ) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  performFly() {
    this.flyBehavior.fly();
  }
  performQuack() {
    // 꽥꽥거리는 행동을 위임
    this.quackBehavior.quack();
  }
  swim() {
    console.log("수영");
  }
  display() {
    console.log("오리");
  }

  setFlyBehavior(fb: FlyBehavior) {
    this.flyBehavior = fb;
  }
  setQuackBehavior(qb: QuackBehavior) {
    this.quackBehavior = qb;
  }
}

export class MallardDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }
  display() {
    console.log("청둥 오리");
  }
}

/**
 * 날 수 있음
 * 꽥꽥 소리를 냄
 */
export class RedheadDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }
  display() {
    console.log("붉은 머리 오리");
  }
}

/**
 * 날 수 없음
 * 삑삑 소리를 냄
 */
export class RubberDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new Squeak());
  }
  display() {
    console.log("고무 오리");
  }
  fly() {}
}

/**
 * 날 수 없음
 * 소리를 내지 않음
 */
export class DecoyDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new MuteQuack());
  }
  display() {
    console.log("가짜 오리");
  }
}

export class ModelDuck extends Duck {
  constructor() {
    super(new FlyNoWay(), new Quack());
  }
  display() {
    console.log("모형 오리");
  }
}
