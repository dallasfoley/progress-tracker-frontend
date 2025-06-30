export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="relative">
        {/* Main spinner */}
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Outer ring */}
        <div className="absolute inset-0 w-16 h-16 border-2 border-blue-100 rounded-full animate-ping opacity-20"></div>
      </div>
      {/* Loading text */}
      <div className="absolute mt-24 text-slate-600 font-medium">
        <div className="flex items-center space-x-1">
          <span>Loading</span>
          <div className="flex space-x-1">
            <div
              className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
