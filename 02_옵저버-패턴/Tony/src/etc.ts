import { DisplayElement, Observer } from "./ObserverCommon";
import { WeatherData } from "./Subject";

{
  // 코드 자석
  class ForecastDisplay implements Observer, DisplayElement {
    private currentPressure = 29.92;
    private lastPressure: number;

    constructor(private weatherData: WeatherData) {
      weatherData.registerObserver(this);
    }

    update() {
      this.lastPressure = this.currentPressure;
      this.currentPressure = this.weatherData.getPressure();
      this.display();
    }

    display() {
      console.log("Forecast: ");
      if (this.currentPressure > this.lastPressure) {
        console.log("Improving weather on the way!");
      } else if (this.currentPressure === this.lastPressure) {
        console.log("More of the same");
      } else if (this.currentPressure < this.lastPressure) {
        console.log("Watch out for cooler, rainy weather");
      }
    }
  }
}
