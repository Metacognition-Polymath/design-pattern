import {
  CheesePizza,
  ClamPizza,
  PepperoniPizza,
  Pizza,
  VeggiePizza,
} from "./Pizza";
import { NYPizzaIngredientFactory } from "./PizzaIngredientFactory";

// make pizza store factory
export abstract class PizzaStore {
  orderPizza(type: string): Pizza {
    let pizza: Pizza;

    pizza = this.createPizza(type);
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
    const nyIngredientFactory = new NYPizzaIngredientFactory();

    if (type === "cheese") {
      pizza = new CheesePizza(nyIngredientFactory);
      pizza.setName("New York Style Cheese Pizza");
    } else if (type === "clam") {
      pizza = new ClamPizza(nyIngredientFactory);
      pizza.setName("New York Style Clam Pizza");
    } else if (type === "pepperoni") {
      pizza = new PepperoniPizza(nyIngredientFactory);
      pizza.setName("New York Style Pepperoni Pizza");
    } else if (type === "veggie") {
      pizza = new VeggiePizza(nyIngredientFactory);
      pizza.setName("New York Style Veggie Pizza");
    } else {
      throw new Error("No such pizza");
    }

    return pizza;
  }
}
