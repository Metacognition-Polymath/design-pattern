import 'package:mvc_flutter/model/counter_model_interface.dart';
import 'package:mvc_flutter/observer/counter_observer.dart';

/// 컨트롤러로부터 요청을 받아 모델을 변경하고, 변경된 모델을 뷰에게 알린다.
class CounterModel implements CounterModelInterface {
  int _value = 0;
  final List<CounterObserver> _observers = [];

  @override
  void increase() {
    _value++;
    notify();
  }

  @override
  void decrease() {
    _value--;
    notify();
  }

  @override
  void reset() {
    _value = 0;
    notify();
  }

  @override
  int get value => _value;

  @override
  void registerObserver(CounterObserver observer) {
    _observers.add(observer);
  }

  @override
  void removeObserver(CounterObserver observer) {
    _observers.remove(observer);
  }

  void notify() {
    for (var observer in _observers) {
      observer.update(_value);
    }
  }
}
