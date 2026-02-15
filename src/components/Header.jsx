export default function Header() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-full px-8 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <div className="text-3xl">☁️</div>
        <h1 className="text-xl font-semibold tracking-wide">Weather Application</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
        <span className="font-medium">User</span>
      </div>
    </div>
  );
}
