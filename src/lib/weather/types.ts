export interface IRawWeatherEntry {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export interface ICityWeather {
  cityId: string;
  name: string;
  lat: number;
  lon: number;
  temperatureC: number;
  windSpeedKmh: number;
  weatherCode: number;
  observedAt: string;
}
