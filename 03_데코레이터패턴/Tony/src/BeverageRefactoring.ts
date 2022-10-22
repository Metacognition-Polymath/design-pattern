export abstract class Beverage {
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

// 음료
export class Espresso extends Beverage {
  constructor() {
    super();
    this.description = "Espresso";
  }
  cost(): number {
    return 1.99;
  }
}

export class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = "House Blend Coffee";
  }
  cost(): number {
    return 0.89;
  }
}

export class DarkRoast extends Beverage {
  constructor() {
    super();
    this.description = "Dark Roast Coffee";
  }
  cost(): number {
    return 0.99;
  }
}

// 첨가물
export class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }
  getDescription(): string {
    return this.beverage.getDescription() + ", Mocha";
  }
  cost(): number {
    return 0.2 + this.beverage.cost();
  }
}

export class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }
  getDescription(): string {
    return this.beverage.getDescription() + ", Soy";
  }
  cost(): number {
    return 0.15 + this.beverage.cost();
  }
}

export class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage);
  }
  getDescription(): string {
    return this.beverage.getDescription() + ", Whip";
  }
  cost(): number {
    return 0.1 + this.beverage.cost();
  }
}
