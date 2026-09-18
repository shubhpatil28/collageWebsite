import React from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import AdmissionsEnquiryForm from "@/components/ui/AdmissionsEnquiryForm";
import { SITE_INFO } from "@/data/site-content";
import { PhoneCall, Mail, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdmissionCtaSection() {
  return (
    <section className="py-20 bg-[#0A192F] text-white relative overflow-hidden subtle-hero-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Admissions Open AY 2026-27
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Begin Your Academic Journey at <span className="gold-gradient-text">AIM Chalisgaon</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Whether you aim to excel in software technology with <strong>BCA</strong>, master enterprise management with <strong>BBA</strong>, or pursue advanced management studies with <strong>MMS</strong>, AIM provides the right academic platform.
            </p>

            {/* Factual Admission Benefits */}
            <div className="space-y-3 pt-2">
              {[
                "Regular Affiliation with KBCNMU Jalgaon",
                "Full Govt. Scholarship Support (MahaDBT SC/ST/OBC/EBC)",
                "Transparent University Merit Admission Process",
                "Dedicated Helpdesk & Guidance Support"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quick Helpline Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Direct Admission Helpline
              </h4>
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200">
                <a href={`tel:${SITE_INFO.phoneNumbers[0]}`} className="flex items-center gap-2 hover:text-amber-400 font-bold transition-colors">
                  <PhoneCall className="w-4 h-4 text-amber-500" />
                  <span>{SITE_INFO.phoneNumbers[0]}</span>
                </a>
                <a href={`tel:${SITE_INFO.phoneNumbers[1]}`} className="flex items-center gap-2 hover:text-amber-400 font-bold transition-colors">
                  <PhoneCall className="w-4 h-4 text-amber-500" />
                  <span>{SITE_INFO.phoneNumbers[1]}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Admission Form */}
          <div className="lg:col-span-6">
            <AdmissionsEnquiryForm />
          </div>

        </div>
      </div>
    </section>
  );
}
