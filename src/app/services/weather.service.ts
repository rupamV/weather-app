import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'cbf364a5b6689550e42f35163f90fc33';

  constructor(private http: HttpClient) {}

  // Get current weather by coordinates
  getCurrentWeather(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  // Get weather forecast by coordinates
  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  // Get current weather by city name
  getCurrentWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  // Get weather forecast by city name
  getForecastByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  // Process the forecast data to get a 5-day forecast with daily temperatures and weather conditions
  processForecastData(forecastList: any[]): any[] {
    const dailyForecast: any[] = [];
    
    // Group by date and pick the forecast for each day (every 24 hours)
    const dateMap: { [key: string]: any } = {};
    
    forecastList.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString(); // Format date to "MM/DD/YYYY"
      
      if (!dateMap[date]) {
        dateMap[date] = entry; // Store only the first forecast entry for each day
      }
    });

    // Add only 5 days of forecast
    let count = 0;
    for (let key in dateMap) {
      if (count < 5) {
        dailyForecast.push(dateMap[key]);
        count++;
      }
    }
    
    return dailyForecast;
  }
}
