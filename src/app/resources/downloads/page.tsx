import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { DOWNLOADS } from "@/data/site-content";
import { Download, FileText, Calendar, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Downloads & Documents",
  description: "Official downloadable PDF documents, syllabus structures, and application forms for AIM Chalisgaon."
};

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Downloads & Document Repository"
        subtitle="Download official university syllabus PDFs, prospectus brochures, and student application forms."
        badge="Resource Center"
        breadcrumbs={[
          { label: "Resources", href: "/resources/notices" },
          { label: "Downloads", href: "/resources/downloads" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-4">
          {DOWNLOADS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 font-extrabold text-sm flex items-center justify-center shrink-0">
                  {doc.fileFormat}
                </div>

                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 uppercase">
                    {doc.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {doc.title}
                  </h3>
                  {doc.fileSize && (
                    <p className="text-xs text-slate-400">File Size: {doc.fileSize}</p>
                  )}
                </div>
              </div>

              <a
                href={doc.link}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors shadow"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
