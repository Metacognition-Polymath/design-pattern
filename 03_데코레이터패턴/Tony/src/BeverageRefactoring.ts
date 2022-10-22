abstract class Beverage {
  description: string = "Unknown Beverage";

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

abstract class CondimentDecorator extends Beverage {
  protected beverage: Beverage; // 어떤 음료든 감쌀 수 있도록 Beverage 슈퍼 클래스 유형을 사용
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  abstract getDescription(): string;
}
