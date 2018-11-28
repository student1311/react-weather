import React, { Component } from 'react';

import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "c5001a4780a6504ded9be3a480a7d30e";



class App extends Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url = await
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
     const data = await api_url.json();
     console.log(data);
     
     if(city) {
      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        sunset: sunset_date,
        error: undefined
       });
     } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunset: undefined,
        error: "Введите название города"
       });
     }

     
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather 
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                error={this.state.error}
              />
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    );
  }
}

export default App;
