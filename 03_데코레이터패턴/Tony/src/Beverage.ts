{
  // Beverage 클래스에 우유, 두유, 모카, 휘핑 크림 첨가 여부를 보여주는 인스턴스 변수를 추가
  abstract class Beverage {
    protected description: string = "스타버즈 음료";
    protected milk: boolean = false;
    protected soy: boolean = false;
    protected mocha: boolean = false;
    protected whip: boolean = false;
    constructor() {}

    getDEscription() {
      return this.description;
    }

    /**
     * default cost : 1000
     * milk : 100
     * soy : 100
     * mocha : 100
     * whip : 100
     */
    cost() {
      let cost = 1000;
      if (this.hasMilk()) {
        cost += 100;
      }
      if (this.hasSoy()) {
        cost += 100;
      }
      if (this.hasMocha()) {
        cost += 100;
      }
      if (this.hasWhip()) {
        cost += 100;
      }
      return cost;
    }

    hasMilk() {
      return this.milk;
    }
    setMilk(milk: boolean) {
      this.milk = milk;
    }

    hasSoy() {
      return this.soy;
    }
    setSoy(soy: boolean) {
      this.soy = soy;
    }

    hasMocha() {
      return this.mocha;
    }
    setMocha(mocha: boolean) {
      this.mocha = mocha;
    }

    hasWhip() {
      return this.whip;
    }
    setWhip(whip: boolean) {
      this.whip = whip;
    }
  }

  class HouseBlend extends Beverage {
    constructor() {
      super();
      this.description = "하우스 블렌드 커피";
    }

    cost() {
      return super.cost() + 50;
    }
  }

  class DarkRoast extends Beverage {
    constructor() {
      super();
      this.description = "다크 로스트 커피";
    }

    cost() {
      return super.cost() + 60;
    }
  }

  class Decaf extends Beverage {
    constructor() {
      super();
      this.description = "디카페인 커피";
    }

    cost() {
      return super.cost() + 70;
    }
  }

  class Espresso extends Beverage {
    constructor() {
      super();
      this.description = "에스프레소";
    }

    cost() {
      return super.cost() + 80;
    }
  }
}
