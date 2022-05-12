import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityName?: string = 'Medina';
  weatherData: any;

  constructor() {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
	    	'X-RapidAPI-Key': '5ec8003711msh0a283ac76994871p14acacjsn50f911c0c200'
      },
    };

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${this.cityName}`,
      options
    )
      .then((response) => response.json())
      .then((resulte) => this.setWeatherData(resulte))
      .catch((err) => console.error(err));
  }

  setWeatherData(data: any) {

    let d = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  
    this.weatherData = data;
    
    this.weatherData.date = d

    this.weatherData.temp = (this.weatherData.main.temp - 273.15).toFixed(0)


    this.weatherData.des = this.weatherData.weather[0].description
    this.weatherData.icon = `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`

    const sunsetTime = new Date(this.weatherData.sys.sunset * 1000)
    const sunriseTime = new Date(this.weatherData.sys.sunrise * 1000)
    this.weatherData.sunsetTime = `${(sunsetTime.getHours() + 24) % 12}:${sunsetTime.getMinutes()}PM`
    this.weatherData.sunriseTime = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}AM`

    this.weatherData.windKm = Math.floor(this.weatherData.wind.speed * 3.6)
  }

  onSubmit(event:any){
    event.preventDefault()
    this.cityName = event.target.city.value
    if(event.target.city.value){
      this.getWeatherData()
    }
    
  }
  
}
