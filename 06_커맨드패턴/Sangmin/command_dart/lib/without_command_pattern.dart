import 'package:command_dart/devices.dart';

/// without commands
class RemoteControlWithoutCommandPattern {
  static const int maxSlots = 7;

  List<Device> slots = List<Device>.filled(maxSlots, EmptyDevice());

  setDevice(Device device, int slot) {
    if (slot < maxSlots) {
      slots[slot] = device;
      return;
    }
    throw Exception('slot is out of range');
  }

  void onButtonWasPressed(int slot) {
    final device = slots[slot];
    if (device is EmptyDevice) {
      print('slot is empty');
    } else {
      if (device is Light) {
        device.on();
      } else if (device is TV) {
        device.on();
      } else if (device is Stereo) {
        device.on();
      } else if (device is Sprinkier) {
        device.waterOn();
      } else if (device is OutDoorLight) {
        device.on();
      } else if (device is Hottub) {
        device.jetsOn();
      } else if (device is Refrigerator) {
        device.warm();
      }
    }
  }

  void offButtonWasPressed(int slot) {
    final device = slots[slot];
    if (device is EmptyDevice) {
      print('slot is empty');
    } else {
      if (device is Light) {
        device.off();
      } else if (device is TV) {
        device.off();
      } else if (device is Stereo) {
        device.off();
      } else if (device is Sprinkier) {
        device.waterOff();
      } else if (device is OutDoorLight) {
        device.off();
      } else if (device is Hottub) {
        device.jetsOff();
      } else if (device is Refrigerator) {
        device.cool();
      }
    }
  }
}
