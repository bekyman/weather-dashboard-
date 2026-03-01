export default function ForecastList({ forecast }) {
  // Group forecast items by day
  const dailyForecast = forecast.reduce((acc, item) => {
    const day = new Date(item.dt_txt).toLocaleDateString(undefined, {
      weekday: "long",
    });
    // Only take the first entry for each day
    if (!acc[day]) acc[day] = item;
    return acc;
  }, {});

  const days = Object.keys(dailyForecast);

  return (
    <div className="mt-8 max-w-6xl mx-auto px-4">
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin">
        {days.map((day) => {
          const item = dailyForecast[day];
          return (
            <div
              key={item.dt}
              className="flex-shrink-0 bg-white/80 backdrop-blur-md
                         p-5 rounded-2xl shadow-md
                         min-w-[140px] text-center
                         hover:shadow-lg transition"
            >
              <p className="font-semibold text-sm">{day}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />

              <p className="text-lg font-bold">
                {Math.round(item.main.temp)}°C
              </p>

              <p className="text-xs text-gray-500 capitalize">
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
