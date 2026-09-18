import React from "react";
import Link from "next/link";
import { SITE_INFO, PROGRAMS } from "@/data/site-content";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronRight,
  FileText
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050C1A] text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: About Institute & Affiliations */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#0A192F] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  AIM <span className="text-amber-400">CHALISGAON</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {SITE_INFO.name}
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Established in <strong className="text-slate-200">{SITE_INFO.established}</strong> by the{" "}
              <strong className="text-slate-200">{SITE_INFO.trust}</strong>. Committed to empowering students of North Maharashtra through industry-aligned higher education in Computer Applications & Management.
            </p>

            <div className="p-4 rounded-xl bg-[#0A192F] border border-slate-800 space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Affiliated to:</strong> {SITE_INFO.affiliation}
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Recognized by:</strong> {SITE_INFO.recognition} (DTE Code: {SITE_INFO.dcode})
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2.5">
              Academic Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <Link
                    href={`/academics/${prog.id}`}
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500/60 group-hover:translate-x-1 transition-transform" />
                    <span>{prog.code} - {prog.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline pt-2"
                >
                  View All Programs & Syllabus
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2.5">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About AIM & Trust", href: "/about" },
                { label: "Chairman's Message", href: "/about/chairman" },
                { label: "Director's Message", href: "/about/director" },
                { label: "Admissions 2026-27", href: "/admissions" },
                { label: "Faculty Directory", href: "/faculty" },
                { label: "Campus Facilities", href: "/campus-life" },
                { label: "Notices & Circulars", href: "/resources/notices" },
                { label: "Downloads & Forms", href: "/resources/downloads" },
                { label: "Alumni Network", href: "/alumni" },
                { label: "Contact Helpdesk", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2.5">
              Contact Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-normal">{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="space-y-0.5">
                  <div>{SITE_INFO.phoneNumbers[0]}</div>
                  <div>{SITE_INFO.phoneNumbers[1]}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{SITE_INFO.emails[0]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_INFO.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Get Directions & Map
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {SITE_INFO.name}, Chalisgaon. Managed by {SITE_INFO.trust}.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/about/recognition" className="hover:text-amber-400 transition-colors">
              Affiliation & Recognition
            </Link>
            <Link href="/resources/downloads" className="hover:text-amber-400 transition-colors">
              Prospectus & Guidelines
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Admission Helpline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
