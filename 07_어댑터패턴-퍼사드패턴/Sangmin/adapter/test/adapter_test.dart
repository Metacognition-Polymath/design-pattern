import 'package:adapter/adapter.dart';
import 'package:test/test.dart';

void main() {
  test('TurkeyAdapter', () {
    final turkey = WildTurkey();
    Duck duck = TurkeyAdapter(turkey);

    duck.quack();
    duck.fly();
  });

  test('DuckAdapter', () {
    final duck = MallardDuck();
    Turkey turkey = DuckAdapter(duck: duck);

    turkey.fly();
    turkey.gobble();
  });
}
