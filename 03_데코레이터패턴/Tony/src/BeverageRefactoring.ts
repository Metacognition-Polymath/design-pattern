export enum Size {
  TALL = "TALL",
  GRANDE = "GRANDE",
  VENTI = "VENTI",
}

export abstract class Beverage {
  description: string = "Unknown Beverage";

  getDescription(): string {
    return this.description;
  }

  abstract cost(): number;
}

abstract class CommonBeverage extends Beverage {
  protected size: Size = Size.TALL;

  setSize(size: Size): void {
    this.size = size;
  }
  getSize(): Size {
    return this.size;
  }

  abstract addSizeCost(size: Size): number;
}

// 음료
export class Espresso extends CommonBeverage {
  constructor() {
    super();
    this.description = "Espresso";
  }

  addSizeCost(size: Size): number {
    const sizeCost = {
      [Size.TALL]: 0,
      [Size.GRANDE]: 0.33,
      [Size.VENTI]: 0.44,
    };
    return sizeCost[size];
  }

  cost(): number {
    return 1.99;
  }
}

export class HouseBlend extends CommonBeverage {
  constructor() {
    super();
    this.description = "House Blend Coffee";
  }
  addSizeCost(size: Size): number {
    const sizeCost = {
      [Size.TALL]: 0,
      [Size.GRANDE]: 0.11,
      [Size.VENTI]: 0.22,
    };
    return sizeCost[size];
  }
  cost(): number {
    return 0.89 + this.addSizeCost(this.getSize());
  }
}

export class DarkRoast extends CommonBeverage {
  constructor() {
    super();
    this.description = "Dark Roast Coffee";
  }
  addSizeCost(size: Size): number {
    const sizeCost = {
      [Size.TALL]: 0,
      [Size.GRANDE]: 0.1,
      [Size.VENTI]: 0.2,
    };
    return sizeCost[size];
  }
  cost(): number {
    return 0.99 + this.addSizeCost(this.getSize());
  }
}

abstract class CondimentDecorator extends Beverage {
  protected beverage: Beverage; // 어떤 음료든 감쌀 수 있도록 Beverage 슈퍼 클래스 유형을 사용
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  abstract getDescription(): string;
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
