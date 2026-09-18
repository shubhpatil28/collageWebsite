import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Bell,
  Download,
  PhoneCall,
  UserCheck,
  Building2
} from "lucide-react";

export default function QuickActionBar() {
  const actions = [
    {
      title: "Admissions 2026",
      subtitle: "Process & Eligibility",
      href: "/admissions",
      icon: GraduationCap,
      color: "from-amber-500 to-amber-600",
      textColor: "text-slate-950"
    },
    {
      title: "Programs",
      subtitle: "BCA / BBA / MMS",
      href: "/academics",
      icon: BookOpen,
      color: "from-slate-800 to-slate-900",
      textColor: "text-white"
    },
    {
      title: "Latest Notices",
      subtitle: "Exams & Circulars",
      href: "/resources/notices",
      icon: Bell,
      color: "from-slate-800 to-slate-900",
      textColor: "text-white"
    },
    {
      title: "Downloads",
      subtitle: "Syllabus & Forms",
      href: "/resources/downloads",
      icon: Download,
      color: "from-slate-800 to-slate-900",
      textColor: "text-white"
    },
    {
      title: "Faculty Directory",
      subtitle: "Professors & Staff",
      href: "/faculty",
      icon: UserCheck,
      color: "from-slate-800 to-slate-900",
      textColor: "text-white"
    },
    {
      title: "Contact Office",
      subtitle: "Map & Helpline",
      href: "/contact",
      icon: PhoneCall,
      color: "from-[#0A192F] to-[#0F2744]",
      textColor: "text-white"
    }
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              href={act.href}
              className="group p-4 rounded-2xl bg-white shadow-xl hover:shadow-2xl border border-slate-200 hover:border-amber-500/50 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${act.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${act.textColor === 'text-slate-950' ? 'text-slate-950' : 'text-amber-400'}`} />
                </div>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-normal">
                  {act.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
