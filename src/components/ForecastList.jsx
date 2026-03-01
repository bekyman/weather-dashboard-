export default function ForecastList({ forecast }) {
  const dailyMap = {};
  forecast.forEach((item) => {
    const day = new Date(item.dt_txt).toLocaleDateString(undefined, {
      weekday: "long",
    });
    if (!dailyMap[day]) dailyMap[day] = [];
    dailyMap[day].push(item);
  });

  const days = Object.keys(dailyMap).slice(0, 5);

  const dailyForecast = days.map((day) => {
    const items = dailyMap[day];
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));

    const iconIndex = Math.floor(items.length / 2);
    const icon = items[iconIndex].weather[0].icon;
    const description = items[iconIndex].weather[0].description;

    return { day, minTemp, maxTemp, icon, description };
  });

  return (
    <div className="mt-8 max-w-6xl mx-auto px-4 relative">
      {/* Optional fade edges */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/80 to-transparent z-10" />

      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {dailyForecast.map((item) => (
          <div
            key={item.day}
            className="flex-shrink-0 snap-start
                       bg-gradient-to-br from-blue-200 via-blue-100 to-white
                       p-5 rounded-2xl shadow-lg min-w-[140px] text-center
                       hover:shadow-2xl hover:scale-105 transition transform
                       md:min-w-[160px] lg:min-w-[180px]"
          >
            <p className="font-semibold text-sm">{item.day}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="mx-auto"
            />

            <p className="text-lg font-bold mt-2">
              {item.maxTemp}°C / {item.minTemp}°C
            </p>

            <p className="text-xs text-gray-700 capitalize mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
