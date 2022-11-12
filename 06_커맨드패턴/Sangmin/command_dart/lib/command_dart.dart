import 'package:command_dart/devices.dart';

/// 커맨드 인터페이스
abstract class Command {
  void execute();
  void undo();
}

/// 빈 커맨드
class NoCommand implements Command {
  @override
  void execute() {
    print('No command');
  }

  @override
  void undo() {
    print('No command');
  }
}

/// 라이트 커맨드
class LightOnCommand implements Command {
  Light light;

  LightOnCommand(this.light);

  @override
  void execute() {
    light.on();
  }

  @override
  void undo() {
    light.off();
  }
}

class LightOffCommand implements Command {
  Light light;

  LightOffCommand(this.light);

  @override
  void execute() {
    light.off();
  }

  @override
  void undo() {
    light.on();
  }
}

/// TV 커맨드
class TVOnCommand implements Command {
  TV tv;

  TVOnCommand(this.tv);

  @override
  void execute() {
    tv.on();
  }

  @override
  void undo() {
    tv.off();
  }
}

class TVOffCommand implements Command {
  TV tv;

  TVOffCommand(this.tv);

  @override
  void execute() {
    tv.off();
  }

  @override
  void undo() {
    tv.on();
  }
}

/// 스테레오 커맨드
class StereoOnCommand implements Command {
  Stereo stereo;

  StereoOnCommand(this.stereo);

  @override
  void execute() {
    stereo.on();
  }

  @override
  void undo() {
    stereo.off();
  }
}

class StereoOffCommand implements Command {
  Stereo stereo;

  StereoOffCommand(this.stereo);

  @override
  void execute() {
    stereo.off();
  }

  @override
  void undo() {
    stereo.on();
  }
}

/// 스프링커 커맨드
class SprinkierOnCommand implements Command {
  Sprinkier sprinkier;

  SprinkierOnCommand(this.sprinkier);

  @override
  void execute() {
    sprinkier.waterOn();
  }

  @override
  void undo() {
    sprinkier.waterOff();
  }
}

class SprinkierOffCommand implements Command {
  Sprinkier sprinkier;

  SprinkierOffCommand(this.sprinkier);

  @override
  void execute() {
    sprinkier.waterOff();
  }

  @override
  void undo() {
    sprinkier.waterOn();
  }
}

/// 아웃도어 라이트 커맨드
class OutDoorLightOnCommand implements Command {
  OutDoorLight outDoorLight;

  OutDoorLightOnCommand(this.outDoorLight);

  @override
  void execute() {
    outDoorLight.on();
  }

  @override
  void undo() {
    outDoorLight.off();
  }
}

class OutDoorLightOffCommand implements Command {
  OutDoorLight outDoorLight;

  OutDoorLightOffCommand(this.outDoorLight);

  @override
  void execute() {
    outDoorLight.off();
  }

  @override
  void undo() {
    outDoorLight.on();
  }
}

/// 핫텁 커맨드
class HottubOnCommand implements Command {
  Hottub hottub;

  HottubOnCommand(this.hottub);

  @override
  void execute() {
    hottub.jetsOn();
  }

  @override
  void undo() {
    hottub.jetsOff();
  }
}

class HottubOffCommand implements Command {
  Hottub hottub;

  HottubOffCommand(this.hottub);

  @override
  void execute() {
    hottub.jetsOff();
  }

  @override
  void undo() {
    hottub.jetsOn();
  }
}

/// 냉장고 커맨드
class RefrigeratorOnCommand implements Command {
  Refrigerator refrigerator;

  RefrigeratorOnCommand(this.refrigerator);

  @override
  void execute() {
    refrigerator.warm();
  }

  @override
  void undo() {
    refrigerator.cool();
  }
}

class RefrigeratorOffCommand implements Command {
  Refrigerator refrigerator;

  RefrigeratorOffCommand(this.refrigerator);

  @override
  void execute() {
    refrigerator.cool();
  }

  @override
  void undo() {
    refrigerator.warm();
  }
}

/// 핫텁 & Stereo 커맨드
class HottubStereoOnCommand implements Command {
  Hottub hottub;
  Stereo stereo;

  HottubStereoOnCommand(this.hottub, this.stereo);

  @override
  void execute() {
    hottub.jetsOn();
    stereo.on();
  }

  @override
  void undo() {
    hottub.jetsOff();
    stereo.off();
  }
}

class HottubStereoOffCommand implements Command {
  Hottub hottub;
  Stereo stereo;

  HottubStereoOffCommand(this.hottub, this.stereo);

  @override
  void execute() {
    hottub.jetsOff();
    stereo.off();
  }

  @override
  void undo() {
    hottub.jetsOn();
    stereo.on();
  }
}

class MacroCommand implements Command {
  List<Command> commands;

  MacroCommand(this.commands);

  @override
  void execute() {
    for (var command in commands) {
      command.execute();
    }
  }

  @override
  void undo() {
    for (var command in commands) {
      command.undo();
    }
  }
}

/// SimpleRemoteControl 클래스는 Command 인터페이스를 통해
/// 모든 종류의 커맨드를 받을 수 있습니다.
/// 이는 SimpleRemoteControl 클래스가 어떤 커맨드가 실행되는지 알 필요가 없음을 의미합니다.
/// 이는 커맨드 패턴의 핵심입니다.
/// SimpleRemoteControl 클래스는 커맨드 객체를 실행하는 방법만 알면 됩니다.
/// 커맨드 객체가 어떤 일을 하는지 알 필요가 없습니다.
/// 이는 커맨드 객체가 어떤 장치를 제어하는지 알 필요가 없음을 의미합니다.
/// 이러한 클래스를 커맨드 패턴에서는 'invoker'라고 부릅니다.
class RemoteControl {
  RemoteControl() {
    onCommands = List.generate(7, (index) => NoCommand());
    offCommands = List.generate(7, (index) => NoCommand());
  }
  static int maxSlots = 7;

  List<Command> onCommands = [];
  List<Command> offCommands = [];

  // undoCommand는 undo()를 위해 사용됩니다.
  Command? undoCommand;

  void setCommand(int slot, Command onCommand, Command offCommand) {
    onCommands[slot] = onCommand;
    offCommands[slot] = offCommand;
  }

  void onButtonWasPressed(int slot) {
    onCommands[slot].execute();
    undoCommand = onCommands[slot];
  }

  void offButtonWasPressed(int slot) {
    offCommands[slot].execute();
    undoCommand = offCommands[slot];
  }

  void undoButtonWasPressed() {
    undoCommand?.undo();
  }
}
