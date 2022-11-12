abstract class Device {}

class EmptyDevice extends Device {}

class Light extends Device {
  void on() {
    print('Light is on');
  }

  void off() {
    print('Light is off');
  }
}

class TV extends Device {
  void on() {
    print('TV on');
  }

  void off() {
    print('TV off');
  }

  void setInputChannel() {
    print('Set input channel');
  }
}

class OutDoorLight extends Device {
  void on() {
    print('OutDoorLight on');
  }

  void off() {
    print('OutDoorLight off');
  }
}

class Sprinkier extends Device {
  void waterOn() {
    print('Sprinkier on');
  }

  void waterOff() {
    print('Sprinkier off');
  }
}

class Stereo extends Device {
  void on() {
    print('Stereo on');
  }

  void off() {
    print('Stereo off');
  }

  void setCD() {
    print('Set CD');
  }

  void setVolume() {
    print('Set Volume');
  }
}

class Hottub extends Device {
  void circulate() {
    print('Circulate');
  }

  void jetsOn() {
    print('Hottub Jets on');
  }

  void jetsOff() {
    print('Huttub Jets off');
  }
}

class Refrigerator extends Device {
  void cool() {
    print('Refrigerator cool');
  }

  void warm() {
    print('Refrigerator warm');
  }
}
