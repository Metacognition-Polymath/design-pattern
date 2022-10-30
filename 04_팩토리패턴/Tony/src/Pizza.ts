export abstract class Pizza {
  name: string = "Unknown Pizza";
  dough: string = "";
  sauce: string = "";
  toppings: string[] = [];

  prepare(): void {
    console.log(`Preparing ${this.name}`);
    console.log("Tossing dough...");
    console.log("Adding sauce...");
    console.log("Adding toppings: ");
    for (let topping of this.toppings) {
      console.log(`  ${topping}`);
    }
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
}

// 구상 서브 클래스
export class NYStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = "NY Style Sauce and Cheese Pizza";
    this.dough = "Thin Crust Dough";
    this.sauce = "Marinara Sauce";
    this.toppings.push("Grated Reggiano Cheese");
  }
}

export class NYStyleVeggiePizza extends Pizza {
  constructor() {
    super();
    this.name = "NY Style Veggie Pizza";
    this.dough = "Thin Crust Dough";
    this.sauce = "Marinara Sauce";
    this.toppings.push("Grated Reggiano Cheese");
    this.toppings.push("Garlic");
    this.toppings.push("Onion");
    this.toppings.push("Mushrooms");
    this.toppings.push("Red Pepper");
  }
}

export class NYStyleClamPizza extends Pizza {
  constructor() {
    super();
    this.name = "NY Style Clam Pizza";
    this.dough = "Thin Crust Dough";
    this.sauce = "Marinara Sauce";
    this.toppings.push("Grated Reggiano Cheese");
    this.toppings.push("Fresh Clams from Long Island Sound");
  }
}

export class NYStylePepperoniPizza extends Pizza {
  constructor() {
    super();
    this.name = "NY Style Pepperoni Pizza";
    this.dough = "Thin Crust Dough";
    this.sauce = "Marinara Sauce";
    this.toppings.push("Sliced Pepperoni");
  }
}

export class ChicagoStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = "Chicago Style Deep Dish Cheese Pizza";
    this.dough = "Extra Thick Crust Dough";
    this.sauce = "Plum Tomato Sauce";
    this.toppings.push("Shredded Mozzarella Cheese");
  }

  cut(): void {
    console.log("Cutting the pizza into square slices");
  }
}
