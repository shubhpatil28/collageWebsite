export interface Course {
  id: string;
  name: string;
  code: string;
  degree: string;
  duration: string;
  affiliation: string;
  approval: string;
  description: string;
  overview: string;
  eligibility: string[];
  highlights: string[];
  subjects: { semester: string; courses: string[] }[];
  careerOpportunities: string[];
}

export interface Leadership {
  name: string;
  role: string;
  message: string;
  quote?: string;
  visionPoints?: string[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: "Current Admission" | "Exam Notification" | "Academic Bulletin" | "Historical Circular";
  description: string;
  link?: string;
  isImportant?: boolean;
}

export interface DownloadableDoc {
  id: string;
  title: string;
  category: string;
  fileSize?: string;
  fileFormat: string;
  link: string;
  isAvailable: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  department: string;
  specialization?: string;
  experience?: string;
}

export interface Facility {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
}

export const SITE_INFO = {
  name: "Smt. S. M. Agrawal Institute of Management",
  shortName: "AIM Chalisgaon",
  trust: "Smt. Sitabai Mangilal Agrawal Charitable Trust",
  established: 2001,
  dcode: "5162",
  affiliation: "Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon",
  recognition: "Directorate of Technical Education (DTE), Govt. of Maharashtra",
  address: "Ghat Road, Opp. Market Yard, Chalisgaon - 424101, Dist. Jalgaon, Maharashtra, India",
  phoneNumbers: [
    "+91 9890649477", // Director In-Charge Prof. Piyush Agrawal
    "+91 7770081314", // Registrar Mr. Devendra Joshi
    "02589-222477"    // Office Line
  ],
  emails: [
    "admissions2020.ssmaim@gmail.com",
    "aim.office@rediffmail.com"
  ],
  workingHours: "Monday – Saturday: 9:30 AM to 5:30 PM",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.893116565147!2d75.0069!3d20.4632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDI3JzQ3LjUiTiA3NcKwMDAnMjQuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
};

export const LEADERSHIP: {
  chairman: Leadership;
  director: Leadership;
  trustees: { name: string; role: string }[];
} = {
  chairman: {
    name: "Sh. Narayanbhau Agrawal",
    role: "Chairman, Smt. Sitabai Mangilal Agrawal Charitable Trust",
    quote: "Higher education must serve as an empowering engine for rural & semi-urban students.",
    message: "Welcome to AIM Chalisgaon. Since 2001, Smt. Sitabai Mangilal Agrawal Charitable Trust has remained committed to bringing benchmark higher management and computer science education to Chalisgaon. We empower our students with university-aligned academic discipline and skill enhancement.",
    visionPoints: [
      "Providing accessible degree education in North Maharashtra",
      "Building modern computer laboratories and academic infrastructure",
      "Fostering ethical values, leadership skills, and career readiness",
      "Encouraging continuous skill advancement and higher studies"
    ]
  },
  director: {
    name: "Prof. Piyush S. Agrawal",
    role: "I/C Director & Academic Directorate",
    quote: "Blending technical application mastery with modern business administration skills.",
    message: "At AIM Chalisgaon, our focus is on ensuring every BCA, BBA, and MMS student gains strong theoretical clarity and practical application experience under KBCNMU guidelines. We mentor students through regular computer lab sessions, academic seminars, and career guidance.",
    visionPoints: [
      "Strict compliance with KBCNMU Jalgaon curriculum",
      "Hands-on computer laboratory practicals",
      "Personality development and student seminars",
      "Dedicated guidance for higher studies and placement"
    ]
  },
  trustees: [
    { name: "Sh. Narayanbhau Agrawal", role: "Chairman" },
    { name: "Sh. Rameshbhau Agrawal", role: "Vice Chairman" },
    { name: "Sh. Sushilbhau Agrawal", role: "Secretary" },
    { name: "Sh. Yogesh Agrawal", role: "Jt. Secretary" },
    { name: "Prof. M. V. Bildikar", role: "Founder Director" },
    { name: "Prof. Dr. A. B. Deogirkar", role: "Ex-Director" },
    { name: "Dr. Mandar Kulkarni", role: "Director (On Lien)" }
  ]
};

export const PROGRAMS: Course[] = [
  {
    id: "bca",
    name: "Bachelor of Computer Applications",
    code: "BCA",
    degree: "Undergraduate Degree",
    duration: "3 Years (6 Semesters)",
    affiliation: "Affiliated with KBCNMU Jalgaon",
    approval: "Recognized by Govt. of Maharashtra",
    description: "Comprehensive undergraduate degree program in computer programming, database systems, web development, and software engineering.",
    overview: "The BCA course at AIM Chalisgaon equips students with core programming principles (C, C++, Java, Python), web design fundamentals, database architecture, and computer networking. Students undertake practical laboratory exercises and university project work.",
    eligibility: [
      "Passed 10+2 (HSC) in any stream (Science, Commerce, Arts) from a recognized board",
      "Fulfill KBCNMU University merit admission guidelines"
    ],
    highlights: [
      "Hands-on Computer Lab Training",
      "C, C++, Java, Web Technologies & Database Systems",
      "Semester Projects & Practical Examination Prep",
      "Pathway to MCA & IT Software Careers"
    ],
    subjects: [
      { semester: "Semester I & II", courses: ["Computer Fundamentals & C Programming", "Office Automation Tools", "Financial Accounting", "Mathematics for Computer Science", "C Programming Laboratory"] },
      { semester: "Semester III & IV", courses: ["Data Structures in C++", "Object Oriented Programming (Java)", "Database Management Systems (DBMS)", "Web Designing Fundamentals", "DBMS & Java Lab"] },
      { semester: "Semester V & VI", courses: ["Software Engineering", "Python Programming", "Computer Networks & Security", "E-Commerce", "Major University Project & Viva-Voce"] }
    ],
    careerOpportunities: [
      "Junior Software Developer",
      "Web Applications Developer",
      "Database Administrator Trainee",
      "Higher Studies (MCA / M.Sc. Computer Science)"
    ]
  },
  {
    id: "bba",
    name: "Bachelor of Business Administration",
    code: "BBA",
    degree: "Undergraduate Degree",
    duration: "3 Years (6 Semesters)",
    affiliation: "Affiliated with KBCNMU Jalgaon",
    approval: "Recognized by Govt. of Maharashtra",
    description: "Professional degree program focusing on business management, marketing, financial accounting, and organizational behavior.",
    overview: "The BBA program prepares students for enterprise administration, retail management, sales strategies, and business communication. It blends theoretical management models with case studies, group presentations, and industrial exposure.",
    eligibility: [
      "Passed 10+2 (HSC) in any stream from a recognized educational board",
      "Compliance with KBCNMU admission criteria"
    ],
    highlights: [
      "Core Business Management & Organizational Dynamics",
      "Principles of Marketing & Financial Accounting",
      "Business Communication & Seminar Presentations",
      "Pathway to MBA & Corporate Management Careers"
    ],
    subjects: [
      { semester: "Semester I & II", courses: ["Principles of Management", "Business Communication", "Financial Accounting", "Micro Economics", "Computer Applications in Business"] },
      { semester: "Semester III & IV", courses: ["Marketing Management", "Human Resource Management (HRM)", "Business Law", "Management Accounting", "Business Statistics"] },
      { semester: "Semester V & VI", courses: ["Strategic Management", "Entrepreneurship Development", "Financial Management", "International Business", "Project Study & Viva"] }
    ],
    careerOpportunities: [
      "Business Operations Assistant",
      "Sales & Marketing Representative",
      "HR Administrator Trainee",
      "Higher Studies (MBA / MMS)"
    ]
  },
  {
    id: "mms",
    name: "Master of Management Studies (CM)",
    code: "MMS (CM)",
    degree: "Postgraduate Degree",
    duration: "2 Years (4 Semesters)",
    affiliation: "Affiliated with KBCNMU Jalgaon",
    approval: "Recognized by Govt. of Maharashtra / DTE Code 5162",
    description: "Postgraduate master's degree integrating advanced business management with computer management applications.",
    overview: "MMS (Computer Management) is designed for graduates seeking specialized managerial roles at the intersection of business strategy and information technology. It emphasizes enterprise resource planning, IT project management, and strategic decision making.",
    eligibility: [
      "Bachelor's Degree in any discipline from a recognized University",
      "As per KBCNMU and DTE Maharashtra postgraduate admission directives"
    ],
    highlights: [
      "Advanced Management Systems & Enterprise IT",
      "Systems Analysis & Strategic Management",
      "Research Methodology & Project Management",
      "Preparation for Executive & IT Management Roles"
    ],
    subjects: [
      { semester: "Semester I & II", courses: ["Management Information Systems (MIS)", "Advanced Computer Architecture", "Quantitative Techniques", "Organizational Behavior", "Database Systems"] },
      { semester: "Semester III & IV", courses: ["Enterprise Resource Planning (ERP)", "Software Project Management", "Strategic Management", "System Analysis & Design", "Master's Dissertation Project"] }
    ],
    careerOpportunities: [
      "IT Project Executive",
      "Systems Analyst",
      "Management Consultant Trainee",
      "Enterprise Systems Specialist"
    ]
  }
];

export const FACULTY_LIST: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Prof. Piyush S. Agrawal",
    designation: "I/C Director & Assistant Professor",
    qualification: "MBM, Ph.D. Scholar",
    department: "Management Studies",
    specialization: "Business Administration & Management Information Systems",
    experience: "15+ Years Academic & Administrative Experience"
  },
  {
    id: "fac-2",
    name: "Dr. Mandar Kulkarni",
    designation: "Director (On Lien) & Associate Professor",
    qualification: "Ph.D., FIETE",
    department: "Computer Applications",
    specialization: "Computer Science & Communication Systems",
    experience: "18+ Years Higher Education Experience"
  },
  {
    id: "fac-3",
    name: "Dr. Shrikant S. Bhandari",
    designation: "Associate Professor",
    qualification: "Ph.D., M.Com, MBM",
    department: "Management Studies",
    specialization: "Financial Management & Business Economics",
    experience: "14+ Years Teaching Experience"
  },
  {
    id: "fac-4",
    name: "Prof. Anil Mahajan",
    designation: "Assistant Professor",
    qualification: "MCA, M.Sc. (Comp. Sci.)",
    department: "Computer Applications",
    specialization: "C, C++, Java Programming & Web Development",
    experience: "12+ Years Teaching Experience"
  },
  {
    id: "fac-5",
    name: "Prof. Meenal Gune",
    designation: "Assistant Professor",
    qualification: "M.Com, MBM",
    department: "Management Studies",
    specialization: "Accounting, HR & Marketing Management",
    experience: "10+ Years Teaching Experience"
  },
  {
    id: "fac-6",
    name: "Prof. Snehal Kambale",
    designation: "Assistant Professor",
    qualification: "MCA",
    department: "Computer Applications",
    specialization: "Database Management Systems & Software Engineering",
    experience: "8+ Years Teaching Experience"
  }
];

export const CAMPUS_FACILITIES: Facility[] = [
  {
    id: "comp-lab",
    name: "Computer Laboratory",
    tagline: "MODERN DIGITAL COMPUTING LABS",
    description: "Equipped with desktop systems, high-speed LAN, software tools (C++, Java, Python, DBMS), and uninterrupted power backup for practical laboratory coursework.",
    image: "/images/computer-lab.png",
    icon: "Monitor",
    features: [
      "Modern PC Systems with LAN Connectivity",
      "Programming Compilers & DBMS Development Tools",
      "Dedicated Practical Hours for BCA & MMS",
      "Power Backup & Technical Support Staff"
    ]
  },
  {
    id: "library",
    name: "Central Academic Library",
    tagline: "KNOWLEDGE & REFERENCE REPOSITORY",
    description: "Features reference books, university recommended textbooks, academic journals, periodicals, and reading room facilities for quiet study.",
    image: "/images/library.png",
    icon: "BookOpenCheck",
    features: [
      "Textbooks & Reference Books for BCA/BBA/MMS",
      "Academic Journals & Periodicals",
      "Spacious Quiet Reading Room Facilities",
      "Book Bank Facility for Students"
    ]
  },
  {
    id: "seminar-hall",
    name: "Audio-Visual Seminar Hall",
    tagline: "MULTIPURPOSE CONFERENCE VENUE",
    description: "A well-appointed audio-visual seminar hall used for academic guest lectures, student presentations, workshops, and institutional meetings.",
    image: "/images/seminar-hall.png",
    icon: "Presentation",
    features: [
      "AV Projection & Sound System",
      "Host for Guest Seminars & Workshops",
      "Student Presentations & Cultural Events",
      "Seating Capacity for College Gatherings"
    ]
  }
];

export const NOTICES: Notice[] = [
  {
    id: "notice-1",
    title: "Admissions Open AY 2026-27 - BCA, BBA & MMS Programs",
    date: "Academic Session 2026-27",
    category: "Current Admission",
    description: "Eligible candidates seeking admission to BCA, BBA, and MMS degree programs are invited to submit their admission enquiry at the college office on Ghat Road, Chalisgaon.",
    isImportant: true
  },
  {
    id: "notice-2",
    title: "KBCNMU Semester Examination Guidelines & Schedule Bulletin",
    date: "University Circular 2026",
    category: "Exam Notification",
    description: "Students are instructed to submit university semester examination forms within the designated timeline as notified by Kavayitri Bahinabai Chaudhari North Maharashtra University Jalgaon."
  },
  {
    id: "notice-3",
    title: "MahaDBT Scholarship & Freeship Application Portal Open",
    date: "State Govt. Directive",
    category: "Academic Bulletin",
    description: "SC / ST / OBC / EBC category students are advised to submit their online scholarship forms on MahaDBT portal and submit physical copies to the college registrar desk."
  },
  {
    id: "notice-4",
    title: "KBCNMU BBA & BCA Structure Equivalence Syllabus Archive (2017-18 / 2019-20)",
    date: "University Reference",
    category: "Historical Circular",
    description: "Official university course equivalence structures and syllabus archives approved by North Maharashtra University for BCA, BBA, and DCM diploma programs."
  }
];

export const DOWNLOADS: DownloadableDoc[] = [
  {
    id: "doc-1",
    title: "B.C.A. Course Syllabus (KBCNMU Approved)",
    category: "Official Syllabus",
    fileSize: "PDF Document",
    fileFormat: "PDF",
    link: "https://img1.wsimg.com/blobby/go/c0e5b37f-d6e4-4a52-8877-263037f75599/downloads/1cm7bt76b_237734.pdf?ver=1599889140266",
    isAvailable: true
  },
  {
    id: "doc-2",
    title: "B.B.A. Structure, Equivalence & Syllabus",
    category: "Official Syllabus",
    fileSize: "PDF Document",
    fileFormat: "PDF",
    link: "https://img1.wsimg.com/blobby/go/c0e5b37f-d6e4-4a52-8877-263037f75599/downloads/2017-18%20BBA%20Structure%2C%20Equivalence%20and%20%20Syllab.pdf?ver=1599889140267",
    isAvailable: true
  },
  {
    id: "doc-3",
    title: "Diploma in Computer Management (D.C.M.) Syllabus",
    category: "Diploma Curriculum",
    fileSize: "PDF Document",
    fileFormat: "PDF",
    link: "https://img1.wsimg.com/blobby/go/c0e5b37f-d6e4-4a52-8877-263037f75599/downloads/2019-20%20Diploma%20in%20Management%20(D.C.M).pdf?ver=1599889140267",
    isAvailable: true
  },
  {
    id: "doc-4",
    title: "YCMOU M.B.A. Program Curriculum",
    category: "YCMOU Academic",
    fileSize: "PDF Document",
    fileFormat: "PDF",
    link: "https://img1.wsimg.com/blobby/go/c0e5b37f-d6e4-4a52-8877-263037f75599/downloads/1cm7cmrrh_449328.pdf?ver=1599889140267",
    isAvailable: true
  },
  {
    id: "doc-5",
    title: "Vijeta Annual College Magazine",
    category: "College Publication",
    fileSize: "PDF Magazine",
    fileFormat: "PDF",
    link: "https://img1.wsimg.com/blobby/go/c0e5b37f-d6e4-4a52-8877-263037f75599/downloads/Vijeta%20Magazine%202018-19.pdf?ver=1599889140267",
    isAvailable: true
  }
];

export const FAQS = [
  {
    q: "Which university is AIM Chalisgaon affiliated with?",
    a: "AIM Chalisgaon is affiliated with Kavayitri Bahinabai Chaudhari North Maharashtra University (KBCNMU), Jalgaon, and recognized by DTE Govt. of Maharashtra (DTE Institute Code 5162)."
  },
  {
    q: "What degree programs are offered at AIM Chalisgaon?",
    a: "The institute offers Bachelor of Computer Applications (BCA), Bachelor of Business Administration (BBA), and Master of Management Studies (MMS - Computer Management)."
  },
  {
    q: "Are Government scholarships available for SC/ST/OBC students?",
    a: "Yes. Eligible candidates can apply for Maharashtra State MahaDBT Post-Matric Scholarships and Freeships as per Government rules."
  },
  {
    q: "How can I submit an admission enquiry?",
    a: "You can submit an online enquiry form through our website or visit the college office on Ghat Road, Opp. Market Yard, Chalisgaon, Jalgaon."
  }
];
