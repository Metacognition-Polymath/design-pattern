import 'package:command_dart/command_dart.dart';
import 'package:command_dart/devices.dart';
import 'package:command_dart/without_command_pattern.dart';

void main(List<String> arguments) {
  var remoteControlWithoutCommand = RemoteControlWithoutCommandPattern();

  remoteControlWithoutCommand.setDevice(Light(), 0);
  remoteControlWithoutCommand.setDevice(TV(), 1);
  remoteControlWithoutCommand.setDevice(Stereo(), 2);
  remoteControlWithoutCommand.setDevice(Sprinkier(), 3);
  remoteControlWithoutCommand.setDevice(OutDoorLight(), 4);
  remoteControlWithoutCommand.setDevice(Hottub(), 5);
  remoteControlWithoutCommand.setDevice(Refrigerator(), 6);

  for (var i = 0; i < RemoteControlWithoutCommandPattern.maxSlots; i++) {
    remoteControlWithoutCommand.onButtonWasPressed(i);
    remoteControlWithoutCommand.offButtonWasPressed(i);
  }
  print('-------------------------');
  var remoteControl = RemoteControl();

  remoteControl.setCommand(
      0, LightOnCommand(Light()), LightOffCommand(Light()));
  remoteControl.setCommand(1, TVOnCommand(TV()), TVOffCommand(TV()));
  remoteControl.setCommand(
      2, StereoOnCommand(Stereo()), StereoOffCommand(Stereo()));
  remoteControl.setCommand(
      3, SprinkierOnCommand(Sprinkier()), SprinkierOffCommand(Sprinkier()));
  remoteControl.setCommand(4, OutDoorLightOnCommand(OutDoorLight()),
      OutDoorLightOffCommand(OutDoorLight()));
  remoteControl.setCommand(
      5, HottubOnCommand(Hottub()), HottubOffCommand(Hottub()));

  remoteControl.setCommand(
    6,
    MacroCommand([LightOnCommand(Light()), TVOnCommand(TV())]),
    MacroCommand([LightOffCommand(Light()), TVOffCommand(TV())]),
  );

  for (var i = 0; i < RemoteControl.maxSlots; i++) {
    remoteControl.onButtonWasPressed(i);
    remoteControl.offButtonWasPressed(i);
  }
  remoteControl.undoButtonWasPressed();
}
