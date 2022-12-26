import { CounterModel } from "./counterModel";
import { CounterView } from "./counterView";

// MVC counter controller
export class CounterController {
  private model: CounterModel;
  private view: CounterView;

  constructor(model: CounterModel) {
    this.model = model;
    this.view = new CounterView(this.model, this);
    this.model.addListener(this.view);
  }

  public increase() {
    this.model.increase();
  }

  public decrease() {
    this.model.decrease();
  }

  public getView() {
    return this.view;
  }
}
