import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import AdmissionsEnquiryForm from "@/components/ui/AdmissionsEnquiryForm";
import { SITE_INFO } from "@/data/site-content";
import { MapPin, Phone, Mail, Clock, Building2, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Contact Us & Campus Location",
  description: "Official contact numbers, email addresses, and campus map for Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Contact AIM Chalisgaon"
        subtitle="Get in touch with our administrative office, admission helpdesk, or visit our campus in Chalisgaon."
        badge="Contact & Helpdesk"
        breadcrumbs={[]}
        parentHref="/"
        parentLabel="Home"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Campus Address</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {SITE_INFO.address}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Phone & Helpline</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Mobile: {SITE_INFO.phoneNumbers[0]}</div>
              <div>Mobile: {SITE_INFO.phoneNumbers[1]}</div>
              <div>Office: {SITE_INFO.phoneNumbers[2]}</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Email & Hours</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="truncate">Director: {SITE_INFO.emails[0]}</div>
              <div className="truncate">Office: {SITE_INFO.emails[1]}</div>
              <div className="pt-1 text-slate-500">{SITE_INFO.workingHours}</div>
            </div>
          </div>

        </div>

        {/* Map & Admission Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Embed Google Maps & Directions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                CAMPUS LOCATION MAP
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Find Us in Chalisgaon
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Conveniently situated opposite Market Yard near Aurangabad Road in Chalisgaon, Dist. Jalgaon, Maharashtra.
              </p>
            </div>

            {/* Google Map Frame */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
              <iframe
                title="AIM Chalisgaon Map Location"
                src={SITE_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900">Managed by:</div>
              <div>{SITE_INFO.trust}</div>
              <div>DTE Code: {SITE_INFO.dcode}</div>
            </div>
          </div>

          {/* Right Column: Direct Admission Enquiry Form */}
          <div className="lg:col-span-6">
            <AdmissionsEnquiryForm />
          </div>

        </div>

      </section>
    </main>
  );
}
