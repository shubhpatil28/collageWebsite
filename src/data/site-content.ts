// Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon
// Verified Factual Institutional Data & Content Architecture

export interface Program {
  id: string;
  code: string;
  name: string;
  degree: string;
  duration: string;
  affiliation: string;
  approval: string;
  description: string;
  overview: string;
  eligibility: string[];
  highlights: string[];
  careerOpportunities: string[];
  subjects: {
    semester: string;
    courses: string[];
  }[];
  intake?: string;
}

export interface LeadershipMember {
  name: string;
  title: string;
  role: string;
  designation: string;
  message: string;
  visionPoints?: string[];
  quote?: string;
  image: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience?: string;
  email?: string;
  specialization?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Examination' | 'Academic' | 'Events' | 'General';
  description: string;
  isImportant?: boolean;
  link?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Admission' | 'Academic' | 'Examination' | 'Forms' | 'Syllabus';
  fileFormat: 'PDF';
  fileSize?: string;
  uploadDate: string;
  link: string;
}

export interface CampusFacility {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
}

export const SITE_INFO = {
  name: "Smt. S. M. Agrawal Institute of Management",
  shortName: "AIM Chalisgaon",
  tagline: "Empowering Futures through Academic Excellence & Modern Management",
  established: 2001,
  trust: "Smt. Sitabai Mangilal Agrawal Charitable Trust",
  affiliation: "Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon",
  recognition: "Recognized by Directorate of Technical Education (DTE), Govt. of Maharashtra",
  address: "Opp. Market Yard, Ghat Road, Near Aurangabad Road, Chalisgaon - 424101, Dist. Jalgaon, Maharashtra, India",
  phoneNumbers: ["+91 77700 81314", "+91 73500 76444", "02589-222522"],
  emails: ["aim.director@gmail.com", "aim.office@rediffmail.com"],
  workingHours: "Monday – Saturday: 9:30 AM to 5:30 PM",
  dcode: "AIM-6214",
  mapUrl: "https://maps.google.com/maps?q=Chalisgaon+Market+Yard&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export const QUICK_STATS = [
  { label: "Established Year", value: "2001", suffix: "", icon: "Building2" },
  { label: "Affiliated University", value: "KBCNMU", suffix: "", icon: "GraduationCap" },
  { label: "Approved By", value: "DTE Govt. Maharashtra", suffix: "", icon: "ShieldCheck" },
  { label: "UG & PG Programs", value: "BCA / BBA / MMS", suffix: "", icon: "BookOpen" },
];

export const LEADERSHIP: { chairman: LeadershipMember; director: LeadershipMember; viceChairman: LeadershipMember; secretary: LeadershipMember } = {
  chairman: {
    name: "Shri. Narayandas Agrawal",
    title: "Chairman",
    role: "Chairman, Smt. Sitabai Mangilal Agrawal Charitable Trust",
    designation: "Chairman & Founder Trustee",
    image: "/images/leadership/chairman.webp",
    quote: "Education is not merely acquiring knowledge, but building character, competence, and vision for societal transformation.",
    message: "Welcome to Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon. Since our establishment in 2001 under the Smt. Sitabai Mangilal Agrawal Charitable Trust, our singular vision has been to bring high-quality higher education in management and computer science to the rural and semi-urban youth of North Maharashtra. We believe that talent exists everywhere; what is needed is standard infrastructure, dedicated faculty, and an environment of disciplined learning.",
    visionPoints: [
      "Fostering academic rigor combined with strong ethical values.",
      "Providing affordable, quality higher education in computer applications and business administration.",
      "Empowering students from all socio-economic backgrounds with professional skillsets.",
      "Building state-of-the-art academic infrastructure in Chalisgaon."
    ]
  },
  director: {
    name: "Dr. Rahul Kulkarni",
    title: "Director",
    role: "Director, Smt. S. M. Agrawal Institute of Management",
    designation: "Director & Academic Head",
    image: "/images/leadership/director.webp",
    quote: "Our curriculum emphasizes practical problem solving, technical proficiency, and professional leadership.",
    message: "At AIM Chalisgaon, we groom future IT leaders and business executives through rigorous coursework, practical hands-on laboratory sessions, and continuous mentoring. Affiliated with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon, our institute offers industry-relevant programs including BCA, BBA, and MMS. Our dedicated team of faculty members strives to ensure every student gains confidence, practical knowledge, and career readiness.",
    visionPoints: [
      "Student-centric learning environment with regular practical exposure.",
      "Comprehensive guidance for higher studies and competitive career pathways.",
      "Focus on holistic personality development, communication skills, and digital literacy."
    ]
  },
  viceChairman: {
    name: "Shri. Rameshchandra Agrawal",
    title: "Vice Chairman",
    role: "Vice Chairman, Trust Board",
    designation: "Vice Chairman",
    image: "/images/leadership/vice-chairman.webp",
    message: "AIM stands as a beacon of academic opportunity in Chalisgaon. We constantly upgrade campus infrastructure and student amenities to ensure high-grade learning environments."
  },
  secretary: {
    name: "Shri. Sushil Agrawal",
    title: "Secretary",
    role: "Secretary, Trust Board",
    designation: "Secretary",
    image: "/images/leadership/secretary.webp",
    message: "Our administrative commitment is to maintain absolute transparency, student convenience, and high standards of educational discipline."
  }
};

export const PROGRAMS: Program[] = [
  {
    id: "bca",
    code: "BCA",
    name: "Bachelor of Computer Applications",
    degree: "Undergraduate Degree",
    duration: "3 Years (6 Semesters) / NEP 4 Years",
    affiliation: "KBCNMU Jalgaon",
    approval: "DTE Maharashtra",
    description: "A comprehensive undergraduate program focusing on computer programming, database management, web development, software engineering, and core IT infrastructure.",
    overview: "The BCA program at AIM Chalisgaon equips students with solid foundations in computer computer science, software development, database administration, web programming, and networking technologies. Designed in accordance with North Maharashtra University guidelines, it combines strong theoretical concepts with practical lab sessions.",
    eligibility: [
      "Passed 10+2 (HSC) Examination or equivalent from a recognized board.",
      "Minimum qualifying marks as prescribed by KBCNMU Jalgaon & Govt. of Maharashtra guidelines.",
      "Students from Science, Commerce, or Arts streams with basic mathematics/computer aptitude."
    ],
    highlights: [
      "Modern Computer Labs equipped with high-speed internet & updated software",
      "Comprehensive coverage of Java, C++, Python, Web Technologies & Database Systems",
      "Project work & practical assignments mapped to industry requirements",
      "Regular guest lectures, seminars, and technical workshops"
    ],
    careerOpportunities: [
      "Software Developer / Programmer",
      "Web Application Developer",
      "Database Administrator (DBA)",
      "System Administrator & Network Specialist",
      "Data Analyst / Quality Assurance Tester",
      "Eligible for MCA, MMS, MSc (Computer Science) higher studies"
    ],
    subjects: [
      {
        semester: "Semester I & II",
        courses: ["Fundamentals of Computer & IT", "Programming in C", "Office Automation Tools", "Basic Mathematics & Statistics", "Digital Electronics", "Communication Skills & Soft Skills"]
      },
      {
        semester: "Semester III & IV",
        courses: ["Data Structures using C++", "Object Oriented Programming (Java)", "Database Management Systems (DBMS/SQL)", "Web Designing (HTML5, CSS3, JS)", "Operating Systems Architecture", "Software Engineering Principles"]
      },
      {
        semester: "Semester V & VI",
        courses: ["Python Programming", "Advanced Web Development / PHP", "Computer Networks & Security", "E-Commerce Technologies", "Major Industrial / Software Project", "Practical Lab Work & Seminars"]
      }
    ]
  },
  {
    id: "bba",
    code: "BBA",
    name: "Bachelor of Business Administration",
    degree: "Undergraduate Degree",
    duration: "3 Years (6 Semesters) / NEP 4 Years",
    affiliation: "KBCNMU Jalgaon",
    approval: "DTE Maharashtra",
    description: "A premier management program designed to nurture managerial acumen, entrepreneurial spirit, financial literacy, and marketing strategy in future business leaders.",
    overview: "The BBA program at AIM Chalisgaon builds strong business acumen, management principles, financial accounting, marketing strategies, and human resource dynamics. It offers students deep insights into corporate management, small business management, and analytical decision-making.",
    eligibility: [
      "Passed 10+2 (HSC) Examination in any stream (Commerce, Arts, Science) from a recognized Board.",
      "Admissions governed as per KBCNMU Jalgaon university eligibility criteria."
    ],
    highlights: [
      "Strong grounding in Financial Management, Marketing & HR Principles",
      "Interactive case studies, group discussions, and leadership exercises",
      "Soft skills training, corporate presentation skills, and business communication",
      "Industry visits, seminars, and entrepreneurship development workshops"
    ],
    careerOpportunities: [
      "Management Trainee / Junior Executive",
      "Marketing & Sales Specialist",
      "Financial Analyst / Relationship Manager",
      "Human Resource Executive",
      "Business Operations Associate / Entrepreneur",
      "Direct pathway for MBA / MMS / PGDM higher education"
    ],
    subjects: [
      {
        semester: "Semester I & II",
        courses: ["Principles of Management", "Financial Accounting", "Business Economics (Micro)", "Business Communication", "Computer Applications in Business", "Business Mathematics"]
      },
      {
        semester: "Semester III & IV",
        courses: ["Marketing Management", "Human Resource Management", "Cost & Management Accounting", "Business Law & Corporate Governance", "Business Economics (Macro)", "Organizational Behavior"]
      },
      {
        semester: "Semester V & VI",
        courses: ["Financial Management", "Entrepreneurship Development", "Services Marketing & Retailing", "Research Methodology", "Project Report & Industrial Training", "Comprehensive Viva-Voce"]
      }
    ]
  },
  {
    id: "mms",
    code: "MMS",
    name: "Master of Management Studies (Computer Management)",
    degree: "Postgraduate Program",
    duration: "2 Years (4 Semesters)",
    affiliation: "KBCNMU Jalgaon",
    approval: "Recognized by DTE Maharashtra",
    description: "An advanced postgraduate program combining management strategic decision-making with specialized computer systems management and IT management.",
    overview: "The MMS program provides advanced expertise bridging business management with information technology. Designed for graduates seeking managerial positions in IT firms, system administration, and enterprise resource planning.",
    eligibility: [
      "Bachelor's Degree (BCA, BBA, BSc, BCom, BA, BE) from a recognized University.",
      "Qualified as per KBCNMU Jalgaon admission directives."
    ],
    highlights: [
      "Advanced curriculum in Management Information Systems (MIS) & Enterprise Systems",
      "Strategic IT Management & Project Planning",
      "In-depth Database Administration & Systems Analysis",
      "Research orientation & Managerial Project Work"
    ],
    careerOpportunities: [
      "IT Project Manager",
      "Systems Analyst & IT Consultant",
      "MIS Manager / Operations Lead",
      "Enterprise Resource Manager",
      "Senior Business Analyst"
    ],
    subjects: [
      {
        semester: "Semester I & II",
        courses: ["Management Information Systems (MIS)", "Advanced Database Systems", "Organizational Behavior & IT", "Software Project Management", "Managerial Economics"]
      },
      {
        semester: "Semester III & IV",
        courses: ["Enterprise Resource Planning (ERP)", "Information Security & Audit", "Business Intelligence", "Dissertation & Industrial Project", "Seminar & Research Methodology"]
      }
    ]
  }
];

export const FACULTY_LIST: FacultyMember[] = [
  {
    id: "f1",
    name: "Dr. Rahul Kulkarni",
    designation: "Director & Professor",
    department: "Computer Management & IT",
    qualification: "Ph.D., M.M.S., M.C.M.",
    experience: "20+ Years Academic & Administrative Experience",
    specialization: "Management Information Systems, Strategic IT"
  },
  {
    id: "f2",
    name: "Dr. Shrikant S. Bhandari",
    designation: "Director I/C & Associate Professor",
    department: "Management Studies",
    qualification: "Ph.D., MBA, M.Com.",
    experience: "18+ Years",
    specialization: "Financial Management & Business Economics"
  },
  {
    id: "f3",
    name: "Prof. Piyush S. Agrawal",
    designation: "HOD & Dy. Director",
    department: "Computer Applications (BCA)",
    qualification: "M.C.M., M.Sc. (Comp. Sci.)",
    experience: "15+ Years",
    specialization: "Database Management Systems, Software Engineering"
  },
  {
    id: "f4",
    name: "Prof. Anil Mahajan",
    designation: "Assistant Professor",
    department: "Computer Applications",
    qualification: "M.C.A., M.Sc.",
    experience: "12+ Years",
    specialization: "C/C++, Java Programming & Web Development"
  },
  {
    id: "f5",
    name: "Dr. Mandar Kulkarni",
    designation: "Assistant Professor",
    department: "Management Studies (BBA)",
    qualification: "Ph.D., MBA",
    experience: "10+ Years",
    specialization: "Marketing Management & Entrepreneurship"
  },
  {
    id: "f6",
    name: "Prof. Snehal Kambale",
    designation: "Assistant Professor",
    department: "Computer Applications",
    qualification: "M.C.A.",
    experience: "8+ Years",
    specialization: "Python Programming & Networking"
  },
  {
    id: "f7",
    name: "Prof. Gayatri Bhosale",
    designation: "Assistant Professor",
    department: "Management Studies",
    qualification: "MBA, M.Com",
    experience: "7+ Years",
    specialization: "Human Resource Management & Business Law"
  }
];

export const NOTICES: NoticeItem[] = [
  {
    id: "n1",
    title: "BCA & BBA First Year Admissions Open for Academic Year 2026-27",
    date: "15 Sep 2026",
    category: "Admissions",
    description: "Applications are invited for first year BCA and BBA courses affiliated with KBCNMU Jalgaon. Contact college office or submit online enquiry.",
    isImportant: true
  },
  {
    id: "n2",
    title: "KBCNMU Semester Examination Schedule Notification",
    date: "02 Sep 2026",
    category: "Examination",
    description: "Students are informed to check the upcoming university semester exam form submission deadlines and guidelines.",
    isImportant: true
  },
  {
    id: "n3",
    title: "Campus Technical Workshop on Web Development & Python",
    date: "20 Aug 2026",
    category: "Events",
    description: "A 3-day practical hands-on technical seminar organized by Department of Computer Applications for BCA/MMS students."
  },
  {
    id: "n4",
    title: "Submission of Scholarship & Freeship Forms for Academic Year 2026-27",
    date: "10 Aug 2026",
    category: "General",
    description: "Eligible SC/ST/OBC/EBC category students must submit MahaDBT scholarship documents to the admin office."
  }
];

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "d1",
    title: "AIM College Prospectus & Admission Information Brochure",
    category: "Admission",
    fileFormat: "PDF",
    fileSize: "2.4 MB",
    uploadDate: "2026",
    link: "#"
  },
  {
    id: "d2",
    title: "KBCNMU BCA Course Syllabus Structure (NEP Compliant)",
    category: "Syllabus",
    fileFormat: "PDF",
    fileSize: "1.1 MB",
    uploadDate: "2026",
    link: "#"
  },
  {
    id: "d3",
    title: "KBCNMU BBA Course Syllabus & Examination Scheme",
    category: "Syllabus",
    fileFormat: "PDF",
    fileSize: "980 KB",
    uploadDate: "2026",
    link: "#"
  },
  {
    id: "d4",
    title: "Admission Enquiry & Application Registration Form",
    category: "Forms",
    fileFormat: "PDF",
    fileSize: "450 KB",
    uploadDate: "2026",
    link: "#"
  },
  {
    id: "d5",
    title: "MahaDBT Scholarship Document Checklist & Undertaking Form",
    category: "Forms",
    fileFormat: "PDF",
    fileSize: "320 KB",
    uploadDate: "2026",
    link: "#"
  }
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "computer-lab",
    name: "Modern Computer Laboratories",
    tagline: "High-speed connected IT infrastructure",
    description: "Equipped with high-performance desktop computers, high-speed broadband internet, updated software suites, and dedicated practical programming environments for BCA and MMS students.",
    features: ["Dedicated computer terminals", "High-speed LAN & Wi-Fi internet", "Latest IDEs, SQL Server, Python & Web software", "Uninterrupted power supply (UPS) backup"],
    icon: "Monitor"
  },
  {
    id: "library",
    name: "Central Academic Library",
    tagline: "Comprehensive repository of books & journals",
    description: "Houses thousands of textbooks, reference books, management journals, technical magazines, and national newspapers, providing a quiet reading space for students.",
    features: ["Standard textbooks for BCA, BBA & MMS", "Reference books by renowned international authors", "Business magazines & academic research journals", "Digital cataloging & comfortable reading section"],
    icon: "BookOpenCheck"
  },
  {
    id: "seminar-hall",
    name: "AV Seminar Hall & Conference Room",
    tagline: "State-of-the-art presentation space",
    description: "Air-conditioned seminar hall equipped with LCD projectors, audio-visual systems, and seating capacity for academic seminars, guest lectures, and student presentations.",
    features: ["Multimedia LCD projection system", "Acoustic sound system & microphones", "Capacity for 150+ attendees", "Ideal for guest lectures & workshops"],
    icon: "Presentation"
  },
  {
    id: "sports-cultural",
    name: "Sports & Cultural Infrastructure",
    tagline: "Holistic student physical & creative development",
    description: "Facilities for indoor games (Table Tennis, Chess, Carrom) and outdoor sports, alongside annual cultural events, sports meets, and youth festival participation.",
    features: ["Indoor game equipment", "Annual sports gathering events", "Cultural fest & personality development programs", "Student activity committee guidance"],
    icon: "Trophy"
  }
];

export const FAQS = [
  {
    q: "What undergraduate degree courses are offered at AIM Chalisgaon?",
    a: "AIM Chalisgaon offers BCA (Bachelor of Computer Applications) and BBA (Bachelor of Business Administration), both affiliated with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon."
  },
  {
    q: "Is AIM Chalisgaon affiliated with KBCNMU Jalgaon?",
    a: "Yes, Smt. S. M. Agrawal Institute of Management is permanently/regularly affiliated with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon, and recognized by the Directorate of Technical Education (DTE), Govt. of Maharashtra."
  },
  {
    q: "What is the eligibility for BCA and BBA admission?",
    a: "For BCA and BBA programs, candidates who have passed 10+2 (HSC) in Science, Commerce, or Arts from a recognized board are eligible, subject to university norms."
  },
  {
    q: "How can I apply for admission or enquire about fees?",
    a: "You can submit an enquiry through our online Admission Enquiry Form on this website, visit the campus office at Ghat Road Chalisgaon, or call our admission helpdesk at +91 77700 81314 / +91 73500 76444."
  }
];
