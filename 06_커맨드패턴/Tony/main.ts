import {
  GarageDoor,
  GarageDoorOpenCommand,
  Light,
  LightOnCommand,
} from "./Command";
import { SimpleRemoteControl } from "./Invoker";

const remote = new SimpleRemoteControl();
const light = new Light();
const lightOn = new LightOnCommand(light);
remote.setCommand(lightOn);
remote.buttonWasPressed();

// garage door
remote.setCommand(new GarageDoorOpenCommand(new GarageDoor()));
remote.buttonWasPressed();
