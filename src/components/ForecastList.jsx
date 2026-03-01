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
    <div className="mt-8 max-w-6xl mx-auto px-4">
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {dailyForecast.map((item) => (
          <div
            key={item.day}
            className="flex-shrink-0 snap-start bg-white/80 backdrop-blur-md
                       p-5 rounded-2xl shadow-md min-w-[140px] text-center
                       hover:shadow-lg transition"
          >
            <p className="font-semibold text-sm">{item.day}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="mx-auto"
            />

            <p className="text-lg font-bold">
              {item.maxTemp}°C / {item.minTemp}°C
            </p>

            <p className="text-xs text-gray-500 capitalize">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
