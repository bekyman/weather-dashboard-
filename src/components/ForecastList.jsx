export default function ForecastList({ forecast }) {

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">

      <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-4 text-center">
        5-Day Forecast
      </h3>

      <div className="flex gap-6 overflow-x-auto pb-2">

        {forecast.map((item, index) => {

          const range = item.globalMax - item.globalMin || 1;

          const minPos =
            ((item.temp_min - item.globalMin) / range) * 100;

          const maxPos =
            ((item.temp_max - item.globalMin) / range) * 100;

          return (
            <div
              key={index}
              className="flex-shrink-0 w-32 backdrop-blur-md bg-white/20 border border-white/10 rounded-2xl p-4 shadow-lg text-center"
            >

              
              <p className="font-semibold text-white">
                {item.day}
              </p>

              
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.condition}
                className="w-10 h-10 mx-auto"
              />

              
              <p className="text-blue-200 text-sm mb-2">
                {Math.round(item.pop * 100)}%
              </p>

              
              <div className="relative h-2 bg-white/20 rounded-full mb-2">

                <div
                  className="absolute h-2 rounded-full bg-gradient-to-r from-blue-400 to-red-400"
                  style={{
                    left: `${minPos}%`,
                    width: `${maxPos - minPos}%`
                  }}
                />

              </div>

              
              <p className="text-white font-bold">
                {Math.round(item.temp_max)}°
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
}
