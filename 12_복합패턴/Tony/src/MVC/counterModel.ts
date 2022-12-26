import { Observer } from "./counterView";

// MVC 패턴의 Model 클래스
export class CounterModel {
  private _count: number = 0;
  private _listeners: Array<Observer> = [];

  constructor() {
    this._count = 0;
  }

  public addListener(listener: Observer) {
    this._listeners.push(listener);
  }

  public getCount(): number {
    return this._count;
  }

  public increase() {
    this._count++;
    this._listeners.forEach((listener) => listener.update());
  }

  public decrease() {
    this._count--;
    this._listeners.forEach((listener) => listener.update());
  }
}
