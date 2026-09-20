"use client";

import React, { useState } from "react";
import PageBanner from "@/components/ui/PageBanner";
import { FACULTY_LIST } from "@/data/site-content";
import { User, GraduationCap, Award, Mail, Briefcase, Filter } from "lucide-react";

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = ["All", "Computer Applications", "Management Studies"];

  const filteredFaculty = FACULTY_LIST.filter((f) => {
    if (selectedDept === "All") return true;
    return f.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Faculty & Leadership Directory"
        subtitle="Meet the experienced professors, department heads, and instructors at AIM Chalisgaon."
        badge="Academic Staff"
        breadcrumbs={[]}
        parentHref="/"
        parentLabel="Home"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Filter By Department:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? "bg-[#0A192F] text-amber-400 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0A192F] text-amber-400 flex items-center justify-center font-bold text-xl border border-slate-800 shrink-0">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {faculty.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 mt-0.5">
                      {faculty.designation}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">{faculty.qualification}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Dept: {faculty.department}</span>
                  </div>

                  {faculty.specialization && (
                    <div className="flex items-start gap-2 pt-1">
                      <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Focus: {faculty.specialization}</span>
                    </div>
                  )}
                </div>
              </div>

              {faculty.experience && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 font-medium">
                  Experience: {faculty.experience}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
