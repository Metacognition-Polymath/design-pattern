import 'package:state_pattern_dart/gumball_machine.dart';
import 'package:state_pattern_dart/states/state.dart';

class NoQuarterState implements State {
  NoQuarterState(this.gumballMachine);

  final GumBallMachine gumballMachine;

  @override
  void insertQuarter() {
    print('동전을 넣으셨습니다.');
    gumballMachine.state = gumballMachine.hasQuarterState;
  }

  @override
  void ejectQuarter() {
    print('동전이 없습니다.');
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
    print('알맹이가 들어있습니다.');
  }
}
