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

     
      const groupedByDate = {};
      forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toISOString().split("T")[0];
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        groupedByDate[date].push(item);
      });

      
      const dailyForecast = Object.values(groupedByDate)
        .slice(0, 5) 
        .map((dayReadings) => {
          const temps = dayReadings.map((r) => r.main.temp);
          const pops = dayReadings.map((r) => r.pop ?? 0);

         
          const representative =
            dayReadings.find((r) => r.dt_txt.includes("12:00:00")) ||
            dayReadings[0];

          return {
            day: new Date(representative.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            temp_max: Math.max(...temps),
            temp_min: Math.min(...temps),
            pop: Math.max(...pops),
            condition: representative.weather[0]?.main ?? "Clear",
            icon: representative.weather[0]?.icon,
          };
        });

      
      const allTemps = dailyForecast.flatMap((d) => [d.temp_max, d.temp_min]);
      const globalMax = Math.max(...allTemps);
      const globalMin = Math.min(...allTemps);

     
      setForecast(
        dailyForecast.map((d) => ({
          ...d,
          globalMax,
          globalMin,
        }))
      );
      
    } catch (err) {
      console.error("Weather Fetch Error:", err);
      setError(
        err.message === "Failed to fetch"
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
