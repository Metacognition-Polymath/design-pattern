abstract class Duck {
  public flyBehavior: FlyBehavior;
  public quackBehavior: QuackBehavior;
  constructor() {}

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

interface FlyBehavior {
  fly(): void;
}

class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("날개로 날아갑니다.");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    console.log("날지 못합니다.");
  }
}

interface QuackBehavior {
  quack(): void;
}

class Quack implements QuackBehavior {
  quack() {
    console.log("꽥꽥");
  }
}

class Squeak implements QuackBehavior {
  quack() {
    console.log("삑삑");
  }
}

class MuteQuack implements QuackBehavior {
  quack() {
    console.log("소리를 내지 않습니다.");
  }
}

class MallardDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyWithWings();
    this.quackBehavior = new Quack();
  }
  display() {
    console.log("청둥 오리");
  }
}

class RedheadDuck extends Duck {
  constructor() {
    super();
  }
  display() {
    console.log("붉은 머리 오리");
  }
}

class RubberDuck extends Duck {
  constructor() {
    super();
  }
  quack() {
    console.log("삑삑");
  }
  display() {
    console.log("고무 오리");
  }
  fly() {}
}

class DecoyDuck extends Duck {
  constructor() {
    super();
  }
  quack() {}
  display() {
    console.log("가짜 오리");
  }
  fly() {}
}
