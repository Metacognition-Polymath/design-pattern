import 'dart:math';

import 'package:state_pattern_dart/gumball_machine.dart';
import 'package:state_pattern_dart/states/state.dart';

class HasQuarterState implements State {
  Random randomWinner = Random(DateTime.now().millisecondsSinceEpoch);
  GumBallMachine gumballMachine;

  HasQuarterState(this.gumballMachine);

  @override
  void insertQuarter() {
    print("동전은 한 개만 넣어주세요.");
  }

  @override
  void ejectQuarter() {
    print("동전이 반환됩니다.");
    gumballMachine.setState(gumballMachine.getNoQuarterState());
  }

  @override
  void turnCrank() {
    print("손잡이를 돌리셨습니다.");
    int winner = randomWinner.nextInt(10);
    if ((winner == 0) && (gumballMachine.getCount() > 1)) {
      gumballMachine.setState(gumballMachine.getWinnerState());
    } else {
      gumballMachine.setState(gumballMachine.getSoldState());
    }
  }

  @override
  void dispense() {
    print("알맹이가 나갈 수 없습니다.");
  }

  @override
  void refill() {
    print('이미 알맹이가 들어있습니다.');
  }
}
