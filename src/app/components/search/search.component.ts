import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [ReactiveFormsModule]
})
export class SearchComponent {
  searchControl = new FormControl('');
  constructor(private weatherService: WeatherService) {}
  @Output() searchEvent = new EventEmitter<string>();

  search() {
    const location = this.searchControl.value?.trim();
    if (location) {
      this.weatherService.getCurrentWeatherByCity(location).subscribe(
        (data) => {
          this.searchEvent.emit(data);
        },
      (error: any) => {
        console.error('Error fetching weather data', error);
      }
    );
  }
}}
