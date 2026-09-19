export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About AIM", href: "/about", description: "History, Mission, Vision & Campus" },
      { label: "Chairman's Message", href: "/about/chairman", description: "Message from Sh. Narayanbhau Agrawal" },
      { label: "Director's Message", href: "/about/director", description: "Academic Vision from Prof. Piyush S. Agrawal" },
      { label: "Recognition & Affiliation", href: "/about/recognition", description: "KBCNMU Jalgaon & DTE Approval" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Programs Overview", href: "/academics", description: "All Undergraduate & Postgraduate Offerings" },
      { label: "BCA Program", href: "/academics/bca", description: "Bachelor of Computer Applications" },
      { label: "BBA Program", href: "/academics/bba", description: "Bachelor of Business Administration" },
      { label: "MMS Program", href: "/academics/mms", description: "Master of Management Studies (Comp. Mgmt.)" }
    ]
  },
  { label: "Admissions", href: "/admissions", badge: "2026-27" },
  { label: "Faculty", href: "/faculty" },
  { label: "Campus Life", href: "/campus-life" },
  {
    label: "Resources",
    href: "/resources/notices",
    children: [
      { label: "Notices & Circulars", href: "/resources/notices", description: "Exam updates, Admissions & Events" },
      { label: "Downloads & Forms", href: "/resources/downloads", description: "Syllabus, Prospectus & Registration forms" }
    ]
  },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" }
];
