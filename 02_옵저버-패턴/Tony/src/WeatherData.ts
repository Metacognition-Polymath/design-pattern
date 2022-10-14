class ConditionDisplay {
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {}

  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display() {
    console.log(
      `Current conditions: ${this.temperature}C degrees, ${this.humidity}% humidity and ${this.pressure} pressure`
    );
  }
}

class StatisticsDisplay {
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {}

  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display() {
    console.log(
      `Statistics conditions: ${this.temperature}C degrees, ${this.humidity}% humidity and ${this.pressure} pressure`
    );
  }
}

class ForecastDisplay {
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {}

  update(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.display();
  }

  display() {
    console.log(
      `Forecast conditions: ${this.temperature}C degrees, ${this.humidity}% humidity and ${this.pressure} pressure`
    );
  }
}

class WeatherData {
  // 인스턴스 변수 선언
  private conditionDisplay: ConditionDisplay;
  private statisticsDisplay: StatisticsDisplay;
  private forecastDisplay: ForecastDisplay;

  constructor() {
    this.conditionDisplay = new ConditionDisplay();
    this.statisticsDisplay = new StatisticsDisplay();
    this.forecastDisplay = new ForecastDisplay();
  }

  // 가장 최근에 측정된 온도, 습도, 기압 값을 리턴하는 메소드
  getTemperature() {
    return 17.1;
  }
  getHumidity() {
    return 65;
  }
  getPressure() {
    return 1018.8;
  }

  /**
   * 기상 관측값이 갱신될 때마다 이 메소드가 호출됩니다
   */
  measurementsChanged() {
    // 디스플레이를 업데이트하는 코드
    const temp = this.getTemperature();
    const humidity = this.getHumidity();
    const pressure = this.getPressure();

    this.conditionDisplay.update(temp, humidity, pressure);
    this.statisticsDisplay.update(temp, humidity, pressure);
    this.forecastDisplay.update(temp, humidity, pressure);
  }
}
