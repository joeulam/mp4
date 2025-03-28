export interface WeatherData {
  description: string
  days: Array<Days>
  currentConditions: Days
  resolvedAddress: string
}

export interface Days {
  conditions: string,
  datetime: string,
  description: string,
  feelslike: number,
  temp: number,
  tempmax: number,
  tempmin: number,
}