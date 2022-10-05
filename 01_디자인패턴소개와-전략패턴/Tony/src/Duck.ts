import { FlyBehavior, FlyNoWay, FlyWithWings } from "./Fly";
import { MuteQuack, Quack, QuackBehavior, Squeak } from "./Quack";

export abstract class Duck {
  public flyBehavior: FlyBehavior; // 날아다니는 행동과
  public quackBehavior: QuackBehavior; // 꽥꽥 거리는 행동의 종류와 상관없이 동일한 인터페이스, 메서드를 사용
  constructor() {
    this.flyBehavior = new FlyNoWay(); // TS에서는 생성자에서 초기화를 해줘야 함
    this.quackBehavior = new MuteQuack(); // TS에서는 생성자에서 초기화를 해줘야 함
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
}

export class MallardDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyWithWings(); // FlyBehavior의 한 종류
    this.quackBehavior = new Quack(); // QuackBehavior의 한 종류
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
    super();
    this.flyBehavior = new FlyWithWings();
    this.quackBehavior = new Quack();
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
    super();
    this.flyBehavior = new FlyNoWay();
    this.quackBehavior = new Squeak();
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
    super();
    this.flyBehavior = new FlyNoWay();
    this.quackBehavior = new MuteQuack();
  }
  display() {
    console.log("가짜 오리");
  }
}
