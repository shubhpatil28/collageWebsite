import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlightText,
  subtitle,
  centered = true,
  dark = false
}: SectionHeaderProps) {
  return (
    <div className={`space-y-3 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
            dark
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              : "bg-amber-100 text-amber-900 border border-amber-200"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {badge}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}{" "}
        {highlightText && (
          <span className="gold-gradient-text block sm:inline">{highlightText}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
