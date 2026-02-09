
import { TeamMember } from '../types';

const TEAM_DB_KEY = 'globalpath_team_db';

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'supervisor_1',
    name: 'Abdulla Rajib',
    designation: 'Project Supervisor',
    bio: 'Assistant Professor at RTM AKTU. Expert in Software Engineering and academic mentorship, guiding the next generation of tech innovators through practical and impactful project leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    email: 'rajib@rtm-aktu.edu.bd',
    socialLinks: { linkedin: '#' },
    status: 'active',
    order: 1
  },
  {
    id: 'student_1',
    name: 'Tasnia Jannath',
    designation: 'Co-Founder & Lead Researcher',
    bio: 'Final year CSE student at RTM AKTU. Specialized in educational requirement analysis and academic project documentation.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    socialLinks: { linkedin: '#' },
    status: 'active',
    order: 2
  },
  {
    id: 'student_2',
    name: 'Abdulla Faysal Ifthekar',
    designation: 'Lead Software Architect',
    bio: 'Final year CSE student at RTM AKTU. Architect of the GlobalPath Intelligent Core and the primary developer of the platform UI/UX.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    socialLinks: { github: '#', linkedin: '#' },
    status: 'active',
    order: 3
  },
  {
    id: 'student_3',
    name: 'Aminul Islam',
    designation: 'Backend & Data Specialist',
    bio: 'Final year CSE student at RTM AKTU. Responsible for system data management and ensuring robust performance across student-facing tools.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socialLinks: { twitter: '#' },
    status: 'active',
    order: 4
  }
];

export const teamService = {
  getMembers: (): TeamMember[] => {
    const data = localStorage.getItem(TEAM_DB_KEY);
    if (!data) {
      localStorage.setItem(TEAM_DB_KEY, JSON.stringify(DEFAULT_TEAM));
      return DEFAULT_TEAM;
    }
    return JSON.parse(data);
  },

  getActiveMembers: (): TeamMember[] => {
    return teamService.getMembers()
      .filter(m => m.status === 'active')
      .sort((a, b) => a.order - b.order);
  },

  addMember: (member: Omit<TeamMember, 'id'>): TeamMember => {
    const members = teamService.getMembers();
    const newMember = { ...member, id: Math.random().toString(36).substr(2, 9) };
    const updated = [...members, newMember];
    localStorage.setItem(TEAM_DB_KEY, JSON.stringify(updated));
    return newMember;
  },

  updateMember: (id: string, updates: Partial<TeamMember>): void => {
    const members = teamService.getMembers();
    const updated = members.map(m => m.id === id ? { ...m, ...updates } : m);
    localStorage.setItem(TEAM_DB_KEY, JSON.stringify(updated));
  },

  deleteMember: (id: string): void => {
    const members = teamService.getMembers();
    const updated = members.filter(m => m.id !== id);
    localStorage.setItem(TEAM_DB_KEY, JSON.stringify(updated));
  }
};
