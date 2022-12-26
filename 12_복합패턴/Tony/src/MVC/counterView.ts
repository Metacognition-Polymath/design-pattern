import { CounterController } from "./counterController";
import { CounterModel } from "./counterModel";

export interface Observer {
  update: () => void;
}

export class CounterView implements Observer {
  private counterElement: HTMLElement;
  private model: CounterModel;
  private controller: CounterController;

  constructor(model: CounterModel, controller: CounterController) {
    this.model = model;
    this.controller = controller;
    this.counterElement = document.getElementById("counter")!;
  }

  public increase() {
    this.controller.increase();
  }

  public decrease() {
    this.controller.decrease();
  }

  public update() {
    console.log("update");
    this.counterElement.innerHTML = this.model.getCount().toString();
  }
}
