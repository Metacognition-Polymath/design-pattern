interface Duck {
  quack(): void;
  fly(): void;
}

class MallardDuck implements Duck {
  quack() {
    console.log("Quack");
  }
  fly() {
    console.log("I'm flying");
  }
}

interface Turkey {
  gobble(): void;
  fly(): void;
}

class WildTurkey implements Turkey {
  gobble() {
    console.log("Gobble gobble");
  }
  fly() {
    console.log("I'm flying a short distance");
  }
}

class TurkeyAdapter implements Duck {
  turkey: Turkey;
  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }
  quack() {
    this.turkey.gobble();
  }
  fly() {
    // 칠면조는 오리처럼 멀지 날지 못하기 때문에 Turkey의 fly를 Duck의 fly에 대응 시키려고 5번 호출한다.
    for (let i = 0; i < 5; i++) {
      this.turkey.fly();
    }
  }
}

const duck = new MallardDuck();
const turkey = new WildTurkey();
const turkeyAdapter = new TurkeyAdapter(turkey);

const testDuck = (duck: Duck) => {
  duck.quack();
  duck.fly();
};

console.log("The Turkey says...");
turkey.gobble();
turkey.fly();

console.log("The Duck says...");
testDuck(duck);

console.log("The TurkeyAdapter says...");
testDuck(turkeyAdapter); // TurkeyAdapter는 Duck 인터페이스를 구현했기 때문에 Duck 타입으로 사용할 수 있다.
