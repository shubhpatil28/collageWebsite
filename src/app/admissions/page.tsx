import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import AdmissionsEnquiryForm from "@/components/ui/AdmissionsEnquiryForm";
import { PROGRAMS, SITE_INFO, FAQS } from "@/data/site-content";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calendar,
  Download,
  HelpCircle,
  PhoneCall,
  Clock,
  Building2
} from "lucide-react";

export const metadata = {
  title: "Admissions 2026-27 - Process, Eligibility & Enquiry",
  description: "Official Admission portal for Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon. BCA, BBA & MMS admissions."
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Admissions AY 2026-27"
        subtitle="Transparent university-affiliated admission process for BCA, BBA, and MMS degree programs at AIM Chalisgaon."
        badge="Join AIM Chalisgaon"
        breadcrumbs={[{ label: "Admissions", href: "/admissions" }]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Admission Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                ADMISSION GUIDELINES
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                How to Apply for <span className="gold-gradient-text">Academic Admission</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Admissions to undergraduate (BCA, BBA) and postgraduate (MMS) programs at AIM Chalisgaon are conducted in accordance with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU) Jalgaon norms and DTE Maharashtra guidelines.
              </p>
            </div>

            {/* Admission Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
                4-Step Admission Journey
              </h3>

              {[
                { step: "01", title: "Submit Admission Enquiry", desc: "Fill out the online enquiry form or visit the college office on Ghat Road, Chalisgaon." },
                { step: "02", title: "Document Verification", desc: "Submit original 10th/12th marksheets, TC/LC, caste certificate, and Aadhaar card." },
                { step: "03", title: "University Form Registration", desc: "Register on KBCNMU Jalgaon portal as per official university admission notification." },
                { step: "04", title: "Fee Payment & Final Admission", desc: "Confirm seat allotment and pay prescribed university tuition fees." }
              ].map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 font-extrabold text-sm flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Required Documents List */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                Required Documents Checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {[
                  "SSC (10th) Marksheet & Passing Certificate",
                  "HSC (12th) Marksheet",
                  "Leaving Certificate (TC / LC)",
                  "Cast Certificate & Validity (If Applicable)",
                  "MahaDBT Domicile / Income Certificate",
                  "Passport Size Photographs & Aadhaar Card"
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarship Note */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Government Scholarship Support
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                Eligible SC / ST / VJNT / OBC / SBC / EBC category candidates can apply for Govt. of Maharashtra MahaDBT Post-Matric Scholarships & Freeships.
              </p>
            </div>

          </div>

          {/* Right Column: Admission Enquiry Form */}
          <div className="lg:col-span-6 sticky top-24">
            <AdmissionsEnquiryForm />
          </div>

        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">Frequently Asked Admission Questions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <span className="text-amber-600 font-black">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
