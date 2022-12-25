import 'package:bloc_counter/feature/counter/bloc/counter_bloc.dart';
import 'package:bloc_counter/feature/counter/view/counter_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CounterPage extends StatelessWidget {
  const CounterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider<CounterBloc>(
      create: (context) => CounterBloc(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Counter App'),
        ),
        body: const CounterView(),
      ),
    );
  }
}
