import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white/80 rounded-2xl shadow-md p-6 mt-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Search City</h2>

      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="bg-transparent outline-none flex-1"
        />
        <button className="text-xl">🔍</button>
      </div>
    </form>
  );
}
