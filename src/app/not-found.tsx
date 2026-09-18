import React from "react";
import Link from "next/link";
import { GraduationCap, Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A192F] text-white flex items-center justify-center p-4 relative overflow-hidden subtle-hero-grid">
      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30 shadow-2xl">
          <GraduationCap className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The page you are looking for may have been relocated or is currently under maintenance.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>

          <Link
            href="/academics"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
          >
            Explore Programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </main>
  );
}
