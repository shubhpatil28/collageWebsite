import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { NOTICES } from "@/data/site-content";
import { Bell, Calendar, Tag, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Notices & Bulletins",
  description: "Official notifications, university exam schedules, and admission circulars from AIM Chalisgaon."
};

export default function NoticesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Official Notices & Circulars"
        subtitle="Stay updated with university semester exam notifications, admission alerts, and academic announcements."
        badge="Resource Center"
        breadcrumbs={[
          { label: "Resources", href: "/resources/notices" },
          { label: "Notices", href: "/resources/notices" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-4">
          {NOTICES.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {notice.date}
                </span>

                <div className="flex items-center gap-2">
                  {notice.isImportant && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700 uppercase">
                      Urgent Alert
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-200 text-slate-700 uppercase">
                    {notice.category}
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {notice.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {notice.description}
              </p>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
