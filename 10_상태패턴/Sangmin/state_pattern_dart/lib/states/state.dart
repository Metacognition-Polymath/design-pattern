import '../gumball_machine.dart';

abstract class State {
  void insertQuarter();
  void ejectQuarter();
  void turnCrank();
  void dispense();
  void refill();
}

class BaseState implements State {
  GumBallMachine gumballMachine;

  BaseState(this.gumballMachine);

  @override
  void insertQuarter() {
    print('동전을 넣어주세요.');
  }

  @override
  void ejectQuarter() {
    print('동전을 넣어주세요.');
  }

  @override
  void turnCrank() {
    print('동전을 넣어주세요.');
  }

  @override
  void dispense() {
    print('동전을 넣어주세요.');
  }

  @override
  void refill() {
    print('동전을 넣어주세요.');
  }
}
