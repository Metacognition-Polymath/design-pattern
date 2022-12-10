import 'package:state_pattern_dart/gumball_machine.dart';
import 'package:state_pattern_dart/states/state.dart';

class WinnerState implements State {
  GumBallMachine gumballMachine;

  WinnerState(this.gumballMachine);

  @override
  void dispense() {
    gumballMachine.releaseBall();
    if (gumballMachine.count == 0) {
      gumballMachine.state = gumballMachine.soldOutState;
    } else {
      gumballMachine.releaseBall();
      print("축하드립니다! 알맹이를 하나 더 받으실 수 있습니다.");
      if (gumballMachine.count > 0) {
        gumballMachine.state = gumballMachine.noQuarterState;
      } else {
        print("더 이상 알맹이가 없습니다.");
        gumballMachine.state = gumballMachine.soldOutState;
      }
    }
  }

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
  void refill() {
    print('이미 알맹이가 들어있습니다.');
  }
}
