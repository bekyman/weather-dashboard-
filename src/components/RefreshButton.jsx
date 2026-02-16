export default function RefreshButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
    >
      Refresh
    </button>
  );
}
