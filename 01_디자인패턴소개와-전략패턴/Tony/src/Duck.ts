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

interface Flyable {
  fly(): void;
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
