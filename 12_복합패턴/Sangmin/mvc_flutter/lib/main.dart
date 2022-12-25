import 'package:flutter/material.dart';
import 'package:mvc_flutter/controller/counter_controller.dart';
import 'package:mvc_flutter/model/counter_model.dart';
import 'package:mvc_flutter/view/counter_view.dart';

void main() {
  final model = CounterModel();
  runApp(MaterialApp(
      home: CounterView(
    model: model,
    controller: CounterController(model),
  )));
}
