import { Duck, MallardDuck, ModelDuck } from "./Duck";
import { FlyRocketPowered } from "./Fly";

const mallard: Duck = new MallardDuck();

mallard.performFly();
mallard.performQuack();

const model: Duck = new ModelDuck();
model.performFly(); // 날지 못합니다.
model.setFlyBehavior(new FlyRocketPowered());
model.performFly(); // 로켓 추진으로 날아갑니다.
