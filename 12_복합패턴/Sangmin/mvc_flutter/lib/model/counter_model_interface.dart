import 'package:mvc_flutter/observer/counter_observer.dart';

abstract class CounterModelInterface {
  void increase();
  void decrease();
  void reset();
  int get value;

  registerObserver(CounterObserver observer);
  removeObserver(CounterObserver observer);
}
