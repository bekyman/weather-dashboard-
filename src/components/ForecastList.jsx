export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-md animate-fade-in">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
        5-Day Forecast
      </h3>

      <div className="space-y-4">
        {forecast.map((item, index) => {
          const range = item.globalMax - item.globalMin;

          const minPosition =
            ((item.temp_min - item.globalMin) / range) * 100;

          const maxPosition =
            ((item.temp_max - item.globalMin) / range) * 100;

          const barWidth = maxPosition - minPosition;

          return (
            <div
              key={index}
              className="flex items-center gap-4 px-2"
            >
             
              <span className="w-10 text-sm font-semibold text-gray-700">
                {item.day}
              </span>

             
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.condition}
                className="w-8 h-8"
              />

              
              <span className="w-10 text-xs text-blue-500 font-semibold">
                {Math.round(item.pop * 100)}%
              </span>

              
              <div className="flex-1 relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 rounded-full bg-gradient-to-r from-blue-400 to-red-400"
                  style={{
                    left: `${minPosition}%`,
                    width: `${barWidth}%`,
                  }}
                />
              </div>

              
              <span className="w-10 text-sm font-bold text-gray-800 text-right">
                {Math.round(item.temp_max)}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
