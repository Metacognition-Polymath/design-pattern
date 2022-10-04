class Duck {
  constructor() {}

  quack() {
    console.log("꽥꽥");
  }
  swim() {
    console.log("수영");
  }
  display() {
    console.log("오리");
  }
  fly() {
    console.log("날다");
  }
}

class MallardDuck extends Duck {
  constructor() {
    super();
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
}
