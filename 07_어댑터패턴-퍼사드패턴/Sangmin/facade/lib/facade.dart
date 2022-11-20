class Tuner {
  void on() {
    print('Tuner on');
  }

  void off() {
    print('Tuner off');
  }

  void setAm() {
    print('Tuner setAm');
  }

  void setFm() {
    print('Tuner setFm');
  }

  void setFrequency() {
    print('Tuner setFrequency');
  }
}

class Amplifier {
  void on() {
    print('Amplifier on');
  }

  void off() {
    print('Amplifier off');
  }

  void setDvd() {
    print('Amplifier setDvd');
  }

  void setSurroundSound() {
    print('Amplifier setSurroundSound');
  }

  void setVolume() {
    print('Amplifier setVolume');
  }
}

class StreamingPlayer {
  void on() {
    print('StreamingPlayer on');
  }

  void off() {
    print('StreamingPlayer off');
  }

  void play() {
    print('StreamingPlayer play');
  }

  void pause() {
    print('StreamingPlayer pause');
  }

  void stop() {
    print('StreamingPlayer stop');
  }

  void setSurroundAudio() {
    print('StreamingPlayer setSurroundAudio');
  }

  void setTwoChannelAudio() {
    print('StreamingPlayer setTwoChannelAudio');
  }
}

class Projector {
  void on() {
    print('Projector on');
  }

  void off() {
    print('Projector off');
  }

  void wideScreenMode() {
    print('Projector wideScreenMode');
  }

  void tvMode() {
    print('Projector tvMode');
  }
}

class Screen {
  void up() {
    print('Screen up');
  }

  void down() {
    print('Screen down');
  }
}

class PopcornPopper {
  void on() {
    print('PopcornPopper on');
  }

  void off() {
    print('PopcornPopper off');
  }

  void pop() {
    print('PopcornPopper pop');
  }
}

class TheaterLights {
  void on() {
    print('TheaterLights on');
  }

  void off() {
    print('TheaterLights off');
  }

  void dim() {
    print('TheaterLights dim');
  }
}

class HomeTheaterFacade {
  final Amplifier _amplifier;
  final Tuner _tuner;
  final StreamingPlayer _streamingPlayer;
  final Projector _projector;
  final Screen _screen;
  final TheaterLights _theaterLights;
  final PopcornPopper _popcornPopper;

  HomeTheaterFacade(
    this._amplifier,
    this._tuner,
    this._streamingPlayer,
    this._projector,
    this._screen,
    this._theaterLights,
    this._popcornPopper,
  );

  void watchMovie() {
    _popcornPopper.on();
    _popcornPopper.pop();
    _theaterLights.dim();
    _screen.down();
    _projector.on();
    _projector.wideScreenMode();
    _amplifier.on();
    _amplifier.setDvd();
    _amplifier.setSurroundSound();
    _amplifier.setVolume();
    _streamingPlayer.on();
    _streamingPlayer.play();
  }

  void endMovie() {
    _popcornPopper.off();
    _theaterLights.on();
    _screen.up();
    _projector.off();
    _amplifier.off();
    _streamingPlayer.stop();
    _streamingPlayer.off();
  }

  void listenToRadio() {
    _tuner.on();
    _tuner.setFm();
    _tuner.setFrequency();
    _amplifier.on();
    _amplifier.setVolume();
  }

  void endRadio() {
    _tuner.off();
    _amplifier.off();
  }
}
