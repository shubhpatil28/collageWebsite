import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { SITE_INFO } from "@/data/site-content";
import Link from "next/link";
import { ShieldCheck, Building2, ExternalLink, Award, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Recognition & Affiliation",
  description: "Affiliation details with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon, and DTE Maharashtra approval."
};

export default function RecognitionPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Recognition & Affiliation"
        subtitle="Official affiliations, university sanctions, and government recognitions governing AIM Chalisgaon."
        badge="Regulatory Compliance"
        breadcrumbs={[
          { label: "About", href: "/about" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        {/* Main Regulatory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* University Affiliation */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                UNIVERSITY AFFILIATION
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                KBCNMU Jalgaon
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Kavayitri Bahinabai Chaudhari North Maharashtra University
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All undergraduate (BCA, BBA) and postgraduate (MMS) degree courses conducted at AIM Chalisgaon strictly follow the official academic framework, examination schedules, and syllabus prescribed by KBCNMU Jalgaon.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900">Affiliation Status:</div>
              <div>Regularly Affiliated Higher Education Institute</div>
            </div>
          </div>

          {/* DTE Government Approval */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-700" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                STATE GOVERNMENT RECOGNITION
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                DTE Maharashtra
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Directorate of Technical Education, Govt. of Maharashtra
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Recognized by the Directorate of Technical Education, Government of Maharashtra. Students admitted to AIM Chalisgaon are eligible for official state government freeships and MahaDBT scholarships.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900">DTE Institute Code:</div>
              <div className="font-mono text-amber-700 font-bold">{SITE_INFO.dcode}</div>
            </div>
          </div>

        </div>

        {/* Parent Trust Sanction */}
        <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold text-white">Trust Governance & Management</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AIM Chalisgaon is established and governed by the <strong>{SITE_INFO.trust}</strong>. The trust ensures continuous financial stability, modern laboratory infrastructure, and faculty welfare.
          </p>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold">Established 2001 | Chalisgaon, Jalgaon</span>
            <Link href="/admissions" className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors">
              Admission Guidelines
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
