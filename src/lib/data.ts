import hero from "@/assets/hero.jpg";
import library from "@/assets/library.jpg";
import lab from "@/assets/lab.jpg";
import graduation from "@/assets/graduation.jpg";
import lecture from "@/assets/lecture.jpg";
import campus from "@/assets/campus.jpg";

export const images = { hero, library, lab, graduation, lecture, campus };

export const APPLICATION_FEE = 50000; // UGX — sample demo fee
export const PROCESSING_FEE = 2500;

export const formatUGX = (n: number) => `UGX ${n.toLocaleString("en-UG")}`;

export type Programme = {
  slug: string;
  name: string;
  faculty: string;
  level: string;
  duration: string;
  image: string;
  summary: string;
  description: string;
  modules: string[];
  careers: string[];
  requirements: string[];
};

export const programmes: Programme[] = [
  {
    slug: "computer-science",
    name: "Bachelor of Computer Science",
    faculty: "Faculty of Science & Technology",
    level: "Undergraduate",
    duration: "3 years",
    image: lab,
    summary: "Software engineering, algorithms, data and artificial intelligence for a digital economy.",
    description:
      "A rigorous programme grounding students in the theory and practice of computing — from programming fundamentals and data structures to machine learning, systems design and software project management.",
    modules: ["Programming Fundamentals", "Data Structures & Algorithms", "Database Systems", "Artificial Intelligence", "Software Engineering", "Computer Networks"],
    careers: ["Software Developer", "Data Analyst", "Systems Engineer", "Tech Entrepreneur"],
    requirements: ["UACE with two principal passes including Mathematics or Physics", "UCE with at least five passes", "Diploma holders considered on merit"],
  },
  {
    slug: "information-technology",
    name: "Bachelor of Information Technology",
    faculty: "Faculty of Science & Technology",
    level: "Undergraduate",
    duration: "3 years",
    image: library,
    summary: "Applied computing, networks, cybersecurity and information systems for organisations.",
    description:
      "Designed for students who want to build and manage the technology that organisations rely on — networks, cloud services, information systems and cybersecurity.",
    modules: ["Networking Essentials", "Web Technologies", "Cybersecurity", "Cloud Computing", "Information Systems", "IT Project Management"],
    careers: ["Network Administrator", "IT Support Lead", "Security Analyst", "Web Developer"],
    requirements: ["UACE with two principal passes", "UCE with at least five passes including Mathematics", "Diploma holders considered on merit"],
  },
  {
    slug: "business-administration",
    name: "Bachelor of Business Administration",
    faculty: "Faculty of Business & Management",
    level: "Undergraduate",
    duration: "3 years",
    image: lecture,
    summary: "Management, finance, marketing and entrepreneurship with a practical regional focus.",
    description:
      "Prepares future managers and entrepreneurs with grounding in accounting, finance, marketing, human resources and strategy, with case studies drawn from East African enterprises.",
    modules: ["Principles of Management", "Financial Accounting", "Marketing", "Entrepreneurship", "Business Law", "Strategic Management"],
    careers: ["Business Manager", "Accountant", "Marketing Officer", "Entrepreneur"],
    requirements: ["UACE with two principal passes", "UCE with at least five passes", "Mature entry considered"],
  },
  {
    slug: "engineering",
    name: "Bachelor of Science in Civil Engineering",
    faculty: "Faculty of Engineering",
    level: "Undergraduate",
    duration: "4 years",
    image: hero,
    summary: "Structures, water, transport and sustainable infrastructure for growing communities.",
    description:
      "An engineering degree centred on design and construction of sustainable infrastructure — roads, water systems and buildings — with strong mathematical and practical foundations.",
    modules: ["Engineering Mathematics", "Structural Analysis", "Hydraulics", "Surveying", "Geotechnics", "Construction Management"],
    careers: ["Civil Engineer", "Site Engineer", "Water Engineer", "Project Manager"],
    requirements: ["UACE with principal passes in Mathematics and Physics", "UCE with credits in Mathematics and English"],
  },
  {
    slug: "public-health",
    name: "Bachelor of Public Health",
    faculty: "Faculty of Health Sciences",
    level: "Undergraduate",
    duration: "3 years",
    image: campus,
    summary: "Community health, epidemiology and health systems to improve lives across the region.",
    description:
      "Equips graduates to promote health and prevent disease at community and national level through epidemiology, health promotion, environmental health and health policy.",
    modules: ["Epidemiology", "Biostatistics", "Health Promotion", "Environmental Health", "Nutrition", "Health Policy"],
    careers: ["Public Health Officer", "Health Programme Coordinator", "Researcher", "NGO Specialist"],
    requirements: ["UACE with two principal passes including Biology or Chemistry", "UCE with at least five passes"],
  },
  {
    slug: "education",
    name: "Bachelor of Education (Secondary)",
    faculty: "Faculty of Education",
    level: "Undergraduate",
    duration: "3 years",
    image: graduation,
    summary: "Train as a confident, reflective teacher in two teaching subjects of your choice.",
    description:
      "Develops skilled secondary school teachers through pedagogy, curriculum studies and supervised school practice, alongside depth in two teaching subjects.",
    modules: ["Educational Psychology", "Curriculum Studies", "Teaching Methods", "Assessment", "School Practice", "Subject Specialisation"],
    careers: ["Secondary Teacher", "Education Officer", "Curriculum Developer", "School Administrator"],
    requirements: ["UACE with two principal passes in teaching subjects", "UCE with at least five passes"],
  },
  {
    slug: "mba",
    name: "Master of Business Administration",
    faculty: "School of Graduate Studies",
    level: "Postgraduate",
    duration: "2 years",
    image: library,
    summary: "Executive-style leadership and strategy for working professionals.",
    description:
      "A flexible postgraduate programme for professionals seeking senior leadership roles, combining strategy, finance and organisational leadership.",
    modules: ["Leadership", "Corporate Finance", "Strategy", "Research Methods", "Operations", "Dissertation"],
    careers: ["Senior Manager", "Consultant", "Director", "Business Owner"],
    requirements: ["Recognised bachelor's degree", "Two years' work experience preferred"],
  },
  {
    slug: "diploma-ict",
    name: "Diploma in Information & Communication Technology",
    faculty: "Faculty of Science & Technology",
    level: "Diploma",
    duration: "2 years",
    image: lab,
    summary: "Practical, hands-on ICT skills for immediate employment or progression to a degree.",
    description:
      "A practical diploma covering computer applications, networking, web design and support, with a clear pathway into the degree programmes.",
    modules: ["Computer Applications", "Networking Basics", "Web Design", "Hardware & Support", "Programming Basics", "Industrial Training"],
    careers: ["ICT Technician", "Support Officer", "Web Designer"],
    requirements: ["UCE with at least five passes", "UACE with one principal pass"],
  },
];

export const news = [
  { id: 1, date: "12 Nov 2026", category: "Admissions", title: "Applications open for the January 2027 intake", excerpt: "Prospective students can now apply online for undergraduate, diploma and postgraduate programmes.", image: hero },
  { id: 2, date: "03 Nov 2026", category: "Research", title: "Students showcase solar-powered irrigation prototype", excerpt: "Engineering students presented a low-cost irrigation concept for smallholder farmers in Northern Uganda.", image: lab },
  { id: 3, date: "28 Oct 2026", category: "Campus Life", title: "Inter-faculty debate championship returns", excerpt: "Teams from five faculties will compete on the theme of youth, technology and opportunity.", image: lecture },
  { id: 4, date: "20 Oct 2026", category: "Community", title: "Public health outreach reaches surrounding villages", excerpt: "Students and staff supported health screening and awareness activities in the community.", image: campus },
];

export const events = [
  { date: "15", month: "Nov", title: "Open Day & Campus Tours", place: "Main Campus", time: "9:00 AM" },
  { date: "22", month: "Nov", title: "Innovation & Entrepreneurship Fair", place: "Great Hall", time: "10:00 AM" },
  { date: "05", month: "Dec", title: "Graduation Ceremony", place: "University Grounds", time: "8:00 AM" },
  { date: "13", month: "Jan", title: "January Intake Orientation", place: "Main Campus", time: "9:00 AM" },
];

export const testimonials = [
  { quote: "The lecturers know you by name. I came for a degree and found mentors who pushed me to start my own software business.", name: "Grace A.", role: "Computer Science, Year 3 (fictional)" },
  { quote: "Community outreach made public health real for me. I learned more in one village visit than in a month of reading.", name: "Daniel O.", role: "Public Health, Year 2 (fictional)" },
  { quote: "As a working professional, the flexible MBA schedule let me grow my career without pausing it.", name: "Ruth N.", role: "MBA candidate (fictional)" },
];

export type AppStatus = "Draft" | "Submitted" | "Under Review" | "Documents Requested" | "Approved" | "Rejected";
export type PayStatus = "Paid" | "Pending" | "Failed" | "Unpaid";

export type AdminApplication = {
  ref: string;
  name: string;
  email: string;
  phone: string;
  programme: string;
  date: string;
  payment: PayStatus;
  status: AppStatus;
  school: string;
  grades: string;
  district: string;
  notes: string[];
};

const names = [
  ["Akello Sarah", "Lira"], ["Okello Brian", "Gulu"], ["Atim Joan", "Apac"], ["Ogwang Peter", "Lira"],
  ["Nakato Esther", "Kampala"], ["Odongo Samuel", "Oyam"], ["Achieng Mercy", "Kole"], ["Opio Isaac", "Dokolo"],
  ["Auma Patricia", "Alebtong"], ["Mugisha Allan", "Mbarara"], ["Apio Lilian", "Lira"], ["Ocen Moses", "Amolatar"],
];
const statuses: AppStatus[] = ["Submitted", "Under Review", "Approved", "Documents Requested", "Submitted", "Under Review", "Rejected", "Submitted", "Approved", "Draft", "Under Review", "Submitted"];
const pays: PayStatus[] = ["Paid", "Paid", "Paid", "Paid", "Pending", "Paid", "Paid", "Failed", "Paid", "Unpaid", "Paid", "Pending"];

export const seedApplications: AdminApplication[] = names.map(([name, district], i) => ({
  ref: `ASUL-2027-${(1041 + i * 7).toString().padStart(5, "0")}`,
  name,
  email: `${name.split(" ")[1].toLowerCase()}.${name.split(" ")[0].toLowerCase()}@example.com`,
  phone: `+256 7${(70 + i) % 100} ${(412000 + i * 1371).toString().slice(0, 3)} ${(500 + i * 37).toString().slice(0, 3)}`,
  programme: programmes[i % programmes.length].name,
  date: `${(2 + i * 2) % 28 + 1} Oct 2026`,
  payment: pays[i],
  status: statuses[i],
  school: ["Lira Town College", "Dr. Obote College", "Gulu High School", "Mount St. Mary's Namagunga"][i % 4],
  grades: ["UACE: 14 points", "UACE: 17 points", "UACE: 12 points", "Diploma: Second Class Upper"][i % 4],
  district,
  notes: [],
}));

export type Transaction = {
  txn: string;
  applicant: string;
  appRef: string;
  amount: number;
  method: "MTN Mobile Money" | "Airtel Money" | "Visa" | "Mastercard";
  date: string;
  status: "Successful" | "Pending" | "Failed" | "Cancelled";
};

const methods: Transaction["method"][] = ["MTN Mobile Money", "Airtel Money", "Visa", "MTN Mobile Money", "Mastercard", "Airtel Money"];
export const seedTransactions: Transaction[] = seedApplications
  .filter((a) => a.payment !== "Unpaid")
  .map((a, i) => ({
    txn: `TXN-DEMO-${(884210 + i * 913).toString()}`,
    applicant: a.name,
    appRef: a.ref,
    amount: APPLICATION_FEE,
    method: methods[i % methods.length],
    date: a.date,
    status: a.payment === "Paid" ? "Successful" : a.payment === "Pending" ? "Pending" : "Failed",
  }));
