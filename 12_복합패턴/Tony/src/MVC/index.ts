import { CounterController } from "./counterController";
import { CounterModel } from "./counterModel";
import { CounterView } from "./counterView";

const btnIncrement = document.querySelector(
  "#btnIncrement"
) as HTMLButtonElement;
const btnDecrement = document.querySelector(
  "#btnDecrement"
) as HTMLButtonElement;
// const counterElement = document.querySelector("#counter") as HTMLSpanElement;

const model = new CounterModel();
const controller = new CounterController(model);

const view = controller.getView();

btnIncrement.addEventListener("click", () => {
  view.increase();
});

btnDecrement.addEventListener("click", () => {
  view.decrease();
});
