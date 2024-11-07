import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './components/weather/weather.component';
import { SearchComponent } from './components/search/search.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [WeatherComponent,SearchComponent]
})
export class AppComponent {
  title = 'Weather App';
}
