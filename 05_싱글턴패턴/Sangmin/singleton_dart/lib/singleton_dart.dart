class ChocolateBoiler {
  ChocolateBoiler._()
      : _empty = true,
        _boiled = false;

  static ChocolateBoiler getInstance() {
    return _instance;
  }

  static final ChocolateBoiler _instance = ChocolateBoiler._();

  // ChocolateBoiler()
  //     : _empty = true,
  //       _boiled = false;

  bool _empty;
  bool _boiled;

  bool get isEmpty => _empty;
  bool get isBoiled => _boiled;

  void boil() {
    if (!isEmpty && !isBoiled) {
      _boiled = true;
    }
  }

  void fill() {
    if (isEmpty) {
      _empty = false;
      _boiled = false;
    }
  }

  void drain() {
    if (!isEmpty && isBoiled) {
      _empty = true;
    }
  }
}
