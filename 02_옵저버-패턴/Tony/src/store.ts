export class WeatherDataStore {
  static temperatureList: number[] = [];
  static humidityList: number[] = [];
  static pressureList: number[] = [];

  static addTemperature(temperature: number) {
    this.temperatureList.push(temperature);
  }

  static addHumidity(humidity: number) {
    this.humidityList.push(humidity);
  }

  static addPressure(pressure: number) {
    this.pressureList.push(pressure);
  }
}
