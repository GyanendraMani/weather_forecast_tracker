import { useState } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Map from "./components/Map";
import News from "./components/News";
import Satellite from "./components/Satellite"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const REACT_APP_ICON_URL = 'http://openweathermap.org/img/wn/'

  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('mumbai')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    const { value } = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try {
      let res = await fetch(`${process.env.REACT_APP_URL + how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if (data.cod != 200) {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWeather([latitude, longitude])
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/map"
          element={<Map />} />
        <Route exact path="/"
          element={<Weather weatherData={weatherData} handleSubmit={handleSubmit}
            handleChange={handleChange} myIP={myIP}
            noData={noData}
            city={city}
            weatherIcon={weatherIcon}
            REACT_APP_ICON_URL={REACT_APP_ICON_URL} />
          } />

        <Route exact path="/satellite"
          element={<Satellite />} />
        <Route exact path="/news"
          element={<News />} />

      </Routes>

    </Router>
  );
}

export default App;
