import { NYPizzaStore } from "./PizzaStore";

const nyStore = new NYPizzaStore();
const pizza = nyStore.orderPizza("cheese");
console.log(`Ethan ordered a ${pizza.getName()}`);
