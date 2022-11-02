class ChocolateBoiler {
  private static uniqueInstance: ChocolateBoiler;
  private empty: boolean;
  private boiled: boolean;

  private constructor() {
    this.empty = true;
    this.boiled = false;
  }

  public static getInstance(): ChocolateBoiler {
    if (!ChocolateBoiler.uniqueInstance) {
      ChocolateBoiler.uniqueInstance = new ChocolateBoiler();
    }
    return ChocolateBoiler.uniqueInstance;
  }

  public fill() {
    /**
     * 보일러가 비어 있을 때만 재료를 넣습니다
     * 원료를 가득 채우고 나면 empty와 boiled를 false로 설정합니다
     */
    if (this.isEmpty()) {
      this.empty = false;
      this.boiled = false;
      // fill the boiler with a milk/chocolate mixture
      console.log("fill the boiler with a milk/chocolate mixture");
    }
  }

  /**
   * 보일러가 가득 차 있고(비어 있지 않고)
   * 다 끓여진 상태에서만 보일러에 들어있는 재료를 다음 단계로 넘깁니다
   * 보일러를 다 비우고 나면 empty를 true로 설정합니다
   */
  public drain() {
    if (!this.isEmpty() && this.isBoiled()) {
      // drain the boiled milk and chocolate
      console.log("drain the boiled milk and chocolate");
      this.empty = true;
    }
  }

  /**
   * 보일러가 가득 차 있고 아직 끓지 않은 상태에서만
   * 초콜릿과 우유가 혼합된 재료를 끓입니다
   * 재료를 다 끓이면 boiled를 true로 설정합니다
   */
  public boil() {
    if (!this.isEmpty() && !this.isBoiled()) {
      // bring the contents to a boil
      console.log("bring the contents to a boil");
      this.boiled = true;
    }
  }

  public isEmpty() {
    return this.empty;
  }

  public isBoiled() {
    return this.boiled;
  }
}

const boiler1 = ChocolateBoiler.getInstance();
boiler1.fill();
