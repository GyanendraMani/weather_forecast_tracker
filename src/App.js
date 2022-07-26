import { useState } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Map from "./components/Map";
import Satellite from "./components/Satellite"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
      <div className="bg-gray-800 flex items-center justify-center w-screen h-screen py-10">
        <div className="flex w-3/4 min-h-full rounded-3xl shadow-lg m-auto bg-gray-100">
          {/* form card section  */}
          <div className="form-container">
            <div className="flex items-center justify-center">
              <h3 className="my-auto mr-auto text-xl text-pink-800 font-bold shadow-md py-1 px-3 
            rounded-md bg-white bg-opacity-30">forecast</h3>
              <div className="flex p-2 text-gray-100 bg-gray-600 bg-opacity-30 rounded-lg">
                <i className="fa fa-map my-auto" aria-hidden="true"></i>
                <div className="text-right">
                  <p className="font-semibold text-sm ml-2">{city}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-white text-2xl">The Only Weather Forecast You Need</h1>
              <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
              <form noValidate onSubmit={handleSubmit} className="flex justify-center w-full">
                <input type="text"
                  placeholder="Enter location"
                  className="relative rounded-xl py-2 px-3 w-2/3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200"
                  onChange={handleChange}
                  required />
                <button type="submit" className="z-10">
                  <i className="fa fa-search text-white -ml-10 border-l my-auto z-10 cursor-pointer p-3"
                    aria-hidden="true" type="submit"></i>
                </button>
                <i className="fa fa-map-marker-alt my-auto cursor-pointer p-3 text-white" aria-hidden="true" onClick={() => {
                  navigator.geolocation.getCurrentPosition(myIP)
                }}></i>
              </form>
            </div>
          </div>
          {/* info card section  */}
          <div className="w-2/4 p-5">
            <Header />
            <Routes>
              <Route exact path="/weather"
                element={<Weather weatherData={weatherData}
                  noData={noData}
                  city={city}
                  weatherIcon={weatherIcon}
                  REACT_APP_ICON_URL={REACT_APP_ICON_URL} />
                } />
              <Route exact path="/map"
                element={<Map />} />
              <Route exact path="/satellite"
                element={<Satellite />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
