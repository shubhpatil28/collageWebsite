import React from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { NOTICES, DOWNLOADS } from "@/data/site-content";
import {
  Bell,
  Download,
  Calendar,
  FileText,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function NoticesAndDownloadsSection() {
  return (
    <section className="py-20 bg-[#FAFAFA] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeader
          badge="Information Hub"
          title="Latest Circulars &"
          highlightText="Resource Downloads"
          subtitle="Stay updated with university semester exam forms, admission notifications, syllabus documents, and academic bulletins."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official Notices Feed */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Recent Notices & Bulletins</h3>
              </div>

              <Link
                href="/resources/notices"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {NOTICES.slice(0, 4).map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {notice.date}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-200 text-slate-700 uppercase">
                      {notice.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {notice.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Download Documents */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Official Downloads</h3>
              </div>

              <Link
                href="/resources/downloads"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors"
              >
                All Downloads
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {DOWNLOADS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400/50 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                      PDF
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-800 transition-colors line-clamp-1">
                        {doc.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>Category: {doc.category}</span>
                        {doc.fileSize && <span>• {doc.fileSize}</span>}
                      </div>
                    </div>
                  </div>

                  <a
                    href={doc.link}
                    download
                    className="p-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shrink-0"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
