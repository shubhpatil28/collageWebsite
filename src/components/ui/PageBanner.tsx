import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageBanner({
  title,
  subtitle,
  badge,
  breadcrumbs = []
}: PageBannerProps) {
  return (
    <div className="relative bg-[#0A192F] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden subtle-hero-grid">
      {/* Background Accent Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-4">
        {/* Breadcrumb Links */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href={crumb.href} className="hover:text-amber-400 transition-colors">
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">{title}</span>
        </nav>

        <div className="space-y-2">
          {badge && (
            <span className="inline-block px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
