import { useState, useEffect } from "react";
import { getCurrentWeather, getForecast } from "../services/weatherApi";

export default function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const weatherData = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

      
      const daily = {};

      forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        if (!daily[day]) {
          daily[day] = {
            day,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            icon: item.weather[0].icon,
            condition: item.weather[0].description,
            pop: item.pop || 0
          };
        } else {
          daily[day].temp_min = Math.min(
            daily[day].temp_min,
            item.main.temp_min
          );
          daily[day].temp_max = Math.max(
            daily[day].temp_max,
            item.main.temp_max
          );
        }
      });

      const forecastArray = Object.values(daily).slice(0, 5);

      const globalMin = Math.min(...forecastArray.map((d) => d.temp_min));
      const globalMax = Math.max(...forecastArray.map((d) => d.temp_max));

      const finalForecast = forecastArray.map((d) => ({
        ...d,
        globalMin,
        globalMax
      }));

      setWeather(weatherData);
      setForecast(finalForecast);
    } catch (err) {
      setError("City not found. Try another location.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return {
    weather,
    forecast,
    loading,
    error,
    refresh: fetchWeather
  };
}
