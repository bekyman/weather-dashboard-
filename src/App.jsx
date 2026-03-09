import { useState } from "react";
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import ErrorMessage from "./components/ErrorMessage";
import RefreshButton from "./components/RefreshButton";

export default function App() {
  const [city, setCity] = useState("");

  const { weather, forecast, error, loading, refresh } = useWeather(city);

  const isDay =
    weather &&
    weather.dt > weather.sys.sunrise &&
    weather.dt < weather.sys.sunset;

  const backgroundClass = isDay
    ? "bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500 text-white"
    : "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 text-white">
      
      <div className="w-full max-w-xl mb-8">
        <SearchBar onSearch={setCity} />
      </div>

      
      {loading && (
        <p className="mt-6 text-lg animate-pulse">
          Fetching weather data...
        </p>
      )}

      
      {!city && !loading && (
        <p className="mt-10 text-xl font-light text-white/80 tracking-wide">
          Search for a city to get started
        </p>
      )}

      
      <ErrorMessage message={error} />

      
      {weather && !error && (
        <>
         
          <div className="text-center mb-10 flex flex-col items-center">
            <h2 className="text-4xl font-semibold tracking-tight">
              {weather.name}
            </h2>

            <p className="text-8xl font-thin my-4 drop-shadow-md">
              {Math.round(weather.main.temp)}°
            </p>

            <div className="flex items-center justify-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-12 h-12"
              />
              <p className="text-2xl capitalize font-medium">
                {weather.weather[0].description}
              </p>
            </div>

            <p className="mt-2 text-lg font-light">
              H: {Math.round(weather.main.temp_max)}° | L:{" "}
              {Math.round(weather.main.temp_min)}°
            </p>
          </div>

          
          <div className="w-full max-w-4xl backdrop-blur-md bg-white/20 border border-white/10 rounded-3xl p-6 shadow-xl mb-8">
            <WeatherCard weather={weather} />
          </div>

          
          <div className="w-full max-w-4xl backdrop-blur-md bg-white/20 border border-white/10 rounded-3xl p-6 shadow-xl mb-8">
            <ForecastList forecast={forecast} />
          </div>

         
          <RefreshButton onClick={refresh} />
        </>
      )}
    </div>
  );
}
