"use me";
"use client";

import React from "react";
import Link from "next/link";
import { SITE_INFO } from "@/data/site-content";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Building2,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A192F] text-white overflow-hidden subtle-hero-grid pt-12 sm:pt-20 pb-20 sm:pb-28 border-b border-slate-800">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-400 font-bold">ESTD {SITE_INFO.established}</span>
              <span className="text-slate-500">|</span>
              <span className="truncate">Affiliated to KBCNMU Jalgaon</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Shape Your Future With <br className="hidden sm:inline" />
                <span className="gold-gradient-text">AIM Chalisgaon</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Smt. S. M. Agrawal Institute of Management is North Maharashtra’s premier educational institution delivering academic excellence in <strong className="text-white">BCA</strong>, <strong className="text-white">BBA</strong>, and <strong className="text-white">MMS</strong> programs.
              </p>
            </div>

            {/* Factual Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                "Recognized by DTE Govt. of Maharashtra",
                "KBCNMU University Curriculum",
                "Modern Computer & Language Labs",
                "Dedicated Career & Higher Study Mentoring"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Apply For Admission 2026-27</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/academics"
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm sm:text-base border border-slate-700 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Explore Programs</span>
              </Link>
            </div>

            {/* Trust Pill */}
            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-4 h-4 text-amber-400" />
                Managed by: {SITE_INFO.trust}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Academic Hero Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

              <div className="relative glass-card-dark rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-700 shadow-2xl">
                
                {/* Academic Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">INSTITUTE CODE</span>
                      <p className="text-sm font-bold text-white">{SITE_INFO.dcode}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-slate-950 rounded-full">
                    ADMISSIONS OPEN
                  </span>
                </div>

                {/* Course Quick Preview List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Featured Degree Programs
                  </h4>

                  {[
                    { code: "BCA", title: "Bachelor of Computer Applications", duration: "3 Years / NEP 4 Years" },
                    { code: "BBA", title: "Bachelor of Business Administration", duration: "3 Years / NEP 4 Years" },
                    { code: "MMS", title: "Master of Management Studies", duration: "2 Years PG Program" }
                  ].map((prog, idx) => (
                    <Link
                      key={idx}
                      href={`/academics/${prog.code.toLowerCase()}`}
                      className="block p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {prog.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                            {prog.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 pl-9">
                        Duration: {prog.duration}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Callout Notice */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold block text-amber-300">Admission Guidance Helpdesk</span>
                    <span className="text-[11px] text-amber-200/80">Call: {SITE_INFO.phoneNumbers[0]}</span>
                  </div>
                  <Link href="/admissions" className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors">
                    Enquire
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
