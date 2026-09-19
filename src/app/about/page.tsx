import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { SITE_INFO, LEADERSHIP } from "@/data/site-content";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  GraduationCap,
  Target,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "About AIM Chalisgaon",
  description: "Learn about Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon, established in 2001 under Smt. Sitabai Mangilal Agrawal Charitable Trust."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="About AIM Chalisgaon"
        subtitle="Dedicated to fostering academic excellence, technical mastery, and professional management leadership in North Maharashtra."
        badge="Institutional Profile"
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Story & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              OUR FOUNDATION & HISTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              A Legacy of Quality Education in <span className="gold-gradient-text">Chalisgaon</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Established in <strong>{SITE_INFO.established}</strong> by the <strong>{SITE_INFO.trust}</strong>, Smt. S. M. Agrawal Institute of Management (AIM) was conceived to address the growing need for high-caliber management and computer education in the region.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Affiliated with <strong>{SITE_INFO.affiliation}</strong> and recognized by the <strong>{SITE_INFO.recognition}</strong>, AIM has provided thousands of rural and semi-urban students access to standardized higher education.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "KBCNMU University Syllabus",
                "Regular Seminars & Guest Lectures",
                "Computer Programming Labs",
                "Personality Development Programs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl flex items-center justify-center">
                  2001
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Trust Founding</h3>
                  <p className="text-xs text-amber-400 font-medium">{SITE_INFO.trust}</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-800 pt-4 text-xs text-slate-300">
                <div>
                  <strong className="text-white block text-sm">Location Advantage:</strong>
                  Ghat Road, Opp. Market Yard, near Aurangabad Road, Chalisgaon - 424101, Dist. Jalgaon.
                </div>
                <div>
                  <strong className="text-white block text-sm">DTE Code:</strong>
                  {SITE_INFO.dcode}
                </div>
              </div>

              <Link
                href="/about/recognition"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
              >
                View Affiliations & Approvals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Institutional Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To emerge as a benchmark institution in North Maharashtra for management and computer education, nurturing academically sound, ethically responsible, and career-ready professionals.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Institutional Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To deliver practical learning environments, maintain high standards of university instruction, build state-of-the-art computer laboratories, and foster holistic student growth.
            </p>
          </div>
        </div>

        {/* Quick Links to Leadership Messages */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0A192F] to-[#0F2744] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Leadership Guidance & Messages</h3>
            <p className="text-xs text-slate-300">
              Read formal messages from Chairman Sh. Narayanbhau Agrawal and I/C Director Prof. Piyush S. Agrawal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/about/chairman"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
            >
              Chairman&apos;s Message
            </Link>
            <Link
              href="/about/director"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              Director&apos;s Message
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
