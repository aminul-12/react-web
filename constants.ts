import { University, Scholarship, VisaCountry, Country } from './types';

export const SYLHET_OFFICE = {
  address: "Sylhet TV Gate, RTM AKTU, Sylhet",
  landmark: "RTM Al-Kabir Technical University Area",
  phone: "+880 1306-466265",
  email: "contact@globalpath.edu.bd",
  officeHours: "Sat - Thu: 10:00 AM - 6:00 PM"
};

export const COUNTRIES: Country[] = [
  { name: 'Canada', code: 'CA', flag: '🇨🇦', description: 'World-class MSc programs with clear PR pathways. High research funding and quality of life.' },
  { name: 'United Kingdom', code: 'UK', flag: '🇬🇧', description: 'Home to historic Russell Group universities. 2-year post-study work visa.' },
  { name: 'United States', code: 'USA', flag: '🇺🇸', description: 'Global leader in innovation and research. STEM-OPT extensions available.' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', description: 'High standards and beautiful climate. Strong focus on health and engineering.' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', description: 'Free or low-cost tuition with strong focus on engineering and tech.' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', description: 'Unique cultural experience with high-tech research opportunities.' }
];

export const VISA_DATA: VisaCountry[] = [
  {
    id: 'visa-ca',
    country: 'Canada',
    code: 'CA',
    visaType: 'Study Permit (SDS & Non-SDS)',
    processingTime: '8-12 Weeks (SDS: 20 Days)',
    financials: 'Tuition Fees + $20,635 CAD for living expenses (GIC required for SDS).',
    steps: [
      { id: 'ca-s1', stepNumber: 1, icon: 'fa-university', title: 'Obtain LOA', description: 'Apply to a Designated Learning Institution (DLI) and receive your official Letter of Acceptance (LOA).' },
      { id: 'ca-s2', stepNumber: 2, icon: 'fa-vault', title: 'GIC Investment', description: 'Open a Canadian bank account and deposit $20,635 CAD to get your Guaranteed Investment Certificate (GIC) receipt.' },
      { id: 'ca-s3', stepNumber: 3, icon: 'fa-stethoscope', title: 'Medical Exam', description: 'Visit an IRCC-approved panel physician for your upfront medical examination to speed up processing.' },
      { id: 'ca-s4', stepNumber: 4, icon: 'fa-pen-fancy', title: 'SOP Submission', description: 'Draft a strong Statement of Purpose explaining your academic intent and your ties to Bangladesh.' },
      { id: 'ca-s5', stepNumber: 5, icon: 'fa-cloud-upload', title: 'Lodge Application', description: 'Submit your application online via the IRCC portal, pay fees, and book your biometrics appointment.' },
      { id: 'ca-s6', stepNumber: 6, icon: 'fa-check-double', title: 'Final Approval', description: 'Receive your Port of Entry (POE) Letter of Introduction upon successful approval of your Study Permit.' }
    ],
    documents: ['LOA from DLI', 'GIC Certificate', 'First Year Tuition Receipt', 'Academic Transcripts', 'IELTS/PTE Result', 'Study Plan (SOP)', 'Digital Photo', 'Police Clearance'],
    mistakes: [
      {
        risk: 'Generic "Template" SOPs',
        avoidance: 'IRCC officers look for specific intent. Customize your SOP with your unique background and ties to Bangladesh.',
        resourceLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/study-plan.html'
      },
      {
        risk: 'Biometrics Delay',
        avoidance: 'Failure to book VFS biometrics within 30 days of the instruction letter causes auto-refusal.',
        resourceLink: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/biometrics.html'
      }
    ]
  },
  {
    id: 'visa-uk',
    country: 'United Kingdom',
    code: 'UK',
    visaType: 'Student Visa (Tier 4)',
    processingTime: '3-4 Weeks (Priority Available)',
    financials: 'Tuition Fees + £9,207 (£12,006 in London) for 9 months.',
    steps: [
      { id: 'uk-s1', stepNumber: 1, icon: 'fa-envelope-open-text', title: 'Unconditional Offer', description: 'Secure an unconditional offer letter from a licensed UKVI sponsor university.' },
      { id: 'uk-s2', stepNumber: 2, icon: 'fa-file-invoice-dollar', title: 'Tuition Deposit & CAS', description: 'Pay your initial tuition deposit to receive your Confirmation of Acceptance for Studies (CAS).' },
      { id: 'uk-s3', stepNumber: 3, icon: 'fa-piggy-bank', title: '28-Day Rule', description: 'Maintain your required maintenance funds in a bank account for 28 consecutive days.' }
    ],
    documents: ['Valid Passport', 'CAS Statement', 'Academic Certificates', 'IELTS Certificate', 'TB Test Report', 'Bank Solvency Letter'],
    mistakes: [
      {
        risk: 'Unapproved TB Clinics',
        avoidance: 'UKVI only accepts TB results from IOM Dhaka or Sylhet. Tests from other clinics are rejected.',
        resourceLink: 'https://www.gov.uk/government/publications/tuberculosis-test-for-a-uk-visa-clinics-in-bangladesh'
      }
    ]
  }
];

export const COST_COMPARISON = [
  { city: 'Sylhet', rent: '৳15,000', food: '৳10,000', total: '৳25,000' },
  { city: 'London (UK)', rent: '৳165,000', food: '৳55,000', total: '৳220,000' },
  { city: 'Toronto (CA)', rent: '৳140,000', food: '৳45,000', total: '৳185,000' },
  { city: 'Sydney (AU)', rent: '৳155,000', food: '৳50,000', total: '৳205,000' }
];

export const UNIVERSITIES: University[] = [
  {
    id: 'ca-1',
    name: 'University of Toronto',
    country: 'CA',
    location: 'Toronto, Ontario',
    ranking: 21,
    programs: ['Computer Science', 'Data Science', 'AI', 'Engineering', 'Life Sciences'],
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800&q=80',
    tuitionFee: '$35,000 - $60,000',
    minGpa: '3.3+ / 4.0',
    ielts: '7.0 (No band < 6.5)',
    funding: 'Lester B. Pearson (competitive), Departmental Research Stipends',
    website: 'https://www.utoronto.ca',
    usp: 'Global #1 in research citations and AI innovation.'
  },
  {
    id: 'ca-2',
    name: 'University of Alberta',
    country: 'CA',
    location: 'Edmonton, Alberta',
    ranking: 111,
    programs: ['Engineering', 'CS', 'Petroleum', 'Biotechnology'],
    imageUrl: 'https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=800&q=80',
    tuitionFee: '$10,000 - $25,000',
    minGpa: '3.0+ / 4.0',
    ielts: '6.5 (Minimum 6.0 in all bands)',
    funding: 'Alberta Graduate Excellence Scholarship (AGES), RA positions',
    website: 'https://www.ualberta.ca',
    usp: 'Strongest ties to the North American energy sector.'
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 's1',
    name: 'Commonwealth Scholarship',
    country: 'UK',
    degree: 'Master',
    funding: 'Fully Funded',
    ielts: '6.5 (Min 6.0)',
    coverage: ['Full Tuition Fees', 'Stipend', 'Airfare'],
    deadline: 'October 15, 2024',
    url: 'https://cscuk.fcdo.gov.uk/',
    location: 'Various Universities, UK'
  },
  {
    id: 's2',
    name: 'Fulbright Foreign Student Program',
    country: 'USA',
    degree: 'Master',
    funding: 'Fully Funded',
    ielts: '7.0 Overall',
    coverage: ['Tuition & Fees', 'Living Stipend', 'Textbook Allowance', 'Health Insurance'],
    deadline: 'June 01, 2024',
    url: 'https://foreign.fulbrightonline.org/',
    location: 'Various Universities, USA'
  }
];

export const ACADEMIC_DATA = {
  problemStatement: "The lack of centralized localized information and expert guidance for students in Sylhet aspiring to study abroad.",
  objectives: [
    "Design and implement a comprehensive portal for international education consultancy.",
    "Integrate proprietary AI-driven advising to provide 24/7 support.",
    "Develop automated tools for eligibility assessment and financial planning.",
    "Bridge the gap between international universities and the RTM AKTU community."
  ],
  techStack: {
    "Frontend": "React with TypeScript",
    "Styling": "Tailwind CSS",
    "AI Engine": "GlobalPath Intelligent Core (Student Built)",
    "Architecture": "Component-based UI"
  }
};
