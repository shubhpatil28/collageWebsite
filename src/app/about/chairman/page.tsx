import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { LEADERSHIP, SITE_INFO } from "@/data/site-content";
import Link from "next/link";
import { Quote, ShieldCheck, CheckCircle2, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Chairman's Message - Sh. Narayanbhau Agrawal",
  description: "Read Chairman Sh. Narayanbhau Agrawal's vision for Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon."
};

export default function ChairmanPage() {
  const { chairman } = LEADERSHIP;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Chairman's Message"
        subtitle="Address from Sh. Narayanbhau Agrawal, Founder & Chairman of Smt. Sitabai Mangilal Agrawal Charitable Trust."
        badge="Trust Leadership"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Chairman", href: "/about/chairman" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        {/* Profile Banner Card */}
        <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="w-24 h-24 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <User className="w-12 h-12" />
          </div>

          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              TRUST LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{chairman.name}</h2>
            <p className="text-xs text-slate-300 font-medium">{chairman.role}</p>
            <p className="text-xs text-amber-300/80">{SITE_INFO.trust}</p>
          </div>
        </div>

        {/* Quote & Detailed Message */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          {chairman.quote && (
            <div className="p-6 rounded-xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-800">
                <Quote className="w-4 h-4 text-amber-600" />
                Institutional Philosophy
              </div>
              <p className="text-base sm:text-lg italic font-semibold">
                &quot;{chairman.quote}&quot;
              </p>
            </div>
          )}

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Formal Address
            </h3>
            <p>{chairman.message}</p>
            <p>
              When we founded this institute in 2001, our primary commitment was to eliminate educational disparity for students residing in Chalisgaon and surrounding areas. Through continuous infrastructure investments, quality university curriculum execution, and disciplined campus governance, AIM has carved a distinct reputation.
            </p>
          </div>

          {/* Key Vision Points */}
          {chairman.visionPoints && (
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Core Visionary Objectives:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chairman.visionPoints.map((point, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <strong>Sh. Narayanbhau Agrawal</strong>
              <br />
              Chairman, Smt. Sitabai Mangilal Agrawal Charitable Trust, Chalisgaon
            </div>

            <Link
              href="/about/director"
              className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 transition-colors"
            >
              Read Director&apos;s Message
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>
    </main>
  );
}
