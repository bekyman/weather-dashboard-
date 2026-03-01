export default function ForecastList({ forecast }) {
  return (
    <div className="mt-6">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
        {forecast.map((item) => (
          <div
            key={item.dt}
            className="flex-shrink-0 snap-start bg-white p-4 rounded-2xl shadow-md min-w-[130px] text-center hover:scale-105 transition-transform duration-200"
          >
            <p className="font-semibold text-sm">
              {new Date(item.dt_txt).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />

            <p className="text-lg font-bold">
              {Math.round(item.main.temp)}°C
            </p>

            <p className="text-xs text-gray-500 capitalize">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
