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

  return (
    <div className="min-h-screen bg-green-200 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>

      <SearchBar onSearch={setCity} />

      {loading && <p className="mt-4">Loading...</p>}
      
 
      {!city && !loading && (
        <p className="mt-10 text-gray-600">Enter a city to see the current weather!</p>
      )}

      <ErrorMessage message={error} />

      
      {city && !error && (
        <>
          <WeatherCard weather={weather} />
          <ForecastList forecast={forecast} />
          <RefreshButton onClick={refresh} />
        </>
      )}
    </div>
  );
}
