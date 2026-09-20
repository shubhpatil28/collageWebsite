import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import Link from "next/link";
import { Users, GraduationCap, Award, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Alumni Network",
  description: "Official Alumni Network of Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon."
};

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Alumni Network & Community"
        subtitle="Connecting AIM Chalisgaon graduates across IT industries, corporate enterprises, and entrepreneurial ventures."
        badge="AIM Community"
        breadcrumbs={[]}
        parentHref="/"
        parentLabel="Home"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Users className="w-6 h-6 text-amber-700" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome Back, AIM Alumni!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Since 2001, thousands of BCA, BBA, and MMS graduates have passed through the portals of AIM Chalisgaon. Our alumni serve as software engineers, database administrators, marketing executives, financial leads, and successful business owners across Maharashtra and India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Stay Connected</h3>
              <p className="text-xs text-slate-600">
                Share your career achievements and mentor junior students.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Guest Lectures & Placement</h3>
              <p className="text-xs text-slate-600">
                Alumni are invited to deliver industry interaction sessions on campus.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Note */}
        <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Alumni Registration & Association</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            For alumni registration or to update your current organizational details, please email our office at <strong>aim.office@rediffmail.com</strong> or call our administrative desk.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5">
              Contact Alumni Coordinator
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
