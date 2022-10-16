import {
  CurrentConditionsDisplay,
  ForecastDisplay,
  StatisticsDisplay,
} from "./Observer";
import { WeatherData } from "./Subject";

const weatherData = new WeatherData(); // Subject
const currentConditionDisplay = new CurrentConditionsDisplay(weatherData); // Observer
const statisticsDisplay = new StatisticsDisplay(weatherData); // Observer
const forecastDisplay = new ForecastDisplay(weatherData); // Observer

weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 29.2);
weatherData.setMeasurements(78, 90, 29.2);
