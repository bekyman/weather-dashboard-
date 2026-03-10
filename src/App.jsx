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

  const condition = weather?.weather?.[0]?.main?.toLowerCase();

  let backgroundClass =
    "bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500 text-white";

  if (condition) {
    if (condition.includes("cloud")) {
      backgroundClass = isDay
        ? "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 text-white"
        : "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white";
    }

    if (condition.includes("rain") || condition.includes("drizzle")) {
      backgroundClass = isDay
        ? "bg-gradient-to-b from-blue-400 via-blue-600 to-gray-600 text-white"
        : "bg-gradient-to-b from-blue-900 via-blue-800 to-gray-950 text-white";
    }

    if (condition.includes("snow")) {
      backgroundClass =
        "bg-gradient-to-b from-white via-blue-100 to-blue-300 text-gray-900";
    }

    if (condition.includes("clear")) {
      backgroundClass = isDay
        ? "bg-gradient-to-b from-sky-300 via-blue-400 to-blue-500 text-white"
        : "bg-gradient-to-b from-indigo-900 via-blue-900 to-black text-white";
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 transition-all duration-700 ${backgroundClass}`}
    >
      
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
          
          <div className="text-center mb-10 flex flex-col items-center fade-in">
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
                className="w-14 h-14"
              />

              <span className="text-xl capitalize">
                {weather.weather[0].description}
              </span>
            </div>

            <p className="mt-2 text-lg font-light">
              H: {Math.round(weather.main.temp_max)}° | L:{" "}
              {Math.round(weather.main.temp_min)}°
            </p>
          </div>

          
          <div className="w-full max-w-4xl glass card-hover p-6 mb-8 fade-in">
            <WeatherCard weather={weather} />
          </div>

         
          {forecast && (
            <div className="w-full max-w-4xl glass card-hover p-6 mb-8 fade-in">
              <ForecastList forecast={forecast} />
            </div>
          )}

          
          <RefreshButton onClick={refresh} />
        </>
      )}
    </div>
  );
}
