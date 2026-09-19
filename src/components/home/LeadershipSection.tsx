import React from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { LEADERSHIP } from "@/data/site-content";
import { Quote, ArrowRight, User, ShieldCheck } from "lucide-react";

export default function LeadershipSection() {
  const { chairman, director } = LEADERSHIP;

  return (
    <section className="py-20 bg-[#0A192F] text-white border-b border-slate-800 relative overflow-hidden subtle-hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <SectionHeader
          dark
          badge="Institutional Visionaries"
          title="Leadership & Educational"
          highlightText="Vision"
          subtitle="Guided by experienced leaders dedicated to educational transformation and institutional growth in North Maharashtra."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chairman Card */}
          <div className="glass-card-dark rounded-2xl p-8 space-y-6 border border-slate-700/80 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{chairman.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{chairman.role}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-amber-500/30" />
              </div>

              {chairman.quote && (
                <p className="text-sm italic font-medium text-amber-200/90 border-l-2 border-amber-500 pl-3">
                  &quot;{chairman.quote}&quot;
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                {chairman.message}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Smt. Sitabai Mangilal Agrawal Charitable Trust</span>
              <Link
                href="/about/chairman"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Read Full Address
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Director Card */}
          <div className="glass-card-dark rounded-2xl p-8 space-y-6 border border-slate-700/80 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{director.name}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{director.role}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-blue-500/30" />
              </div>

              {director.quote && (
                <p className="text-sm italic font-medium text-amber-200/90 border-l-2 border-amber-500 pl-3">
                  &quot;{director.quote}&quot;
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                {director.message}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">AIM Academic Directorate</span>
              <Link
                href="/about/director"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Read Academic Message
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
