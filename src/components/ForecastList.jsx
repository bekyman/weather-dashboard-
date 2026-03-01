export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="w-full mt-2">
      <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-[0.2em] mb-4 px-2">
        5-Day Forecast
      </h3>
      
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-5">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-between min-w-[100px] bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg transition-transform hover:scale-105"
          >
            
            <span className="text-sm font-medium text-blue-100">
              {day.day}
            </span>

           
            <span className="text-3xl my-3 drop-shadow-sm">
              {day.condition === "Rain" ? "🌧️" : day.condition === "Clear" ? "☀️" : "☁️"}
            </span>

           
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-white">
                {Math.round(day?.temp?.day || day?.main?.temp || 0)}°
              </span>
              <span className="text-xs text-blue-300 capitalize">
                {day.condition}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
