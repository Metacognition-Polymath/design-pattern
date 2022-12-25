part of 'counter_bloc.dart';

@immutable
abstract class CounterEvent {
  const CounterEvent();
}

class CounterIcremented extends CounterEvent {
  const CounterIcremented();
}

class CounterDecremented extends CounterEvent {
  const CounterDecremented();
}

class CounterReseted extends CounterEvent {
  const CounterReseted();
}
