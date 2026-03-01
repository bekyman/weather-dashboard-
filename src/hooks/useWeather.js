export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">5-Day Forecast</h3>
      
      
      <div className="flex justify-between gap-2 overflow-x-auto pb-2">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center bg-white/50 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-gray-100 min-w-[70px]"
          >
            
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
              {day.day}
            </span>
            
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.condition} 
              className="w-10 h-10 my-1"
            />
            
            <span className="text-lg font-bold text-gray-800">
              {Math.round(day.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
