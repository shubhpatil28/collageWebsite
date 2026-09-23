import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_INFO } from "@/data/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://collage-website-rho.vercel.app"),
  title: {
    default: "Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon",
    template: "%s | AIM Chalisgaon"
  },
  description: "Official website of Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon. Offering BCA, BBA, and MMS degree programs affiliated with KBCNMU Jalgaon and approved by DTE Maharashtra.",
  keywords: [
    "AIM Chalisgaon",
    "Smt S M Agrawal Institute of Management",
    "BCA College Chalisgaon",
    "BBA College Chalisgaon",
    "MMS Chalisgaon",
    "KBCNMU Jalgaon Affiliated College",
    "Management Institute Jalgaon",
    "Computer Application College Maharashtra"
  ],
  authors: [{ name: SITE_INFO.trust }],
  icons: {
    icon: [
      { url: "/images/smt_logo.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/images/smt_logo.png",
    apple: "/images/smt_logo.png",
  },
  openGraph: {
    title: "Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon",
    description: "Premier academic institution in North Maharashtra offering BCA, BBA & MMS degree programs under KBCNMU Jalgaon.",
    url: "https://collage-website-rho.vercel.app/",
    siteName: "AIM Chalisgaon",
    images: [
      {
        url: "/images/aim-logo.png",
        width: 800,
        height: 800,
        alt: "Smt. S. M. Agrawal Institute of Management Logo",
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
