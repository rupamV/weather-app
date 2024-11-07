import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class WeatherComponent implements OnInit {
  city: string = 'London';
  currentWeather: any = null;
  forecast: any[] = [];
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    if (!this.city) {
      this.error = 'Please enter a city name';
      return;
    }

    this.weatherService.getCurrentWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
      }
    });

    this.weatherService.getForecastByCity(this.city).subscribe({
      next: (data) => {
        this.forecast = this.weatherService.processForecastData(data.list); // Use processed forecast data
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  updateWeather(city: string) {
    this.city = city;
    this.fetchWeather(); // Refetch the weather when the city is updated
  }
}
