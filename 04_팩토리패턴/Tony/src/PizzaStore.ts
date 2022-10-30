import {
  NYStyleCheesePizza,
  NYStyleClamPizza,
  NYStylePepperoniPizza,
  NYStyleVeggiePizza,
  Pizza,
} from "./Pizza";

// make pizza store factory
export abstract class PizzaStore {
  orderPizza(type: string): Pizza {
    let pizza: Pizza;

    pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  // factory method
  abstract createPizza(type: string): Pizza;
}

export class NYPizzaStore extends PizzaStore {
  createPizza(type: string): Pizza {
    let pizza: Pizza;

    if (type === "cheese") {
      pizza = new NYStyleCheesePizza();
    } else if (type === "veggie") {
      pizza = new NYStyleVeggiePizza();
    } else if (type === "clam") {
      pizza = new NYStyleClamPizza();
    } else if (type === "pepperoni") {
      pizza = new NYStylePepperoniPizza();
    } else {
      throw new Error("Unknown pizza type");
    }

    return pizza;
  }
}
