import '../lib/without_state_pattern_dart.dart';

void main(List<String> arguments) {
  GumballMachine gumballMachine = GumballMachine(5);
  gumballMachine.printState();
  print('--------------------------');
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.printState();
  print('--------------------------');
  gumballMachine.insertQuarter();
  gumballMachine.ejectQuarter();
  gumballMachine.turnCrank(); // 동전이 없는 상태에서 손잡이 돌리기
  gumballMachine.printState();
  print('--------------------------');

  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.ejectQuarter(); // 동전이 없는 상태에서 동전 반환
  gumballMachine.printState();
  print('--------------------------');

  gumballMachine.insertQuarter();
  gumballMachine.insertQuarter(); // 동전이 있는 상태에서 동전 투입
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.printState();
}
