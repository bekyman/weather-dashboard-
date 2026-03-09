const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "City not found");
  }

  return await res.json();
}

export async function getForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Forecast error");
  }

  return await res.json();
}
