import {
  Cheese,
  Clams,
  Dough,
  Pepperoni,
  PizzaIngredientFactory,
  Sauce,
  Veggies,
} from "./PizzaIngredientFactory";

export abstract class Pizza {
  name: string = "Unknown Pizza";

  dough: Dough;
  sauce: Sauce;
  veggies: Veggies[];
  cheese: Cheese;
  pepperoni: Pepperoni;
  clams: Clams;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    this.dough = ingredientFactory.createDough();
    this.sauce = ingredientFactory.createSauce();
    this.cheese = ingredientFactory.createCheese();
    this.veggies = ingredientFactory.createVeggies();
    this.pepperoni = ingredientFactory.createPepperoni();
    this.clams = ingredientFactory.createClam();
  }

  bake(): void {
    console.log("Bake for 25 minutes at 350");
  }

  cut(): void {
    console.log("Cutting the pizza into diagonal slices");
  }

  box(): void {
    console.log("Place pizza in official PizzaStore box");
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}

export class CheesePizza extends Pizza {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super(ingredientFactory);
    this.name = "Cheese Pizza";
  }
}

export class ClamPizza extends Pizza {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super(ingredientFactory);
    this.name = "Clam Pizza";
  }
}

export class PepperoniPizza extends Pizza {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super(ingredientFactory);
    this.name = "Pepperoni Pizza";
  }
}

export class VeggiePizza extends Pizza {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super(ingredientFactory);
    this.name = "Veggie Pizza";
  }
}
