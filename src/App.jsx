import { useEffect } from "react";
import { getWeather } from "./services/weatherService";

export default function App() {

  useEffect(() => {
    getWeather("Addis Ababa")
      .then(data => console.log(data))
      .catch(err => console.error(err.message));
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-xl">
      Check console for weather data
    </div>
  );
}
