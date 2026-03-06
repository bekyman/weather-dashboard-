export default function WeatherCard({ weather }) {
  if (!weather) return null;

  
  const windKmh = Math.round(weather.wind.speed * 3.6); 

  return (
   
    <div className="w-full text-center">
      <h3 className="text-xl font-medium mb-6 border-b border-white/30 pb-2">
        Current Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="flex flex-col items-center">
          <p className="font-light text-gray-200">Feels Like</p>
          <p className="text-2xl font-semibold mt-1">
            {Math.round(weather.main.feels_like)}°
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="font-light text-gray-200">Humidity</p>
          <p className="text-2xl font-semibold mt-1">
            {weather.main.humidity}%
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="font-light text-gray-200">Wind</p>
          <p className="text-2xl font-semibold mt-1">
            {windKmh} <span className="text-base font-normal">km/h</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="font-light text-gray-200">Pressure</p>
          <p className="text-2xl font-semibold mt-1">
            {weather.main.pressure} <span className="text-base font-normal">hPa</span>
          </p>
        </div>
      </div>
    </div>
  );
}
