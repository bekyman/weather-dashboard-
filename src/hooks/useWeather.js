import { useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../api/weatherServices";

export default function useWeather(city) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather() {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);

      const current = await getCurrentWeather(city);
      const forecastData = await getForecast(city);

      setWeather(current);
      setForecast(forecastData.list.slice(0, 5));
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  // Fetch on city change
  useEffect(() => {
    fetchWeather();
  }, [city]);

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, [city]);

  return { weather, forecast, error, loading, refresh: fetchWeather };
}
