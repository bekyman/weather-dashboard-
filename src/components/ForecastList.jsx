export default function ForecastList({ forecast }) {
  if (!forecast?.length) return null;

  return (
    <div className="mt-8 w-full max-w-lg mx-auto">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
        5-Day Forecast
      </h3>

      <div className="space-y-4">
        {forecast.map((item, index) => {
          const range = item.globalMax - item.globalMin;

          const minPos =
            ((item.temp_min - item.globalMin) / range) * 100;

          const maxPos =
            ((item.temp_max - item.globalMin) / range) * 100;

          return (
            <div key={index} className="flex items-center gap-4">

              
              <span className="w-10 text-gray-700 font-semibold">
                {item.day}
              </span>

              
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.condition}
                className="w-8 h-8"
              />

              
              <span className="text-blue-500 text-sm w-10">
                {Math.round(item.pop * 100)}%
              </span>

              
              <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                <div
                  className="absolute h-2 rounded-full bg-gradient-to-r from-blue-400 to-red-400"
                  style={{
                    left: `${minPos}%`,
                    width: `${maxPos - minPos}%`
                  }}
                />
              </div>

              
              <span className="text-gray-800 font-bold w-10 text-right">
                {Math.round(item.temp_max)}°
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
}
