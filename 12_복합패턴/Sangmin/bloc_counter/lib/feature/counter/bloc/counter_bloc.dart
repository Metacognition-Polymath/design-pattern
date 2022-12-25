import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'counter_event.dart';
part 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(const CounterState(count: 0)) {
    on<CounterIcremented>(_onCounterIcremented);
    on<CounterDecremented>(_onCounterDecremented);
    on<CounterReseted>(_onCounterReseted);
  }

  void _onCounterIcremented(
      CounterIcremented event, Emitter<CounterState> emit) {
    emit(state.copyWith(count: state.count + 1));
  }

  void _onCounterDecremented(
      CounterDecremented event, Emitter<CounterState> emit) {
    emit(state.copyWith(count: state.count - 1));
  }

  void _onCounterReseted(CounterReseted event, Emitter<CounterState> emit) {
    emit(const CounterState(count: 0));
  }
}
