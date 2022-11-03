class Singleton {
  private static instance: Singleton;
  private count: number = 0;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public getCount() {
    this.count++;
    console.log(this.count);
    return this.count;
  }
}

const singleton1 = Singleton.getInstance();
singleton1.getCount(); // 1

const singleton2 = Singleton.getInstance();
singleton2.getCount(); // 2
