export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold">{weather.name}</h2>

      <img src={icon} className="mx-auto" />

      <p className="text-4xl font-semibold">
        {Math.round(weather.main.temp)}°C
      </p>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{weather.wind.speed} km/h</p>
        </div>
        <div>
          <p className="font-semibold">Condition</p>
          <p>{weather.weather[0].main}</p>
        </div>
      </div>
    </div>
  );
}
