abstract class Duck {
  void quack();
  void fly();
}

class MallardDuck implements Duck {
  @override
  void fly() {
    print("I'm flying");
  }

  @override
  void quack() {
    print("Quack");
  }
}

abstract class Turkey {
  void gobble();
  void fly();
}

class WildTurkey implements Turkey {
  @override
  void fly() {
    print("I'm flying a short distance");
  }

  @override
  void gobble() {
    print("Gobble gobble");
  }
}

class TurkeyAdapter implements Duck {
  Turkey turkey;

  TurkeyAdapter(this.turkey);

  @override
  void fly() {
    for (int i = 0; i < 5; i++) {
      turkey.fly();
    }
  }

  @override
  void quack() {
    turkey.gobble();
  }
}

class DuckAdapter implements Turkey {
  const DuckAdapter({required this.duck});

  final Duck duck;

  @override
  void fly() {
    duck.fly();
  }

  @override
  void gobble() {
    duck.quack();
  }
}
