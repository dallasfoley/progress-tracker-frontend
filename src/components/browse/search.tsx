import { BookDetails } from "@/schema/BookSchema";

export default function Search({ books }: { books: BookDetails[] }) {
  return (
    <>
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4">
          Discover Books
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Explore our collection and find your next great read
        </p>
        <div className="inline-flex items-center bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-full px-6 py-3 mt-6">
          <div className="flex items-center space-x-2 text-zinc-300">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {books.length} books available
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-64 h-11 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 pl-10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select className="h-11 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm">
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
          </select>

          <button className="h-11 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-300 hover:bg-zinc-700/50 transition-all duration-300 backdrop-blur-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
