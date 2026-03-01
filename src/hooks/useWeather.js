import { useEffect, useState, useCallback } from "react";
import { getCurrentWeather, getForecast } from "../api/weatherServices";

export default function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);

      
      const current = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

     
      setWeather(current);

      
      const dailyForecast = forecastData.list
        .filter((reading) => reading.dt_txt.includes("12:00:00"))
        .map((item) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }), //
          temp: item.main?.temp ?? 0, 
          condition: item.weather[0]?.main ?? "Clear", 
          icon: item.weather[0]?.icon, 
        }));

      setForecast(dailyForecast);
    } catch (err) {
      console.error("Weather Fetch Error:", err);
      setError(err.message === "Failed to fetch" 
        ? "Network error. Check your API key and HTTPS connection." 
        : err.message
      );
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, [city]);

  
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  
  useEffect(() => {
    if (!city) return;
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, [city, fetchWeather]);

  return { weather, forecast, error, loading, refresh: fetchWeather };
}
