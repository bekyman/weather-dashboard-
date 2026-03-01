export default function ForecastList({ forecast }) {
  return (
    <div className="mt-8 max-w-6xl mx-auto px-4">
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin">
        {forecast.map((item) => (
          <div
            key={item.dt}
            className="flex-shrink-0 bg-white/80 backdrop-blur-md 
                       p-5 rounded-2xl shadow-md 
                       min-w-[140px] text-center 
                       hover:shadow-lg transition"
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
          </div>
        ))}
      </div>
    </div>
  );
}
