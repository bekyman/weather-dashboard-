export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full shadow-2xl">
     
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-wide">{weather.name}</h2>
        <p className="text-blue-200 text-lg mt-1 capitalize">{weather.condition}</p>
      </div>

      
      <div className="flex justify-center items-center mb-8 gap-4">
        
        <span className="text-6xl drop-shadow-lg">☁️</span>
        <span className="text-7xl font-light tracking-tighter">
          {Math.round(weather.temp)}°
        </span>
      </div>

     
      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
        <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
          <span className="text-xs text-blue-200 uppercase tracking-widest mb-1">Humidity</span>
          <span className="text-xl font-semibold">{weather.humidity}%</span>
        </div>
        <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
          <span className="text-xs text-blue-200 uppercase tracking-widest mb-1">Wind</span>
          <span className="text-xl font-semibold">{weather.wind} km/h</span>
        </div>
      </div>
    </div>
  );
}
