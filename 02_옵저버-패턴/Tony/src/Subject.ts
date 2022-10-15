import { Observer, Subject } from "./ObserverCommon";
import { WeatherDataStore } from "./store";

/**
 * 지면의 한계로 인해 패키지 등 생략
 */
export class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  constructor() {
    this.observers = [];
  }

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }

  removeObserver(o: Observer): void {
    const index = this.observers.indexOf(o);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  measurementsChanged(): void {
    this.notifyObservers();
  }

  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    WeatherDataStore.addTemperature(temperature);
    WeatherDataStore.addHumidity(humidity);
    WeatherDataStore.addPressure(pressure);
    this.measurementsChanged();
  }

  // 기타 WeatherData의 메소드
  getTemperature(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
  }

  getPressure(): number {
    return this.pressure;
  }
}
