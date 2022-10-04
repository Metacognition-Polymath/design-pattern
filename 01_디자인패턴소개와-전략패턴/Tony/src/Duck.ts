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
