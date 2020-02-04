import React from 'react';
import Info from './components/Info';
import Form from './components/Form';
import Minsk from './components/Minsk';
import Zhlobin from './components/Zhlobin';
import Weather from './components/Weather';
import Author from './components/Author';
import conversionCelsius from './modules/conversionCelsius';
import conversionTime from './modules/conversionTime';

const API_KEY = 'ca96f43fd00394498db868ebd01a6dd5';
class App extends React.Component {
  
  state = {
    temp: undefined,
    temp_minsk: undefined,
    temp_zhlobin: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    sunrise_minsk: undefined,
    sunset_minsk: undefined,
    sunrise_zhlobin: undefined,
    sunset_zhlobin: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_url_minsk =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${API_KEY}`);
    const api_url_zhlobin =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Zhlobin&appid=${API_KEY}`);
    const data_minsk = await api_url_minsk.json();
    const data_zhlobin = await api_url_zhlobin.json();
    const temp_minsk_c = conversionCelsius(data_minsk.main.temp);
    const temp_zhlobin_c = conversionCelsius(data_zhlobin.main.temp);
    const sunset_minsk = conversionTime(data_minsk.sys.sunset);
    const sunrise_minsk = conversionTime(data_minsk.sys.sunrise);
    const sunset_zhlobin = conversionTime(data_zhlobin.sys.sunset);
    const sunrise_zhlobin = conversionTime(data_zhlobin.sys.sunrise);

    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      try {
      const data = await api_url.json();
      const temp_c = conversionCelsius(data.main.temp);
      const sunset = conversionTime(data.sys.sunset);
      const sunrise = conversionTime(data.sys.sunrise);


      this.setState({
        temp: temp_c,
        temp_minsk: temp_minsk_c,
        temp_zhlobin: temp_zhlobin_c,
        city: data.name,
        country: data.sys.country,
        sunrise: sunset,
        sunset: sunrise,
        sunrise_minsk: sunrise_minsk,
        sunset_minsk: sunset_minsk,
        sunrise_zhlobin: sunrise_zhlobin,
        sunset_zhlobin: sunset_zhlobin,
        error: ""
        });
      }
      catch {
        this.setState({
          temp: undefined,
          temp_minsk: temp_minsk_c,
          temp_zhlobin: temp_zhlobin_c,
          sunrise_minsk: sunrise_minsk,
          sunset_minsk: sunset_minsk,
          sunrise_zhlobin: sunrise_zhlobin,
          sunset_zhlobin: sunset_zhlobin,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "Введите правильное название города"
        });
      }
    }
    else {
      this.setState({
      temp: undefined,
      temp_minsk: temp_minsk_c,
      temp_zhlobin: temp_zhlobin_c,
      sunrise_minsk: sunrise_minsk,
      sunset_minsk: sunset_minsk,
      sunrise_zhlobin: sunrise_zhlobin,
      sunset_zhlobin: sunset_zhlobin,
      city: undefined,
      country: undefined,
      sunrise: undefined,
      sunset: undefined,
      error: "Введите правильное название города"
      });
    }
}
  render() {
    return (
      <div className="wrapper"> 
      <div className="minsk-main"> 
      <Minsk  {...this.state} />
      </div>
      <div className="main"> <Author />
        <div className="container"> 
          <div className="row">
              <div className="col-sm-5 info">
              <Info />
              </div>
              <div className="col-sm-7 form">
              <Form weatherMethod={this.getWeather}/>
              <Weather {...this.state} />
             </div>
            </div>
          </div>
        </div>
        <div className="zhlobin-main">
        <Zhlobin {...this.state} />
        </div>
      </div>
    );

  }

}

export default App;
