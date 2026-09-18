"use me";
"use client";

import React, { useState } from "react";
import { PROGRAMS, SITE_INFO } from "@/data/site-content";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, PhoneCall, ShieldCheck } from "lucide-react";

export default function AdmissionsEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    program: "BCA",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";

    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate backend submission safely
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Form Header */}
      <div className="bg-[#0A192F] text-white p-6 sm:p-8 space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Admissions 2026-27 Open
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Submit Admission Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Fill out the form below to receive official program brochures, fee details, and university guidelines.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {status === "success" ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-slate-900">Enquiry Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Our admission desk at AIM Chalisgaon will contact you at <strong>{formData.mobile}</strong> regarding {formData.program} admission.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto">
              Direct Helpdesk: <strong>{SITE_INFO.phoneNumbers[0]}</strong>
            </div>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({ fullName: "", mobile: "", email: "", program: "BCA", message: "" });
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Candidate Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rahul Suresh Patil"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                    : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Grid Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.mobile
                      ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                      : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {errors.mobile && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-rose-400 bg-rose-50/30 focus:ring-rose-400"
                      : "border-slate-300 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Program Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Program Interested In <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none bg-white"
              >
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.code}>
                    {p.code} - {p.name} ({p.degree})
                  </option>
                ))}
                <option value="General Enquiry">General Admission Query</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Message / Queries (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about syllabus, eligibility, MahaDBT scholarship, or hostel facilities..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>

            {/* Privacy & Direct Call note */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Institutional Enquiry
              </span>
              <a href={`tel:${SITE_INFO.phoneNumbers[0]}`} className="text-amber-700 font-semibold hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" />
                Call Helpdesk
              </a>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  Submitting Enquiry...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Official Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
