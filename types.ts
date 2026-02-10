
export enum View {
  HOME = 'home',
  DESTINATIONS = 'destinations',
  SERVICES = 'services',
  AI_ADVISOR = 'ai_advisor',
  ADMIN = 'admin',
  DOCS = 'docs',
  ELIGIBILITY = 'eligibility',
  CALCULATOR = 'calculator',
  EVENTS = 'events',
  SCHOLARSHIPS = 'scholarships',
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  TEAM = 'team',
  CONTACT = 'contact',
  VISA = 'visa',
  RESET_PASSWORD = 'reset_password'
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  description: string;
}

export interface Program {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  phone?: string;
  preferredCountry?: string;
  gpa?: string;
  ieltsScore?: {
    overall: string;
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
  };
  passport?: {
    number: string;
    expiryDate: string;
    fileName?: string;
  };
  education?: {
    latestDegree: string;
    gpa: string;
    passingYear: string;
  };
}

export interface VisaStep {
  id: string;
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
}

export interface VisaMistake {
  risk: string;
  avoidance: string;
  resourceLink?: string;
}

export interface VisaCountry {
  id: string;
  country: string;
  code: string;
  visaType: string;
  processingTime: string;
  financials: string;
  steps: VisaStep[];
  documents: string[];
  mistakes: VisaMistake[];
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  email?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  status: 'active' | 'inactive';
  order: number;
}

export interface University {
  id: string;
  name: string;
  country: string;
  ranking: number;
  programs: string[];
  imageUrl: string;
  location: string;
  tuitionFee: string;
  minGpa: string;
  ielts: string;
  funding: string;
  website: string;
  usp: string;
  mscRequirements: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  country: string;
  degree: 'Bachelor' | 'Master' | 'PhD';
  funding: 'Fully Funded' | 'Partial';
  ielts: string;
  coverage: string[];
  deadline: string;
  url: string;
  gpa?: string;
  location?: string;
  mscFields?: string[];
}

export interface ConsultationBooking {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  targetCountry: string;
  status: 'pending' | 'contacted' | 'closed';
  date: string;
}
