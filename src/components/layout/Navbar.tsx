"use client";
// src/components/layout/Navbar.tsx

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAVIGATION } from "@/data/navigation";
import { SITE_INFO } from "@/data/site-content";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  PhoneCall,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-[#050C1A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Affiliated to KBCNMU Jalgaon & DTE Approved (Code: {SITE_INFO.dcode})
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {SITE_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={`tel:${SITE_INFO.phoneNumbers[0]}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_INFO.phoneNumbers[0]}</span>
            </a>
            <a
              href={`mailto:${SITE_INFO.emails[0]}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{SITE_INFO.emails[0]}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3 shadow-xl"
            : "bg-[#0A192F] py-4 border-b border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Institution Branding */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A192F] rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg sm:text-xl tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                AIM <span className="text-amber-400 font-extrabold text-sm sm:text-base">CHALISGAON</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-normal leading-tight mt-0.5 line-clamp-1">
                Smt. S. M. Agrawal Institute of Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {MAIN_NAVIGATION.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.children && item.children.some((c) => pathname === c.href));

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-amber-400 bg-amber-500/10 font-semibold"
                          : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-amber-400" />
                    </button>

                    {/* Mega Dropdown Menu */}
                    <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="glass-card-dark rounded-xl p-2 shadow-2xl border border-slate-700/80">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`block px-3.5 py-2.5 rounded-lg transition-colors ${
                                isChildActive
                                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                                  : "hover:bg-slate-800 text-slate-200 hover:text-white"
                              }`}
                            >
                              <div className="text-xs font-semibold flex items-center justify-between">
                                {child.label}
                                {isChildActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                )}
                              </div>
                              {child.description && (
                                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 font-normal">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 font-semibold"
                      : "text-slate-200 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admissions"
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Apply Now 2026-27
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/admissions"
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg shadow"
            >
              Apply
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-card-dark border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2 max-h-[80vh] overflow-y-auto">
            {MAIN_NAVIGATION.map((item) => {
              if (item.children) {
                const isOpen = activeDropdown === item.label;
                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-slate-200 rounded-lg hover:bg-slate-800"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-900/60 rounded-lg border-l-2 border-amber-500">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-xs text-slate-300 hover:text-amber-400"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/admissions"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow"
              >
                Start Admission Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
