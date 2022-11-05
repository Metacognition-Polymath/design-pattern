import 'package:singleton_dart/singleton_dart.dart';

void main(List<String> arguments) {
  final boiler1 = ChocolateBoiler.getInstance();
  final boiler2 = ChocolateBoiler.getInstance();

  print(boiler1 == boiler2);

  // final boiler1 = ChocolateBoiler();
  // final boiler2 = ChocolateBoiler();

  // print(boiler1 == boiler2);
}
