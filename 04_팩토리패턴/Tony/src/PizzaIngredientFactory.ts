export interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createVeggies(): Veggies[];
  createPepperoni(): Pepperoni;
  createClam(): Clams;
}

export interface Dough {
  name: string;
}

class ThinCrustDough implements Dough {
  name = "Thin Crust Dough";
}

class ThickCrustDough implements Dough {
  name = "Thick Crust Dough";
}

export interface Sauce {
  name: string;
}

class MarinaraSauce implements Sauce {
  name = "Marinara Sauce";
}

class PlumTomatoSauce implements Sauce {
  name = "Plum Tomato Sauce";
}

export interface Cheese {
  name: string;
}

class ReggianoCheese implements Cheese {
  name = "Reggiano Cheese";
}

class MozzarellaCheese implements Cheese {
  name = "Mozzarella Cheese";
}

export interface Veggies {
  name: string;
}

class Garlic implements Veggies {
  name = "Garlic";
}

class Onion implements Veggies {
  name = "Onion";
}

class Mushroom implements Veggies {
  name = "Mushroom";
}

class RedPepper implements Veggies {
  name = "Red Pepper";
}

class BlackOlives implements Veggies {
  name = "Black Olives";
}

class Spinach implements Veggies {
  name = "Spinach";
}

class Eggplant implements Veggies {
  name = "Egg Plant";
}

export interface Pepperoni {
  name: string;
}

class SlicedPepperoni implements Pepperoni {
  name = "Sliced Pepperoni";
}

export interface Clams {
  name: string;
}

class FreshClams implements Clams {
  name = "Fresh Clams";
}

class FrozenClams implements Clams {
  name = "Frozen Clams";
}

export class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return new ThinCrustDough();
  }

  createSauce(): Sauce {
    return new MarinaraSauce();
  }

  createCheese(): Cheese {
    return new ReggianoCheese();
  }

  createVeggies(): Veggies[] {
    const veggies = [
      new Garlic(),
      new Onion(),
      new Mushroom(),
      new RedPepper(),
    ];
    return veggies;
  }

  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }

  createClam(): Clams {
    return new FreshClams();
  }
}

export class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return new ThickCrustDough();
  }

  createSauce(): Sauce {
    return new PlumTomatoSauce();
  }

  createCheese(): Cheese {
    return new MozzarellaCheese();
  }

  createVeggies(): Veggies[] {
    const veggies = [new BlackOlives(), new Spinach(), new Eggplant()];
    return veggies;
  }

  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }

  createClam(): Clams {
    return new FrozenClams();
  }
}
