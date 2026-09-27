// The curated catalog of student functions this prototype models. Deliberately
// static data in code, not a database table — it's content the app ships
// with, not something a visitor creates. The only thing the database tracks
// is which of these ids a visitor has pinned (see schema.ts).
//
// This list is deliberately close in breadth to the real ANUHub's student
// menu (homepage tiles + "Search in Menu" suggestions + NavBar folder tree) —
// every genuinely student-facing action from those screens is here. What's
// left out is the backend/admin/config noise that pollutes the real search:
// PeopleTools, Enterprise Components, Timesheet Administration, Application
// Entry Centre, Manager Self Service CFAN, Define Image Dimensions, Currency
// Rate Report, Maintain a Person's POI Reltn, eCAF Print History, AHEGS
// Processing, Review AG Composer Process, Person Organisational Summary,
// Refresh Personal Data, My PUM Dashboard, Budget Types, Content Items/Types,
// My Preferences (PeopleSoft UI prefs) — none of these are things a student
// is ever trying to do.
//
// Categories are task-oriented groups, not the real ANUHub's system-owner
// grouping, ordered by roughly how often a student needs them.
export type FunctionCategory =
  | "Classes & enrolment"
  | "Results & records"
  | "Money & payments"
  | "Degree & graduation"
  | "Personal details & access"
  | "Help & other services";

export interface StudentFunction {
  id: string;
  name: string;
  description: string;
  category: FunctionCategory;
  icon: string;
}

export const CATEGORIES: FunctionCategory[] = [
  "Classes & enrolment",
  "Results & records",
  "Money & payments",
  "Degree & graduation",
  "Personal details & access",
  "Help & other services",
];

// A short, fixed editorial highlight of the handful of actions most students
// reach for most often. Distinct from the Pinned shelf (a visitor's own
// choices) — this is curated once, in code, and doesn't change per visitor.
// Featuring a function here doesn't remove it from its category section below.
export const COMMON_TASK_IDS: string[] = [
  "enrolment",
  "allocate-class",
  "academic-records",
  "charges",
  "personal-data",
  "request-transcript",
];

export const FUNCTIONS: StudentFunction[] = [
  // Classes & enrolment
  {
    id: "enrolment",
    name: "Enrolment",
    description: "Add, drop, or swap a class",
    category: "Classes & enrolment",
    icon: "📝",
  },
  {
    id: "add-class",
    name: "Add Class",
    description: "Add a class directly by class number",
    category: "Classes & enrolment",
    icon: "➕",
  },
  {
    id: "allocate-class",
    name: "Allocate to Your Class",
    description: "View and manage your timetable",
    category: "Classes & enrolment",
    icon: "🗓️",
  },
  {
    id: "requests",
    name: "Requests",
    description: "Submit and track academic requests",
    category: "Classes & enrolment",
    icon: "📬",
  },
  // Results & records
  {
    id: "academic-records",
    name: "Academic Records",
    description: "See your grades and transcript",
    category: "Results & records",
    icon: "📄",
  },
  {
    id: "academic-history",
    name: "Academic History",
    description: "View your full academic history",
    category: "Results & records",
    icon: "📜",
  },
  {
    id: "grades-withdrawn",
    name: "Grades of Withdrawn Courses",
    description: "See grades for courses you later withdrew from",
    category: "Results & records",
    icon: "📉",
  },
  {
    id: "statement-of-results",
    name: "Statement of Results",
    description: "A full report of every program and course you've taken",
    category: "Results & records",
    icon: "📊",
  },
  {
    id: "request-transcript",
    name: "Request a Transcript",
    description: "Order an official academic transcript",
    category: "Results & records",
    icon: "🎫",
  },
  {
    id: "letters",
    name: "Letters",
    description: "Self-generate enrolment or program confirmation letters",
    category: "Results & records",
    icon: "✉️",
  },
  // Money & payments
  {
    id: "charges",
    name: "Charges to Pay",
    description: "View and pay outstanding fees",
    category: "Money & payments",
    icon: "💳",
  },
  {
    id: "account-details",
    name: "Account Details",
    description: "See your financial account summary",
    category: "Money & payments",
    icon: "🧾",
  },
  {
    id: "account-payments-due",
    name: "Account Payments Due",
    description: "Check what's due and when",
    category: "Money & payments",
    icon: "📅",
  },
  {
    id: "apply-refund",
    name: "Apply for Refund",
    description: "Request a refund for an overpayment",
    category: "Money & payments",
    icon: "💰",
  },
  {
    id: "invoices",
    name: "Invoices",
    description: "View or print your invoices",
    category: "Money & payments",
    icon: "🧮",
  },
  {
    id: "bank-details",
    name: "Bank Details",
    description: "Add or update your bank account for refunds",
    category: "Money & payments",
    icon: "🏦",
  },
  // Degree & graduation
  {
    id: "manage-degree",
    name: "Manage my Degree",
    description: "Track progress against your program",
    category: "Degree & graduation",
    icon: "🎓",
  },
  {
    id: "graduation-details",
    name: "Graduation Details",
    description: "Check your graduation ceremony details",
    category: "Degree & graduation",
    icon: "🏛️",
  },
  {
    id: "discontinue-program",
    name: "Discontinue a Program",
    description: "Formally withdraw from a program",
    category: "Degree & graduation",
    icon: "🚪",
  },
  {
    id: "degree-transfer-apply",
    name: "Apply for Degree Transfer",
    description: "Apply to transfer into a different program",
    category: "Degree & graduation",
    icon: "🔄",
  },
  {
    id: "degree-transfer-accept",
    name: "Degree Transfer Acceptance",
    description: "Accept or decline a degree transfer offer",
    category: "Degree & graduation",
    icon: "✅",
  },
  // Personal details & access
  {
    id: "personal-data",
    name: "Personal Data",
    description: "Update your contact and personal details",
    category: "Personal details & access",
    icon: "👤",
  },
  {
    id: "addresses",
    name: "Addresses",
    description: "View and update your addresses",
    category: "Personal details & access",
    icon: "🏠",
  },
  {
    id: "change-password",
    name: "Change Password",
    description: "Update your ANU account password",
    category: "Personal details & access",
    icon: "🔑",
  },
  {
    id: "delegated-access",
    name: "Delegated Access",
    description: "Let someone else act on your behalf",
    category: "Personal details & access",
    icon: "🤝",
  },
  {
    id: "statistical-information",
    name: "Statistical Information",
    description: "View or update your statistical information",
    category: "Personal details & access",
    icon: "📋",
  },
  // Help & other services
  {
    id: "additional-resources",
    name: "Additional Resources",
    description: "Other student support links",
    category: "Help & other services",
    icon: "📚",
  },
  {
    id: "student-messages",
    name: "Student Messages",
    description: "Read messages ANU has sent you",
    category: "Help & other services",
    icon: "💬",
  },
  {
    id: "report-incident",
    name: "Report a Campus Incident",
    description: "Submit a WHS incident notification",
    category: "Help & other services",
    icon: "🚨",
  },
];

export const FUNCTIONS_BY_ID: Map<string, StudentFunction> = new Map(
  FUNCTIONS.map((fn) => [fn.id, fn]),
);
