import 'package:bloc_counter/feature/counter/bloc/counter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CounterView extends StatelessWidget {
  const CounterView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Text(
            'You have pushed the button this many times:',
          ),
          _CounterDisplay(),
          _CounterAction(),
        ],
      ),
    );
  }
}

class _CounterDisplay extends StatelessWidget {
  const _CounterDisplay();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Text(
          '${state.count}',
          style: Theme.of(context).textTheme.headline4,
        );
      },
    );
  }
}

class _CounterAction extends StatelessWidget {
  const _CounterAction({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        FloatingActionButton(
          onPressed: () {
            context.read<CounterBloc>().add(const CounterIcremented());
          },
          tooltip: 'Increment',
          child: const Icon(Icons.add),
        ),
        const SizedBox(width: 8),
        FloatingActionButton(
          onPressed: () {
            context.read<CounterBloc>().add(const CounterDecremented());
          },
          tooltip: 'Decrement',
          child: const Icon(Icons.remove),
        ),
        const SizedBox(width: 8),
        FloatingActionButton(
          onPressed: () {
            context.read<CounterBloc>().add(const CounterReseted());
          },
          tooltip: 'Reset',
          child: const Icon(Icons.refresh),
        ),
      ],
    );
  }
}
