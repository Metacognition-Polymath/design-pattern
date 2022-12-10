import 'package:state_pattern_dart/gumball_machine.dart';
import 'package:state_pattern_dart/states/state.dart';

class SoldOutState implements State {
  GumBallMachine gumballMachine;

  SoldOutState(this.gumballMachine);

  @override
  void insertQuarter() {
    print('매진되었습니다. 다음 기회에 이용해주세요.');
  }

  @override
  void ejectQuarter() {
    print('동전을 반환할 수 없습니다. 동전을 넣어주세요.');
  }

  @override
  void turnCrank() {
    print('매진되었습니다. 다음 기회에 이용해주세요.');
  }

  @override
  void dispense() {
    print('알맹이를 내보낼 수 없습니다.');
  }

  @override
  void refill() {
    gumballMachine.setState(gumballMachine.noQuarterState);
  }
}
