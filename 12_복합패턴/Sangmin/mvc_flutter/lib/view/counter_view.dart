import 'package:flutter/material.dart';
import 'package:mvc_flutter/controller/counter_controller_interface.dart';
import 'package:mvc_flutter/model/counter_model_interface.dart';
import 'package:mvc_flutter/observer/counter_observer.dart';

class CounterView extends StatefulWidget {
  const CounterView({Key? key, required this.model, required this.controller})
      : super(key: key);
  final CounterModelInterface model;
  final CounterControllerInterface controller;

  @override
  State<CounterView> createState() => _CounterViewState();
}

class _CounterViewState extends State<CounterView> implements CounterObserver {
  @override
  void initState() {
    widget.model.registerObserver(this);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Counter'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '${widget.model.value}',
              style: Theme.of(context).textTheme.headline4,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: widget.controller.increment,
                  child: const Icon(Icons.add),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: widget.controller.decrement,
                  child: const Icon(Icons.remove),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: widget.controller.reset,
                  child: const Icon(Icons.refresh),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  void update(int value) {
    setState(() {});
  }
}
