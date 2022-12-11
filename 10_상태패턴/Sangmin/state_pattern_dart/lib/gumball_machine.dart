import 'states/has_quarter_state.dart';
import 'states/no_quarter_state.dart';
import 'states/sold_out_state.dart';
import 'states/sold_state.dart';
import 'states/state.dart';
import 'states/winnder_state.dart';

class GumBallMachine {
  GumBallMachine(this.count) {
    soldOutState = SoldOutState(this);
    noQuarterState = NoQuarterState(this);
    hasQuarterState = HasQuarterState(this);
    soldState = SoldState(this);
    winnerState = WinnerState(this);
    if (count > 0) {
      state = noQuarterState;
    } else {
      state = soldOutState;
    }
  }

  late State soldOutState;
  late State noQuarterState;
  late State hasQuarterState;
  late State soldState;
  late State winnerState;
  int count;
  late State state;

  void insertQuarter() {
    state.insertQuarter();
  }

  void ejectQuarter() {
    state.ejectQuarter();
  }

  void turnCrank() {
    state.turnCrank();
    state.dispense();
  }

  void refill(int count) {
    this.count = count;
    state.refill();
  }

  void setState(State state) {
    this.state = state;
  }

  void releaseBall() {
    print('알맹이가 나갑니다.');
    if (count != 0) {
      count--;
    }
  }

  // getter
  State getSoldOutState() => soldOutState;
  State getNoQuarterState() => noQuarterState;
  State getHasQuarterState() => hasQuarterState;
  State getSoldState() => soldState;
  State getWinnerState() => winnerState;
  int getCount() => count;
}
