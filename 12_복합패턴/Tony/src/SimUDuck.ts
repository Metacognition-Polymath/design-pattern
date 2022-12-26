interface Quackable {
  quack(): void;
}

class MallardDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class RedheadDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class DuckCall implements Quackable {
  quack() {
    console.log("Kwak");
  }
}

class RubberDuck implements Quackable {
  quack() {
    console.log("Squeak");
  }
}

// run duck simulator
// const mallardDuck = new MallardDuck();
// const redheadDuck = new RedheadDuck();
// const duckCall = new DuckCall();
// const rubberDuck = new RubberDuck();

// mallardDuck.quack();
// redheadDuck.quack();
// duckCall.quack();
// rubberDuck.quack();

// Add goose
class Goose {
  honk() {
    console.log("Honk");
  }
}

// Add goose adapter
class GooseAdapter implements Quackable {
  private goose: Goose;

  constructor(goose: Goose) {
    this.goose = goose;
  }

  quack() {
    this.goose.honk();
  }
}

// Duck simulator with goose
// const goose = new Goose();
// const gooseDuck = new GooseAdapter(goose);
// gooseDuck.quack();

// decorator
class QuackCounter implements Quackable {
  static numberOfQuacks = 0;
  private duck: Quackable;

  constructor(duck: Quackable) {
    this.duck = duck;
  }

  quack() {
    this.duck.quack();
    QuackCounter.numberOfQuacks++;
  }

  static getQuacks() {
    return QuackCounter.numberOfQuacks;
  }
}

// Duck simulator with decorator
// const mallardDuck2 = new QuackCounter(new MallardDuck());
// const redheadDuck2 = new QuackCounter(new RedheadDuck());
// const duckCall2 = new QuackCounter(new DuckCall());
// const rubberDuck2 = new QuackCounter(new RubberDuck());
// const gooseDuck2 = new GooseAdapter(new Goose()); // goose is not counted

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);

// mallardDuck2.quack();
// redheadDuck2.quack();
// duckCall2.quack();
// rubberDuck2.quack();
// gooseDuck2.quack();

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);

// factory

abstract class AbstractDuckFactory {
  abstract createMallardDuck(): Quackable;
  abstract createRedheadDuck(): Quackable;
  abstract createDuckCall(): Quackable;
  abstract createRubberDuck(): Quackable;
}

// class DuckFactory extends AbstractDuckFactory {
//   createMallardDuck() {
//     return new MallardDuck();
//   }

//   createRedheadDuck() {
//     return new RedheadDuck();
//   }

//   createDuckCall() {
//     return new DuckCall();
//   }

//   createRubberDuck() {
//     return new RubberDuck();
//   }
// }

// counting duck factory
// 모든 메소드에서 Quackable 객체를 꽥꽥 소리 낸 횟수를 세는 데코레이터로 감쌉니다
// 시뮬레이터는 조금 다른 객체가 리턴되었다는 사실을 전혀 알 수 없습니다
class CountingDuckFactory extends AbstractDuckFactory {
  createMallardDuck() {
    return new QuackCounter(new MallardDuck());
  }

  createRedheadDuck() {
    return new QuackCounter(new RedheadDuck());
  }

  createDuckCall() {
    return new QuackCounter(new DuckCall());
  }

  createRubberDuck() {
    return new QuackCounter(new RubberDuck());
  }
}

// Duck simulator with factory
// const duckFactory = new CountingDuckFactory();
// const mallardDuck3 = duckFactory.createMallardDuck();
// const redheadDuck3 = duckFactory.createRedheadDuck();
// const duckCall3 = duckFactory.createDuckCall();
// const rubberDuck3 = duckFactory.createRubberDuck();
// const gooseDuck3 = new GooseAdapter(new Goose()); // goose is not counted

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);

// mallardDuck3.quack();
// redheadDuck3.quack();
// duckCall3.quack();
// rubberDuck3.quack();
// gooseDuck3.quack();

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);

// 오리 무리를 관리하는 기능 - Composite 패턴
class Flock implements Quackable {
  private quackers: Quackable2[] = [];

  add(duck: Quackable2) {
    this.quackers.push(duck);
  }

  quack() {
    // this.quackers.forEach((duck) => duck.quack());
    // console.log("Symbol.iterator", Symbol.iterator);
    const _iterator = this.quackers[Symbol.iterator]();
    while (true) {
      const { value, done } = _iterator.next();
      if (done) break;
      value.quack();
    }
  }

  registerObserver(observer: Observer) {
    this.quackers.forEach((duck) => duck.registerObserver(observer));
  }
}

// Duck simulator with composite
// const flockOfMallards = new Flock();
// flockOfMallards.add(duckFactory.createMallardDuck());
// flockOfMallards.add(duckFactory.createRubberDuck());

// flockOfMallards.quack();

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);

// 14. 오리를 개별로 관찰하기 위해 옵저버 패턴을 사용합니다

interface Observer {
  update(duck: QuackObservable): void;
}

interface QuackObservable {
  registerObserver(observer: Observer): void;
  notifyObservers(): void;
}

interface Quackable2 extends QuackObservable {
  quack(): void;
}

class Observable implements QuackObservable {
  private observers: Observer[] = [];
  duck: QuackObservable;

  constructor(duck: QuackObservable) {
    this.duck = duck;
  }

  registerObserver(observer: Observer) {
    this.observers.push(observer); // 옵저버 등록 코드
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this)); // 연락을 돌리는 코드
  }
}

// 16. Observer 보조 객체와 Quackable 클래스를 결합합니다
class MallardDuck4 implements Quackable {
  observable: Observable;

  constructor() {
    this.observable = new Observable(this);
  }

  quack() {
    console.log("Quack");
    this.notifyObservers();
  }

  registerObserver(observer: Observer) {
    this.observable.registerObserver(observer);
  }

  notifyObservers() {
    this.observable.notifyObservers();
  }
}

class Quackologist implements Observer {
  update(duck: QuackObservable) {
    console.log("Quackologist: ", duck);
  }
}

// Duck simulator with observe
// const flockOfDuck = new Flock();
// const duckFactory = new CountingDuckFactory();
// flockOfDuck.add(duckFactory.createMallardDuck());
// flockOfDuck.add(duckFactory.createRubberDuck());

// flockOfDuck.quack();

// const quackologist = new Quackologist();

// flockOfDuck.registerObserver(quackologist);

// console.log("QuackCounter.numberOfQuacks: ", QuackCounter.numberOfQuacks);
