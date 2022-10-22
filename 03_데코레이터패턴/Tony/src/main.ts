import {
  Beverage,
  DarkRoast,
  Espresso,
  HouseBlend,
  Mocha,
  Soy,
  Whip,
} from "./BeverageRefactoring";

const beverage: Beverage = new Espresso();
console.log(beverage.getDescription() + " $" + beverage.cost());

// let beverage2: Beverage = new DarkRoast();
// beverage2 = new Mocha(beverage2);
// beverage2 = new Mocha(beverage2);
// beverage2 = new Whip(beverage2);
// console.log(beverage2.getDescription() + " $" + beverage2.cost());
const darkRoast: Beverage = new DarkRoast();
const darkRoastWithMocha = new Mocha(darkRoast);
const darkRoastWithMochaDouble = new Mocha(darkRoastWithMocha);
const darkRoastWithMochaDoubleAndWhip = new Whip(darkRoastWithMochaDouble);
console.log(
  darkRoastWithMochaDoubleAndWhip.getDescription() +
    " $" +
    darkRoastWithMochaDoubleAndWhip.cost()
);

// let beverage3: Beverage = new HouseBlend();
// beverage3 = new Soy(beverage3);
// beverage3 = new Mocha(beverage3);
// beverage3 = new Whip(beverage3);
// console.log(beverage3.getDescription() + " $" + beverage3.cost());
const houseBlend: Beverage = new HouseBlend();
const houseBlendWithSoy = new Soy(houseBlend);
const houseBlendWithSoyAndMocha = new Mocha(houseBlendWithSoy);
const houseBlendWithSoyAndMochaAndWhip = new Whip(houseBlendWithSoyAndMocha);
console.log(
  houseBlendWithSoyAndMochaAndWhip.getDescription() +
    " $" +
    houseBlendWithSoyAndMochaAndWhip.cost()
);
