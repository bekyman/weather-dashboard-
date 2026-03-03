export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-md animate-fade-in">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
        5-Day Forecast
      </h3>
      
      
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {forecast.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-gray-100 min-w-[90px] transition-all hover:shadow-md"
          >
            
            <span className="text-xs font-black text-blue-600 uppercase">
              {item.day}
            </span>

           
            <img 
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} 
              alt={item.condition} 
              className="w-12 h-12 my-1"
            />

            
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-gray-800">
                {Math.round(item.temp_max)}°
              </span>
              <span className="text-sm text-gray-400 line-through">
                {Math.round(item.temp_min)}°
              </span>
            </div>
            
            
            <span className="text-[10px] text-gray-400 font-medium capitalize">
              {item.condition}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
