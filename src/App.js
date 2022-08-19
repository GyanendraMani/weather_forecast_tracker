import { useState } from "react";
import Header from "./components/Header";
import Weather from "./components/Weather";
import Map from "./components/Map";
import News from "./components/News";
import Satellite from "./components/Satellite"
import NewsCricket from "./components/co-components/News-Cricket";
import NewsMH from "./components/co-components/News-Mh";
import NewsIsro from "./components/co-components/News-isro";
import NewsUpsc from "./components/co-components/News-Upsc";
import NewsBolly from "./components/co-components/News-Bolly";
import NewsTop from "./components/co-components/News-Top";
import TodoApp from "./components/TodoApp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const REACT_APP_ICON_URL = 'http://openweathermap.org/img/wn/'
  const NEWS_API_KEY = '2a4be4bf02d3462caa8ca78028295227'

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
        <Route exact path="/todo-app"
          element={<TodoApp />} />
        <Route exact path="/"
          element={<Weather weatherData={weatherData} handleSubmit={handleSubmit}
            handleChange={handleChange} myIP={myIP}
            noData={noData}
            city={city}
            weatherIcon={weatherIcon}
            REACT_APP_ICON_URL={REACT_APP_ICON_URL} />
          } />

        <Route exact path="/satellite" element={<Satellite />} />
        <Route exact path="/news/" element={<News />} >
          <Route index={true} element={<NewsTop newsName="iphone" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
          <Route exact path="cricket" element={<NewsCricket newsName="cricket" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
          <Route exact path="bollywood" element={<NewsBolly newsName="bollywood" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
          <Route exact path="mh" element={<NewsMH newsName="maharashtra" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
          <Route exact path="isro" element={<NewsIsro newsName="isro" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
          <Route exact path="upsc" element={<NewsUpsc newsName="upsc" NEWS_API_KEY={NEWS_API_KEY} />} ></Route>
        </Route>

      </Routes>

    </Router>
  );
}

export default App;
