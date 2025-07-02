import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdMenuBook } from "react-icons/md";

export default async function Home() {
  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(120,119,198,0.2),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Book Icon */}
          <div className="my-8 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg">
                <MdMenuBook className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-6 leading-tight">
            Reading Progress
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Tracker
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-zinc-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Transform your reading journey with intelligent tracking
          </p>

          <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto">
            Discover, track, and celebrate every book you read with our
            beautiful and intuitive platform
          </p>
        </div>

        {/* Feature Highlights */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-400 text-sm">📚</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Track Progress</h3>
            <p className="text-zinc-400 text-sm">
              Monitor your reading journey
            </p>
          </div>

          <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-400 text-sm">🎯</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Set Goals</h3>
            <p className="text-zinc-400 text-sm">
              Achieve your reading targets
            </p>
          </div>

          <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 text-center hover:bg-zinc-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-cyan-400 text-sm">📊</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Analytics</h3>
            <p className="text-zinc-400 text-sm">Insights into your habits</p>
          </div>
        </div> */}

        {/* Auth Button Links */}
        <div className="space-y-4 w-full max-w-sm mx-auto">
          <Button
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/register" className="flex items-center justify-center">
              <span>Get Started Free</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </Button>

          <div className="flex space-x-3">
            <Button
              className="flex-1 h-11 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 border border-zinc-600/50 hover:border-zinc-500/50 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link href="/login/username">Username Login</Link>
            </Button>

            <Button
              className="flex-1 h-11 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 border border-zinc-600/50 hover:border-zinc-500/50 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link href="/login/email">Email Login</Link>
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center space-x-8 mb-4 text-zinc-500 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Free to use</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Privacy focused</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Easy to use</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
    </main>
  );
}
