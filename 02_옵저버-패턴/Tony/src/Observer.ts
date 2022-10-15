import { DisplayElement, Observer } from "./ObserverCommon";
import { WeatherDataStore } from "./store";
import { WeatherData } from "./Subject";

export abstract class Display implements Observer, DisplayElement {
  protected weatherData: WeatherData;
  protected temperature: number = 0;
  protected humidity: number = 0;
  protected pressure: number = 0;

  constructor(weatherData: WeatherData) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }

  update() {
    this.temperature = this.weatherData.getTemperature();
    this.humidity = this.weatherData.getHumidity();
    this.pressure = this.weatherData.getPressure();
    this.display();
  }

  abstract display(): void;
}

export class CurrentConditionsDisplay extends Display {
  constructor(weatherData: WeatherData) {
    super(weatherData);
  }
  display() {
    console.log(
      `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity`
    );
  }
}

export class StatisticsDisplay extends Display {
  constructor(weatherData: WeatherData) {
    super(weatherData);
  }

  private getTemperatureData() {
    const temperatureList = WeatherDataStore.temperatureList;
    const average =
      temperatureList.reduce((a, b) => a + b) / temperatureList.length;
    const max = Math.max(...temperatureList);
    const min = Math.min(...temperatureList);
    return { average, max, min };
  }

  display() {
    const { average, max, min } = this.getTemperatureData();
    console.log(`Avg/Max/Min temperature = ${average}/${max}/${min}`);
  }
}

export class ForecastDisplay extends Display {
  constructor(weatherData: WeatherData) {
    super(weatherData);
  }
  // TODO : 날씨 예보 로직 구현
  display() {
    console.log(
      `Forecast: Improving weather on the way! ${this.temperature}F degrees and ${this.humidity}% humidity`
    );
  }
}
