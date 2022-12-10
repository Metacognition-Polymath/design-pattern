import 'package:state_pattern_dart/gumball_machine.dart';
import 'package:state_pattern_dart/states/state.dart';

class SoldState implements State {
  GumBallMachine gumballMachine;

  SoldState(this.gumballMachine);

  @override
  void insertQuarter() {
    print('잠깐만 기다려 주세요. 알맹이가 나가고 있습니다.');
  }

  @override
  void ejectQuarter() {
    print('이미 알맹이를 뽑으셨습니다.');
  }

  @override
  void turnCrank() {
    print('손잡이는 한 번만 돌려주세요.');
  }

  @override
  void dispense() {
    gumballMachine.releaseBall();
    if (gumballMachine.count > 0) {
      gumballMachine.setState(gumballMachine.getNoQuarterState());
    } else {
      print('Oops, out of gumballs!');
      gumballMachine.setState(gumballMachine.getSoldOutState());
    }
  }

  @override
  void refill() {
    print('이미 알맹이가 들어있습니다.');
  }
}
