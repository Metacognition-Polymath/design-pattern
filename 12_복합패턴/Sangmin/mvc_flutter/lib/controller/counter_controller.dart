import 'package:mvc_flutter/controller/counter_controller_interface.dart';
import 'package:mvc_flutter/model/counter_model_interface.dart';

/// 뷰를 대상으로 하는 행동만을 정의한다.
class CounterController implements CounterControllerInterface {
  CounterModelInterface model;

  CounterController(this.model);

  @override
  void increment() {
    model.increase();
  }

  @override
  void decrement() {
    model.decrease();
  }

  @override
  void reset() {
    model.reset();
  }
}
