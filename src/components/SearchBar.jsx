import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 mb-6">
      <input
        type="text"
        placeholder="Search for a city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-5 py-3 rounded-2xl text-gray-800 bg-white/95 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-inner transition-all"
      />
      <button 
        type="submit"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 transition-colors rounded-2xl font-semibold shadow-lg"
      >
        Search
      </button>
    </form>
  );
}
