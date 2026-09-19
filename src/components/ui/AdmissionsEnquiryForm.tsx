"use client";

import React, { useState, useEffect } from "react";
import { PROGRAMS, SITE_INFO } from "@/data/site-content";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, PhoneCall, ShieldCheck, RefreshCw } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { notifyNewAdmissionEnquiry } from "@/lib/notifications";

const COOLDOWN_KEY = "aim_enquiry_submitted_timestamp";
const COOLDOWN_SECONDS = 60;

export default function AdmissionsEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    program: "BCA",
    message: "",
    honeypot: "" // Anti-spam hidden field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  // Check client-side cooldown on mount & timer tick
  useEffect(() => {
    const checkCooldown = () => {
      const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
      if (lastSubmit) {
        const elapsed = Math.floor((Date.now() - parseInt(lastSubmit, 10)) / 1000);
        if (elapsed < COOLDOWN_SECONDS) {
          setCooldownRemaining(COOLDOWN_SECONDS - elapsed);
        } else {
          setCooldownRemaining(0);
        }
      }
    };

    checkCooldown();
    const timer = setInterval(checkCooldown, 1000);
    return () => clearInterval(timer);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Full candidate name is required (minimum 2 characters)";
    }

    if (!formData.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobile.trim())) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Check submission cooldown
    if (cooldownRemaining > 0) {
      setErrorMessage(`Please wait ${cooldownRemaining} seconds before submitting another enquiry.`);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Anti-Spam Honeypot check: If honeypot is populated, silently return success without DB write
    if (formData.honeypot) {
      setTimeout(() => {
        setStatus("success");
      }, 800);
      return;
    }

    // Check Firebase environment configuration
    if (!isFirebaseConfigured() || !db) {
      const isDev = process.env.NODE_ENV !== "production";
      const devMsg = "Firebase backend configuration is missing. Please add NEXT_PUBLIC_FIREBASE_* environment variables.";
      const prodMsg = "Admission enquiry system is temporarily unavailable online. Please contact the Admission Helpdesk directly at " + SITE_INFO.phoneNumbers[0] + ".";

      setErrorMessage(isDev ? devMsg : prodMsg);
      setStatus("error");
      return;
    }

    try {
      const sanitizedFullName = formData.fullName.trim();
      const sanitizedMobile = formData.mobile.replace(/\D/g, "").trim();
      const sanitizedEmail = formData.email.trim().toLowerCase();
      const sanitizedProgram = formData.program.trim();

      // Strict client-side validation against Firestore Security Rules schema
      if (sanitizedFullName.length < 2) {
        setErrorMessage("Full candidate name must be at least 2 characters.");
        setStatus("error");
        return;
      }

      if (sanitizedMobile.length !== 10) {
        setErrorMessage("Mobile number must be exactly 10 digits.");
        setStatus("error");
        return;
      }

      const enquiryPayload = {
        fullName: sanitizedFullName,
        mobile: sanitizedMobile,
        email: sanitizedEmail,
        program: sanitizedProgram,
        message: formData.message.trim(),
        status: "new",
        source: "website",
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Execute Firestore write
      await addDoc(collection(db, "admission_enquiries"), enquiryPayload);

      // Trigger notification stub safely (non-blocking)
      try {
        await notifyNewAdmissionEnquiry({
          fullName: enquiryPayload.fullName,
          mobile: enquiryPayload.mobile,
          email: enquiryPayload.email,
          program: enquiryPayload.program,
          message: enquiryPayload.message,
        });
      } catch (notifErr) {
        console.warn("Non-fatal notification stub warning:", notifErr);
      }

      // Store submit timestamp for cooldown
      if (typeof window !== "undefined") {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        setCooldownRemaining(COOLDOWN_SECONDS);
      }

      setStatus("success");
    } catch (err: unknown) {
      const errCode = (err as { code?: string })?.code || "unknown";
      const errDetail = err instanceof Error ? err.message : String(err);
      console.error(`Firestore Admission Enquiry Error [Code: ${errCode}]:`, errDetail, err);

      const isDev = process.env.NODE_ENV !== "production";
      let userErrMsg = "Unable to submit your enquiry at this moment due to a network or database error. Please try again or call our helpdesk directly.";

      if (errCode === "permission-denied") {
        userErrMsg = "Enquiry submission was declined by database security rules. Please verify your details or call our helpdesk directly.";
      } else if (errCode === "unavailable") {
        userErrMsg = "Database network service is temporarily unavailable. Please check your internet connection or call our helpdesk.";
      }

      setErrorMessage(isDev ? `[Dev Error ${errCode}] ${errDetail}` : userErrMsg);
      setStatus("error");
      // Form data is preserved for retry!
    }
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
              <h4 className="text-2xl font-bold text-slate-900">Your admission enquiry has been submitted successfully.</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. The college admission team at AIM Chalisgaon will contact you at <strong>{formData.mobile}</strong> regarding <strong>{formData.program}</strong> admission guidelines.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto">
              Direct Helpdesk Phone: <a href={`tel:${SITE_INFO.phoneNumbers[0]}`} className="font-bold text-amber-700 underline">{SITE_INFO.phoneNumbers[0]}</a>
            </div>
            <button
              onClick={() => {
                setStatus("idle");
                setErrorMessage("");
                setFormData({ fullName: "", mobile: "", email: "", program: "BCA", message: "", honeypot: "" });
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs hover:bg-slate-800 transition-colors gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Banner */}
            {status === "error" && errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-rose-900">Enquiry Submission Issue</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Hidden Honeypot Field (Spam Protection) */}
            <input
              type="text"
              name="websiteUrl"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              className="hidden absolute -left-[9999px]"
              aria-hidden="true"
            />

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
                disabled={status === "submitting"}
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
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                  placeholder="10-digit mobile number"
                  disabled={status === "submitting"}
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
                  placeholder="student@gmail.com"
                  disabled={status === "submitting"}
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
                disabled={status === "submitting"}
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
                maxLength={500}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about syllabus, eligibility, MahaDBT scholarship, or hostel facilities..."
                disabled={status === "submitting"}
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
              disabled={status === "submitting" || cooldownRemaining > 0}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  Submitting enquiry...
                </>
              ) : cooldownRemaining > 0 ? (
                <>Wait {cooldownRemaining}s before re-submitting</>
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

