"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { checkAdminAuthorization, adminSignOut } from "@/lib/adminAuth";
import { SITE_INFO } from "@/data/site-content";
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Building2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialChecking, setInitialChecking] = useState(true);

  // Check if already authenticated and authorized
  useEffect(() => {
    if (!auth) {
      setInitialChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { isAuthorized } = await checkAdminAuthorization(user.uid);
        if (isAuthorized) {
          router.replace("/admin");
          return;
        }
      }
      setInitialChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setStatus("error");
      return;
    }

    if (!isFirebaseConfigured() || !auth) {
      setErrorMessage("Firebase is not configured. Please add NEXT_PUBLIC_FIREBASE_* environment variables.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Check admin authorization in Firestore `admins/{uid}`
      const { isAuthorized, error } = await checkAdminAuthorization(user.uid);

      if (!isAuthorized) {
        // Sign out user since they lack active admin privileges
        await adminSignOut();
        setErrorMessage(error || "Your account does not have administrator access.");
        setStatus("error");
        return;
      }

      // Success -> Redirect to Admin Dashboard
      router.push("/admin");
    } catch (err: unknown) {
      console.error("Admin Login Error:", err);
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      if (msg.includes("auth/invalid-credential") || msg.includes("auth/user-not-found") || msg.includes("auth/wrong-password")) {
        setErrorMessage("Invalid email or password credentials.");
      } else {
        setErrorMessage("Login failed. Please verify credentials or contact system administrator.");
      }
      setStatus("error");
    }
  };

  if (initialChecking) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span className="text-sm font-medium">Verifying session authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation link back to site */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
        <div className="w-14 h-14 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Building2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Institutional Portal
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AIM Admin Dashboard
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {SITE_INFO.name} — Admission Enquiry Management System
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-800 space-y-6">
          {!isFirebaseConfigured() && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Firebase Setup Pending
              </p>
              <p className="text-slate-300">
                Firebase keys are not configured in environment variables. Please follow <code>FIREBASE_SETUP.md</code> to connect your project.
              </p>
            </div>
          )}

          {status === "error" && errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-rose-200">Access Denied</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aimchalisgaon.ac.in"
                  disabled={status === "loading"}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={status === "loading"}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating Administrator...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="border-t border-slate-800 pt-4 text-center">
            <p className="text-[11px] text-slate-500">
              Authorized Personnel Only • AIM Chalisgaon DTE Code 5162
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
